# UI Anomaly Report — Build A Tool
**Audit Date:** 2026-04-17  
**Scope:** All files under `src/` — components, pages, styles  
**Total Anomalies Found:** 25 distinct issues across 47+ instances

---

## A. CRITICAL — Breaks visual integrity or dark mode

---

### A1. Hardcoded `bg-white` breaks dark mode
**Severity:** Critical  
**Files affected:**
- `src/app/(platform)/bookings/page.tsx` — lines 122, 156, 238
- `src/app/(platform)/mentors/page.tsx` — multiple card/panel elements
- `src/app/(platform)/ideas/[id]/page.tsx` — card backgrounds
- `src/app/(platform)/community/page.tsx` — stat cards

**Problem:** Dark mode CSS variables are properly defined in `globals.css` (lines 155–201), but dozens of elements use literal `bg-white` instead of `bg-[var(--color-surface-glass)]` or `bg-background`. These will render as glaring white boxes in dark mode.

**Fix Plan:**
1. Replace all `bg-white` instances on content cards/panels with `bg-[var(--color-surface-glass)]` or `bg-background`
2. Replace `text-gray-*` or other hardcoded light-mode text with `text-foreground` / `text-muted-foreground`
3. Replace hardcoded `border-gray-*` with `border-[var(--color-border)]`

---

### A2. Dual color variable systems — custom vs. Shadcn tokens
**Severity:** Critical  
**Files affected:** `globals.css`, virtually every page

**Problem:** The project has two parallel color systems that are not wired together:
1. **Custom design tokens** — `--color-primary: #FF6B35`, `--color-surface-glass`, `--color-border-light`, etc.
2. **Shadcn/Tailwind tokens** — `--primary`, `--background`, `--foreground`, `--border`, etc.

Components and pages mix both freely. For example `button.tsx` uses `bg-[var(--color-primary)]` (custom) while the base styles use `bg-background` (Shadcn). This means theming changes must be made in two places.

Additionally, in `@theme inline` (globals.css lines 341–382), `--radius-sm` through `--radius-3xl` are redefined using `calc(var(--radius) * ...)` — but the top of `:root` already defines `--radius-sm: 6px`, etc. as separate values. They conflict.

**Fix Plan:**
1. Decide on one color system. Recommended: keep Shadcn tokens as the source of truth and map custom tokens to them (`--color-primary: var(--primary)`)
2. Remove the `--color-*` duplicates from `:root` and instead use CSS aliases
3. Align `--radius-*` tokens — remove the conflicting `calc()` definitions in `@theme inline` and let the `:root` values stand

---

### A3. `z-index` stacking context chaos
**Severity:** Critical  
**Files affected:** `globals.css` line 236, `src/components/layout/Navbar.tsx` lines 35, 96

**Problem:** Three conflicting z-index values with no documented stacking order:
- `.noise` overlay: `z-index: 9999` (highest in codebase)
- Navbar: `z-[1000]`
- Mobile menu backdrop: `z-[900]`
- Workspace modal: `z-50` (Tailwind `z-50` = 50)

The workspace modal at z-50 will appear *under* the navbar (z-1000). Any future modals/toasts added via Shadcn (which default to z-50) will be buried.

**Fix Plan:**
1. Document a z-index scale in `globals.css`:
   ```
   --z-base: 0; --z-card: 10; --z-sticky: 100; 
   --z-dropdown: 200; --z-modal: 300; --z-nav: 400; --z-toast: 500; --z-noise: 9999;
   ```
2. Update Navbar to `z-[var(--z-nav)]`
3. Update mobile menu to `z-[var(--z-dropdown)]`
4. Update workspace modal to `z-[var(--z-modal)]`

---

## B. HIGH — Visible inconsistency across pages

---

### B4. Typography scale not enforced — headings use arbitrary sizes
**Severity:** High  
**Files affected:** All page files

**Problem:** A full typographic scale exists in `globals.css` (`--text-xs` through `--text-6xl`) but pages use Tailwind's own scale (`text-4xl`, `text-5xl`, `text-7xl`) which doesn't map 1:1. Heading sizes are inconsistent across pages:

| Page | H1 Size |
|------|---------|
| `page.tsx` | `text-[clamp(2rem,8vw,3.75rem)]` |
| `community/page.tsx` | `text-7xl` |
| `bookings/page.tsx` | `text-5xl` and `text-7xl` on same page |
| `feed/page.tsx` | `text-6xl` |

Font weights are also inconsistent at the same semantic level: `font-semibold`, `font-bold`, and `font-black` are all used for primary headings.

**Fix Plan:**
1. Create a heading utility in `globals.css`:
   ```css
   .heading-hero { font-size: var(--text-6xl); font-weight: 700; line-height: var(--leading-tight); }
   .heading-page { font-size: var(--text-4xl); font-weight: 600; line-height: var(--leading-tight); }
   .heading-section { font-size: var(--text-2xl); font-weight: 600; }
   ```
2. Apply consistently across all pages replacing arbitrary Tailwind sizes

---

### B5. Border-radius values bypass the design token system
**Severity:** High  
**Files affected:** `page.tsx`, `bookings/page.tsx`, `ideas/[id]/page.tsx`, others

**Problem:** `globals.css` defines `--radius-sm` (6px) through `--radius-3xl` (48px), and `@theme inline` even maps these to Tailwind. Yet pages use arbitrary values:
- `rounded-[2rem]` (bookings line 120)
- `rounded-[2.5rem]` (bookings line 238)
- `rounded-[3rem]` (various)
- `rounded-full` (page.tsx line 242)
- `rounded-2xl` (page.tsx line 361)
- `rounded-3xl` (page.tsx line 528)

No page uses a consistent radius tier for similar UI elements (buttons, cards, inputs all have different radii).

**Fix Plan:**
1. Cards → `rounded-2xl` (maps to `--radius-2xl`)
2. Buttons → `rounded-xl` (already in `button.tsx`, enforce it)
3. Inputs → `rounded-xl` (already in `input.tsx`, enforce it)
4. Pills/badges → `rounded-full`
5. Remove all `rounded-[*]` arbitrary values in favor of the above

---

### B6. Shadow system ignored — inline custom shadows everywhere
**Severity:** High  
**Files affected:** `page.tsx`, `login/page.tsx`, all button overrides

**Problem:** `globals.css` defines `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-glow`. Pages create bespoke shadows:
- `shadow-[0_8px_32px_rgba(255,107,53,0.35)]` (page.tsx line 242)
- `shadow-[0_12px_40px_rgba(255,107,53,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]` (page.tsx line 242)
- `shadow-[0_24px_80px_rgba(0,0,0,0.1)]` (login/page.tsx line 157)

Button.tsx also defines its own shadow inline: `shadow-[0_4px_12px_rgba(255,107,53,0.25)]` instead of `var(--shadow-md)`.

**Fix Plan:**
1. Add a primary-glow shadow token: `--shadow-primary: 0 8px 32px rgba(255,107,53,0.25)`
2. Replace all bespoke orange shadows with `shadow-[var(--shadow-primary)]`
3. Replace dark card shadows with `shadow-[var(--shadow-lg)]`
4. Update `button.tsx` to use token-based shadows

---

### B7. Animation system fragmented — three parallel systems in use
**Severity:** High  
**Files affected:** `globals.css`, `page.tsx`, `liquid-system.css`, `ideas/new/page.tsx`, `bookings/page.tsx`

**Problem:** Three animation mechanisms coexist with no clear rule for when to use each:

1. **CSS keyframes in `globals.css`** — `fade-in-up` (line 312), `.animate-fade-in-up` class (line 324) — never used by any page
2. **CSS keyframes in `liquid-system.css`** — `page-scroll` for the carousel (line 60)
3. **Inline `<style>` blocks in page.tsx** — `page-glow-pulse`, `page-shimmer`, `page-drop`, `page-scroll`, `page-spin` (lines 169–191). `page-scroll` is **duplicated** from `liquid-system.css`
4. **Inline `<style>` in `ideas/new/page.tsx`** — `liquid-shimmer` keyframe
5. **Framer Motion (`motion/react`)** — used on most pages, sometimes alongside CSS transitions

Easing values also conflict:
- `--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.1)` (globals.css line 113)
- `EASE_FLUID = [0.16, 1, 0.3, 1]` (page.tsx line 25) — different value from `--ease-fluid` in CSS

**Fix Plan:**
1. Move ALL `@keyframes` into `globals.css` — delete inline `<style>` blocks from page files
2. Remove the duplicate `page-scroll` from `page.tsx`
3. Align `EASE_FLUID` JS constant with the `--ease-fluid` CSS value: `[0.16, 1, 0.3, 1]` vs `cubic-bezier(0.16, 1, 0.3, 1)` ✓ (these are actually the same — document this)
4. Standardize rule: use Framer Motion for enter/exit transitions, CSS `transition-*` for hover states only

---

### B8. `Button` component bypassed — raw `<button>` tags used
**Severity:** High  
**Files affected:** `page.tsx` line 468, `feed/page.tsx` line 468, others

**Problem:** The `Button` component in `button.tsx` has a well-defined variant/size system. Pages bypass it:
- Raw `<button>` tags with custom Tailwind classes
- `<m.button>` from Framer Motion with inline gradient `style={{ backgroundImage: '...' }}` (bookings line 286)
- Buttons with `style={{ animation: 'page-shimmer 4s ease infinite' }}` (page.tsx line 242)

This means button hover states, disabled states, and focus rings are inconsistent.

**Fix Plan:**
1. Replace all raw `<button>` tags with `<Button>` component
2. For animated primary CTA buttons, extend `buttonVariants` with a `"cta"` variant that includes the shimmer animation
3. Use `asChild` + Framer Motion: `<Button asChild><m.button whileHover={...}>...</m.button></Button>` where motion is needed

---

### B9. `Card` component applied inconsistently
**Severity:** High  
**Files affected:** All platform pages

**Problem:** `card.tsx` uses `liquid-glass` as its base style, but pages override it or bypass it entirely:
- `bookings/page.tsx` line 238: `bg-white shadow-2xl` — overrides `liquid-glass` entirely
- `community/page.tsx` line 169: `ring-2 ring-[#FFB800]` — ring color hardcoded
- `feed/page.tsx` line 302: Additional `group` hover shadows not in component
- Some "card" areas are just `<div>` with inline classes, not using `<Card>` at all

**Fix Plan:**
1. Add card variants to `card.tsx`: `variant: "glass" | "solid" | "featured"` using CVA
2. `"solid"` → `bg-[var(--color-surface-glass)] border border-[var(--color-border)]` (replaces `bg-white`)
3. `"featured"` → adds ring/highlight border for highlighted state (replaces `ring-2 ring-[#FFB800]`)
4. Standardize hover shadow via `group-hover:` in the component definition

---

### B10. Hardcoded hex colors throughout — 6+ non-token colors
**Severity:** High  
**Files affected:** `feed/page.tsx`, `community/page.tsx`, `ideas/[id]/page.tsx`, `bookings/page.tsx`

**Problem:** These raw hex values appear outside the design token system:
- `text-[#FFB800]` — gold/star color (feed line 198, community line 133)
- `text-[#4285F4]` — Google blue (bookings line 288, mentors line 288)
- `border-[#FFB800]/20 bg-[#FFB800]/10` — community badge
- `from-[#FFB800] to-transparent` — ideas/[id] gradient

`--color-gold: #FFB800` is defined in `globals.css` line 51 but never referenced in component files.

**Fix Plan:**
1. `#FFB800` → replace with `var(--color-gold)` throughout
2. `#4285F4` → add `--color-google: #4285F4` to `:root` in `globals.css`
3. Search and replace all raw hex values in JSX `className` strings

---

### B11. Form inputs styled inconsistently across pages
**Severity:** High  
**Files affected:** `login/page.tsx`, `signup/page.tsx`, `ideas/new/page.tsx`, `Footer.tsx`

**Problem:** `input.tsx` defines a base input style. Pages add conflicting overrides:
- `login/page.tsx` line 156: `h-16` (taller than default) with custom focus shadow `shadow-[...]`
- `ideas/new/page.tsx` line 156: Different focus behavior — uses `focus:shadow-[0_0_20px_...]`
- `Footer.tsx` newsletter input: Completely custom styled `<input>` ignoring the `Input` component
- `<select>` elements (feed, mentors) are manually styled with SVG arrow backgrounds — not part of any component

**Fix Plan:**
1. Add `size` prop to `Input`: `"default" | "lg"` (lg = h-16 for auth forms)
2. Standardize focus ring: use `focus-visible:ring-4 focus-visible:ring-[var(--color-primary-glow)]` everywhere (already in `input.tsx`)
3. Wrap Footer newsletter input with `<Input>` component
4. Create a `<Select>` component consistent with `<Input>` styling

---

### B12. Responsive grid strategies differ per page
**Severity:** High  
**Files affected:** All platform pages

**Problem:** Every page implements its own responsive layout strategy:
- `bookings/page.tsx`: `grid-cols-1 lg:grid-cols-[1fr_420px]` — no `md:` breakpoint
- `mentors/page.tsx`: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- `community/page.tsx`: Different column counts at different breakpoints
- `feed/page.tsx`: Two-column only on `lg:`, no middle state

Container max-widths also vary:
- `max-w-[1100px]` matches `--max-width` (correct)
- `max-w-[850px]` in feed — undocumented narrower container
- Some pages use `max-w-screen-xl` (1280px) — wider than `--max-width`

**Fix Plan:**
1. Document the standard grid system: 1 col (mobile) → 2 col (md: 768px) → layout-specific (lg: 1024px)
2. All pages with a sidebar should use `lg:grid-cols-[1fr_420px]` consistently
3. Content-only pages (feed): `max-w-[850px]`
4. All others: use `.container` class (already defined to use `--max-width`)

---

### B13. Inconsistent focus states and missing `aria-label` on interactive elements
**Severity:** High  
**Files affected:** Multiple pages, `input.tsx`, `button.tsx`

**Problem:**
- Focus rings switch between `ring` (Tailwind) and `box-shadow` approaches inconsistently
- `input.tsx`: `focus-visible:ring-4 focus-visible:ring-[var(--color-primary-glow)]`
- `ideas/new/page.tsx`: `focus:shadow-[0_0_20px_...]` — different approach
- Multiple action buttons missing `aria-label`: date selector buttons in bookings, filter pills in feed, icon-only buttons
- Links that look like buttons (styled `<div>` with click handlers) are not keyboard accessible

**Fix Plan:**
1. Standardize: all focusable elements use `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2`
2. Add this as a utility class `focus-ring` in `globals.css`
3. Audit all icon-only buttons and add `aria-label` props
4. Replace clickable `<div>` with `<button>` or `<Link>`

---

## C. MEDIUM — Inconsistency that adds technical debt

---

### C14. Spacing is arbitrary — `--space-*` tokens defined but never used
**Severity:** Medium  
**Files affected:** All files

**Problem:** `globals.css` defines a full spacing scale (`--space-1` through `--space-32`, lines 86–95). Not one component or page references these tokens. Instead, raw Tailwind classes (`p-4`, `p-6`, `p-8`, `p-10`, `p-12`, `gap-2` through `gap-24`) are used in any combination. The same semantic elements (section titles, card bodies, list items) use different padding on different pages.

**Fix Plan:**
1. Map custom tokens to Tailwind in `tailwind.config` (or via `@theme` in globals.css) so `p-space-4` works
2. Document a spacing contract: cards use `p-6` (default) or `p-8` (comfortable), sections use `py-24`
3. Normalize the most egregious inconsistencies: booking's sidebar at `p-10` vs feed card at `p-6`

---

### C15. Icon sizes have no system — 8+ different sizes used
**Severity:** Medium  
**Files affected:** All pages

**Problem:** `@phosphor-icons/react` icons are sized with `size={N}` prop. Sizes found: 14, 16, 18, 20, 24, 28, 32, 40, 48 — no documented scale. The same conceptual element (e.g., an action icon in a card) uses `size={20}` on one page and `size={24}` on another.

Additionally, `lucide-react` is in `package.json` but no page imports it. A custom SVG `CheckCircle` is drawn in `page.tsx` lines 577–583 when `@phosphor-icons/react` has `CheckCircle`.

**Fix Plan:**
1. Define icon size scale: `xs=14`, `sm=16`, `md=20`, `lg=24`, `xl=32`, `2xl=40`
2. Document which size to use in which context (body text icons = `md`, headings = `lg`, feature icons = `xl`)
3. Remove `lucide-react` from `package.json` (unused)
4. Replace custom SVG `CheckCircle` with `<CheckCircle size={20} />` from Phosphor

---

### C16. Avatar/initials circle sizes are inconsistent
**Severity:** Medium  
**Files affected:** `page.tsx`, `ideas/new/page.tsx`, `bookings/page.tsx`, `ideas/[id]/page.tsx`, `mentors/page.tsx`

**Problem:** Avatar circles (user initials/images) appear in 5 different sizes with no clear tier:
- `h-[52px] w-[52px]` — page.tsx testimonials
- `h-[48px] w-[48px]` — ideas/new
- `h-20 w-20` (80px) — bookings mentor card
- `h-14 w-14` (56px) — ideas/[id] author
- `h-16 w-16` (64px) — mentors listing

**Fix Plan:**
1. Define 3 avatar sizes: `sm` (h-10 w-10), `md` (h-12 w-12), `lg` (h-20 w-20)
2. Create an `Avatar` component or at least CSS utility classes
3. Apply consistently: testimonial = `sm`, post author = `sm`, mentor card = `lg`

---

### C17. Sidebar sticky offset inconsistent between pages
**Severity:** Medium  
**Files affected:** `bookings/page.tsx`, `community/page.tsx`

**Problem:**
- `bookings/page.tsx`: `lg:sticky lg:top-[calc(var(--nav-height)+6rem)]`
- `community/page.tsx`: different sticky offset value

Pages with sidebars should use the same sticky offset formula. `mentors/page.tsx` has no sticky at all.

**Fix Plan:**
1. Add CSS variable: `--sidebar-top: calc(var(--nav-height) + 2rem)`
2. Use `lg:sticky lg:top-[var(--sidebar-top)]` consistently across all sidebar pages

---

### C18. `carousel-track` utility is defined but no carousel exists
**Severity:** Medium  
**Files affected:** `liquid-system.css` lines 52–63

**Problem:** `.carousel-track` with `@keyframes page-scroll` is defined in `liquid-system.css`. The carousel feature it was built for either was removed or never implemented. The homepage uses a static logo grid, not an animated carousel. This dead CSS adds confusion and the duplicate `page-scroll` keyframe in `page.tsx` suggests the original animation was partially migrated.

**Fix Plan:**
1. If carousel is planned: implement it on the homepage logo row
2. If not: delete `.carousel-track`, its hover state, and the `page-scroll` keyframe from `liquid-system.css`
3. Also remove the duplicate `page-scroll` keyframe from the `<style>` block in `page.tsx`

---

### C19. `.animate-fade-in-up` defined in globals but never used
**Severity:** Medium  
**Files affected:** `globals.css` lines 312–326

**Problem:** The `fade-in-up` keyframe and `.animate-fade-in-up` utility class are defined but no component applies them. All enter animations use Framer Motion instead. Dead CSS.

**Fix Plan:**
1. Either: adopt `.animate-fade-in-up` for simple elements (section intros) that don't need Framer Motion
2. Or: delete both the `@keyframes` and the `.animate-fade-in-up` class

---

### C20. Gradient system is unmanaged — directions and color stops scattered
**Severity:** Medium  
**Files affected:** `page.tsx`, `community/page.tsx`, `ideas/[id]/page.tsx`

**Problem:** Gradients have no system:
- `from-primary to-[var(--color-primary-light)]` (text gradient, page.tsx)
- `from-[rgba(255,107,53,0.08)] to-[rgba(255,136,92,0.04)]` (bg gradient, page.tsx)
- `from-black to-[var(--color-surface-3)]` (community dark section)
- `from-[#FFB800] to-transparent` (ideas/[id] accent)
- Direction varies: `to-br`, `to-r`, `to-b` with no clear rule

**Fix Plan:**
1. Add gradient tokens to `globals.css`:
   ```css
   --gradient-primary: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
   --gradient-subtle: linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,136,92,0.04));
   ```
2. Use consistent direction: `to-br` for decorative backgrounds, `to-r` for text gradients
3. Replace hardcoded `rgba()` with token-based values

---

### C21. Motion easing constants duplicated between JS and CSS
**Severity:** Medium  
**Files affected:** `page.tsx` line 25, `globals.css` lines 113–114

**Problem:** 
- CSS: `--ease-fluid: cubic-bezier(0.16, 1, 0.3, 1)`
- JS: `const EASE_FLUID = [0.16, 1, 0.3, 1]`

These happen to be numerically identical, but there's no link between them. A developer changing the CSS token won't know to update the JS constant. Similarly `--ease-spring` and any equivalent JS constant aren't paired.

**Fix Plan:**
1. Export easing from a single `src/lib/motion.ts` file
2. Have both JS animations and (where possible) CSS consume the same source: the JS file can export string versions for `transition` CSS properties

---

### C22. `select` elements are styled manually with SVG data URIs
**Severity:** Medium  
**Files affected:** `feed/page.tsx` line 256, `mentors/page.tsx` line 229

**Problem:** Both pages implement `<select>` with a custom URL-encoded SVG dropdown arrow in `backgroundImage`. The styles differ slightly between the two pages. No `Select` component exists in `src/components/ui/`.

**Fix Plan:**
1. Create `src/components/ui/select.tsx` matching the `Input` styling pattern
2. Replace both manual select implementations with the component

---

## D. LOW — Code quality and maintainability

---

### D23. Import order is inconsistent across page files
**Severity:** Low  
**Files affected:** All page files

**Problem:** No consistent import ordering. Some pages put React first, some put Next.js imports first, some mix third-party and internal imports. `ideas/new/page.tsx` has an inline `<style>` block after its component code, then imports at the very end of the file.

**Fix Plan:**
1. Add ESLint `import/order` rule or Prettier plugin
2. Enforce: React → Next.js → third-party → internal (`@/`) → styles

---

### D24. Missing `aria-label` on many interactive buttons
**Severity:** Low (Accessibility impact is High, but fix is mechanical)  
**Files affected:** `bookings/page.tsx`, `feed/page.tsx`, `community/page.tsx`

**Problem:** Icon-only and visually contextual buttons lack `aria-label`:
- Date navigation arrows (bookings)
- Filter tag buttons (feed)
- Action icon buttons on cards (like, save, share)

**Fix Plan:**
1. Add `aria-label` to every button that doesn't have visible text
2. For toggle buttons, use `aria-pressed` as well

---

### D25. `lucide-react` is in `package.json` but unused; custom SVG duplicates Phosphor icon
**Severity:** Low  
**Files affected:** `package.json`, `page.tsx` lines 577–583

**Problem:** 
- `lucide-react` appears in `package.json` dependencies — no file imports it
- A hand-drawn `CheckCircle` SVG in `page.tsx` duplicates `<CheckCircle />` from the already-installed `@phosphor-icons/react`

**Fix Plan:**
1. Remove `lucide-react` from `package.json` and run `npm install`
2. Replace the inline SVG with `<CheckCircle size={20} />` from Phosphor

---

## Fix Priority Order

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| 1 | **A2** — Unify color token systems | High | Critical |
| 2 | **A1** — Replace `bg-white` with dark-mode-safe tokens | Medium | Critical |
| 3 | **A3** — Z-index stacking context | Low | Critical |
| 4 | **B7** — Consolidate animation system | Medium | High |
| 5 | **B8** — Replace raw `<button>` with `Button` component | Medium | High |
| 6 | **B9** — Add Card variants, stop style overrides | Medium | High |
| 7 | **B10** — Replace all hardcoded hex colors | Low | High |
| 8 | **B11** — Standardize form inputs | Medium | High |
| 9 | **B4** — Enforce typography scale | Medium | High |
| 10 | **B5** — Enforce border-radius tokens | Low | High |
| 11 | **B6** — Use shadow tokens, remove inline shadows | Low | High |
| 12 | **B12** — Normalize responsive grid strategy | High | High |
| 13 | **B13** — Standardize focus rings, add aria-labels | Medium | High |
| 14 | **C15** — Define and enforce icon size scale | Low | Medium |
| 15 | **C16** — Create Avatar sizing system | Low | Medium |
| 16 | **C14** — Adopt spacing tokens | High | Medium |
| 17 | **C17** — Fix sidebar sticky offset | Low | Medium |
| 18 | **C18** — Remove dead carousel CSS | Low | Medium |
| 19 | **C19** — Remove unused fade-in-up animation | Low | Low |
| 20 | **C20** — Add gradient tokens | Low | Medium |
| 21 | **C21** — Unify easing constants | Low | Medium |
| 22 | **C22** — Create Select component | Medium | Medium |
| 23 | **D25** — Remove lucide-react, fix CheckCircle | Low | Low |
| 24 | **D23** — Add ESLint import ordering | Low | Low |
| 25 | **D24** — Add missing aria-labels | Low | Low |

---

## Recommended Implementation Phases

### Phase 1 — Foundation (do first, unblocks everything)
- A2: Unify color systems
- A3: Z-index scale
- B7: Consolidate animations into globals.css

### Phase 2 — Component consistency (systematic, file by file)
- A1: Replace bg-white
- B8: Replace raw buttons
- B9: Add Card variants
- B10: Replace hardcoded hex
- B11: Standardize inputs
- B5: Enforce border-radius tokens
- B6: Use shadow tokens

### Phase 3 — Layout & typography (cross-page passes)
- B4: Typography scale
- B12: Responsive grid system
- C16: Avatar sizing
- C17: Sidebar sticky

### Phase 4 — Cleanup (quick wins)
- C14: Spacing tokens
- C15: Icon sizes
- C18: Remove dead carousel CSS
- C19: Remove dead animation
- C20: Gradient tokens
- C21: Unify easing
- C22: Select component
- D23–D25: Lint, aria, package cleanup

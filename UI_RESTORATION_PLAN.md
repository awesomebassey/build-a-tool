# UI Restoration Plan — Build A Tool
**Goal:** Restore the UI to match https://build-a-tool.netlify.app using Shadcn UI as the component system  
**Date:** 2026-04-17  
**Root Cause:** Per-page CSS module files were deleted and Shadcn components were added, but the Shadcn components are too opinionated and conflict with the existing design system.

---

## How the Break Happened

The original system used one `.module.css` file per page that owned all local styles for that page. When you deleted those files and added Shadcn components (`Card`, `Button`, `Badge`, `Input`, `Label`), three things went wrong:

1. **The Shadcn `Card` component applies `liquid-glass` + `p-6` + `flex flex-col gap-4` to every card by default.** Many pages rely on `p-0` cards where they control inner layout — those are now padded and arranged in a column by the component itself.

2. **Custom utility classes (`scrollbar-hide`, `mask-fade-right`) used in multiple pages are not defined anywhere** in the new CSS system, so those elements either throw a warning or fail silently.

3. **The `@theme inline` block in `globals.css` redefines `--radius-sm/md/lg/xl` using `calc(var(--radius) * ...)` where `--radius = 0.625rem`** — this completely overrides the explicit values set in `:root` (`--radius-lg: 16px` becomes `6.25px`). Every `rounded-*` Tailwind class is now using the wrong scale.

There is also one active build error from a deleted import.

---

## Issue Inventory

### P0 — Build Error (app won't start)

#### Issue 1: `Navbar.tsx` imports deleted CSS module
**File:** `src/components/layout/Navbar.tsx` line 8  
**Code:** `import styles from "./Navbar.module.css";`  
**Problem:** `Navbar.module.css` is deleted (confirmed in git status: `D src/components/layout/Navbar.module.css`). The import exists but `styles` is never used in the JSX — it was dead code from the migration. Next.js will throw a module-not-found error.  
**Fix:** Remove line 8 from `Navbar.tsx`.

---

### P1 — Design System Breakages (affects every page)

#### Issue 2: `@theme inline` overwrites border-radius tokens
**File:** `src/app/globals.css` lines 375–381  
**Problem:** The `@theme inline` block contains:
```css
--radius-sm: calc(var(--radius) * 0.6);   /* = 3.75px */
--radius-md: calc(var(--radius) * 0.8);   /* = 5px */
--radius-lg: var(--radius);               /* = 6.25px (should be 16px) */
--radius-xl: calc(var(--radius) * 1.4);   /* = 8.75px (should be 24px) */
--radius-2xl: calc(var(--radius) * 1.8);  /* = 11.25px (should be 32px) */
--radius-3xl: calc(var(--radius) * 2.2);  /* = 13.75px (should be 48px) */
```
Since `@theme inline` has higher specificity than `:root`, these values win. The result: every `rounded-2xl` card looks like `rounded-lg`. All the pill shapes, large rounded corners, and smooth card radii that define the original look are flattened.

**Fix:** Remove the six `--radius-*` lines from `@theme inline`. The `:root` values will take over. Also remove `--radius-4xl` from `@theme inline` (line 381).

```css
/* DELETE from @theme inline: */
--radius-sm: calc(var(--radius) * 0.6);
--radius-md: calc(var(--radius) * 0.8);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) * 1.4);
--radius-2xl: calc(var(--radius) * 1.8);
--radius-3xl: calc(var(--radius) * 2.2);
--radius-4xl: calc(var(--radius) * 2.6);
```

#### Issue 3: Missing utility classes — `scrollbar-hide` and `mask-fade-right`
**Files:** `src/app/(platform)/feed/page.tsx` line 276, `src/app/(platform)/mentors/page.tsx` line 247  
**Problem:** Both pages use `scrollbar-hide` on horizontal scroll containers and `mask-fade-right` for the fade-out effect on the right edge of scrollable pill rows. Neither utility is defined anywhere in the new CSS system.  
**Fix:** Add both to `src/styles/liquid-system.css` inside `@layer utilities`:

```css
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.mask-fade-right {
  mask-image: linear-gradient(to right, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
}
```

#### Issue 4: `Card` component is too opinionated — forces `liquid-glass + p-6 + flex col`
**File:** `src/components/ui/card.tsx`  
**Problem:** The current base `Card` class is:
```
liquid-glass flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 ...
```
This breaks every usage that:
- Needs `p-0` with custom inner layout (feed cards, mentor cards, booking cards)
- Needs `bg-white` solid background (bookings summary, community leaderboard, nominations)
- Needs custom border-radius larger than `rounded-2xl` (bookings: `rounded-[2.5rem]`, community: `rounded-[3rem]`)

The forced `flex flex-col gap-4` rearranges card contents when pages don't want that.

**Fix:** Rework the `Card` component to use CVA with variants. Make `glass` the default for homepage sections (mentors, testimonials, tools), and `solid` for content-page cards (bookings, community) where `bg-white` is appropriate:

```tsx
const cardVariants = cva(
  "rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        glass: "liquid-glass",
        solid: "bg-[var(--color-surface-glass)] border border-[var(--color-border-light)] shadow-sm",
        plain: "border border-[var(--color-border-light)]",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "glass",
      padding: "default",
    },
  }
)
```

Pages that currently use `p-0` must pass `padding="none"`. Pages that use `bg-white` must pass `variant="solid"`.

**Alternatively (simpler — recommended):** Strip the Card component back to the absolute minimum and let pages apply their own styles:

```tsx
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-2xl border border-[var(--color-border-light)] transition-all duration-300",
        className
      )}
      {...props}
    />
  )
}
```

This way, pages that want `liquid-glass` pass it explicitly (as they did before), pages that want `bg-white` pass that, and pages that want custom padding pass it. This is the most faithful restoration to the original design.

---

### P2 — Page-Level Regressions (affects specific pages)

#### Issue 5: Bookings page — cards use `bg-white` but are inside `liquid-glass` context
**File:** `src/app/(platform)/bookings/page.tsx` lines 120–125, 156–160, 214–218, 238

**Problem:** The mentor selector buttons, date picker buttons, session type buttons, and summary card all use `bg-white` explicitly. When `Card` forces `liquid-glass` (semi-transparent background), any `bg-white` child becomes weirdly bright against the glass. The booking summary card on line 238 has:
```tsx
<Card className="p-10 border-[var(--color-border-light)] bg-white shadow-2xl shadow-black/5 rounded-[2.5rem]">
```
The forced `flex flex-col gap-4 rounded-2xl p-6` from `Card` conflicts with `p-10`, `rounded-[2.5rem]`, and the non-flex layout inside.

**Fix (after Issue 4 is resolved):** Once `Card` is stripped to minimum, all the `bg-white` overrides on this page will work correctly. The `rounded-[2.5rem]` custom override will also apply since the base is just `rounded-2xl` (overridable).

**Additionally:** The mentor selector `<m.button>` elements on line 116 are not using `Button` component — they need `bg-white` but also the hover effects. Since the `Card` fix above removes the forced background, these raw buttons will render correctly against whatever background the page provides.

#### Issue 6: Community page — "Tool of the Month" banner has `bg-white` + Trophy badge
**File:** `src/app/(platform)/community/page.tsx` lines 129, 133, 169–171, 241, 262, 280

**Problem:**
- The banner card (line 129) uses `bg-white` directly. With `Card` forcing `liquid-glass`, this becomes a transparent white blur.
- The Badge on line 133 has `border-[#FFB800]/20 bg-[#FFB800]/10 text-[#FFB800]` — these hardcoded colors are incompatible with the badge's forced transparent base.
- The leaderboard cards (line 169) use `bg-white` which conflicts with `liquid-glass`.
- The first-place card ring `ring-2 ring-[#FFB800] ring-offset-4 ring-offset-[var(--color-bg)]` — the `ring-offset-[var(--color-bg)]` won't work on a glass card because the background is transparent, making the ring appear against the page background color rather than the card.
- The sidebar community CTA card (line 280) uses `bg-gradient-to-br from-black to-[var(--color-surface-3)] text-white` — this is overridden by `liquid-glass`.

**Fix (after Issue 4 is resolved):**
- Banner, leaderboard, nominations, stats sidebar → all need `variant` that supports solid/dark backgrounds
- Badge: the `h-8 self-start` sizing on line 133 will be clipped by the badge's default `h-5 overflow-hidden`. Badges on this page need to override height — use `className="!h-auto py-1.5 px-5"` or similar to override the base height.
- For the `ring-offset` issue: change `ring-offset-[var(--color-bg)]` to `ring-offset-background`

#### Issue 7: Feed page — card hover glow, vote button, category pills
**File:** `src/app/(platform)/feed/page.tsx` lines 302, 310–328, 278–290

**Problem:**
- Feed cards use `<Card className="group relative overflow-hidden p-0 ...">` — the forced `p-6` and `flex flex-col gap-4` completely breaks the `p-0` layout where the card content is manually laid out with `flex flex-col gap-6 p-6 sm:flex-row sm:p-8`.
- The vote button (line 310–328) uses `h-20 w-16 flex-col items-center` but when placed inside a `flex-col` Card, it stacks incorrectly.
- Category pill buttons (line 279–290) use `scrollbar-hide` which is missing → horizontal scroll looks broken with visible scrollbar.

**Fix:**
- After Card is fixed (Issue 4), `p-0` will work.
- After Issue 3 is fixed, `scrollbar-hide` will work.
- The vote button layout is intrinsically correct — it only breaks because the Card forces `flex-col`. Once `p-0` is respected, the `<div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">` inside the card controls layout correctly.

#### Issue 8: Mentors page — stats cards forced to flex-col layout
**File:** `src/app/(platform)/mentors/page.tsx` lines 194–207

**Problem:** The stats cards use `<Card className="group flex flex-col justify-center border-[var(--color-border-light)] p-8 ...">`. The Card already forces `flex flex-col gap-4` so the explicit `flex flex-col` is redundant but harmless. The issue is the forced `p-6` conflicts with `p-8`, resulting in `p-6` winning (the className override is second, but CSS specificity means the component's default `p-6` via its own `cn()` call is applied first, then the page's `p-8` via `className` overrides it). This is actually fine in current Tailwind — className overrides win. The visual issue is the `liquid-glass` background when the original cards on this page should be solid.

Additionally:
- The availability badge on lines 285–294 uses `bg-[rgba(0,165,99,0.1)] text-[var(--color-primary-light)]` or `bg-[rgba(255,184,0,0.1)] text-[#FFB800]` — these are inline div elements, not using the `Badge` component, so they're fine.
- The skill badges (line 302) use `variant="outline"` — the Badge base forces `h-5 overflow-hidden` which clips the text for multi-word skills. Need to override height on these.

**Fix (after Issue 4):** Card background will be correct. Badge sizing: add `className="h-auto py-0.5 px-2.5"` to skill badges to allow them to size naturally.

#### Issue 9: Ideas/new page — custom `<nav>` instead of `Navbar`, inline styles
**File:** `src/app/(platform)/ideas/new/page.tsx` lines 114–124, 107–113, 153–164, 171–190

**Problem:**
- This page renders its own sticky nav (lines 114–124) instead of using the shared `Navbar` component. This means it has no "Back to Feed" link styled differently from other pages, and no consistent nav height.
- The `<style dangerouslySetInnerHTML>` block (lines 107–113) injects `@keyframes liquid-shimmer` inline. This duplicates the animation system.
- Form inputs on lines 153–164, 172–189, 197–204, 210–219, 228–235 are all raw `<input>` and `<textarea>` elements styled with `bg-white` — they bypass the `Input` component entirely. These still work visually but have inconsistent focus states vs the `Input` component.
- The submit button (line 257–268) is a raw `<button>` with inline gradient and animation style — not using the `Button` component.
- The icon container (line 134) uses `bg-white shadow-inner` which will be correct once Card defaults are fixed, but is an inconsistency.

**Fix:**
- Move `@keyframes liquid-shimmer` to `globals.css` as part of the global animation system. Delete the `<style>` block.
- The custom `<nav>` can remain as-is (it's intentionally minimal for the form flow), but standardize its height to `h-[var(--nav-height)]`.
- Form inputs: either use the `Input` component with `className="h-16 bg-white"` or keep the raw `<input>` with the current styling (both produce similar results). For consistency, replace all raw `<input>` elements with the `Input` component.
- Submit button: replace raw `<button>` with `<Button size="lg" className="...">`.

#### Issue 10: Login / Signup pages — no Navbar
**Files:** `src/app/(auth)/login/page.tsx`, `src/app/(auth)/signup/page.tsx`

**Problem:** Auth pages correctly omit the Navbar (they have their own in-page navigation with back link and logo). But the `ThemeToggle` component is in the Navbar, and auth pages don't have one. The right panel of the login page uses `liquid-glass rounded-3xl` for the testimonial card — this is correct and should render properly once the design system is fixed.

**Fix:** No changes needed for auth pages beyond the general design system fixes.

#### Issue 11: Workspace page — not visited in this audit
**File:** `src/app/(platform)/workspace/[projectId]/page.tsx`

This page was flagged in the original audit but is a detail view. Flag for review after core fixes are done.

---

### P3 — Component-Level Issues

#### Issue 12: `Badge` base height `h-5 overflow-hidden` clips multi-line and large badges
**File:** `src/components/ui/badge.tsx` line 8

**Problem:** The badge base class `h-5 overflow-hidden` (from the Shadcn default) clips any badge that is explicitly sized larger. Pages use:
- `h-7 gap-1.5 px-3` (feed status badges)
- `h-8 self-start px-5` (community trophy badge)
- `h-6 px-3 py-1` (mentor availability)

When a page says `className="h-7"`, the `h-5` in the base class still competes and the `overflow-hidden` may clip content.

**Fix:** Change badge base from `h-5` to `h-auto` and change `overflow-hidden` to allow sizing. The paddings control the visual size:
```tsx
// Change:
"group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 ..."
// To:
"group/badge inline-flex h-auto w-fit shrink-0 items-center justify-center gap-1 rounded-full border border-transparent px-2.5 py-0.5 ..."
```

#### Issue 13: `Button` base applies `hover:scale-[1.02]` globally — conflicts with Framer Motion wrappers
**File:** `src/components/ui/button.tsx` line 8

**Problem:** The button base class includes `hover:scale-[1.02]`. Many pages wrap buttons in `<m.div whileHover={{ scale: 1.03, y: -3 }}>` or the button itself is inside `<m.button whileHover={{ scale: 1.005 }}>`. This causes double scaling: the CSS hover scale AND the Framer Motion scale both fire, making buttons scale too much or jerkily.

**Fix:** Remove `hover:scale-[1.02]` and `active:scale-[0.98]` from the button base. Framer Motion handles these on the wrappers. Keep the CSS transition for non-motion contexts (form buttons without motion wrappers like login page).

```tsx
// Remove from base class:
// "hover:scale-[1.02]" and "active:scale-[0.98]"
// Keep: "transition-all"
```

#### Issue 14: `Input` doesn't pass `id` through to label association
**File:** `src/components/ui/input.tsx`

The current Input component correctly passes all props through `{...props}` including `id`. This is fine. No fix needed.

#### Issue 15: `ThemeToggle` added to Navbar — not in original design
**File:** `src/components/layout/Navbar.tsx` lines 8, 73

**Problem:** The original site at build-a-tool.netlify.app is light mode only. The `ThemeToggle` was added to the Navbar during the Shadcn migration (since Shadcn includes dark mode support via `ThemeProvider`). This adds an element to the navbar that wasn't in the original. It also means `next-themes` must be installed and `ThemeProvider` must wrap the app (which it does, per `layout.tsx`).

**Decision:** This can stay if dark mode is a desired feature. If you want exact parity with the Netlify version (light only), remove `ThemeToggle` from `Navbar.tsx` and set `defaultTheme="light"` with `enableSystem={false}` in `layout.tsx`. Given the dark mode CSS is already defined in `globals.css`, keeping it is recommended.

---

### P4 — Missing Footer from Platform Pages

#### Issue 16: Footer not showing on platform pages
**File:** `src/app/layout.tsx` line 36

**Problem:** `Footer` is rendered inside the root layout after `{children}`. The platform pages under `(platform)/` have their own layout that wraps in `min-h-screen` containers. If those containers don't allow the footer to be outside them, the footer may render but be hidden. More critically, auth pages (`(auth)/login`) should NOT have the footer, but the root layout always renders it.

**Fix:** Move `Footer` out of the root layout and into only the appropriate route group layouts. Create `src/app/(platform)/layout.tsx` that includes the Footer, and keep `src/app/(auth)/layout.tsx` without it. The homepage `page.tsx` can have Footer via the platform layout or inline.

Alternatively (simpler): Keep Footer in root layout but add `suppressFooter` context or move auth pages to not share the root layout.

**Recommended approach:**
```
src/app/
  layout.tsx          ← No Footer here
  page.tsx            ← Import Footer at bottom of page
  (platform)/
    layout.tsx        ← Add Footer here
    feed/page.tsx
    mentors/page.tsx
    ...
  (auth)/
    layout.tsx        ← No Footer (existing)
    login/page.tsx
```

---

## Implementation Order

Work through these in order — each fix unblocks the next.

### Step 1: Fix the build error
**Time estimate: 5 minutes**

Edit `src/components/layout/Navbar.tsx`:
- Remove line 8: `import styles from "./Navbar.module.css";`

The app should now start without module-not-found errors.

---

### Step 2: Fix border-radius tokens
**Time estimate: 5 minutes**

Edit `src/app/globals.css`, in the `@theme inline` block (around line 375), delete these 7 lines:
```css
--radius-sm: calc(var(--radius) * 0.6);
--radius-md: calc(var(--radius) * 0.8);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) * 1.4);
--radius-2xl: calc(var(--radius) * 1.8);
--radius-3xl: calc(var(--radius) * 2.2);
--radius-4xl: calc(var(--radius) * 2.6);
```

The `:root` definitions (`--radius-sm: 6px`, `--radius-2xl: 32px`, etc.) will now be the source of truth. All card rounding, pill shapes, and modal radii will snap back to their original look.

---

### Step 3: Add missing utility classes
**Time estimate: 10 minutes**

Edit `src/styles/liquid-system.css`, add inside the `@layer utilities {}` block:

```css
/* Scrollbar hiding */
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Right-side fade mask for horizontal scroll containers */
.mask-fade-right {
  mask-image: linear-gradient(to right, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
}
```

The feed and mentors pages' category/skill filter pill rows will now scroll cleanly without a visible scrollbar and with a proper right-side fade.

---

### Step 4: Fix the Card component
**Time estimate: 15 minutes**

Replace `src/components/ui/card.tsx` with a minimal base that doesn't force layout or background:

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-2xl border border-[var(--color-border-light)] transition-all duration-300",
        className
      )}
      {...props}
    />
  )
}
// Keep CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter
// but strip their forced padding — let pages control that
```

After this change, every page that passes `className="liquid-glass ..."` to Card will get glass. Every page that passes `className="bg-white ..."` will get white. The forced `p-6 flex flex-col gap-4` that was breaking layouts is gone.

---

### Step 5: Fix the Badge component
**Time estimate: 10 minutes**

Edit `src/components/ui/badge.tsx`, change the base from `h-5 overflow-hidden` to flexible sizing:

```tsx
const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-all ...",
  // Remove "h-5" and "overflow-hidden" from the base
```

This lets `h-7`, `h-8`, etc. overrides work properly on pages that need larger badges.

---

### Step 6: Fix the Button component — remove double-scale
**Time estimate: 5 minutes**

Edit `src/components/ui/button.tsx`, remove `hover:scale-[1.02]` and `active:scale-[0.98]` from the base CVA string. Framer Motion wrappers handle the scaling for interactive elements. Static contexts (forms) don't need scale effects.

---

### Step 7: Move keyframes inline styles to globals.css
**Time estimate: 10 minutes**

**From `src/app/page.tsx`** — the `<style>` block (lines 169–191) contains:
- `page-glow-pulse`
- `page-shimmer`
- `page-drop`
- `page-scroll` (duplicate of `liquid-system.css`)
- `page-spin`

Move all of these to `globals.css` under `/* ---- Animations ---- */`. Delete the `<style>` block from `page.tsx` and the duplicate `page-scroll` from `liquid-system.css`.

**From `src/app/(platform)/ideas/new/page.tsx`** — the `<style dangerouslySetInnerHTML>` block (lines 107–113) contains:
- `liquid-shimmer`

Move to `globals.css`. Delete the inline style block.

---

### Step 8: Fix Bookings page layout
**Time estimate: 20 minutes**

After Steps 4–6, most visual issues on this page resolve automatically. Remaining fixes:

**Line 111 — Step number badges use `bg-black`:**  
The original design uses solid black `bg-black` step numbers. With dark mode enabled, these would be invisible on dark background. Change to `bg-foreground text-background` for theme-aware step numbers:
```tsx
// Change:
<span className="flex h-12 w-12 ... bg-black text-white">
// To:
<span className="flex h-12 w-12 ... bg-foreground text-background">
```

**Lines 120–124 — Mentor selector buttons use `bg-white`:**  
Replace with `bg-[var(--color-surface-glass)]` to work in dark mode, OR keep `bg-white` if light-mode-only is acceptable.

**Line 238 — Summary card:**  
After Card fix, `rounded-[2.5rem]` override will work. Add `liquid-glass` class or keep `bg-white` depending on desired treatment. The original netlify site shows this as a solid white card.

**Lines 156, 187 — Date + time slot buttons use `bg-white`:**  
Same as above — the design shows white buttons with orange on selection. Keep `bg-white` as-is for light mode fidelity.

---

### Step 9: Fix Community page
**Time estimate: 20 minutes**

**Line 129 — Tool of Month banner:**  
After Card fix, change to use `liquid-glass` or `bg-white` explicitly. The original shows this as white with a subtle gradient background effect. Add `bg-white` to the Card's className.

**Line 133 — Trophy badge:**  
After Badge fix, `h-8 self-start` overrides will work. `border-[#FFB800]/20 bg-[#FFB800]/10 text-[#FFB800]` will render correctly. Replace `text-[#FFB800]` with `text-[var(--color-gold)]` since `--color-gold: #FFB800` is defined in `:root`.

**Line 169–171 — Leaderboard cards:**  
After Card fix, `bg-white` will render correctly. The `ring-2 ring-[#FFB800]` on the winner card — change `ring-offset-[var(--color-bg)]` to `ring-offset-background` for proper ring offset in both light and dark modes.

**Line 241, 262 — Sidebar cards:**  
After Card fix, `bg-white` and `bg-[var(--color-surface-glass)]` will work.

**Line 280 — CTA card:**  
The dark gradient card `bg-gradient-to-br from-black to-[var(--color-surface-3)] text-white` — after Card fix, no forced background will compete. This will render correctly.

---

### Step 10: Fix Feed page
**Time estimate: 15 minutes**

After Steps 4 and 3, most issues are resolved. Remaining:

**Line 302 — Feed card `p-0`:**  
After Card fix, `p-0` override will work correctly. The card's internal `<div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">` controls layout.

**Line 194–202 — `getStatusStyle()` function:**  
The "Shipped" status returns `text-[var(--color-primary-light)]` but the intent is green (not orange). The original site shows Shipped as green. Fix:
```tsx
case "Shipped":
  return "text-emerald-600 border-emerald-200 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:bg-emerald-950/30";
case "Building":
  return "text-[var(--color-accent-light)] border-[rgba(108,60,225,0.2)] bg-[rgba(108,60,225,0.05)]";
case "New":
  return "text-[var(--color-gold)] border-[rgba(255,184,0,0.2)] bg-[rgba(255,184,0,0.05)]";
```

**Lines 279–290 — Category pill buttons:**  
After Step 3, `scrollbar-hide` and `mask-fade-right` work. No changes needed to the button logic.

---

### Step 11: Fix Mentors page
**Time estimate: 10 minutes**

After Steps 4 and 5, most issues resolve. Remaining:

**Line 302 — Skill badges:**  
Add `className="h-auto py-0.5 px-2.5"` to allow natural sizing. After Badge fix, this renders correctly.

**Lines 285–294 — Availability badge:**  
These are raw `<div>` elements, not using `Badge` component — that's fine. They work as-is.

---

### Step 12: Fix Ideas/New page  
**Time estimate: 15 minutes**

After general fixes, remaining work:

**Lines 107–113 — Delete inline `<style>` block:**  
`liquid-shimmer` moved to `globals.css`. Delete the `<style dangerouslySetInnerHTML>` block.

**Form inputs — standardize with `Input` component:**  
Replace raw `<input>` and `<textarea>` elements with the `Input` component for consistent focus states. The `h-16` sizes on this form are intentional — pass via `className="h-16"`:

```tsx
// Replace:
<input id="title" className="h-16 w-full rounded-2xl border border-[var(--color-border-light)] bg-white p-5 ..." />
// With:
<Input id="title" className="h-16 rounded-2xl pl-5 bg-[var(--color-surface-glass)]" placeholder="..." />
```

For `<textarea>`, the `Input` component only renders `<input>` — create a `Textarea` component or keep raw `<textarea>` with consistent classes.

**Line 257–268 — Submit button:**  
Replace raw `<button>` with `<Button>`:
```tsx
<Button
  type="submit"
  size="lg"
  className="w-full h-16 rounded-2xl text-xl font-bold"
  style={{ backgroundImage: '...gradient...', animation: 'liquid-shimmer 4s ease infinite' }}
>
  Launch to Community <RocketLaunch size={24} weight="fill" />
</Button>
```

---

### Step 13: Fix Footer placement
**Time estimate: 20 minutes**

Create `src/app/(platform)/layout.tsx`:
```tsx
import Footer from "@/components/layout/Footer";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
```

Remove `<Footer />` from `src/app/layout.tsx`. Add `<Footer />` to the bottom of `src/app/page.tsx` directly (homepage).

Create `src/app/(auth)/layout.tsx` (if not exists) with no Footer.

---

### Step 14: Fix Navbar module import (already Step 1)
Already addressed. Re-verify after all other changes.

---

## Summary Table

| # | File | Change | Impact |
|---|------|--------|--------|
| 1 | `Navbar.tsx:8` | Remove deleted CSS module import | Build error fix |
| 2 | `globals.css:375-381` | Remove `--radius-*` from `@theme inline` | All rounded corners |
| 3 | `liquid-system.css` | Add `scrollbar-hide` + `mask-fade-right` | Feed + Mentors filter rows |
| 4 | `card.tsx` | Strip to minimal base, no forced layout | Every page using Card |
| 5 | `badge.tsx` | Remove `h-5 overflow-hidden` base | Community + Feed badges |
| 6 | `button.tsx` | Remove `hover:scale` from base | All buttons with motion wrappers |
| 7 | `page.tsx` + `ideas/new/page.tsx` | Move `@keyframes` to globals.css | Animation deduplication |
| 8 | `bookings/page.tsx` | Step number theme-awareness, verify layout | Bookings page |
| 9 | `community/page.tsx` | ring-offset, gold color token, card backgrounds | Community page |
| 10 | `feed/page.tsx` | Shipped status color | Feed page |
| 11 | `mentors/page.tsx` | Skill badge sizing | Mentors page |
| 12 | `ideas/new/page.tsx` | Delete inline style block, standardize inputs | Ideas submission |
| 13 | `layout.tsx` + route layouts | Move Footer to platform layout | All platform pages |

**Estimated total time:** 2–3 hours of focused implementation work.

---

## What This Does NOT Touch

- The Framer Motion animation system — it works correctly
- The Navbar component structure and behavior — it's correct
- The auth page layouts — they're correct
- The workspace page — out of scope for this restoration pass
- The `ThemeToggle` — keep it (dark mode is a net improvement)
- The `GlowCard` and `TextReveal` custom components — they work correctly
- The `globals.css` design tokens — the token definitions are correct, only the `@theme inline` override section needs trimming
- The `liquid-system.css` `.liquid-glass` utility — it's correct and well-implemented

# UI Lessons Learned & Polish Log

This document serves as the permanent institutional memory for `@agency-luxury-ui-polisher`. Before any UI audit, read this file to avoid repeating past mistakes.

## Rules of Perfection
1. **Never forget the Footer**: A premium app always has a considered, elegant footer.
2. **Page Transitions**: Hard cuts feel cheap. Always use `template.tsx` to mount page transitions.
3. **Mobile Menus**: Hamburger menus must explicitly toggle a full-screen or sliding pane. A raw icon doing nothing is a bug.
4. **Touch Targets**: All interactive elements MUST be at least 44x44px. This includes feed actions and tiny links.
5. **Icon Alignment**: Check for visual alignment, not just metric alignment, when placing text next to icons in buttons.
6. **Mobile Menus**: Solid opaque layers or extremely dark/light blur overlays are required. Don't let menu links overlap hero text without high contrast.
7. **Tabs**: Any horizontal list of filter tabs MUST have `overflow-x: auto` and `scrollbar-width: none` to prevent layout breaking on mobile.
8. **Auth Spacing**: Always check margin/paddings between navigation elements (Back Link) and central Auth Headers on mobile viewports.

---

## Log

### Sweep 1 (Liquid Glass Update - Mar 9, 2026)
* **Status**: In Progress
* **Issues Found**:
  - Missing global footer component.
  - Hamburger menu icon in `Navbar` was static, not wired to open a mobile tray.
  - No global page transition wrapper, meaning page navigations were hard cuts instead of the designed `animate-fade-in-up`.
* **Fixes Applied**:
  - `Footer.tsx` & `Footer.module.css` created and injected globally in `layout.tsx`.
  - Added CSS conditional styles for `mobileMenuOverlay` in `Navbar` + implemented `isMobileMenuOpen` React state to toggle mobile menu correctly.
  - Implemented `template.tsx` with global `animate-fade-in-up` class so Next.js pages seamlessly cross-fade instead of cutting abruptly.
* **Result**: Next.js production build passes with 0 errors. UI is fully responsive and feels expensive.

### Sweep 2 (Mobile Refinement & Touch Targets - Mar 9, 2026)
* **Status**: Completed
* **Issues Found (via Browser Subagent Audit)**:
  - Mobile hamburger overlay was transparent and illegible over hero text.
  - Tab filters on Feed and Mentor pages lacked horizontal scrolling.
  - Auth page headers collided with the "Back" button on 375px screens.
  - Action buttons on Idea Cards lacked padding (under 44px).
* **Fixes Applied**:
  - Replaced glass blur color in Navbar mobile overlay to an opaque solid background for maximum contrast.
  - Re-introduced the global `.tabs` and `.tab` classes with `webkit-overflow-scrolling: touch`.
  - Adjusted mobile margins for `login.module.css` and `workspace.module.css`.
* **Result**: Next.js production rebuild passed. Mobile viewports are pristine and touch-friendly.

### Sweep 3 (Mobile Spacing & Glass Refinement - Mar 12, 2026)
* **Status**: Completed
* **Issues Found (via User Feedback & Secondary Audit)**:
  - Landing page Hero title (`<h1 />`) overflowed on <375px screens.
  - Auth "Back" link crowded the page-edge on mobile.
  - Idea Submission `<input />` fields lacked the luxury Liquid Glass styling.
  - Bookings mentor list dividers lacked sufficient contrast on mobile screens, blending into the background.
  - Global edge padding on `<768px` felt slightly cramped (was `1rem`, needed `1.5rem`).
* **Fixes Applied**:
  - Implemented `clamp(2.5rem, 8vw, 3.5rem)` for fluid hero typography.
  - Increased `.container` horizontal `padding-inline` globally from `var(--space-4)` to `var(--space-6)` (24px) for premium whitespace.
  - Upgraded raw form `<input />`s to frosted `.liquidInputArea`-style containers.
  - Added responsive `.statCard:hover` and padding tweaks to the Mentors grid.
  - Boosted `.mentorOption` border contrast to `var(--color-border-light)`.
* **Result**: All screens now enforce an uncompromising Apple-tier Liquid Glass aesthetic across all viewport sizes.

### Sweep 4 (User-Triggered Fixes - Mar 12, 2026)
* **Status**: Completed
* **Issues Found (via User Feedback)**:
  - Mobile hamburger menu overlay lacked a distinct, explicit "Close" (X) button, forcing users to click links to escape.
  - Overall mobile font sizes (`--text-3xl` through `--text-6xl`) were still too large and dominating small screens.
  - Desktop `Navbar` was detached from the main page grid width, causing header misalignment with page content boundaries.
* **Fixes Applied**:
  - Injected an absolute-positioned `<X>` Phosphor icon button (`.mobileMenuCloseBtn`) into `Navbar.tsx` overlay.
  - Scaled down the global typography tokens via `@media (max-width: 768px)` in `globals.css` (e.g. `--text-6xl` from `3.5rem` down to `3rem`).
  - Adjusted `.nav` to `max-width: var(--max-width)` to enforce perfect horizontal alignment with `.container` page content.
* **Result**: Complete layout parity on desktop and refined typographic hierarchy on narrow viewports.

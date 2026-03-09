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
  - Added padding spacing to Action Items across the app to hit the 44px touch target rules.
* **Result**: Next.js production rebuild passed. Mobile viewports are pristine and touch-friendly.

# Site accessibility audit: meaganjenkins.work

Target: WCAG 2.2 Level AA. Audit date: 2026-11-05. Covers the portfolio site itself (Home, Work with all four tabs, Tech stack, About), in both the Trail and Spooky themes. The Driftboard course has its own notes in `docs/driftboard/ACCESSIBILITY.md`.

## What was tested

| Check | Method | Result |
|---|---|---|
| Automated rules (WCAG 2.0/2.1/2.2 A and AA, plus best practices) | axe-core 4.9.1 on 14 states: 7 views x 2 themes, with every case study expanded | 0 violations after fixes (4 before) |
| Keyboard | Real Tab, Shift+Tab, Enter, and Escape presses | Skip link works; tree-game dialog traps focus, closes on Escape, and returns focus |
| Page changes | Navigation and focus checks | Focus moves to the new page's content; the page title changes on every page |
| Focus indicator contrast | Computed contrast | Light theme ring was 2.6 to 2.8:1; now 4.6 to 5.1:1 |
| Reflow (1.4.10) | 320px viewport (400% zoom on a 1280px screen) | No horizontal page scroll on any page |
| Text spacing (1.4.12) | WCAG spacing values applied | No clipped text |

## Issues found and fixed

1. No skip link (2.4.1). Added one.
2. Focus stayed in place when the page changed (2.4.3). Focus now moves to the page content on navigation.
3. The tree-game celebration was marked as a modal dialog but did not move or trap focus, close on Escape, or restore focus (2.1.2, 2.4.3). All four now work.
4. Light-theme focus ring was below 3:1 (1.4.11). Darkened.
5. About carousel dots were 12 x 12 px (2.5.8). Now 24 px hit areas with the same look.
6. Case-study screenshots were scrollable regions that keyboard users could not reach (2.1.1). They are now focusable.
7. The typewriter answer in "Ask me something" was announced a few letters at a time. Screen readers now get the full answer once; the typing effect is hidden from them.
8. Theme toggle used both a changing label and a pressed state, which reads ambiguously. Removed the pressed state.
9. Links that open new tabs did not say so. Added a screen-reader notice to six links.
10. On a 320px screen the Home content cards ran past the edge and were cut off. They now stack in one column on small screens.

## Known limitations

- **Not tested with a real screen reader** (VoiceOver, NVDA, JAWS). Semantics and labels are built to work with them but have not been verified by listening.
- **Ambient motion has no pause control** (WCAG 2.2.2). Decorative animation (for example the bats in Spooky mode, twinkling, and drifting effects) runs automatically. It is switched off for visitors who set "reduce motion", but there is no on-page pause button.
- Automated tools find only part of all possible issues. Print output, forced-colors or high-contrast modes, and hover-state contrast were not individually tested.

# Accessibility statement: Driftboard Automations: Foundations

Target: WCAG 2.2 Level AA. Audit date: 2026-11-04. This is a portfolio sample built on a fictional product, and all data is fictional.

## What was tested

| Check | Method | Result |
|---|---|---|
| Automated rules (WCAG 2.0/2.1/2.2 A and AA, plus best practices) | axe-core 4.9.1 on 25 screen states: every screen, open menus, feedback messages, hints, investigation panels, validation errors, results (pass and below passing), certificate, course map | 0 violations after fixes (60 violating nodes before) |
| Keyboard operation | Real Tab and Enter presses on the title screen; scripted focus checks on every practice screen | Logical order, skip link works, visible focus ring on every control, focus follows the flow after every menu pick, Back and Next keep their place |
| Target size (2.5.8) | Measured every control on the main screens | No control under 24 x 24 px |
| Focus not obscured (2.4.11) | Checked 92 controls across Build and Refine steps against the floating coach card | None fully hidden |
| Text spacing (1.4.12) | Applied the WCAG spacing values (line height 1.5, letter spacing 0.12em, word spacing 0.16em, paragraph spacing 2em) | No clipped or overlapping text |
| Reflow and zoom (1.4.4 / 1.4.10) | Checked 640px width (about 200% zoom on a 1280px screen) | No horizontal page scroll; all content available |
| Reduced motion | Reviewed styles | Animations and transitions are switched off under `prefers-reduced-motion` |
| Page titles, headings, landmarks | Programmatic check | One level-one heading per screen, no skipped levels, page title changes on every screen |

## Issues found and fixed

1. Heading levels skipped (h1 to h3) on the sort, anatomy, and results screens.
2. No level-one heading on the three practice screens (added a visually hidden one).
3. Page title never changed between screens.
4. White initials on avatar colors failed contrast (2.8 to 4.4:1 at 9 to 10px); now 5.0 to 5.6:1 at larger sizes.
5. Choosing a menu option in Refine and Verify dropped keyboard focus to the top of the page; focus now returns to a sensible control.
6. Checkbox outlines and option-button borders were too faint (1.3 to 2.1:1); now 3.3 to 3.5:1.
7. Progress step names disappeared below 960px; now kept, and visually hidden (but still announced) below 700px.
8. Content was replaced by a "use a larger screen" message below 768px; the cutoff is now 600px so zoomed browsers keep the course.
9. Menus had no accessible name; decorative mock buttons (Share, New task, Cancel) were announced as if they worked.
10. A faded placeholder fell below text contrast.

## Built-in accessibility features

- Skip link, one level-one heading per screen, and focus moved to that heading on each screen change
- Progress bar and course map are real buttons with current-state markers
- All interactions work with buttons and menus; nothing requires dragging
- Coach feedback, hints, praise, and form errors are announced through live regions
- Selection and states are never shown by color alone (icons and text accompany every color)
- Warm, non-punitive feedback with no red error styling

## Known limitations

- **Not tested with a real screen reader** (VoiceOver, NVDA, JAWS). The semantics, labels, and live regions are built to work with them, but have not been verified by listening. This is the most valuable next test.
- **Phones narrower than 600px** see a "use a larger screen" message. That is a deliberate design choice, but it falls short of WCAG 1.4.10 (reflow at 320 CSS px). The course content from 600px up reflows without horizontal page scroll; the simulated board scrolls sideways inside its own area, which is a two-dimensional layout.
- During guided steps, keyboard users can Tab to dimmed controls outside the spotlight; using one shows a gentle nudge and does nothing else.
- Automated tools find only part of all possible issues. Hover states, print output of the certificate, and high-contrast or forced-colors modes were not individually tested.
- Web fonts load from Google Fonts; the course falls back to the system font if they are blocked.

## How to re-test

1. Open the course over a local web server (`python3 -m http.server`), not from a file path.
2. Run the axe DevTools browser extension on each screen, including with menus open.
3. Tab through every screen without a mouse.
4. Test with VoiceOver (Cmd+F5 on a Mac), and with NVDA on Windows if possible.
5. Zoom the browser to 200% and 400%.

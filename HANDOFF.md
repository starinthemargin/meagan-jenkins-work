# Handoff notes: meaganjenkins.work

Last updated: Nov 4, 2026. Read this first if you are picking this project up in a new chat or on a new machine.

## What this is
Meagan Jenkins's portfolio, live at **https://meaganjenkins.work**. It replaced a Wix site. It is a static site built with Vite, React and TypeScript, in the style of the "trail guide" About Me page (altimeter header, topographic background, Trail mode and Spooky mode).

- Repo: https://github.com/starinthemargin/meagan-jenkins-work (public, personal GitHub account `starinthemargin`; transferred from `starinthemargin-mj` on 2026-11-02)
- The app lives in `meagan-jenkins-about-me/`. The repo root only holds `.github/`, `.gitignore` and this file.

## Day to day
```bash
cd meagan-jenkins-about-me
npm install        # first time only
npm run dev        # http://localhost:47213
npm run build      # type-check and production build into dist/
npm run lint
```
**To publish a change:** commit and push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages in about 30 seconds. No manual upload is needed.

**Git identity:** commits in this repo use GitHub's private noreply address (`152535150+starinthemargin@users.noreply.github.com`), set for this repo only. The computer's global Git email is a work (SmarterDx) address, so do not commit from a different clone without setting a local email first. Push with the personal GitHub account (`gh auth switch` or `gh auth login`).

## Where things live
| What | Where |
|---|---|
| All page copy, case studies, courses, videos, guides, tech stack, career route, Q&A | `src/content.ts` |
| Pages | `src/pages/` (Home, Work, TechStack, About) |
| Styles and colors (CSS variables at the top) | `src/index.css` |
| Routing | `src/router.ts`. It uses hash routes (`#/work`, `#/about`, `#/tech-stack`), so it works on any static host without redirect rules. |
| Tree scavenger hunt | `src/hunt.tsx` |
| Images | `public/images/` |
| PDF guides | `public/guides/` (first-page previews are in `public/images/guide-*.jpg`) |
| Hosted eLearning course | `public/courses/driftboard/`: a hand-built HTML, CSS and JS mock course for a fictional product (no build step). It is the only course on the site. Its design brief, accessibility notes and early prototype are in `docs/driftboard/` (not published). |

Use `*asterisks*` around a word in headings in `content.ts` to show it in the accent color. Paths to images and files are relative (no leading `/`) on purpose, so the site works from any folder. `vite.config.ts` sets `base: './'`.

## How to add or change things
- **Video:** add `vimeoId` (the number in the Vimeo URL) to the entry in `videos`. Also save a poster image as `public/images/video-<ID>.jpg`. The posters are saved Vimeo thumbnails (from `https://vimeo.com/api/oembed.json?url=https://vimeo.com/<ID>&width=960`). The Vimeo player loads only after a click.
- **Guide:** copy the PDF into `public/guides/`, make a preview image in `public/images/` (the existing ones were made with `sips -s format png -Z 1000 file.pdf`), and add an entry to `guides`.
- **Course:** put the course folder in `public/courses/<name>/`, add a card image in `public/images/`, and set `riseUrl` on the course to `courses/<name>/index.html` (the field name is historical; any path or link works).
- **Editing the Driftboard course:** `index.html` tags every script and stylesheet with `?v=<version>`. Change that version string every time you edit a course file and publish, or browsers (and GitHub Pages) may keep serving the old files.
- **Case study image:** set `image` on the case study (`kind`: `logo`, `shot` or `art`). All three kinds share one look: border, flat purple shadow, rounded corners.
- **Hidden trees:** 8 hidden trees are spread across the site, and `TOTAL_CAIRNS` in `src/hunt.tsx` must match the number of `<Cairn id="...">` elements. Current ids: `home-hero`, `home-card`, `work-case`, `work-video`, `tech-pack`, `about-hero`, `about-signs`, `about-route`. The counter and progress are saved in the browser's localStorage.

## Hosting and domain (done)
- **Hosting:** GitHub Pages, deployed by the workflow above. Custom domain `meaganjenkins.work`, HTTPS enforced.
- **Registrar and DNS:** Porkbun. The domain was originally on Wix's nameservers. It was moved to Porkbun's nameservers on Oct 1, 2026.
- **DNS records at Porkbun:**
  - four `A` records for the bare domain: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - `CNAME` `www` pointing to `starinthemargin.github.io`
  - **Email (do not delete):** two `MX` records (`fwd1.porkbun.com`, `fwd2.porkbun.com`) and an SPF `TXT` record (`v=spf1 include:_spf.porkbun.com ~all`). These make `hello@meaganjenkins.work` forward through Porkbun.
- Old Wix page addresses (like `/elearning`) were deliberately not redirected, since there are no known links to them.

## Content decisions to remember
- NPS lift for Academy users is **29 points** everywhere. (The old Wix Program Design page said 30; that was wrong.)
- The deliverability (CM Group) course was removed because the source files and link are gone. The eLearning tab has an intro note explaining that most of the eLearning is proprietary software training and can't be shared.
- The "Two truths and a lie" game was removed. A hidden-tree scavenger hunt replaced it.
- The Tech Stack page has an "AI & building tools" group (Claude, ChatGPT, Cursor, GitHub, WellSaid Labs, ElevenLabs) with a tongue-in-cheek "I'm not a coder" note.
- The Vimeo videos show a black box when played from `localhost` but work on the real domain. The "Not loading? Watch on Vimeo" link is the fallback.
- The Protenus drug diversion course was removed from the site on Nov 4, 2026 and replaced by the Driftboard mock course. The old files are in git history. Nothing is left in AWS S3.

## Open items
- [ ] Confirm `https://meaganjenkins.work` and `https://www.meaganjenkins.work` load the new site everywhere. Some networks (for example a work VPN) may serve stale DNS for a few hours after the switch.
- [ ] Send a test email to `hello@meaganjenkins.work` to confirm forwarding still works.
- [ ] Cancel the Wix plan after saving anything wanted from it. Keep the domain registered at Porkbun.
- [ ] Optional: larger originals for the case study images, which are about 1,000 px wide.

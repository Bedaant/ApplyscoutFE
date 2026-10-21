# ApplyScout — Product Requirements

## Problem statement (user's own words, condensed)
Build the ApplyScout landing page. ApplyScout finds fresh, relevant jobs, drafts tailored
application materials from facts the user confirmed, and sends nothing until the user approves it.

The user rejected two earlier directions (warm premium, then dark tech, then clean orange, then a
monochrome editorial version) as "AI slop". On 20 Oct 2026 they attached a reference landing page
(Hirablee) and asked for **the same playful style, with motion animations**:
soft sky-blue gradient hero with fluffy clouds, floating white icon tiles, a big bold headline with
inline mascot/avatar stickers, a fan of pastel job cards, pill buttons, a logo/source marquee,
pastel feature cards, steps, FAQ accordion with a phone mock, final CTA with email capture, footer.

Changing colours away from the old orange/navy scheme was explicitly allowed.

## Scope of this phase
Landing page only. No sign-in, no payments, no pricing, no real resume parsing, no real applying.
Email capture is real; everything product-side on the page is sample/mock data.

## Current implementation (20 Oct 2026) — "sky" design
Active app shell: `/app/frontend/src/App.js` + `/app/frontend/src/sky.css`
Active components: `/app/frontend/src/components/sky/`

Section order:
1. `Nav.jsx` — floating white pill navbar, Log in (inert), "Get early access" (scrolls to CTA form)
2. `Hero.jsx` — sky gradient panel, drifting cloud clusters, floating icon tiles, headline with fox
   sticker + avatar cluster inline, pink pill CTA, "See a sample run"
3. `JobCards.jsx` — fanned deck of 5 pastel job cards (desktop) / swipeable row (mobile); the centre
   card has a working Approve → "Queued, not sent" → Undo
4. `Sources.jsx` — marquee of where postings are read from + the 14-day freshness rule
5. `Statement.jsx` — large statement paragraph with coloured phrases and inline stickers
6. `Features.jsx` — four pastel feature cards
7. `Steps.jsx` — five white step cards with mono detail chips
8. `Truth.jsx` (`#limits`) — interactive fact checklist: unticking a fact removes its sentence from
   the live draft; plus "what it will never do" and "what doesn't work yet" cards
9. `Voices.jsx` — the four objections people raise, with answers (explicitly no customer quotes yet)
10. `Faq.jsx` — accordion + floating phone mock
11. `FinalCta.jsx` — sky panel with email capture, then the footer

Support: `Loader.jsx` (fox loader), `PreviewDialog.jsx` + `PreviewSteps.jsx` (sample run),
`EmailForm.jsx`, `Bits.jsx` (Logo, Clouds, FloatBadge, AvatarCluster, FoxChip, Reveal), `assets.js`.

Design tokens: `sky.css` + tailwind colours `ink #16213A`, `slate`, `bubble` (pink), `lilac`,
`peach2`, `mint`, `rose`, `aqua`, `lemon`, `fox`. Font: Figtree. Motion: framer-motion + Lenis
smooth scroll, with `prefers-reduced-motion` handled in CSS and `MotionConfig reducedMotion="user"`.

Mascot/avatar images are generated stickers hosted on the Emergent image CDN (see `assets.js`).

### Backend (`/app/backend/server.py`)
- `GET /api/` — health
- `POST /api/preview` — returns a sample session: 4 confirmed facts + 3 invented job matches with
  reasons, draft answers, sources and the removed claim. Stored in `preview_sessions`.
- `POST /api/signups` — real waitlist capture. Validates the address, stores email/source/position/
  created_at in `signups`, handles duplicates gracefully and returns a stable position. No email is
  sent (no email provider is configured).

Tests: `/app/backend/tests/test_backend.py` (pytest, 4/4 passing).

## Verification status
Testing agent iteration 1 (`/app/test_reports/iteration_1.json`): backend 100%, frontend 100%.
Covered: signup validation + duplicates, preview API, hero/nav CTA scroll, email capture success and
error, job-card approve/undo, truth-demo fact toggles, FAQ accordion, full sample-run dialog, and
mobile 390x844 with no horizontal overflow.

## Backlog
**P0 — next**
- User review of the new sky design; adjust palette/copy on feedback.
- Decide whether the inline sticker chips in `Statement.jsx` stay or become illustrated stickers.

**P1 — phase 2**
- Real resume upload + fact extraction so the sample run becomes the visitor's own run.
- Live job sourcing behind the match feed.
- Send the first "here are your matches" email to the waitlist (needs an email provider).
- Real customer quotes / partner logos once they exist (Voices + a trusted-by row).

**P2 — phase 3**
- Sign-in and the product app behind the landing page.
- Paid plans and pricing (FAQ currently answers "not priced yet").
- Measured statistics replacing the honest-claims copy.

## Constraints kept
- No fake testimonials, no invented user counts, no pricing, no blind auto-apply claims.
- Sample companies (Northwind Labs, Halden & Co., Brightloom, Kesten Health, Fernhill Group) are
  labelled as invented on the page.
- The sample run always ends on an explicit "nothing was sent" screen.
- Frontend calls the API via `REACT_APP_BACKEND_URL`; backend routes are all `/api`-prefixed.
- Unused earlier designs remain in `components/as`, `components/v2`, `components/landing`,
  `components/site` and are not imported.


## v2 — 21 Oct 2026: "Interviews, not applications"
Hero look/motion unchanged; headline now "Get interviews 🦊 not just 👥 applications sent." + one-line sub.
New section order: Nav → Hero → JobCards (live) → LogoMarquee → MotionStory (#how) → Compare (#compare) →
Quotes → Faq → FinalCta → Footer, plus floating PaletteToggle (Sky / Peach, saved in localStorage).
Sources/Statement/Features/Steps/Truth/Voices files remain but are no longer rendered.

New components (`components/sky/`): `live.js` (API hooks), `Extras.jsx` (CompanyLogo, Magnetic,
PaletteToggle, ParallaxArt), `LogoMarquee.jsx`, `MotionStory.jsx` (scroll-pinned 5 beats desktop, in-view
beats mobile), `Compare.jsx` (8 flip cards, competitor types never named + illustrative volume-vs-fit),
`Quotes.jsx` (two tracks; competitor complaints are paraphrased summaries; early-user quotes are SAMPLE).
Clay fox art (generated, background removed): `/frontend/public/art/*.webp`.
Palette: CSS vars in `sky.css` (`--page`, `--accent`, `--card-1..5`); `html[data-palette=peach]`.

Backend `jobs.py`:
- 28 real companies via public Greenhouse / Ashby / Lever boards; postings ≤14 days; cached in Mongo
  `job_cache` (+ `job_cache_meta`), refreshed hourly (stale-while-revalidate); failing board keeps last data.
- `GET /api/jobs/live?region=all|india|remote|us|europe&limit=1..12` → one posting per company.
- `GET /api/jobs/companies`, `GET /api/jobs/logo/{domain}` (allow-listed; logo fetched from the company's
  own site, Google favicon fallback, cached in `logo_cache`).
- Adzuna wired but OFF until `ADZUNA_APP_ID` + `ADZUNA_APP_KEY` are added to backend/.env; then the
  "Jobs by Adzuna" credit shows automatically.

Tests: iteration_2 + iteration_3 — backend and frontend passing; `backend/tests/test_jobs_api.py`.

## Backlog
- P1: add Adzuna keys; swap SAMPLE quotes for real ones; pick one palette and remove toggle
- P2: "trusted by" only once real customers exist; region-specific pages; measured interview rate

## v2.1 — visual edits (21 Oct 2026)
- Peach is now the default palette (index.html sets it before paint; key `as-palette-v2`); Sky still on the toggle.
  Brand logo, accents, FAQ phone and dialog follow the palette (no hard-coded blue).
- Compare: "volume vs fit" redesigned — "More applications ≠ more interviews": mass-apply bots (100 copy-paste
  → 99 ignored · 1 reply, with legend) vs ApplyScout (5 tailored, labelled outcomes). Marked illustrative.
- Quotes section: negative competitor quotes removed. Now a side-by-side table (#table, `problem-table`):
  what you need × tool types (✓/~/✗, typical by type, not named) × ApplyScout fix; stacked cards on mobile.
  Below it, the SAMPLE early-user carousel only.

## v2.2 — 21 Oct 2026
- Adzuna declined (paid). Coverage widened for free: 43 company boards (Greenhouse/Ashby/Lever) + Remotive
  (remote; credited; refreshed ≤ every 6h) + Arbeitnow (Europe; credited). Boards shown before aggregators.
- `GET /api/jobs/live` gains `q` (title words, case-insensitive) and returns `sources`.
- Role search box (`role-search-input`, suggestion chips) re-deals the live deck.
- Peach is the only palette (toggle removed; `<html data-palette="peach">`).
- New brand mark: fox inside a speech bubble (`BrandMark` in Bits.jsx) + "Apply**Scout**" wordmark; favicon updated.
- Hero floating tiles are now real company logos (Stripe, Notion, Figma, OpenAI, Spotify, Airbnb).
- Motion story beat 05 "We reach the right person, with your OK." (DEMO animation only — nothing is sent).
- Comparison table: new row "Reaches the person who decides".
- SAMPLE quotes removed; add real ones to `frontend/src/components/sky/quotes.js` and the carousel appears.
Tests: iteration_4 — backend 100%, frontend 100%.

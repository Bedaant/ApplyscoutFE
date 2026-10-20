# ApplyScout Landing Page — PRD

## Original problem statement
Premium landing page for ApplyScout, an early-stage web product that helps people apply to jobs faster with review, control and tailored applications. Concept chosen: "Controlled Automation Premium". Sell time saved, tailored applications, user control, honest automation. No fake proof or "for everyone" messaging. Sections: hero (one promise, one CTA "Try it"), trust bar, 5-step workflow, why not blind auto-apply, tailored resume + truth-only answers, approval & control, Gmail follow-up (lower), FAQ, final CTA. Exact color variables (Canvas #F4F3F0, Cards #FFFFFF, Ink #1C1917, Secondary rgba(28,25,23,0.62), Peach #F8C9AE, Tint1 #FDF6F1, Tint2 #FFFBF2, Dark warm #2A2421, Green #4FB286, Amber #E8B04A, Red #D9534F). Maggie fox only in loader + subtle helper moments. Mobile-first, subtle performant motion. React + FastAPI + MongoDB.

User choices: "Try it" opens a mock preview flow; generate a minimal Maggie; no pricing; headline "Apply to better-fit jobs without spending hours every day" + "The smarter way to job hunt without blind auto-apply".

## Architecture
- Frontend: React (CRA/craco), Tailwind, framer-motion, lenis smooth scroll. Components in src/components/landing/.
- Backend: FastAPI `POST /api/preview` → stores a preview session in `preview_sessions` and returns sample matches/drafts (sample data, not real job search).

## Implemented (2026-10-20)
- Maggie SVG loader (clip-path exit), kinetic masked line hero, 3D tilt + scroll-parallax card stack with interactive approve/pause/undo
- Trust bar, slow editorial marquee, 5-step workflow with scroll progress line
- Manual vs blind auto-apply vs ApplyScout comparison
- Truth-only bento (sourced answer, removed claim, photo card with parallax, "we ask, not guess")
- Dark control room with live demo queue (approve/skip/pause all/undo)
- Gmail follow-up section with Maggie helper bubble, FAQ accordion, final CTA, footer
- Mock "Try it" preview dialog: upload/sample resume → Maggie scouting → matches + editable draft → approve (nothing sent)
- Original SVG logo + favicon

## Backlog
- P0: Decide real post-"Try it" flow (real resume parsing, sign-in after value)
- P1: Waitlist/email capture at end of preview; analytics on CTA funnel
- P2: Public proof section once real assets exist; pricing section; SEO/OG setup

## Next tasks
- Wire real resume parsing + job matching into preview
- Add sign-in/payment step after preview value is shown

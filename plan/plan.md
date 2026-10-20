# ApplyScout — Landing Page Rebuild (Monochrome + Orange, Built to Look Hand-Made)

A single landing page that sells ApplyScout: it finds fresh, relevant jobs, drafts tailored application materials from facts the user confirms, and sends nothing until the user approves it.
The whole page is replaced. The governing requirement is that a stranger reading it cannot tell it was generated — it has to read like a small team built it on purpose.

## Who it's for

- Job seekers applying to many roles who are losing hours a day to rewriting the same resume and cover letter.
- People who want the search and drafting automated, but refuse to let a bot blind-apply on their behalf.
- Secondary: career switchers and recent graduates who need help targeting roles, not spamming them.

## The trust problem, and how the page solves it

A page reads as AI-generated because of a specific, recognisable set of tells. Each one is named below and each one is removed deliberately. This is the core of the work, not a finishing pass.

**Tells being removed**

1. Headings that sound like a content template — "Everything You Need to Know", "Powerful Features", "Why Choose Us", "Built For You". Every heading on this page is a sentence a person would say out loud.
2. Perfectly centred, equally spaced, three-across card grids repeated down the page. Not one section on this page uses a symmetric three-card grid.
3. Vague benefit copy — "seamless", "effortless", "intelligent", "revolutionise", "unlock". Banned outright from the page.
4. Generic icon-plus-title-plus-two-lines feature blocks. Replaced with real interface fragments.
5. Emoji used as icons, and stock-photo smiling professionals.
6. Round numbers that no one measured — "10,000+ users", "99% accuracy", "save 10 hours a week".
7. Visible "Lorem"/"placeholder" scaffolding that makes a page look half-finished.
8. Uniform rhythm — every section the same height, same padding, same reveal animation.

**Craft being added in their place**

1. **Specific, dated, checkable copy.** Instead of "save hours", the page says what the product literally does: the number of fields it fills, the exact approval step, what it refuses to write. Sample jobs carry real-looking detail — posting age, team size, salary band, where it was found — because specificity is what generated copy never has.
2. **A signed founder note**, set as a short letter with a real signature, stating plainly that this is early, what works today and what does not yet. Pre-launch honesty is a stronger trust signal than borrowed proof, and it is the single hardest thing for a generated page to fake.
3. **Hand-drawn imperfection.** The connector arrows, the underline under the headline phrase, the checkmarks and the signature are drawn with uneven stroke weight and slight wobble — not geometric SVG strokes.
4. **Deliberate asymmetry.** The hero text sits left of centre with the product stage breaking its right edge. Section widths vary. Some blocks run full-bleed, some are inset. Two sections intentionally break the grid.
5. **Interface over illustration.** Every product claim is shown as a working or near-working piece of ApplyScout's actual UI, with dense realistic content — truncated strings, timestamps, scroll shadows, a disabled button, a count badge.
6. **One opinionated type pairing** — a strong editorial display face set very large and very tight for headlines, a neutral grotesque for body. Mixed sizes within a single headline. Not Inter, not Roboto, not system default.
7. **Texture.** A faint paper grain across the canvas, hairline rules, long soft shadows, and a 1px orange keyline used sparingly — so the page has a surface instead of reading flat.
8. **Varied rhythm.** Section heights, reveal styles and background shades change down the page; there is no repeating cadence.

## Core features and experience

Section order:

1. **Top bar** — wordmark, three links, a "Log in" that is present but inert this phase, and one orange pill.
2. **Hero** — left-weighted. Headline set large and tight with one phrase underlined in a hand-drawn orange stroke. Email field with an orange "Get started" button as the primary action; "See a sample run" as a quiet secondary link beside it. One honest line beneath: no card, no auto-apply.
3. **Product stage** — the centrepiece. A phone showing ApplyScout's match feed, with three floating interface cards around it — a matched job with its real detail, a confirmed-facts panel, and an approval card with a working Approve / Undo — joined to the phone by hand-drawn arrows. Cards settle on load; the approval card actually responds.
4. **Where jobs come from** — a short honest strip naming how matching works and what it will not do, set as running text with hairline rules, not as cards.
5. **How it works** — five steps as a continuous numbered sequence, each step carrying a real UI fragment rather than an icon, with the line between them drawn by hand. Vertical on mobile.
6. **Blind auto-apply vs ApplyScout** — two columns, plain type, no colour tricks, written as sentences rather than ticks and crosses.
7. **Only what you confirmed** — the truth-only argument shown as a live fact checklist: tick a fact and watch the draft sentence change.
8. **Approval queue** — an interactive block where the visitor approves, edits or skips sample applications and the queue responds.
9. **Follow-ups** — replies land in the visitor's own inbox and get tracked. Maggie appears once here, small, as a helper.
10. **Founder note** — the signed letter described above, replacing the testimonial section entirely.
11. **FAQ** — the questions that actually block signup, including: is this auto-apply, will it put things on my resume I did not say, what happens to my data, what does it cost, what does not work yet.
12. **Final CTA + footer** — repeat email capture, Maggie once, compact footer.

**Functional behaviour this phase**

- Email capture is real: addresses are validated, stored for the owner to read, duplicates handled gracefully, with a proper success state. No confirmation email is sent.
- "See a sample run" opens the existing mock flow — resume/sample, scouting, sample matches, editable draft, approval — restyled to the new system and still ending on an explicit "nothing was sent" screen.
- The hero approval card, the fact checklist and the approval queue are genuinely interactive.
- "Log in" is presentational.

## User flow

1. Visitor lands on a left-weighted headline with the real product UI already visible beside it.
2. They either drop an email or click "See a sample run".
3. The sample run walks them through scouting, matches, a draft built only from confirmed facts, and the approval gate — ending on the explicit "nothing was sent" screen.
4. Back on the page they scroll the proof of control: comparison, fact checklist, approval queue, follow-ups.
5. The founder note tells them honestly how early this is; the FAQ clears the objections; the final CTA takes the email.

## UI/UX feel

- **Direction**: Reference 2's structure and restraint — off-white canvas, very large tight near-black headlines, heavy whitespace, real product UI floating in space with thin arrows — with ApplyScout orange as the single accent. Nothing from Reference 1's pastel palette, sky gradient or inline emoji headline carries over.
- **Colour**: off-white page, near-black type, two greys, one orange. Orange appears only on the primary button, the hand-drawn underline, the arrows and active states.
- **Motion**: cards settle with staggered delays, arrows draw themselves, reveals differ section to section, every interactive element has a hover state. All text is readable before animation runs, and motion is reduced when the visitor's OS asks for it.
- **Mascot**: Maggie appears three times only — loader, follow-ups, final CTA. Never in the hero, never decorative.
- **Responsive**: designed down to 390px. The product stage collapses to the phone plus two stacked cards, the step sequence goes vertical, nothing essential is hidden.

## Implementation phases

**Phase 1 — built now**
The complete page as described: new visual system, left-weighted hero, interactive product stage, fact checklist, approval queue, founder note, FAQ, final CTA, restyled sample run, working email capture, hand-drawn artwork, favicon and wordmark, full mobile layout.

**Phase 2 — later**
Real resume upload and fact extraction, so the sample run becomes the visitor's own run. Live job sourcing behind the match feed. Real customer quotes and partner logos added once they exist. A first "here are your matches" email to the waitlist.

**Phase 3 — later**
Sign-in, the product app behind the landing page, paid plans and pricing, and measured statistics replacing the honest-claims strip.

## Assumptions

- **Changed from the previous plan:** the placeholder logo row and placeholder testimonial cards are dropped. Visible placeholders are one of the loudest signals that a page was assembled rather than built, and borrowed proof from unknown names does not earn trust anyway. The signed founder note takes their place, and real logos and quotes go in during Phase 2.
- The existing orange and navy brand colours and the fox wordmark are kept; layout, type and composition change completely.
- The founder note is written as placeholder prose with a generic signature, ready for the real text and name to be dropped in.
- Captured emails are stored for the owner to read; no automated email goes out this phase and no email service is set up.
- No pricing appears anywhere; the FAQ answers the cost question honestly as "not set yet".
- Sample companies stay fictitious and are presented as samples.
- Single scroll, no routed sub-pages. English only.
- The earlier peach and dark versions are abandoned; their files stay in the repository untouched but unused.

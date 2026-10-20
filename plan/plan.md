# ApplyScout Landing Page: Clean Orange Redesign ("Jobs find you now")

ApplyScout finds fresh jobs, drafts tailored applications using only your confirmed facts, and waits for your approval before anything is sent.
This redesign follows the latest reference: a clean white page with one strong orange, navy text, a hero built from connected app cards, and heavy, smooth motion.

## Who it's for
Who arrives, and what they need to see before they believe it:
- **Busy professionals (main audience):** they apply in the evenings and are tired of retyping the same answers. They need to see time saved *and* that nothing goes out without their approval.
- **Students and recent grads:** they apply in volume and worry about sounding generic. They need tailored drafts that are clearly their own, in a mature tone.
- **Career switchers:** they worry their experience won't "translate". They need each claim linked back to their real resume.
- **International job seekers:** they apply across many markets. They need structure, consistency and control.

The page earns trust by showing the product working: numbered app cards, a working approval queue, claims linked to their resume source, and a made-up claim being crossed out. It shows no fake logos, user counts, statistics or testimonials.

## Core features and experience
Sections in order. Existing copy stays unless noted below.

1. **Nav:** the new fox logo (left), links (How it works, Why it's safer, Control, FAQ) and an orange "Try it" button (right). The bar turns white with a soft shadow once you scroll.
2. **Hero (reference layout):**
   - **Left side:**
     - A small status pill: "Now in early access".
     - Headline: **"Jobs find you now."** Then, in orange, the line **"Apply to better-fit jobs without spending hours every day."** Lines reveal one by one, each sliding up out of a mask, and a small Maggie peeks into the headline.
     - The supporting text (unchanged), one large orange "Try it" button, and three check points underneath: **Free preview · Nothing sent without approval · No made-up facts.**
   - **Right side:** four numbered app cards linked by animated curved orange arrows, one for each step:
     1. **Find relevant jobs:** three sample roles with match % and tags.
     2. **Tailor your resume:** "Your resume → Tailored for this role" shown as two mini documents.
     3. **Tailored draft:** a sample answer that types itself in, with claims linked to resume lines.
     4. **Ready for your review:** Edit and Approve buttons that work. Approving turns the card green, with Undo.
   - Cards tilt slightly in 3D and follow the mouse; arrows draw themselves in order on load. A soft orange glow sits behind them.
3. **Honest product strip (in place of the logo row and stats):** a row of five short feature points with orange icons, as in the reference:
   - Relevant opportunities
   - Tailored resumes
   - Truth-only answers
   - You approve everything
   - Gmail follow-ups

   This is followed by one slow scrolling text strip in large type.
4. **"Built for" cards:** four audience cards (busy professionals, students and grads, career switchers, international job seekers), each with one line on what ApplyScout does for them.
5. **How it works ("From search to interviews. In five steps."):** a horizontal numbered row with arrows on desktop, as in the reference, and a vertical list on phones. The steps are:
   1. Share your resume
   2. Find fresh jobs
   3. Pick strong matches
   4. Draft tailored applications
   5. You review and approve

   A progress line fills as you scroll.
6. **Phone scene:** a phone showing the ApplyScout app ("My Jobs" with filter chips and a job card), with floating cards ("Upload CV", "Fresh match · 92% fit", "Waiting for your approval") linked by dashed lines that draw themselves as the section scrolls into view. The phone rises with a slight parallax.
7. **Comparison:** manual vs blind auto-apply vs ApplyScout, as three clean white cards. The ApplyScout card is raised with an orange border.
8. **Tailored resume and only-true-facts:** an aligned bento grid of white cards:
   - the sourced answer with highlighted claims
   - the made-up claim crossed out
   - a resume change list (moved / shown / kept)
   - the "We ask. We don't guess." prompt
9. **Approval and control:** the working review queue (approve, skip, pause all, undo, plus keyboard shortcuts), in a large card. Rows animate smoothly when their status changes.
10. **Gmail follow-up:** an inbox thread card with a detected reply and a follow-up draft waiting for approval, plus Maggie's helper bubble.
11. **FAQ:** an accordion beside a small phone mockup of the app. Answers are unchanged.
12. **Final call to action:** "Get your evenings back. Keep the final say." over a soft orange glow, with Maggie peeking over the edge and the "Try it" button.
13. **Footer:** the full logo with the "JOBS FIND YOU NOW" tagline, nav links and © 2026 ApplyScout.

- **"Try it" preview:** the same mock flow (upload or use the sample resume → Maggie scouting → matches and an editable draft → approve, and nothing is sent), restyled in white and orange.
- **Brand:** the fox mark is rebuilt as a clean SVG from the brand sheet (ears, eye, forward path). It is used as the logo, the browser-tab icon and the loader. The wordmark is "Apply" in navy and "Scout" in orange.
- **Maggie:** redrawn in the new orange style. She appears in the loader, peeking into the hero headline, in the preview's scouting step, in the Gmail helper bubble, and in the final call to action.

## User flow
1. A visitor lands, reads "Jobs find you now." and watches the four app cards connect step by step.
2. They see the honest product points and the "Built for" cards, and recognise themselves.
3. They scroll through the five steps, the phone scene, the comparison and the only-true-facts section.
4. They try the approval queue themselves and feel in control.
5. They click "Try it" and run the mock preview: matches, draft, approve.
6. They finish knowing nothing was sent. Sign-in and payment come in a later phase.

## UI/UX feel
- **Style:** clean, confident product marketing as in the reference. White space, crisp white cards with soft shadows, numbered orange badges, curved arrows, and real interface text instead of illustrations.
- **Colours:**
  - White and off-white (#FFFFFF / #FFF7F0) backgrounds.
  - One strong orange (#FF5A1F range, from the brand's #FF6A00 and #FF4500) for buttons, numbers, arrows and headline accents.
  - Deep navy #0B1320 for headings.
  - Grey #6B7280 for body text.
  - Soft orange glows behind key visuals.
  - Green only for approved and verified status; amber and red only for warnings and removed claims.
  - No pastel or sky gradients.
- **Fonts:** a bold, tight geometric sans for headlines (like the reference), a clean sans for body text, and a small monospace for status labels.
- **Motion (heavy but smooth):**
  - Loader: the fox mark draws itself in, then reveals the page.
  - Headline lines slide up out of masks one after another.
  - Hero cards rise in order while the arrows draw between them, and the whole group tilts slightly in 3D with the mouse.
  - The draft types itself in, and status dots pulse.
  - One slow scrolling text strip.
  - The progress line in the steps fills on scroll.
  - Dashed lines in the phone scene draw themselves, and the phone has gentle parallax.
  - Cards lift on hover, and sections fade up as they enter.
  - Smooth momentum scrolling throughout.
  - All text is readable before any animation runs, and motion is reduced for people who turn it off on their device.
- **Mobile:** fully designed for phone width.
  - The hero stacks: text first, then the four numbered cards in a single column with arrows pointing down.
  - The steps become vertical, and the phone scene scales down with the floating cards placed around it.
  - Every section is a single column, with nothing hidden.

## Implementation phases
- **Phase 1 (MVP, built now):** the full redesign above, including:
  - the new SVG logo, favicon and Maggie
  - the hero's connected app cards
  - the honest product strip and the "Built for" cards
  - the phone scene
  - all existing sections restyled
  - the restyled mock preview
  - heavy motion on desktop and phone
- **Phase 2:** a real preview that reads the uploaded resume, extracts facts and builds matches from them, plus an email signup at the end.
- **Phase 3:** sign-in and payment after value is shown, real testimonials and stats once actual users exist, and pricing if wanted.

## Assumptions
- The latest reference sets the colours and layout. The earlier peach, dark and pastel directions are all dropped.
- "Verify work emails" and "Personalised outreach" from the reference are not included, since ApplyScout doesn't offer them.
- The reference's "Trusted by 25,000+", company logos and response stats are left out. The honest product points take their place.
- The hero uses four cards (find, tailor, draft, approve). The "How it works" section keeps the full five steps, with "Share your resume" as step 1.
- The hero eyebrow becomes "Now in early access" instead of the earlier "The smarter way to job hunt without blind auto-apply". That line moves to the "Why ApplyScout" comparison section.
- Sample job cards use fictional companies (Northwind Labs, Halden & Co., Brightloom) with neutral initial-letter icons and no salaries. Each is labelled as a sample.
- Other copy, including the FAQ answers and "the preview is free, pricing later", stays as written.
- The "Try it" preview remains a mock with sample data in this phase.
- There is a single light theme with no dark mode toggle.

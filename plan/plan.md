# ApplyScout v4: Conversion Revamp ("Find my jobs" to paywall)

A rewrite of the landing page and the "Find my jobs" flow so more visitors start the flow and reach the paywall.
It earns trust with live data and honest product promises instead of testimonials, so nothing looks fake.

## Who it's for
- Job seekers who land on the page cold and are wary of auto-apply tools, fake reviews and hidden catches.
- The ApplyScout team, who need to see where visitors drop off on the way to the paywall.

## Core features and experience

### 1. One goal, one button
- The main action everywhere is **"Find my jobs — free"**:
  - nav
  - hero
  - live job cards
  - role search
  - final section
  - a sticky bar on mobile
- Each entry point carries what the visitor already chose into the flow, so they skip steps:
  - a job title typed into the role search
  - the region picked
  - a job card clicked, as "Find jobs like this"
- The early-access email box becomes secondary: "Not job hunting yet? Get updates."
- Under every main button, one reassurance line: **"No sign-up · about 2 minutes · nothing is sent without your OK"**.

### 2. Rewritten headline and copy
- **Hero.** The look stays the same, but the words change:
  - Headline: **"Get interviews 🦊, not just applications."**
  - Sub-line: **"Upload your resume. See today's live roles that fit you, and a ready email to the hiring manager, in about 2 minutes."**
  - Buttons:
    - **Find my jobs — free** (main)
    - **Upload resume** (secondary): opens a file picker and jumps straight to the reading step
- **Other section headlines**, each with at most one supporting line:
  - Live jobs: "Real roles posted this week. Pick one and Maggie writes to the person hiring."
  - How it works: "Resume in. Interview out." (kept)
  - Compare: "Why other tools don't get you interviews." (kept)
  - Trust: "What ApplyScout will never do."
  - FAQ: "Straight answers." (kept), with new questions about whether it's real, what it costs and whether it's safe
  - Final section: **"Your next interview starts with one good email."**, then "Find my jobs — free"
- The tone throughout is plain, specific and free of hype. No invented numbers.

### 3. Trust without testimonials
- **Live proof strip** under the hero, built from real numbers that refresh hourly. For example: "**1,284 fresh roles** from **43 companies** this week · updated hourly".
- **"What ApplyScout will never do"**, a 4-item row:
  - Never sends without your OK
  - Never invents experience
  - Never logs into LinkedIn for you
  - Never keeps your resume file
- **Honest early-access label** in the hero area: "Early access · the payment and sending steps are a preview." It is small and calm.
- **Things removed because they can read as fake:**
  - The stock-face avatar cluster in the hero. Real company logos replace it.
  - The "Log in" link in the nav, which leads nowhere.
  - Any copy implying an existing user base.

### 4. Shorter page, clearer order
New section order:
1. Hero
2. Live proof strip
3. Live jobs, with search and a "Find jobs like this" option on each card
4. Logo strip
5. How it works, in motion
6. Compare flip cards
7. "Never do" trust row
8. FAQ
9. Final section

Two other changes:
- The side-by-side table is folded into the Compare section behind a "See full comparison" toggle. This removes a long, repeated section.
- The "volume vs fit" visual stays inside Compare.

### 5. Flow improvements so more people reach the paywall
- **Step counter and time:** "Step 2 of 6 · about 1 minute left".
- **Resume wait (about 20 s):** this step stays engaging. Rotating live jobs and short Maggie lines show progress, not a frozen spinner.
- **Results screen:** shows the real counts plus the **top 3 job cards right away**, so there's no extra "See my top 3" tap.
- **Soft email step after matches:**
  - A card reads "Save these matches and get tomorrow's fresh ones", with an email field and a clear **"Skip for now"**.
  - Skipping never blocks the path to the paywall.
  - Saved emails join the real early-access list (source "flow") and count for invite rewards.
- **Less friction:**
  - Facts confirmation is a single compact screen.
  - The draft appears line by line as now.
  - The "Send" button reads **"Send to Priya"**.
- **Leave protection:** tapping × or Back mid-flow shows a small sheet: "Leave now? Your matches will be lost. Save them by email." It offers **Save & leave**, **Stay** or **Leave anyway**.
- **Paywall copy, value first:**
  - "Your email to Priya Sharma, Hiring Manager is ready."
  - What's unlocked: sending from your Gmail, fresh matches each morning, and Pause/Undo
  - "Cancel anytime · nothing sends without your OK"
  - Price shown only here, as now.
  - If they close it, a **"Not now: email me this draft"** option captures the email if it wasn't given earlier. The draft is not actually emailed and the screen says so.

### 6. Conversion funnel tracking (real)
- Every key step is recorded anonymously:
  - landing view
  - any "Find my jobs" click, with which button
  - flow started (resume or typed)
  - resume read OK or failed
  - matches shown
  - email saved or skipped
  - job picked
  - draft shown
  - **paywall reached**
  - payment method tapped
  - left mid-flow, with the step
- A private **funnel page** shows each step's count and its drop-off. It opens only with a secret link.

## User flow
1. A visitor lands, reads "Get interviews, not just applications.", sees live proof and real logos.
2. They tap **Find my jobs — free**, or **Upload resume**, or a live job card, or the role search.
3. Step 1 of 6: upload a resume or type 3 fields (pre-filled if they came from search).
4. Step 2: the live search runs and real counts appear with the top 3 jobs.
5. A soft "Save these matches" email card appears. They save or skip.
6. Step 3: pick a job. Step 4: confirm facts. Step 5: the draft writes itself.
7. Step 6: they tap **Send to Priya**. The **paywall is reached** (the conversion).
8. The mock payment and the rest of the demo continue as today.

## UI/UX feel
- Same peach brand, clay fox, rounded cards and calm motion.
- Fewer words per screen, with one clear main button at a time.
- Honest small print where things are previews.
- On mobile, a sticky "Find my jobs — free" bar appears after the hero. It hides inside the flow and near the final section.

## Implementation phases

**Phase 1, MVP (built now)**
- The single main button across the page with carried-over choices, plus the reassurance line
- Rewritten hero and section copy, and the hero "Upload resume" shortcut
- Live proof strip, the "never do" row, the early-access label, and removal of the fake-looking parts
- Page reorder, with the comparison table folded into Compare, and new FAQ answers
- Flow upgrades:
  - step counter
  - engaging resume wait
  - top 3 jobs on the results screen
  - soft email step
  - leave protection
  - "Send to Priya"
  - value-first paywall copy with the "email me this draft" fallback
- Anonymous funnel tracking and a private funnel page

**Phase 2**
- A/B tests of headline, sub-line and button wording, measured on paywall reach
- Real payments, real accounts and real Gmail sending
- Real early-user quotes added once collected, with permission

**Phase 3**
- Region-specific landing versions (India, US, Europe)
- Job alerts and follow-up emails for people who saved matches
- Real measured results, such as reply rate, shown on the page once there is enough data

## Assumptions
- Conversion means **reaching the paywall**. Email signup is a helpful extra, not the goal.
- The email ask comes **after matches as a soft, skippable step**. It captures leads without blocking anyone on the way to the paywall.
- The team stays anonymous. There are no testimonials, no founder note and no invented numbers. Every number shown is real (the live job counts) or clearly labelled as a sample.
- The price stays hidden until the paywall.
- The hero keeps its layout, sky, fox and motion. Only words, buttons and the avatar-to-logo swap change.
- The comparison flip cards and the table both stay. The table moves behind a toggle to shorten the page.
- Funnel tracking is anonymous. It stores no names or emails with events and uses no third-party analytics. The funnel page is protected by a secret link.
- The "email me this draft" fallback only saves the address. No email is actually sent, and the screen says so.
- Payment, the account email, Gmail and sending remain mock screens, as in v3.

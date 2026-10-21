# ApplyScout v3: "Find my jobs" sign-up flow (clickable mockup) + Invite Rewards

A guided, step-by-step flow led by Maggie the fox. It takes a visitor from "Find my jobs" to an approved email for a real live job, with no account needed until the paywall.
Payment, account email, Gmail and sending are realistic mock screens. Resume reading, job matching, invite links and list positions are real.

## Who it's for
- Job seekers on the landing page who want to see, in a couple of minutes, exactly what ApplyScout would send and to whom.
- The ApplyScout team, who need a believable, clickable demo of the full paid journey before building payments and Gmail sending.
- Early-access signups, who can move up the waiting list by inviting friends.

## Core features and experience

**0. Quick fix: hero fox fits its chip**
- The waving fox next to "Get interviews" is currently zoomed in and cropped. It will be scaled so the whole head and the waving paw sit neatly inside the rounded chip. The wave animation stays.

**1. Start**
- The hero's main button becomes **"Find my jobs"**. It opens the flow on its own page with a progress bar, a Back button and an exit (×).
- No account and no email are asked at this point.
- Maggie, the clay fox, appears on every step with one short line of speech, for example "Let's find you some interviews."

**2. About you: two paths**
- **Upload a resume** (PDF, Word or text, up to 5 MB). AI actually reads it and pulls out the job title, years of experience, locations and 2–3 key facts, such as achievements or skills.
- **Or type three fields:** job title, years of experience, and locations (multi-select chips, e.g. Bengaluru, Remote, London).
- If the resume can't be read, Maggie says so and offers the three-field path. Nothing is invented.

**3. Search: about 20 seconds of real progress**
- Animated steps tick off one by one: **Reading your resume → Matching roles → Finding people → Ranking best fits**.
- Behind it, the live job feed is really searched for the person's title and locations.
- The result screen shows **real match counts**, for example "38 matches". The "people" count is a sample estimate and is labelled as such.
- If nothing matches, the search widens automatically: related titles first, then Remote. Maggie explains what changed.

**4. Pick a job**
- Three real job cards are fully visible, each with:
  - company logo, role, location and days since posting
  - a link to the real posting
- Each card shows 1–2 people to reach, with name, role and avatar. Their emails are masked, e.g. `p•••••@stripe.com`.
- These people are **sample people** and a small "demo" tag says so. They are not real employees.
- Tapping a card selects it.

**5. Confirm facts**
- **Resume path:** 2–3 extracted facts appear as editable chips. The person ticks the ones that are true and can edit any text. Only ticked facts go forward.
- **Three-field path:** only title, years and locations are used, shown as locked chips.
- Maggie: "I'll only use what you tick."

**6. Draft**
- Maggie writes a short email to the selected person about that job, live on screen, line by line.
- **Every line carries a coloured tag** linking it to the fact it came from. Hovering or tapping a tag highlights the matching fact chip.
- Lines with no supporting fact are never written.
- A clear banner: **"Nothing is sent."** The person can regenerate the draft or edit the text.

**7. Send → paywall**
- Tapping **Send** opens a paywall sheet over the draft (the draft stays visible, blurred behind): **"Your email to Priya Sharma, Hiring Manager is ready."**
- One plan, with the price in the visitor's local currency based on their browser region:
  - ₹499 / month in India
  - $9 / month in the US
  - €9 / month in Europe
  - £8 / month in the UK
  - USD elsewhere
- It lists 3 short benefits and "Cancel anytime".

**8. Pay (mock)**
- Payment buttons: **Apple Pay, Google Pay, UPI, Card**. The order changes by region, with UPI first in India.
- Each shows a short, realistic confirm sheet. Card opens a card form, and UPI shows a UPI ID field and a QR placeholder.
- No money moves.
- A success screen follows: "Payment received. We've emailed you a sign-in link." It shows a mock inbox preview of the magic-link email ("Your ApplyScout account is ready").
- **Continue** acts as clicking the magic link and brings them back, now "signed in" with an initial avatar in the top bar.

**9. Connect Gmail (mock)**
- A realistic Google-style permission screen: "ApplyScout wants to: Send email on your behalf". The person taps **Allow**.
- The masked address animates to the full address. It is still a sample address.

**10. Approve and send (mock)**
- A final review of the draft, with editable subject and body, the fact tags, and To / From. From is the person's "Gmail".
- Tapping **Approve** shows a send animation (paper plane), then proof that it went out:
  - "Sent from your Gmail"
  - a timestamp
  - a "Sent" folder preview card
  - a message reference
- **Pause** and **Undo** stay visible. Undo counts down for 30 seconds and returns the email to draft. Pause stops any further sends.
- Maggie celebrates with the cheering fox and confetti.
- A final screen offers **"Pick another job"**, back to step 4 with the next matches, or **"Back to home"**.

**11. Invite Rewards (real)**
- Every early-access signup gets a **personal invite link**.
- **Each friend who joins through that link moves the inviter up 10 spots**. The minimum is #1.
- The share card after signup:
  - shows the personal link and "Friends joined: 0"
  - says "Each friend moves you up 10 spots"
  - updates the position when they return
  - uses the personal link in Copy, Share, WhatsApp, X, LinkedIn and the downloadable image
- Visiting the site with an invite link shows a small banner: "Your friend invited you. Join early access and you'll both move up." Only the inviter moves up.
- Signing up again with the same email or reopening the invite link shows the current position and the friends-joined count.
- Self-invites and repeat signups don't count.

## User flow
1. Landing page → **Find my jobs**
2. About you: upload a resume, or type title, years and locations
3. Search progress, about 20 seconds → real match counts
4. Pick one of three real jobs, with sample people and masked emails
5. Confirm facts: tick and edit on the resume path, locked on the three-field path
6. Maggie's draft, each line tagged to its fact. Nothing is sent.
7. Send → paywall: "Your email to [name, role] is ready."
8. Mock payment → mock magic-link email → "signed in"
9. Mock Gmail permission → the email address unmasks
10. Approve → mock "sent" proof, with Pause and Undo → celebrate → next job

Separately: early-access signup → personal invite link → friends join → the inviter moves up 10 spots each.

## UI/UX feel
- Same peach brand, rounded cards, clay fox and calm springy motion as the landing page.
- One decision per screen, with large touch targets. Built mobile-first and comfortable on desktop.
- Maggie's lines are short and friendly. Progress steps feel real and calm, with no fake "hacking" effects.
- Mock steps look real but are honest: a small "Demo: no payment / no email is sent" note on the paywall, Gmail and send screens.
- "Reduce motion" is respected.

## Implementation phases

**Phase 1, MVP (built now)**
- Hero fox fit fix
- The full 10-step flow as a polished clickable mockup:
  - real AI resume reading
  - real live-job matching and counts
  - AI draft using only confirmed facts, with line-to-fact tags
  - sample people with masked emails
  - mock paywall, payment, magic-link, Gmail permission and send proof, with Pause and Undo
- Region-based local price display
- Invite Rewards (real): personal links, +10 spots per friend, live position on the share card, invite banner

**Phase 2**
- Real payments (Stripe or Razorpay with Apple Pay, Google Pay and UPI) and real accounts with magic-link email
- Real Gmail connection and sending from the user's own account, with Pause and Undo
- Real contact finding for hiring managers

**Phase 3**
- Multi-job queues, follow-ups and reply tracking
- Saved profiles and job alerts
- An invite leaderboard and rewards beyond list position

## Assumptions
- Resume reading and draft writing use the Gemini model that can read uploaded files (gemini-3.1-pro-preview) through the built-in Emergent AI key, so no key is needed from you. AI usage draws on that key's balance.
- Uploaded resumes are used only for that session's reading. They aren't stored after the facts are extracted, and nothing is linked to an email unless the person joins.
- "Real counts" means real live postings matching title and location from the existing job feed. The "people" count is a sample estimate and is labelled as such.
- People to reach are sample names and roles, clearly tagged "demo". Their full email shown after "Connect Gmail" is also a sample.
- Pricing defaults are ₹499 / $9 / €9 / £8 per month, picked from the browser's region with no location lookup. The amounts are easy to change later.
- Nothing in payment, the account email, Gmail or sending really happens. Every mock screen says so in a small note.
- The flow lives on its own page that the hero button opens. The landing page's other sections stay unchanged apart from the hero button label and the fox fit fix.
- Invite Rewards: +10 spots per friend who joins with a new email through the link. The inviter's position never goes below #1. There are no other rewards. The person invited doesn't move up.
- The flow can be restarted anytime. Progress isn't saved across visits, except the mock "signed in" state, which lasts for the current visit.

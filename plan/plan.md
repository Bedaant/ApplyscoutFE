# ApplyScout Landing Page v2: Interviews, Not Applications

ApplyScout's landing page, rebuilt around what job seekers actually want, which is interviews rather than more applications to fill in. The hero you liked stays. Everything below it moves from paragraphs to motion, real companies and a side-by-side comparison with the tools people complain about.

## Who it's for
- Job seekers in India, the US, Europe and remote roles worldwide who have tried mass-apply bots, paid job-portal boosts or resume tools and got few or no callbacks.
- The ApplyScout team, who need the page to be honest now and easy to update with real quotes and logos later.

## Core features and experience

**1. Hero (kept as is)**
- The sky gradient, clouds, floating tiles, fox sticker, avatar cluster, pill buttons and entrance motion all stay exactly as they are now.
- Only the headline and sub-line wording change. The current line ("Fresh jobs drafted for you, sent only when you say yes") describes a feature, not the user's goal. New direction: *"Get interviews 🦊 not just applications 👥 sent."* The sub-line is cut to one short line about fewer, better-fit applications written from your own facts.

**2. Live job cards with real companies and logos**
- The fanned card deck shows real, current postings with each company's real logo, role, city or remote tag, and how many days ago it was posted. Each card opens the original posting.
- **Source A, active from day one:** public career pages of a fixed list of about 25 well-known companies hiring across India, the US, Europe and remote (for example Stripe, Figma, Notion, GitLab, Cloudflare, Razorpay, Postman, Canva). No account needed.
- **Source B, a broad job search service:** adds wider roles and cities in about 19 countries, including India, the US, the UK and most of Europe. It needs a free app ID and app key from developer.adzuna.com. It stays switched off until those are supplied. When it's on, the cards show the small "Jobs by Adzuna" credit that the service requires.
- A region switcher (All · India · Remote · US · Europe) re-deals the cards with a shuffle animation.
- If a source is down, the cards quietly show the last saved postings. They never show invented companies.
- The working Approve → "Queued, not sent" → Undo action on the centre card stays.

**3. Logo strip: "Fresh roles from teams like"**
- A slow, endless marquee of the real company logos the cards pull from. It pauses on hover. The wording makes clear these are sources of postings, not customers.

**4. Story told in motion instead of text**
A scroll-driven sequence replaces most of the current paragraphs. Each beat has a short caption of up to 8 words:
1. A resume drops in and breaks into fact chips, which lock with a ✓.
2. Job cards stream past and the poor fits get filtered out.
3. A draft writes itself, and each sentence links back to the fact it came from.
4. A big "Approve?" button gets pressed by a cursor.
5. A calendar invite pops up: "Interview · Tue 11:00".

Supporting custom visuals are generated in the same 3D clay style as the fox mascot: the fox sorting cards, the fox with a magnifier over a resume, and a calendar-invite scene.

**5. "Why other tools don't get you interviews" comparison**
- Competitors are described by type, never named: mass auto-apply bots, AI resume writers, paid job-portal boosts, resume-tailoring tools.
- Each row is a user complaint shown as an animated card that flips from the problem to ApplyScout's answer:

| What users complain about | How ApplyScout answers it |
|---|---|
| Blank or wrong form fields, applications that never submit | You see every field filled in before anything goes out |
| AI makes up job titles, experience or personal details | Only uses facts you confirmed; every sentence links to its fact |
| "1,000 applications, 0 callbacks" | Fewer, higher-fit applications aimed at interviews |
| Support that never answers | A named person replies to early-access users |
| Shutdowns that lock you out; platform bans on automation | Export your history any time; no logging into LinkedIn for you |
| Paid "priority" boosts that bring no calls | No paid boosts, no fake "priority applicant" badges |
| Cover letters that read as robotic | Written from your own words and tone |
| Recruiters buried in AI spam | Every application is one a recruiter would want to read |

- An animated "volume vs fit" visual sits beside it: a pile of 100 grey envelopes leading to one reply, next to a few chosen cards leading to interviews. It's labelled *illustrative, not measured data*.

**6. Sliding quote carousel (two tracks, with dots)**
- **"What job seekers say about other tools":** short public complaints, each with the place it was said, such as a review site or forum, and a link where one exists. Where no direct quote can be linked, the card is marked "summary of public reviews". Tools are not named.
- **"What early users tell us":** sample quotes, each clearly tagged **SAMPLE**, ready to swap for real ones.
- Auto-slides, pauses on hover, can be swiped on mobile, and has clickable dots.

**7. Colour swap: Sky vs Peach**
- A small floating toggle switches the whole page between the current sky-blue palette and a new warm peach-and-cream sky. The clouds, gradients, cards and buttons recolour with a smooth cross-fade, so both can be compared on the same page.

**8. Kept from today, trimmed**
- FAQ accordion with the phone mock, "See a sample run" dialog, final call-to-action with real email capture, and footer. Copy in each is cut to a headline plus at most one line.

## User flow
1. A visitor lands on the unchanged hero, now promising interviews.
2. They scroll and watch real job cards with real logos deal in. They can switch region, open a real posting, or try Approve and Undo.
3. They pass the logo marquee.
4. The motion story plays from resume to interview invite, with almost no reading needed.
5. The comparison cards flip from each competitor complaint to the fix.
6. The quote carousel slides by.
7. In the FAQ they can open the sample run.
8. They join early access with their email.
9. At any point, the colour toggle switches between Sky and Peach.

## UI/UX feel
- The playful Hirablee-inspired style stays the same: rounded panels, pastel cards, pill buttons and the fox mascot.
- Motion should feel premium and calm:
  - spring-based card dealing
  - scroll-linked story beats
  - flip cards
  - magnetic buttons
  - soft parallax on clouds and illustrations
- Text-light: one idea per screen, captions over paragraphs.
- Motion respects the "reduce motion" setting, and the page stays smooth on phones.

## Implementation phases
**Phase 1, MVP (built now, landing page only)**
- Hero headline and sub-line rewrite only
- Live job cards from company career pages, with real logos and the region switcher
- The broad search service wired in but switched off until its key is supplied
- "Fresh roles from teams like" logo marquee
- Scroll motion story with generated clay-style illustrations
- Competitor-type comparison with flip cards and the illustrative volume-vs-fit visual
- Two-track quote carousel with dots
- Sky/Peach palette toggle
- Copy trimmed across all remaining sections

**Phase 2**
- Switch on the broad search service once the Adzuna ID and key are provided
- Swap SAMPLE quotes for real early-user quotes
- Keep one palette and remove the toggle
- Move to a "trusted by" wording only if real customer companies exist

**Phase 3**
- Region-specific versions of the page (India, US, Europe) with local roles and wording
- Measured results, such as the real interview rate of early users, replacing the illustrative visuals

## Assumptions
- "Don't change the hero" means the look, layout and motion stay identical. Only the headline and sub-line words change, to fix the "interviews, not applications" problem you raised.
- The landing page is the whole scope. There's no sign-in, no product app and no real applying.
- The company list for career-page postings is chosen for well-known brands with roles in India, the US, Europe and remote. It can be edited later.
- Logos come from each company's own website. If one can't load, a lettered badge replaces it.
- Job postings refresh about every hour. Only postings from the last 14 days are shown, which matches the existing freshness rule.
- The broad search service is built but hidden until the key is supplied. The page works fully without it.
- Competitors are never named, and public complaints are shown without tool names. The figures you shared ("5,000 applications, 5 interviews", "1 interview per 50 applications") appear only as attributed, illustrative examples.
- The ApplyScout answers in the comparison, such as a named person replying, history export and no LinkedIn logins, are stated as commitments.
- The "volume vs fit" visual is marked illustrative. No invented user counts or success rates appear anywhere.
- Email capture stays as it is: addresses are stored, and no emails are sent.
- Illustrations are newly generated to match the existing fox mascot style.

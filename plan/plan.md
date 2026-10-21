# ApplyScout Landing Page v2.4: Livelier Cards, Smoother Page, Animated Fox

Three improvements to the existing peach landing page:
- The answer side of each comparison card gets its own picture.
- The whole page runs smoothly, especially on phones.
- The fox in the logo comes alive.

## Who it's for
- Job seekers visiting the ApplyScout landing page, many of them on phones.
- The ApplyScout team, who want the page to feel premium, never laggy.

## Core features and experience

**1. Comparison cards: a picture on the answer side**
- Each of the 8 cards keeps its current front: a drawing of the problem plus the complaint.
- When the card flips to the orange answer side, it shows a **fixed version of the same drawing**:

| Front (problem) | Back (fixed) |
|---|---|
| Broken form with blank fields | Neat, filled form with a green tick |
| Resume with a question mark and mask | Resume with check-marked fact chips |
| Pile of envelopes, empty mailbox | A few envelopes and a mailbox with a reply flag up |
| Chat bubble with hourglass | Chat bubble with a reply and a smiling face |
| Laptop with a padlock | Laptop with an export or download arrow, padlock open |
| Crown with a price tag | Plain badge, price tag crossed out |
| Robot at a typewriter | A person writing with a pen, warm and human |
| Desk buried in papers | A tidy desk with one standout application |

- The new drawings use the same flat 2D peach, coral, cream and navy style.
- The picture pops in with a small bounce as the card flips, so the flip feels like a reveal.
- The answer text gets slightly less space, and the picture sits above it.

**2. Smooth everywhere, especially on phones**
- Scrolling should feel native and never stutter, on desktop and on mid-range phones.
- **On phones, heavier effects are simplified, and on desktop they stay the same.** On phones:
  - The phone's own normal scrolling replaces the custom smooth-scroll effect.
  - The "How it works" story stays as stacked steps. Each one plays once when it scrolls into view, and they never all run at the same time.
  - Blur, large soft shadows and parallax are softened or removed.
  - The logo strip, floating hero tiles and clouds use lighter motion.
- Animations pause when they are off-screen, including the logo marquee, floating tiles, carousel and pulsing buttons.
- Images are compressed and sized for phones, and pictures below the fold load only when needed.
- The "reduce motion" phone setting is still respected: it gives a calm, still version of the page.

**3. Animated logo fox**
- The logo is redrawn as a layered vector that closely matches the current fox-in-a-speech-bubble icon. This lets parts of it move.
- **On page load,** the fox blinks once.
- **While the page is open,** a gentle blink repeats every few seconds.
- **On hover** (or a tap on phones), the ears twitch and the bubble gives a tiny bounce.
- The same animated logo is used in the top bar and footer. The browser-tab icon stays still.

## User flow
1. A visitor opens the page and the fox in the logo blinks.
2. They scroll smoothly through the hero, the live job cards and the rest of the page, with no stutter on phone or desktop.
3. On the comparison cards, hovering on desktop or tapping on mobile flips each card from the problem drawing to its fixed drawing and ApplyScout's answer.
4. Hovering or tapping the logo makes the fox twitch its ears.

## UI/UX feel
- The look stays the same: warm peach, rounded cards, flat 2D drawings and the clay fox mascot.
- Motion is calm and premium: small springs, short pop-ins, no long or jumpy effects.
- Phones feel light and fast, and desktop keeps the richer motion.

## Implementation phases
**Phase 1, MVP (built now)**
- 8 new "fixed" drawings on the answer side of the comparison cards, with a pop-in on flip
- A performance pass across the whole page, with lighter motion on phones and off-screen animations paused
- Animated logo: blink on load, a repeating gentle blink, ear twitch on hover or tap

**Phase 2**
- The fox mascot appears in more places with small reactions, such as celebrating when someone joins early access
- A per-device motion check with real phones, plus fine-tuning

**Phase 3**
- Animated drawings, where the fixed scene plays as a short loop instead of a still picture
- A full animated brand kit, such as a loading screen fox and favicon variants

## Assumptions
- The phone question was skipped, so the default applies: effects that would stutter are simplified on phones and kept on desktop.
- The logo question was skipped, so the default applies: blink on load, a repeating blink every few seconds, and an ear twitch on hover or tap.
- The redrawn vector logo will look very close to the current icon, but small shape differences are possible.
- The browser-tab icon stays the current still image.
- The card fronts, all wording and every section's content stay as they are.
- The "fixed" drawings are newly generated in the same flat style as the fronts.
- "Smooth" means no visible stutter while scrolling on a typical mid-range phone. No measured speed targets are promised.

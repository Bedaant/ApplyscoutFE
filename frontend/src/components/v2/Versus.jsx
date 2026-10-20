import { Reveal } from "./Motion";
import { HandRule } from "./Hand";

const BLIND = [
  "Sends hundreds of applications you never read, under your name.",
  "Fills gaps with experience you don't have, because a complete answer scores better.",
  "Hits companies you'd never work for, and burns the ones you would.",
  "Tells you how many it sent. Not what any of them said.",
];

const OURS = [
  "Drafts the application and stops. The send button is yours.",
  "Writes only from facts you ticked, and shows which line each sentence came from.",
  "Lets you block companies by name before the first match arrives.",
  "Shows every reply in your own inbox, so the thread stays yours.",
];

export const Versus = () => (
  <section className="px-5 py-16 lg:px-8 lg:py-28" data-testid="versus">
    <div className="mx-auto max-w-[1040px]">
      <Reveal kind="rise" className="max-w-2xl">
        <h2 className="font-display text-[2rem] font-bold leading-[1.03] tight sm:text-[2.8rem]">
          “Isn't this just a bot that spams my name everywhere?”
        </h2>
        <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ash">
          No, and the difference matters enough to spell out side by side.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal kind="fade" delay={0.1}>
          <p className="label">Blind auto-apply</p>
          <HandRule className="mt-3 h-2 w-full" />
          <ul className="mt-5 space-y-5">
            {BLIND.map((t) => (
              <li key={t} className="text-[0.98rem] leading-[1.7] text-ash">{t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal kind="fade" delay={0.22}>
          <p className="label text-brand">ApplyScout</p>
          <HandRule className="mt-3 h-2 w-full" />
          <ul className="mt-5 space-y-5">
            {OURS.map((t) => (
              <li key={t} className="text-[0.98rem] leading-[1.7] text-coal">{t}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

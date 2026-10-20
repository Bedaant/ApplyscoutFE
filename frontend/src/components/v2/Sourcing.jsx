import { Reveal } from "./Motion";

const ROWS = [
  {
    h: "Where the jobs come from",
    p: "Company career pages and the public boards, read fresh each morning. Anything posted more than 14 days ago is left out — by then it's usually filled, and applying to it is the main way people waste a week.",
    note: "sources: careers pages, public boards",
  },
  {
    h: "How a match gets decided",
    p: "The posting is read for title, tools, years asked for and location. That's compared against the facts you confirmed. Every match shows the two or three things it matched on and the one thing it's short on, so you can argue with it.",
    note: "every match shows its reasoning",
  },
  {
    h: "What it will not do",
    p: "It will not apply in the background while you sleep. It will not write a line of experience you never claimed. It will not email a recruiter under your name, and it will not keep sending once you've paused it.",
    note: "four hard limits",
  },
];

export const Sourcing = () => (
  <section id="limits" className="scroll-mt-20 border-y border-line bg-sheet px-5 py-16 lg:px-8 lg:py-24" data-testid="sourcing">
    <div className="mx-auto max-w-[1180px]">
      <Reveal kind="slide" className="max-w-xl">
        <h2 className="font-display text-[1.9rem] font-bold leading-[1.05] tight sm:text-[2.4rem]">
          Before anything else, the boring part.
        </h2>
        <p className="mt-3 text-[1rem] leading-relaxed text-ash">
          Most tools in this category are vague about this on purpose. Here it is in plain words.
        </p>
      </Reveal>

      <div className="mt-12">
        {ROWS.map((r, i) => (
          <Reveal key={r.h} kind="fade" delay={i * 0.08}
            className="grid gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-8 md:py-9">
            <div className="md:col-span-4">
              <h3 className="font-display text-[1.15rem] font-bold tight md:text-[1.3rem]">{r.h}</h3>
              <p className="label mt-2 text-[10px]">{r.note}</p>
            </div>
            <p className="text-[1rem] leading-[1.75] text-ash md:col-span-8 md:text-[1.05rem]">{r.p}</p>
          </Reveal>
        ))}
        <div className="border-t border-line" />
      </div>
    </div>
  </section>
);

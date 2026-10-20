import { Reveal } from "./Bits";

const STEPS = [
  { n: "01", bg: "bg-lilac", t: "Tell us what's true, once", p: "Upload the resume, then strike anything the facts list got wrong. That list is the only thing we're allowed to write from.", chip: "4 facts confirmed · 1 struck out" },
  { n: "02", bg: "bg-peach2", t: "Set the rules of the search", p: "Titles you'd take, where you'll work, the salary you won't go under, companies you never want to hear from.", chip: "Remote · Europe · £58k floor · 3 blocked" },
  { n: "03", bg: "bg-mint", t: "Wake up to the morning list", p: "Rebuilt each day from what went live overnight. Four or five worth reading, not forty worth scrolling.", chip: "Tue 14 · 7:02 am · 4 new" },
  { n: "04", bg: "bg-rose", t: "Read the draft that came with it", p: "Resume reordered for that posting, open questions answered in your own words, every sentence traced to a line you ticked.", chip: "source: resume · role 2, lines 3–4" },
  { n: "05", bg: "bg-aqua", t: "Approve, edit or skip", p: "A second, a minute, or a swipe away. Until you choose one of the three, nothing moves anywhere.", chip: "approve · edit · skip · pause all" },
];

export const Steps = () => (
  <section id="how" className="scroll-mt-28 px-3 py-14 sm:px-5 md:py-20" data-testid="steps">
    <div className="mx-auto max-w-[1000px]">
      <Reveal className="mx-auto max-w-[38rem] text-center">
        <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-[#3B6FE0]">How it works</p>
        <h2 className="font-display mt-3 text-[2rem] leading-[1.08] text-ink sm:text-[2.6rem]">
          Five steps, and you only do two of them.
        </h2>
      </Reveal>

      <ol className="mt-12 space-y-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <li className="white-card flex flex-col gap-4 p-5 md:flex-row md:items-center md:gap-7 md:p-6" data-testid={`step-${s.n}`}>
              <span className={`${s.bg} font-display grid h-14 w-14 shrink-0 place-items-center rounded-[18px] text-[1.15rem] text-ink`}>
                {s.n}
              </span>
              <div className="md:flex-1">
                <h3 className="font-display text-[1.25rem] leading-tight text-ink md:text-[1.4rem]">{s.t}</h3>
                <p className="mt-1.5 max-w-[34rem] text-[0.95rem] leading-relaxed text-slate">{s.p}</p>
              </div>
              <p className="shrink-0 rounded-full bg-[#F2F7FF] px-4 py-2 font-mono text-[11px] text-slate">{s.chip}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

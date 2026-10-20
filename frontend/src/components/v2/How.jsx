import { Reveal } from "./Motion";
import { FragFacts, FragRules, FragFeed, FragDraft, FragQueue } from "./HowFragments";

const STEPS = [
  {
    n: "01",
    t: "You tell us what's true, once",
    p: "Paste or upload the resume, then go through the facts it pulled out and strike anything that isn't right. This list is the only thing we're allowed to write from.",
    frag: <FragFacts />,
    span: "md:col-span-6",
  },
  {
    n: "02",
    t: "You set the rules of the search",
    p: "Titles you'd take, where you'll work, the salary you won't go under, and the companies you don't want to hear about. Change any of it and tomorrow's list changes.",
    frag: <FragRules />,
    span: "md:col-span-7",
  },
  {
    n: "03",
    t: "New postings arrive before you're up",
    p: "Each morning the list is rebuilt from what went live overnight. Old reposts are dropped. You get four or five worth reading, not forty.",
    frag: <FragFeed />,
    span: "md:col-span-6",
  },
  {
    n: "04",
    t: "Each one comes with a draft attached",
    p: "The resume is reordered for that posting and the open questions are answered in your own words, drawn from your facts. Anything it can't trace to a confirmed line gets cut, and it tells you what it cut.",
    frag: <FragDraft />,
    span: "md:col-span-7",
  },
  {
    n: "05",
    t: "You approve, edit or skip",
    p: "Approving takes a second. Editing takes a minute. Skipping teaches it what you don't want. Until you do one of the three, nothing moves.",
    frag: <FragQueue />,
    span: "md:col-span-6",
  },
];

export const How = () => (
  <section id="how" className="scroll-mt-20 border-t border-line bg-sheet px-5 py-16 lg:px-8 lg:py-28" data-testid="how">
    <div className="mx-auto max-w-[1180px]">
      <Reveal kind="rise" className="max-w-2xl">
        <p className="label">Five steps, start to finish</p>
        <h2 className="font-display mt-4 text-[2rem] font-bold leading-[1.03] tight sm:text-[2.9rem]">
          What actually happens after you sign up.
        </h2>
      </Reveal>

      <div className="relative mt-14">
        {/* the sequence line, drawn by hand */}
        <svg className="pointer-events-none absolute left-[11px] top-2 hidden h-full w-6 md:block" viewBox="0 0 24 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M12 0 C 18 120, 6 240, 12 360 C 18 480, 7 600, 12 720 C 17 840, 9 930, 12 1000"
            fill="none" stroke="#111110" strokeWidth="1.3" opacity="0.2" strokeLinecap="round" />
        </svg>

        <ol className="space-y-14 md:space-y-20">
          {STEPS.map((s, i) => (
            <li key={s.n} className="relative md:pl-16">
              <span className="font-mono absolute left-0 top-1 hidden h-6 w-6 place-items-center rounded-full border border-line bg-sheet text-[10.5px] text-ash md:grid">
                {s.n}
              </span>
              <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                <Reveal kind="slide" className="md:col-span-5">
                  <p className="label md:hidden">Step {s.n}</p>
                  <h3 className="font-display mt-2 text-[1.35rem] font-bold leading-tight tight md:mt-0 md:text-[1.6rem]">{s.t}</h3>
                  <p className="mt-3 text-[0.98rem] leading-[1.7] text-ash">{s.p}</p>
                </Reveal>
                <Reveal kind="rise" delay={0.12} className={`md:col-span-7 ${i % 2 ? "md:pl-10" : "md:pr-10"}`}>
                  {s.frag}
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

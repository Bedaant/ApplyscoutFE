import { Reveal } from "./Bits";

const SOURCES = [
  ["Company career pages", "#3B6FE0"],
  ["LinkedIn", "#0A66C2"],
  ["Indeed", "#2557A7"],
  ["Greenhouse", "#2C8F6B"],
  ["Lever", "#6C4BC4"],
  ["Workable", "#0F7FA3"],
  ["Otta", "#E1457B"],
  ["Ashby", "#B26A00"],
];

const Row = () => (
  <div className="flex items-center gap-10 pr-10">
    {SOURCES.map(([name, color]) => (
      <span key={name} className="flex shrink-0 items-center gap-2.5">
        <span className="h-6 w-6 rounded-[8px]" style={{ backgroundColor: color }} />
        <span className="whitespace-nowrap text-[1rem] font-bold text-ink/75">{name}</span>
      </span>
    ))}
  </div>
);

export const Sources = () => (
  <section className="px-3 pb-6 pt-16 sm:px-5 md:pt-24" data-testid="sources">
    <Reveal className="mx-auto max-w-[1100px] text-center">
      <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-slate/80">Where we look each morning</p>
    </Reveal>
    <div className="marquee relative mx-auto mt-7 max-w-[1100px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
    <Reveal delay={0.1} className="mx-auto mt-6 max-w-[42rem] text-center">
      <p className="text-[0.88rem] font-medium text-slate">
        Only postings from the last 14 days make the list. Older reposts are dropped — they're usually filled.
      </p>
    </Reveal>
  </section>
);

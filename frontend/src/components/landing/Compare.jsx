import { Check, Minus, X } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const ROWS = ["Time spent", "Tailored to each role", "Facts checked against your resume", "You approve before sending", "Risk of spammy or wrong applications"];

const COLS = [
  { name: "Applying manually", tag: "Slow", values: [["no", "Hours every week"], ["mid", "If you have the energy"], ["yes", "You check it yourself"], ["yes", "Always"], ["yes", "Low"]] },
  { name: "Blind auto-apply bots", tag: "Risky", values: [["yes", "Minimal"], ["no", "Mostly templates"], ["no", "Rarely"], ["no", "Sent automatically"], ["no", "High"]] },
  { name: "ApplyScout", tag: "Controlled", featured: true, values: [["yes", "Minutes to review"], ["yes", "Every application"], ["yes", "Only confirmed facts"], ["yes", "Every time"], ["yes", "Low. You review all"]] },
];

const Icon = ({ kind }) => {
  if (kind === "yes") return <span className="grid h-6 w-6 place-items-center rounded-full bg-leaf/15 text-[#2d7a57]"><Check size={14} /></span>;
  if (kind === "mid") return <span className="grid h-6 w-6 place-items-center rounded-full bg-honey/20 text-[#8a6212]"><Minus size={14} /></span>;
  return <span className="grid h-6 w-6 place-items-center rounded-full bg-ember/15 text-ember"><X size={14} /></span>;
};

const Column = ({ col, i }) => (
  <Reveal delay={i * 0.1} className={`rounded-3xl p-6 md:p-8 ${col.featured ? "border border-ink/10 bg-gradient-to-b from-peach/60 via-tint to-white shadow-[0_30px_60px_-30px_rgba(28,25,23,0.35)] lg:-translate-y-4" : "card-surface"}`} data-testid={`compare-col-${i}`}>
    <div className="flex items-center justify-between">
      <h3 className="font-display text-xl font-bold md:text-2xl">{col.name}</h3>
      <span className={`eyebrow rounded-full px-2.5 py-1 ${col.featured ? "bg-ink text-cream" : "bg-canvas text-soft"}`}>{col.tag}</span>
    </div>
    <ul className="mt-6 divide-y divide-ink/10">
      {col.values.map(([kind, text], r) => (
        <li key={ROWS[r]} className="flex items-start gap-3 py-3.5">
          <Icon kind={kind} />
          <div>
            <p className="text-xs uppercase tracking-wider text-soft">{ROWS[r]}</p>
            <p className="mt-0.5 text-sm font-medium">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  </Reveal>
);

export const Compare = () => (
  <section id="compare" className="px-5 py-24 sm:px-8 lg:py-32" data-testid="compare-section">
    <div className="mx-auto max-w-7xl">
      <SectionHead eyebrow="Why ApplyScout" title="Faster than manual." accent="Safer than blind automation." sub="Manual applying burns your evenings. Auto-apply bots spray generic applications in your name. ApplyScout sits in between: fast, tailored, and you sign off on everything." />
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {COLS.map((c, i) => <Column key={c.name} col={c} i={i} />)}
      </div>
    </div>
  </section>
);

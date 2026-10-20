import { Check, Minus, X } from "lucide-react";
import { Reveal, SectionHead } from "./Motion";

const ROWS = ["Time spent", "Tailored to each role", "Facts checked against your resume", "You approve before sending", "Risk of spammy or wrong applications"];

const COLS = [
  { name: "Applying manually", tag: "Slow", values: [["no", "Hours every week"], ["mid", "If you have the energy"], ["yes", "You check it yourself"], ["yes", "Always"], ["yes", "Low"]] },
  { name: "Blind auto-apply bots", tag: "Risky", values: [["yes", "Minimal"], ["no", "Mostly templates"], ["no", "Rarely"], ["no", "Sent automatically"], ["no", "High"]] },
  { name: "ApplyScout", tag: "Controlled", featured: true, values: [["yes", "Minutes to review"], ["yes", "Every application"], ["yes", "Only confirmed facts"], ["yes", "Every time"], ["yes", "Low. You review all"]] },
];

const Icon = ({ kind }) => {
  if (kind === "yes") return <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"><Check size={13} strokeWidth={3} /></span>;
  if (kind === "mid") return <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-honey/20 text-[#93370D]"><Minus size={13} strokeWidth={3} /></span>;
  return <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ember/10 text-[#B42318]"><X size={13} strokeWidth={3} /></span>;
};

export const Compare = () => (
  <section id="compare" className="px-5 py-24 sm:px-8 lg:py-32" data-testid="compare-section">
    <div className="mx-auto max-w-7xl">
      <SectionHead eyebrow="The smarter way to job hunt without blind auto-apply" title="Faster than manual." accent="Safer than blind automation." sub="Manual applying burns your evenings. Auto-apply bots spray generic applications in your name. ApplyScout sits in between: fast, tailored, and you sign off on everything." />
      <div className="mt-16 grid items-center gap-5 lg:grid-cols-3">
        {COLS.map((col, i) => (
          <Reveal key={col.name} delay={i * 0.1} data-testid={`compare-col-${i}`}
            className={`rounded-3xl bg-white p-6 md:p-8 ${col.featured ? "border-2 border-brand shadow-[0_40px_70px_-30px_rgba(255,69,0,0.45)] lg:-translate-y-4 lg:py-10" : "card"}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-navy md:text-2xl">{col.name}</h3>
              <span className={`label rounded-full px-2.5 py-1 ${col.featured ? "bg-brand text-white" : "bg-navy/5 text-mute"}`}>{col.tag}</span>
            </div>
            <ul className="mt-6 divide-y divide-navy/[0.07]">
              {col.values.map(([kind, text], r) => (
                <li key={ROWS[r]} className="flex items-start gap-3 py-3.5">
                  <Icon kind={kind} />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-mute">{ROWS[r]}</p>
                    <p className="mt-0.5 text-[15px] font-semibold text-navy">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

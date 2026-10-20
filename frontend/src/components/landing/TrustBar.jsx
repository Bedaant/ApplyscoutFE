import { Eye, FileCheck2, Target } from "lucide-react";
import { Reveal } from "./Reveal";

const ITEMS = [
  { icon: Target, title: "Tailored for you", text: "Each application fits the role, not a template." },
  { icon: Eye, title: "Review before sending", text: "You see every word before it goes anywhere." },
  { icon: FileCheck2, title: "No made-up facts", text: "Drafts use only what you've confirmed is true." },
];

export const TrustBar = () => (
  <section className="px-5 sm:px-8" data-testid="trust-bar">
    <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-3">
      {ITEMS.map(({ icon: Icon, title, text }, i) => (
        <Reveal key={title} delay={i * 0.08} className="flex items-start gap-4 bg-white/80 p-6 md:p-7">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-tint text-ink"><Icon size={18} /></span>
          <div>
            <p className="font-display text-lg font-bold">{title}</p>
            <p className="mt-1 text-sm text-soft">{text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

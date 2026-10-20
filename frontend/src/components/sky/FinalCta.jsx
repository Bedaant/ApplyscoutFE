import { Sparkles } from "lucide-react";
import { Clouds, FoxChip, Logo, Reveal } from "./Bits";
import { EmailForm } from "./EmailForm";

export const FinalCta = ({ onSample }) => (
  <section className="px-3 pb-6 pt-10 sm:px-5" data-testid="final-cta">
    <div className="sky-soft relative overflow-hidden rounded-[2rem] px-5 py-16 sm:rounded-[2.5rem] sm:px-8 md:py-20">
      <Clouds />
      <Sparkles size={16} className="sparkle absolute left-[18%] top-[22%] hidden text-white md:block" />
      <Sparkles size={13} className="sparkle absolute right-[20%] top-[30%] hidden text-white md:block" />

      <div className="relative mx-auto max-w-[44rem] text-center" id="start">
        <Reveal>
          <h2 className="font-display text-[2rem] leading-[1.08] text-ink sm:text-[2.8rem]">
            Tomorrow morning <FoxChip w={66} className="mx-1 -mt-1" /> four jobs worth reading.
          </h2>
          <p className="mx-auto mt-5 max-w-[32rem] text-base leading-relaxed text-slate md:text-lg">
            Leave an address and you'll hear from us when there's a working version to use. One email, written
            by a person, no countdown timers.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-8 flex justify-center">
          <EmailForm source="footer" id="footer" />
        </Reveal>

        <Reveal delay={0.2}>
          <button onClick={onSample} data-testid="final-sample-btn"
            className="mt-5 text-[0.95rem] font-bold text-slate underline decoration-bubble decoration-2 underline-offset-4 transition-colors hover:text-ink">
            Or walk through the sample run first
          </button>
        </Reveal>
      </div>
    </div>
  </section>
);

const COLS = [
  ["Product", [["How it works", "#how"], ["Honest limits", "#limits"], ["FAQ", "#faq"], ["Sample run", "#top"]]],
  ["For you", [["Find a job", "#jobs"], ["Early access", "#start"], ["What it won't do", "#limits"]]],
];

export const Footer = () => (
  <footer className="px-3 pb-6 sm:px-5" data-testid="footer">
    <div className="mx-auto max-w-[1100px] rounded-[2rem] bg-white px-6 py-10 shadow-[0_14px_34px_-24px_rgba(22,33,58,0.4)] sm:px-10">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-[22rem] text-[0.92rem] leading-relaxed text-slate">
            Fresh jobs, drafted from facts you confirmed, sent only when you say so. Early access, built in
            the open.
          </p>
        </div>
        {COLS.map(([title, links]) => (
          <div key={title} className="md:col-span-3">
            <p className="text-[0.82rem] font-bold uppercase tracking-[0.16em] text-ink/50">{title}</p>
            <ul className="mt-3 space-y-2">
              {links.map(([t, h]) => (
                <li key={t}>
                  <a href={h} data-testid={`footer-link-${t.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-[0.92rem] font-semibold text-slate transition-colors hover:text-ink">{t}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-1" />
      </div>
      <div className="mt-8 flex flex-col gap-2 border-t border-[#EEF1F7] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] text-slate">sample companies on this page are invented</p>
        <p className="font-mono text-[11px] text-slate">© {new Date().getFullYear()} ApplyScout</p>
      </div>
    </div>
  </footer>
);

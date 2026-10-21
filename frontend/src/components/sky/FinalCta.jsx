import { Sparkles } from "lucide-react";
import { Clouds, FoxChip, Logo, Reveal } from "./Bits";
import { Magnetic, ParallaxArt } from "./Extras";
import { FOX_CALENDAR } from "./assets";
import { EmailForm } from "./EmailForm";

export const FinalCta = ({ onSample }) => (
  <section className="px-3 pb-6 pt-10 sm:px-5" data-testid="final-cta">
    <div className="sky-soft relative overflow-hidden rounded-[2rem] px-5 py-16 sm:rounded-[2.5rem] sm:px-8 md:py-20">
      <Clouds />
      <ParallaxArt src={FOX_CALENDAR} className="bottom-[-30px] right-[2%] hidden w-[190px] lg:block" />
      <Sparkles size={16} className="sparkle absolute left-[18%] top-[22%] hidden text-white md:block" />
      <Sparkles size={13} className="sparkle absolute right-[20%] top-[30%] hidden text-white md:block" />

      <div className="relative mx-auto max-w-[44rem] text-center" id="start">
        <Reveal>
          <h2 className="font-display text-[2rem] leading-[1.08] text-ink sm:text-[2.8rem]">
            Less applying. <FoxChip w={66} className="mx-1 -mt-1" /> More interviews.
          </h2>
          <p className="mx-auto mt-5 max-w-[32rem] text-base leading-relaxed text-slate md:text-lg">
            Join early access. One email when it's ready.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-8 flex justify-center">
          <EmailForm source="footer" id="footer" />
        </Reveal>

        <Reveal delay={0.2}>
          <Magnetic>
          <button onClick={onSample} data-testid="final-sample-btn"
            className="mt-5 text-[0.95rem] font-bold text-slate underline decoration-bubble decoration-2 underline-offset-4 transition-colors hover:text-ink">
            Or see a sample run first
          </button>
          </Magnetic>
        </Reveal>
      </div>
    </div>
  </section>
);

const COLS = [
  ["Product", [["How it works", "#how"], ["Compare", "#compare"], ["FAQ", "#faq"]]],
  ["For you", [["Live jobs", "#jobs"], ["Early access", "#start"]]],
];

export const Footer = () => (
  <footer className="px-3 pb-6 sm:px-5" data-testid="footer">
    <div className="mx-auto max-w-[1100px] rounded-[2rem] bg-white px-6 py-10 shadow-[0_14px_34px_-24px_rgba(22,33,58,0.4)] sm:px-10">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-[22rem] text-[0.92rem] leading-relaxed text-slate">
            Interviews, not just applications. Built from facts you confirmed.
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
        <p className="font-mono text-[11px] text-slate">live postings link to each company's own career page · logos belong to their owners</p>
        <p className="font-mono text-[11px] text-slate">© {new Date().getFullYear()} ApplyScout</p>
      </div>
    </div>
  </footer>
);

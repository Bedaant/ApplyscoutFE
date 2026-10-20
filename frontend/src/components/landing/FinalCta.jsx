import { ArrowRight } from "lucide-react";
import { Logo } from "./Brand";
import { Reveal } from "./Reveal";

export const FinalCta = ({ onTry }) => (
  <section className="px-3 pb-6 sm:px-6" data-testid="final-cta-section">
    <div className="relative mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] border border-ink/10 bg-gradient-to-br from-peach via-tint to-cream px-6 py-20 text-center lg:rounded-[2.75rem] lg:py-32">
      <Reveal>
        <p className="eyebrow text-ink/70">Ready when you are</p>
        <h2 className="font-display mx-auto mt-5 max-w-4xl text-[2.4rem] font-extrabold leading-[1] sm:text-6xl lg:text-[5rem]">
          Get your evenings back. <span className="font-serif font-normal italic">Keep the final say.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base text-ink/70 md:text-lg">See how ApplyScout would match and draft for you. Takes a minute, no sign-in.</p>
        <button onClick={onTry} data-testid="final-try-it-btn" className="btn-ink group mx-auto mt-10 inline-flex items-center gap-3 rounded-full bg-ink py-4 pl-8 pr-5 text-base font-semibold text-cream">
          Try it
          <span className="grid h-8 w-8 place-items-center rounded-full bg-cream/15 transition-transform duration-500 group-hover:translate-x-1"><ArrowRight size={16} /></span>
        </button>
      </Reveal>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="px-5 py-10 sm:px-8" data-testid="site-footer">
    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <Logo />
      <p className="text-sm text-soft">© 2026 ApplyScout · Apply faster, stay in control.</p>
    </div>
  </footer>
);

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo, Maggie } from "./Brand";
import { Reveal } from "./Motion";

export const FinalCta = ({ onTry }) => (
  <section className="px-3 pb-6 pt-24 sm:px-6" data-testid="final-cta-section">
    <div className="relative mx-auto max-w-[88rem]">
      <div className="absolute left-1/2 top-0 z-0 -translate-x-1/2 -translate-y-[62%]">
      <motion.div
        initial={{ y: 50 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
        data-testid="final-maggie"
      >
        <Maggie size={110} />
      </motion.div>
      </div>
      <div className="relative z-10 overflow-hidden rounded-[2rem] border border-brand/15 bg-blush px-6 py-20 text-center lg:rounded-[2.75rem] lg:py-28">
        <div className="glow-brand pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[900px] max-w-full -translate-x-1/2 -translate-y-1/2" />
        <Reveal className="relative">
          <p className="label tracking-[0.3em] text-brand">Ready when you are</p>
          <h2 className="font-display mx-auto mt-5 max-w-4xl text-[2.5rem] font-extrabold leading-[1] text-navy sm:text-6xl lg:text-[4.6rem]">
            Get your evenings back. <span className="text-brand-grad">Keep the final say.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base text-mute md:text-lg">See how ApplyScout would match and draft for you. Takes a minute, no sign-in.</p>
          <button onClick={onTry} data-testid="final-try-it-btn" className="btn-brand group mx-auto mt-10 inline-flex items-center gap-3 rounded-2xl px-9 py-4 text-lg font-semibold">
            Try it <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </div>
  </section>
);

const LINKS = [["How it works", "#how"], ["Why it's safer", "#compare"], ["Control", "#control"], ["FAQ", "#faq"]];

export const Footer = () => (
  <footer className="px-5 py-12 sm:px-8" data-testid="site-footer">
    <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <Logo tagline />
      <nav className="flex flex-wrap gap-x-7 gap-y-3">
        {LINKS.map(([l, h]) => <a key={h} href={h} data-testid={`footer-link-${h.slice(1)}`} className="text-sm font-medium text-navy/75 transition-colors hover:text-brand">{l}</a>)}
      </nav>
      <p className="text-sm text-mute">© 2026 ApplyScout · Apply faster, stay in control.</p>
    </div>
  </footer>
);

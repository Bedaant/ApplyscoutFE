import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Maggie } from "./Brand";
import { EASE } from "./Motion";
import { HeroCards } from "./HeroCards";

const Line = ({ children, i, ready, className = "" }) => (
  <span className="block overflow-hidden pb-[0.1em]">
    <motion.span className={`block ${className}`} initial={{ y: "110%" }} animate={ready ? { y: "0%" } : {}} transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.1 }}>
      {children}
    </motion.span>
  </span>
);

const fade = (ready, delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: ready ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.8, ease: EASE, delay },
});

const POINTS = ["Free preview", "Nothing sent without approval", "No made-up facts"];

export const Hero = ({ onTry, ready }) => (
  <section id="top" className="relative overflow-hidden bg-gradient-to-b from-blush to-white px-5 pb-20 pt-28 sm:px-8 lg:pb-28 lg:pt-36">
    <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <motion.p {...fade(ready, 0)} data-testid="hero-eyebrow" className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1.5 text-sm font-medium text-navy shadow-sm">
          <span className="dot-live h-2 w-2 rounded-full bg-brand" /> Now in early access
        </motion.p>
        <h1 data-testid="hero-headline" className="font-display mt-7 font-extrabold text-navy">
          <span className="relative block text-[3.1rem] leading-[0.98] sm:text-7xl lg:text-[4.6rem]">
            <Line i={0} ready={ready}>
              Jobs find you now.
              <span className="relative ml-2 inline-block h-[0.62em] w-[0.75em] overflow-hidden align-baseline" aria-hidden="true">
                <motion.span className="absolute inset-x-0 top-0 block" initial={{ y: "100%" }} animate={ready ? { y: "8%" } : {}} transition={{ delay: 1.1, type: "spring", stiffness: 160, damping: 14 }}>
                  <Maggie size={56} className="h-auto w-full" />
                </motion.span>
              </span>
            </Line>
          </span>
          <span className="mt-3 block text-[1.85rem] leading-[1.08] sm:text-[2.6rem] lg:text-[2.5rem]">
            <Line i={1} ready={ready} className="text-brand-grad">Apply to better-fit jobs</Line>
            <Line i={2} ready={ready} className="text-brand-grad">without spending hours</Line>
            <Line i={3} ready={ready} className="text-brand-grad">every day.</Line>
          </span>
        </h1>
        <motion.p {...fade(ready, 0.55)} data-testid="hero-subtext" className="mt-6 max-w-md text-base leading-relaxed text-mute md:text-lg">
          ApplyScout finds fresh jobs, drafts tailored applications using only confirmed facts, and prepares everything for your review before anything is sent.
        </motion.p>
        <motion.div {...fade(ready, 0.7)} className="mt-8">
          <button onClick={onTry} data-testid="hero-try-it-btn" className="btn-brand group inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-semibold">
            Try it <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" data-testid="hero-points">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-1.5 text-sm font-medium text-navy/80"><CheckCircle2 size={17} className="text-brand" /> {p}</li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="lg:col-span-7">
        <HeroCards ready={ready} />
      </div>
    </div>
  </section>
);

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { EASE } from "./Reveal";
import { HeroStack } from "./HeroStack";

const Line = ({ children, i, ready }) => (
  <span className="block overflow-hidden pb-[0.1em]">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={ready ? { y: "0%" } : {}}
      transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.12 }}
    >
      {children}
    </motion.span>
  </span>
);

const fade = (ready, delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: ready ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.9, ease: EASE, delay },
});

export const Hero = ({ onTry, ready }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
      <motion.div style={{ y: glowY }} className="peach-glow pointer-events-none absolute -right-40 top-10 h-[640px] w-[640px] lg:right-0" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.p {...fade(ready, 0.05)} data-testid="hero-eyebrow" className="eyebrow inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-ink/75">
            <ShieldCheck size={14} className="text-leaf" /> The smarter way to job hunt without blind auto-apply
          </motion.p>
          <h1 data-testid="hero-headline" className="font-display mt-7 text-[2.65rem] font-extrabold leading-[0.98] sm:text-6xl lg:text-[4.6rem] xl:text-[5rem]">
            <Line i={0} ready={ready}>Apply to better-fit</Line>
            <Line i={1} ready={ready}>jobs without spending</Line>
            <Line i={2} ready={ready}>
              <span className="font-serif font-normal italic">hours every day.</span>
            </Line>
          </h1>
          <motion.p {...fade(ready, 0.55)} data-testid="hero-subtext" className="mt-7 max-w-xl text-base leading-relaxed text-soft md:text-lg">
            ApplyScout finds fresh jobs, drafts tailored applications using only confirmed facts, and prepares everything for your review before anything is sent.
          </motion.p>
          <motion.div {...fade(ready, 0.7)} className="mt-9 flex flex-wrap items-center gap-5">
            <button onClick={onTry} data-testid="hero-try-it-btn" className="btn-ink group inline-flex items-center gap-3 rounded-full bg-ink py-4 pl-7 pr-5 text-base font-semibold text-cream">
              Try it
              <span className="grid h-8 w-8 place-items-center rounded-full bg-cream/15 transition-transform duration-500 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </button>
            <span className="text-sm text-soft">Free preview · No sign-in needed</span>
          </motion.div>
        </div>
        <div className="lg:col-span-5">
          <HeroStack ready={ready} progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
};

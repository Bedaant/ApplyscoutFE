import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { logoUrl } from "./live";
import { AvatarCluster, Clouds, FloatBadge, EASE, WavingFox } from "./Bits";

// real companies whose live postings appear below
const HERO_LOGOS = [
  ["Stripe", "stripe.com", "left-[6%] top-[26%] hidden sm:grid", "float-a", 58],
  ["Notion", "notion.so", "left-[12%] top-[52%] hidden md:grid", "float-c", 58],
  ["Figma", "figma.com", "right-[7%] top-[22%] hidden sm:grid", "float-b", 58],
  ["OpenAI", "openai.com", "right-[13%] top-[54%] hidden md:grid", "float-a", 58],
  ["Spotify", "spotify.com", "left-[22%] top-[14%] hidden lg:grid", "float-b", 48],
  ["Airbnb", "airbnb.com", "right-[22%] top-[12%] hidden lg:grid", "float-c", 48],
];

const line = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: EASE },
});

export const Hero = ({ onStart, onSample }) => (
  <section id="top" className="px-3 pt-3 sm:px-5" data-testid="hero">
    <div className="sky relative overflow-hidden rounded-[2rem] px-5 pb-24 pt-32 sm:rounded-[2.5rem] sm:px-8 sm:pb-28 sm:pt-36">
      <Clouds />

      {HERO_LOGOS.map(([name, domain, cls, float, size]) => (
        <FloatBadge key={domain} className={cls} float={float} size={size}>
          <img src={logoUrl(domain)} alt={`${name} logo`} title={`${name} is hiring`} className="h-[56%] w-[56%] object-contain" data-testid="hero-company-logo" />
        </FloatBadge>
      ))}

      <Sparkles size={18} className="sparkle absolute left-[32%] top-[30%] hidden text-white md:block" />
      <Sparkles size={14} className="sparkle absolute right-[30%] top-[62%] hidden text-white md:block" />

      <div className="relative mx-auto max-w-[1000px] text-center">
        <motion.h1 className="font-display text-ink" {...line(0.1)}>
          <span className="block text-[2.3rem] leading-[1.1] sm:text-[3.1rem] lg:text-[3.6rem]">
            Get interviews <WavingFox className="fox-hero mx-1 -mt-2" w={84} />
          </span>
          <span className="mt-1.5 block text-[2.3rem] leading-[1.1] sm:text-[3.1rem] lg:text-[3.6rem]">
            not just <AvatarCluster className="mx-1 -mt-1" size={44} /> applications sent.
          </span>
        </motion.h1>

        <motion.p {...line(0.25)} className="mx-auto mt-6 max-w-[34rem] text-base leading-relaxed text-slate md:text-lg">
          Fewer, better-fit applications, written only from facts you confirmed.
        </motion.p>

        <motion.div {...line(0.4)} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={onStart} data-testid="hero-primary-btn"
            className="pill-pink group inline-flex items-center gap-2 rounded-full py-3.5 pl-7 pr-3 text-[0.98rem] font-bold">
            Let's get started
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/70 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </button>
          <button onClick={onSample} data-testid="hero-sample-btn"
            className="pill-ghost rounded-full px-7 py-3.5 text-[0.98rem] font-bold">
            See a sample run
          </button>
        </motion.div>

        <motion.p {...line(0.5)} className="mt-5 text-[0.86rem] font-medium text-slate/80">
          Early access · no card · never applies on its own
        </motion.p>
      </div>
    </div>
  </section>
);

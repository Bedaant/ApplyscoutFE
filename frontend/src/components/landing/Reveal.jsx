import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "", ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ eyebrow, title, accent, sub, dark = false }) => (
  <Reveal className="max-w-3xl">
    <p className={`eyebrow ${dark ? "text-peach" : "text-soft"}`}>{eyebrow}</p>
    <h2 className={`font-display mt-4 text-[2.1rem] leading-[1.02] font-bold sm:text-5xl lg:text-[3.6rem] ${dark ? "text-cream" : "text-ink"}`}>
      {title} {accent && <span className="font-serif font-normal italic">{accent}</span>}
    </h2>
    {sub && <p className={`mt-5 max-w-xl text-base md:text-lg leading-relaxed ${dark ? "text-cream/75" : "text-soft"}`}>{sub}</p>}
  </Reveal>
);

import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/* Reveal styles differ per section on purpose, so the page does not have one
   repeating cadence. */
const VARIANTS = {
  rise: { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } },
  slide: { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  settle: { hidden: { opacity: 0, y: 38, rotate: -1.4 }, show: { opacity: 1, y: 0, rotate: 0 } },
  wipe: { hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" }, show: { opacity: 1, clipPath: "inset(0 0% 0 0)" } },
};

export const Reveal = ({ children, kind = "rise", delay = 0, duration = 0.8, className = "", as = "div" }) => {
  const M = motion[as] ?? motion.div;
  return (
    <M
      variants={VARIANTS[kind]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </M>
  );
};

export const Label = ({ children, className = "" }) => (
  <p className={`label ${className}`}>{children}</p>
);

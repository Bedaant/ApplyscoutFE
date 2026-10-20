import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "", ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.85, ease: EASE, delay }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children }) => (
  <p className="label inline-flex items-center gap-2 text-brand"><span className="h-1.5 w-1.5 rounded-full bg-brand" />{children}</p>
);

export const SectionHead = ({ eyebrow, title, accent, sub, center = false }) => (
  <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="font-display mt-4 text-[2.1rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-[3.3rem]">
      {title} {accent && <span className="text-brand-grad">{accent}</span>}
    </h2>
    {sub && <p className={`mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg ${center ? "mx-auto" : ""}`}>{sub}</p>}
  </Reveal>
);

const STATUS = {
  ready: ["bg-brand/10 text-[#C2410C]", "Pending"],
  approved: ["bg-ok/10 text-[#067647]", "Queued"],
  skipped: ["bg-navy/5 text-mute", "Skipped"],
};

export const Status = ({ status }) => {
  const [cls, label] = STATUS[status] ?? STATUS.ready;
  return <span className={`label rounded-full px-2.5 py-1 ${cls}`}>{label}</span>;
};

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Linkedin, Send, Wand2 } from "lucide-react";
import { EASE, Reveal } from "./Bits";

const ITEMS = [
  { Icon: Send, title: "Never sends without your OK", line: "Every email waits for your tap.", c: "#6C4BC4", bg: "#EEE6FB" },
  { Icon: Wand2, title: "Never invents experience", line: "Only facts you ticked, each one cited.", c: "#2C8F6B", bg: "#E2F6E6" },
  { Icon: Linkedin, title: "Never logs into LinkedIn for you", line: "No bots on your accounts.", c: "#0F7FA3", bg: "#DFF4FA" },
  { Icon: FileText, title: "Never keeps your resume file", line: "Read once, then deleted.", c: "#B26A00", bg: "#FFF0DA" },
];

const Item = ({ it, i }) => {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const d = 0.15 + i * 0.18;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={seen ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
      whileHover={{ y: -6 }}
      className="white-card flex flex-col items-center p-6 text-center hover:translate-y-0"
      data-testid={`never-item-${i}`}
    >
      <div className="relative grid h-[76px] w-[76px] place-items-center rounded-[24px]" style={{ backgroundColor: it.bg, color: it.c }}>
        <motion.span animate={seen ? { scale: [1, 0.86, 1], opacity: [1, 0.55, 0.55] } : {}} transition={{ duration: 0.5, delay: d + 0.35 }}>
          <it.Icon size={32} strokeWidth={2.2} />
        </motion.span>
        {/* a strike line draws across the icon */}
        <svg viewBox="0 0 76 76" className="pointer-events-none absolute inset-0" aria-hidden="true">
          <motion.line x1="16" y1="60" x2="60" y2="16" stroke="#E1457B" strokeWidth="6" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={seen ? { pathLength: 1 } : {}} transition={{ duration: 0.45, delay: d, ease: EASE }} />
        </svg>
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={seen ? { scale: 1, rotate: -8 } : {}}
          transition={{ type: "spring", stiffness: 380, damping: 14, delay: d + 0.5 }}
          className="absolute -right-4 -top-3 rounded-full bg-ink px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-white shadow"
        >
          never
        </motion.span>
      </div>
      <p className="font-display mt-5 text-[1.15rem] leading-tight text-ink">{it.title}</p>
      <p className="mt-1.5 text-[0.9rem] font-semibold text-slate">{it.line}</p>
    </motion.div>
  );
};

export const NeverDo = () => (
  <section id="never" className="scroll-mt-28 px-3 py-14 sm:px-5 md:py-20" data-testid="never-section">
    <div className="mx-auto max-w-[1100px]">
      <Reveal className="mx-auto max-w-[40rem] text-center">
        <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-accent">Our promises</p>
        <h2 className="font-display mt-3 text-[2rem] leading-[1.06] text-ink sm:text-[2.6rem]">What ApplyScout will never do.</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it, i) => <Item key={it.title} it={it} i={i} />)}
      </div>
    </div>
  </section>
);

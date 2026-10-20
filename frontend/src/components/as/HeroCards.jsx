import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CardFind, CardTailor, CardDraft, CardReview } from "./HeroCardItems";
import { EASE } from "./Motion";

const START = 0.45;
const STEP = 0.32;

const Arrow = ({ className, d, head, delay, ready, w, h }) => (
  <svg className={`pointer-events-none absolute z-20 hidden lg:block ${className}`} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
    <motion.path d={d} fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={ready ? { pathLength: 1 } : {}} transition={{ duration: 0.6, delay, ease: EASE }} />
    <motion.path d={head} fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 0.2, delay: delay + 0.55 }} />
  </svg>
);

const DownArrow = ({ delay, ready }) => (
  <svg className="mx-auto -my-3 lg:hidden" width="24" height="40" viewBox="0 0 24 40" aria-hidden="true">
    <motion.path d="M12 2 C 4 14, 20 24, 12 36" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={ready ? { pathLength: 1 } : {}} transition={{ duration: 0.5, delay }} />
    <path d="M7 31 L12 37 L17 31" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Rise = ({ i, ready, children, className = "" }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 40 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: EASE, delay: START + i * STEP }}>
    {children}
  </motion.div>
);

export const HeroCards = ({ ready }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 110, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 110, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  const arrowDelay = (i) => START + i * STEP + 0.5;

  return (
    <div className="relative [perspective:1400px]" onMouseMove={onMove} onMouseLeave={onLeave} data-testid="hero-cards">
      <div className="glow-brand pointer-events-none absolute -inset-20" />
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative grid items-start gap-y-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
        <Rise i={0} ready={ready}><CardFind /></Rise>
        <DownArrow ready={ready} delay={arrowDelay(0)} />
        <Rise i={1} ready={ready} className="lg:mt-10"><CardTailor /></Rise>
        <DownArrow ready={ready} delay={arrowDelay(1)} />
        <Rise i={2} ready={ready}><CardDraft ready={ready} /></Rise>
        <DownArrow ready={ready} delay={arrowDelay(2)} />
        <Rise i={3} ready={ready} className="lg:-mt-10"><CardReview /></Rise>
        <Arrow ready={ready} delay={arrowDelay(0)} w={64} h={60} className="left-1/2 top-8 -translate-x-1/2" d="M4 40 C 14 6, 46 4, 58 26" head="M50 24 L58 27 L60 18" />
        <Arrow ready={ready} delay={arrowDelay(1)} w={150} h={70} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" d="M140 6 C 110 46, 50 20, 12 60" head="M14 50 L11 61 L22 62" />
        <Arrow ready={ready} delay={arrowDelay(2)} w={64} h={60} className="bottom-24 left-1/2 -translate-x-1/2" d="M4 14 C 14 50, 46 52, 58 30" head="M50 33 L58 29 L59 38" />
      </motion.div>
    </div>
  );
};

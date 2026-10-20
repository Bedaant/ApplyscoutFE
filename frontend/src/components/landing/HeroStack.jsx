import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, MapPin, Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import { EASE } from "./Reveal";

const enter = (ready, delay) => ({
  initial: { opacity: 0, y: 60, rotate: 0 },
  animate: ready ? { opacity: 1, y: 0 } : {},
  transition: { duration: 1.1, ease: EASE, delay },
});

const MatchCard = () => (
  <div className="card-surface rounded-3xl p-5">
    <div className="flex items-center justify-between">
      <span className="eyebrow text-soft">Fresh match · 6h ago</span>
      <span className="rounded-full bg-leaf/15 px-2.5 py-1 font-mono text-xs font-medium text-[#2d7a57]">92% fit</span>
    </div>
    <p className="font-display mt-3 text-xl font-bold">Product Operations Lead</p>
    <p className="mt-1 flex items-center gap-1.5 text-sm text-soft"><MapPin size={13} /> Northwind Labs · Remote</p>
  </div>
);

const DraftCard = () => (
  <div className="rounded-3xl border border-ink/10 bg-tint p-5 shadow-[0_24px_50px_-28px_rgba(28,25,23,0.35)]">
    <span className="eyebrow flex items-center gap-1.5 text-soft"><Sparkles size={13} className="text-honey" /> Tailored draft</span>
    <p className="mt-3 text-sm leading-relaxed text-ink/85">
      “I rebuilt our onboarding flow, <mark className="rounded bg-peach/70 px-1 text-ink">cutting support tickets 18%</mark>…”
    </p>
    <div className="mt-3 flex flex-wrap gap-1.5">
      <span className="rounded-full bg-white px-2.5 py-1 font-mono text-xs text-soft">Source · Resume, Role 2</span>
      <span className="rounded-full bg-white px-2.5 py-1 font-mono text-xs text-[#2d7a57]">0 invented facts</span>
    </div>
  </div>
);

const ApprovalCard = () => {
  const [state, setState] = useState("pending");
  const paused = state === "paused";
  return (
    <div className="rounded-3xl bg-cocoa p-5 text-cream shadow-[0_30px_60px_-24px_rgba(42,36,33,0.6)]" data-testid="hero-approval-card">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-peach">Waiting for you</span>
        <span className={`h-2 w-2 rounded-full ${state === "approved" ? "bg-leaf" : paused ? "bg-honey" : "animate-pulse bg-peach"}`} />
      </div>
      <p className="mt-3 text-sm text-cream/80" data-testid="hero-approval-status">
        {state === "approved" ? "Approved. Queued to send. You can still undo." : paused ? "Paused. Nothing will be sent." : "1 application ready. Nothing is sent until you approve."}
      </p>
      <div className="mt-4 flex gap-2">
        {state === "approved" ? (
          <button data-testid="hero-undo-btn" onClick={() => setState("pending")} className="flex items-center gap-1.5 rounded-full bg-cream/10 px-4 py-2 text-sm transition-colors hover:bg-cream/20"><RotateCcw size={14} /> Undo</button>
        ) : (
          <>
            <button data-testid="hero-approve-btn" disabled={paused} onClick={() => setState("approved")} className="flex items-center gap-1.5 rounded-full bg-leaf px-4 py-2 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-40"><Check size={14} /> Approve</button>
            <button data-testid="hero-pause-btn" onClick={() => setState(paused ? "pending" : "paused")} className="flex items-center gap-1.5 rounded-full bg-cream/10 px-4 py-2 text-sm transition-colors hover:bg-cream/20">{paused ? <Play size={14} /> : <Pause size={14} />} {paused ? "Resume" : "Pause"}</button>
          </>
        )}
      </div>
    </div>
  );
};

export const HeroStack = ({ ready, progress }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const yBack = useTransform(progress, [0, 1], [0, -60]);
  const yFront = useTransform(progress, [0, 1], [0, 50]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[440px] [perspective:1200px]" onMouseMove={onMove} onMouseLeave={onLeave} data-testid="hero-card-stack">
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative h-full w-full">
        <motion.div style={{ y: yBack }} className="absolute left-0 right-8 top-0 [transform:translateZ(-40px)]">
          <motion.div {...enter(ready, 0.45)} whileHover={{ y: -6 }}><MatchCard /></motion.div>
        </motion.div>
        <motion.div className="absolute left-6 right-2 top-[132px] [transform:translateZ(10px)]">
          <motion.div {...enter(ready, 0.6)} whileHover={{ y: -6 }}><DraftCard /></motion.div>
        </motion.div>
        <motion.div style={{ y: yFront }} className="absolute left-2 right-10 top-[284px] [transform:translateZ(60px)]">
          <motion.div {...enter(ready, 0.75)} whileHover={{ y: -6 }}><ApprovalCard /></motion.div>
        </motion.div>
      </motion.div>
      <p className="absolute -bottom-6 right-0 font-mono text-xs text-soft">Sample preview</p>
    </div>
  );
};

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, Mail, MousePointerClick, RotateCw, X } from "lucide-react";
import { EASE, Reveal } from "./Bits";

const ROWS = [
  { tool: "Auto-apply bots", pain: "Blank fields. Forms that never submit.", fix: "You see every field before it goes.", bg: "var(--card-1)" },
  { tool: "AI resume writers", pain: "Made-up titles and experience.", fix: "Only facts you confirmed. Each one cited.", bg: "var(--card-2)" },
  { tool: "Mass-apply tools", pain: "“1,000 applications, 0 callbacks.”", fix: "Fewer, high-fit applications. Aimed at interviews.", bg: "var(--card-3)" },
  { tool: "Most of them", pain: "Support that never answers.", fix: "A named person replies to early users.", bg: "var(--card-4)" },
  { tool: "Shut-down apps", pain: "Locked out. Accounts banned.", fix: "Export anytime. We never log into LinkedIn for you.", bg: "var(--card-5)" },
  { tool: "Paid portal boosts", pain: "“Priority applicant” — still no calls.", fix: "No paid boosts. No fake badges.", bg: "var(--card-1)" },
  { tool: "Cover-letter AI", pain: "Reads robotic.", fix: "Written from your own words and tone.", bg: "var(--card-2)" },
  { tool: "Recruiters say", pain: "Buried in AI-written spam.", fix: "Every application is one worth reading.", bg: "var(--card-3)" },
];

const FlipCard = ({ r, i }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <Reveal delay={(i % 4) * 0.07}>
      <button
        type="button"
        onClick={(e) => { if (e.nativeEvent.pointerType !== "mouse") setFlipped((f) => !f); }}
        onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
        aria-pressed={flipped}
        data-testid={`compare-card-${i}`}
        className={`flip block h-[210px] w-full text-left ${flipped ? "is-flipped" : ""}`}
      >
        <span className="flip-inner block">
          <span className="flip-face pcard soft-card flex flex-col p-5" style={{ backgroundColor: r.bg }}>
            <span className="w-fit rounded-full bg-white/80 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-ink/60">{r.tool}</span>
            <span className="mt-auto flex items-start gap-2">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#E1457B] text-white"><X size={13} strokeWidth={3} /></span>
              <span className="font-display text-[1.25rem] leading-[1.15] text-ink" data-testid={`compare-pain-${i}`}>{r.pain}</span>
            </span>
            <span className="mt-3 flex items-center gap-1 text-[0.74rem] font-bold text-ink/45"><RotateCw size={11} /> flip for our answer</span>
          </span>
          <span className="flip-face flip-back soft-card flex flex-col bg-ink p-5 text-white">
            <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em]">ApplyScout</span>
            <span className="mt-auto flex items-start gap-2">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#2C8F6B]"><Check size={13} strokeWidth={3} /></span>
              <span className="font-display text-[1.25rem] leading-[1.15]" data-testid={`compare-fix-${i}`}>{r.fix}</span>
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
};

/* illustrative "volume vs fit" visual */
const VolumeVsFit = () => {
  const ref = useRef(null);
  const go = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} className="grid gap-4 md:grid-cols-2" data-testid="volume-vs-fit">
      <div className="white-card p-6">
        <p className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-slate">Spray 100</p>
        <div className="mx-auto mt-4 grid h-[230px] w-[230px] grid-cols-10 gap-[3px]">
          {Array.from({ length: 100 }, (_, k) => (
            <motion.span
              key={k}
              initial={{ opacity: 0, y: -12 }}
              animate={go ? { opacity: k === 63 ? 1 : 0.5, y: 0 } : {}}
              transition={{ delay: k * 0.012, duration: 0.3 }}
              className={`grid place-items-center rounded-[4px] ${k === 63 ? "bg-[#2C8F6B] text-white ring-4 ring-[#BEEBC5]" : "bg-[#AEB8CC] text-white/70"}`}
            >
              <Mail size={10} />
            </motion.span>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={go ? { opacity: 1 } : {}} transition={{ delay: 1.6 }}
          className="font-display mt-5 flex items-center justify-center gap-2 text-[1.3rem] text-ink">
          100 sent <ArrowRight size={18} className="text-slate" /> <span className="text-[#2C8F6B]">1 reply</span>
        </motion.p>
      </div>

      <div className="white-card p-6">
        <p className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-accent">Choose 5</p>
        <div className="mt-4 flex h-[230px] items-center justify-center gap-3">
          {[0, 1, 2, 3, 4].map((k) => (
            <motion.span
              key={k}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              animate={go ? { opacity: 1, y: 0, rotate: (k - 2) * 5 } : {}}
              transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.3 + k * 0.12 }}
              className="pcard relative h-[130px] w-[22%] max-w-[84px] rounded-[16px] shadow-[0_12px_24px_-16px_rgba(22,33,58,0.6)]"
              style={{ backgroundColor: `var(--card-${k + 1})` }}
            >
              {k % 2 === 0 && (
                <motion.span initial={{ scale: 0 }} animate={go ? { scale: 1 } : {}} transition={{ delay: 1.3 + k * 0.15, type: "spring", stiffness: 400, damping: 12 }}
                  className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-[#2C8F6B] text-white">
                  <Check size={14} strokeWidth={3} />
                </motion.span>
              )}
            </motion.span>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={go ? { opacity: 1 } : {}} transition={{ delay: 1.8 }}
          className="font-display mt-5 flex items-center justify-center gap-2 text-[1.3rem] text-ink">
          5 chosen <ArrowRight size={18} className="text-slate" /> <span className="text-[#2C8F6B]">real conversations</span>
        </motion.p>
      </div>
      <p className="text-center text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-slate/70 md:col-span-2" data-testid="illustrative-label">
        Illustrative, not measured data
      </p>
    </div>
  );
};

export const Compare = () => (
  <section id="compare" className="scroll-mt-28 px-3 py-16 sm:px-5 md:py-24" data-testid="compare-section">
    <div className="mx-auto max-w-[1100px]">
      <Reveal className="mx-auto max-w-[40rem] text-center">
        <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-[#E1457B]">What people complain about</p>
        <h2 className="font-display mt-3 text-[2.1rem] leading-[1.05] text-ink sm:text-[3rem]">Why other tools don't get you interviews.</h2>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-[0.88rem] font-semibold text-slate">
          <MousePointerClick size={15} /> Hover or tap a card
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ROWS.map((r, i) => <FlipCard key={r.pain} r={r} i={i} />)}
      </div>

      <div className="mt-14">
        <VolumeVsFit />
      </div>
    </div>
  </section>
);

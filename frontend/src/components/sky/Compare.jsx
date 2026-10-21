import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarCheck, Check, Clock, Mail, MousePointerClick, RotateCw, X } from "lucide-react";
import { EASE, Reveal } from "./Bits";

const ROWS = [
  { tool: "Auto-apply bots", pain: "Blank fields. Forms that never submit.", fix: "You see every field before it goes.", bg: "var(--card-1)", art: "/art/ill-form.webp", artFix: "/art/fix-form.webp" },
  { tool: "AI resume writers", pain: "Made-up titles and experience.", fix: "Only facts you confirmed. Each one cited.", bg: "var(--card-2)", art: "/art/ill-fake.webp", artFix: "/art/fix-fake.webp" },
  { tool: "Mass-apply tools", pain: "“1,000 applications, 0 callbacks.”", fix: "Fewer, high-fit applications. Aimed at interviews.", bg: "var(--card-3)", art: "/art/ill-pile.webp", artFix: "/art/fix-pile.webp" },
  { tool: "Most of them", pain: "Support that never answers.", fix: "A named person replies to early users.", bg: "var(--card-4)", art: "/art/ill-support.webp", artFix: "/art/fix-support.webp" },
  { tool: "Shut-down apps", pain: "Locked out. Accounts banned.", fix: "Export anytime. We never log into LinkedIn for you.", bg: "var(--card-5)", art: "/art/ill-locked.webp", artFix: "/art/fix-locked.webp" },
  { tool: "Paid portal boosts", pain: "“Priority applicant” — still no calls.", fix: "No paid boosts. No fake badges.", bg: "var(--card-1)", art: "/art/ill-boost.webp", artFix: "/art/fix-boost.webp" },
  { tool: "Cover-letter AI", pain: "Reads robotic.", fix: "Written from your own words and tone.", bg: "var(--card-2)", art: "/art/ill-robot.webp", artFix: "/art/fix-robot.webp" },
  { tool: "Recruiters say", pain: "Buried in AI-written spam.", fix: "Every application is one worth reading.", bg: "var(--card-3)", art: "/art/ill-buried.webp", artFix: "/art/fix-buried.webp" },
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
        className={`flip block h-[268px] w-full text-left ${flipped ? "is-flipped" : ""}`}
      >
        <span className="flip-inner block">
          <span className="flip-face pcard soft-card flex flex-col p-5" style={{ backgroundColor: r.bg }}>
            <span className="w-fit rounded-full bg-white/80 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-ink/60">{r.tool}</span>
            <img src={r.art} alt="" aria-hidden="true" loading="lazy" decoding="async" className="pointer-events-none mx-auto mt-2 h-[92px] w-auto max-w-[70%] object-contain drop-shadow-[0_10px_12px_rgba(22,33,58,0.12)]" />
            <span className="mt-auto flex items-start gap-2">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#E1457B] text-white"><X size={13} strokeWidth={3} /></span>
              <span className="font-display text-[1.25rem] leading-[1.15] text-ink" data-testid={`compare-pain-${i}`}>{r.pain}</span>
            </span>
            <span className="mt-3 flex items-center gap-1 text-[0.74rem] font-bold text-ink/45"><RotateCw size={11} /> flip for our answer</span>
          </span>
          <span className="flip-face flip-back soft-card brand-back flex flex-col overflow-hidden p-5 text-white">
            <span className="flex items-center gap-2">
              <img src="/logo-mark.png" alt="" className="h-7 w-7 rounded-[8px] bg-white/90 p-0.5" />
              <span className="text-[0.74rem] font-extrabold uppercase tracking-[0.12em]">ApplyScout fix</span>
            </span>
            <span className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/15" />
            <span className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/10" />
            <span className="relative mx-auto mt-2.5 grid h-[96px] w-[78%] place-items-center rounded-[20px] bg-[#FFF6EE]/95">
              <motion.img
                src={r.artFix}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                initial={false}
                animate={flipped ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.6, opacity: 0, y: 8 }}
                transition={flipped ? { type: "spring", stiffness: 320, damping: 15, delay: 0.32 } : { duration: 0.15 }}
                className="pointer-events-none h-[80px] w-auto max-w-[86%] object-contain"
                data-testid={`compare-fix-art-${i}`}
              />
            </span>
            <span className="relative mt-auto flex items-start gap-2.5">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[#2C8F6B]"><Check size={14} strokeWidth={3} /></span>
              <span className="font-display text-[1.15rem] leading-[1.15]" data-testid={`compare-fix-${i}`}>{r.fix}</span>
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
};

/* illustrative "volume vs fit" visual: same job hunt, two approaches */
const OURS = [
  { role: "Product Ops Lead", out: "Interview invite", tone: "win" },
  { role: "Operations Analyst", out: "Recruiter replied", tone: "win" },
  { role: "Programme Manager", out: "Interview invite", tone: "win" },
  { role: "Strategy Associate", out: "In review", tone: "wait" },
  { role: "BizOps Manager", out: "In review", tone: "wait" },
];

const VolumeVsFit = () => {
  const ref = useRef(null);
  const go = useInView(ref, { once: true, amount: 0.35 });
  return (
    <div ref={ref} data-testid="volume-vs-fit">
      <Reveal className="mx-auto max-w-[36rem] text-center">
        <h3 className="font-display text-[1.7rem] leading-[1.1] text-ink sm:text-[2.2rem]">More applications ≠ more interviews.</h3>
        <p className="mt-2 text-[0.95rem] font-medium text-slate">Same job hunt. Two ways to do it.</p>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* the usual way */}
        <div className="white-card flex flex-col p-6 hover:translate-y-0" data-testid="vvf-others">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.74rem] font-bold uppercase tracking-[0.14em] text-[#B1305F]">Mass-apply bots</p>
              <p className="font-display mt-1 text-[1.25rem] leading-tight text-ink">100 copy-paste applications</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#FFE3EC] text-[#B1305F]"><X size={20} strokeWidth={3} /></span>
          </div>
          <div className="mx-auto mt-5 grid h-[210px] w-[210px] grid-cols-10 gap-[3px]">
            {Array.from({ length: 100 }, (_, k) => (
              <motion.span
                key={k}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={go ? { opacity: 1, scale: 1, backgroundColor: k === 63 ? "#2C8F6B" : "#C3CADB" } : {}}
                transition={{ delay: 0.2 + k * 0.01, duration: 0.25 }}
                className={`grid place-items-center rounded-[4px] text-white ${k === 63 ? "ring-4 ring-[#BEEBC5]" : ""}`}
                style={{ backgroundColor: "#8FA0C2" }}
              >
                <Mail size={10} />
              </motion.span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-[0.78rem] font-semibold text-slate">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-[3px] bg-[#C3CADB]" /> Ignored</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-[3px] bg-[#2C8F6B]" /> Got a reply</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.5 }}
            className="mt-auto pt-5 text-center">
            <p className="font-display text-[1.5rem] text-ink"><span className="text-[#B1305F]">99 ignored</span> · 1 reply</p>
            <p className="text-[0.84rem] font-medium text-slate">Recruiters skim past generic, auto-filled applications.</p>
          </motion.div>
        </div>

        {/* applyscout */}
        <div className="white-card flex flex-col p-6 ring-2 ring-[var(--accent)] hover:translate-y-0" data-testid="vvf-ours">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.74rem] font-bold uppercase tracking-[0.14em] text-accent">ApplyScout</p>
              <p className="font-display mt-1 text-[1.25rem] leading-tight text-ink">5 tailored applications you approved</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E2F6E6] text-[#2C8F6B]"><Check size={20} strokeWidth={3} /></span>
          </div>
          <ul className="mt-5 space-y-2">
            {OURS.map((o, k) => (
              <motion.li
                key={o.role}
                initial={{ opacity: 0, x: 30 }}
                animate={go ? { opacity: 1, x: 0 } : {}}
                transition={{ type: "spring", stiffness: 150, damping: 18, delay: 0.3 + k * 0.12 }}
                className="pcard flex items-center gap-3 rounded-[14px] px-3 py-2.5"
                style={{ backgroundColor: `var(--card-${k + 1})` }}
              >
                <Mail size={15} className="shrink-0 text-ink/60" />
                <span className="min-w-0 flex-1 truncate text-[0.86rem] font-bold text-ink">{o.role}</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={go ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.1 + k * 0.15, type: "spring", stiffness: 380, damping: 16 }}
                  className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[0.72rem] font-bold ${o.tone === "win" ? "bg-[#2C8F6B] text-white" : "bg-white/80 text-ink/60"}`}
                >
                  {o.tone === "win" ? <CalendarCheck size={12} /> : <Clock size={12} />} {o.out}
                </motion.span>
              </motion.li>
            ))}
          </ul>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ delay: 2 }}
            className="mt-auto pt-5 text-center">
            <p className="font-display text-[1.5rem] text-ink">Fewer sent. <span className="text-[#2C8F6B]">More conversations.</span></p>
            <p className="text-[0.84rem] font-medium text-slate">Each one matched to you and written from your real facts.</p>
          </motion.div>
        </div>
      </div>
      <p className="mt-4 text-center text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-slate/70" data-testid="illustrative-label">
        Illustrative example, not measured data
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

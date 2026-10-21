import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { CalendarCheck, Check, FileText, Mail, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { EASE, Reveal } from "./Bits";
import { CompanyLogo } from "./Extras";
import { useLiveJobs } from "./live";
import { AVATARS, FOX_CALENDAR, FOX_MAGNIFIER, FOX_SORTING } from "./assets";

export const BEATS = [
  "Your resume becomes facts you confirm.",
  "Poor fits get filtered out.",
  "Drafts cite your facts. Nothing invented.",
  "Nothing sends until you approve.",
  "We reach the right person, with your OK.",
  "The goal: an interview invite.",
];

const FACTS = [
  { t: "6 yrs product ops", c: "#6C4BC4", bg: "#EEE6FB" },
  { t: "Rebuilt onboarding flow", c: "#2C8F6B", bg: "#E2F6E6" },
  { t: "SQL + Looker", c: "#B26A00", bg: "#FFF0DA" },
  { t: "Open to remote", c: "#0F7FA3", bg: "#DFF4FA" },
];

/** Ticks 0..n on a timer after mount; jumps straight to n with reduced motion. */
const useSteps = (n, ms = 650, start = 300) => {
  const reduce = useReducedMotion();
  const [s, setS] = useState(reduce ? n : 0);
  useEffect(() => {
    if (reduce) return undefined;
    const ids = [];
    for (let i = 1; i <= n; i += 1) ids.push(setTimeout(() => setS(i), start + i * ms));
    return () => ids.forEach(clearTimeout);
  }, [n, ms, start, reduce]);
  return s;
};

const FoxArt = ({ src, className = "" }) => (
  <motion.img
    src={src}
    alt=""
    aria-hidden="true"
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.25 }}
    className={`pointer-events-none absolute select-none drop-shadow-[0_18px_22px_rgba(22,33,58,0.18)] ${className}`}
  />
);

/* ---------- 1. resume -> fact chips ---------- */
const SceneFacts = () => {
  const s = useSteps(9, 380);
  return (
    <div className="relative h-full w-full" data-testid="story-scene-0">
      <motion.div
        initial={{ y: -160, rotate: -14, opacity: 0 }}
        animate={{ y: 0, rotate: -4, opacity: 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 13 }}
        className="absolute left-[6%] top-[14%] w-[38%] max-w-[190px] rounded-[18px] bg-white p-4 shadow-[0_24px_40px_-24px_rgba(22,33,58,0.6)]"
      >
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent"><FileText size={15} /></span>
          <span className="h-2.5 w-16 rounded-full bg-ink/80" />
        </div>
        {[90, 70, 84, 60, 76, 50, 88].map((w, i) => (
          <motion.span
            key={i}
            className="mt-2.5 block h-2 rounded-full"
            style={{ width: `${w}%`, backgroundColor: s > 0 && i < 4 && s > i + 1 ? FACTS[i].bg : "#EEF1F7" }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>

      <div className="absolute right-[5%] top-[12%] flex w-[48%] flex-col gap-2.5">
        {FACTS.map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0, x: -140, scale: 0.6 }}
            animate={s > i + 1 ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 170, damping: 16 }}
            className="flex items-center justify-between gap-2 rounded-full py-2 pl-3 pr-2 text-[0.76rem] font-bold sm:pl-4 sm:text-[0.85rem]"
            style={{ backgroundColor: f.bg, color: f.c }}
          >
            <span className="truncate">{f.t}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={s > i + 5 ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 14 }}
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white"
            >
              <Check size={13} strokeWidth={3} />
            </motion.span>
          </motion.div>
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          animate={s >= 9 ? { opacity: 1 } : {}}
          className="pl-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-ink/50"
        >
          4 facts locked by you
        </motion.p>
      </div>
      <FoxArt src={FOX_MAGNIFIER} className="bottom-[-4%] left-[10%] w-[30%] max-w-[170px]" />
    </div>
  );
};

/* ---------- 2. stream of jobs, poor fits filtered ---------- */
const FIT = [true, false, true, false, false, true];
const SceneFilter = () => {
  const { jobs } = useLiveJobs("all", 6);
  const list = jobs.length ? jobs.slice(0, 6) : [];
  const s = useSteps(list.length + 3, 420);
  const shown = list.slice(0, Math.min(s, list.length));
  const judged = s > list.length;
  const cleared = s > list.length + 1;
  return (
    <div className="relative h-full w-full" data-testid="story-scene-1">
      <div className="absolute left-[5%] top-[8%] flex w-[58%] flex-col gap-2">
        <AnimatePresence initial={false}>
          {shown.map((j, i) => (cleared && !FIT[i] ? null : (
            <motion.div
              key={j.id}
              layout
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -120, height: 0, marginTop: 0, transition: { duration: 0.45, ease: EASE } }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
              className={`flex items-center gap-2.5 overflow-hidden rounded-[14px] bg-white px-3 py-2 shadow-[0_8px_18px_-14px_rgba(22,33,58,0.6)] ring-2 transition-colors duration-500 ${
                judged ? (FIT[i] ? "ring-[#2C8F6B]" : "opacity-60 ring-[#E1457B]") : "ring-transparent"
              }`}
            >
              <CompanyLogo name={j.company} domain={j.domain} src={j.logo} size={28} />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-[0.8rem] font-bold text-ink">{j.title}</p>
                <p className="truncate text-[0.7rem] font-semibold text-slate">{j.company}</p>
              </div>
              {judged && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-white ${FIT[i] ? "bg-[#2C8F6B]" : "bg-[#E1457B]"}`}
                >
                  {FIT[i] ? <Check size={13} strokeWidth={3} /> : <X size={13} strokeWidth={3} />}
                </motion.span>
              )}
            </motion.div>
          )))}
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={cleared ? { opacity: 1, y: 0 } : {}}
        className="absolute bottom-[8%] left-[5%] rounded-full bg-ink px-4 py-2 text-[0.8rem] font-bold text-white"
      >
        3 worth your time
      </motion.div>
      <FoxArt src={FOX_SORTING} className="bottom-[-2%] right-[2%] w-[38%] max-w-[200px]" />
    </div>
  );
};

/* ---------- 3. draft that cites facts ---------- */
const SENTENCES = [
  { t: "I've spent six years in product operations", f: 0 },
  { t: "and rebuilt an onboarding flow end to end.", f: 1 },
  { t: "I report in SQL and Looker every week.", f: 2 },
];
const Typed = ({ text, run, onDone }) => {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (!run || reduce) return undefined;
    const id = setInterval(() => setN((v) => Math.min(text.length, v + 1)), 26);
    return () => clearInterval(id);
  }, [run, text, reduce]);
  useEffect(() => {
    if (run && n >= text.length) onDone?.();
  }, [run, n, text.length, onDone]);
  return <>{text.slice(0, run ? n : 0)}</>;
};

const SceneDraft = () => {
  const [done, setDone] = useState(0);
  const reduce = useReducedMotion();
  const finish = useCallback((i) => setDone((d) => Math.max(d, i + 1)), []);
  const handlers = useRef(SENTENCES.map((_, i) => () => finish(i))).current;
  const all = reduce ? 4 : done;
  const fake = all >= 3;
  const [cutReady, setCutReady] = useState(false);
  useEffect(() => {
    if (!fake) return undefined;
    const id = setTimeout(() => setCutReady(true), 1100);
    return () => clearTimeout(id);
  }, [fake]);

  return (
    <div className="relative h-full w-full" data-testid="story-scene-2">
      <div className="absolute left-[5%] top-[10%] flex w-[34%] flex-col gap-2">
        {FACTS.slice(0, 3).map((f, i) => (
          <motion.span
            key={f.t}
            animate={all > i ? { scale: [1, 1.08, 1], boxShadow: `0 0 0 3px ${f.c}` } : { boxShadow: "0 0 0 0px transparent" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 rounded-[14px] px-2.5 py-1.5 text-[0.7rem] font-bold leading-tight sm:px-3 sm:text-[0.76rem]"
            style={{ backgroundColor: f.bg, color: f.c }}
          >
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white text-[0.6rem]">{i + 1}</span>
            <span>{f.t}</span>
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="absolute right-[5%] top-[8%] w-[56%] rounded-[18px] bg-white p-4 text-[0.86rem] leading-relaxed text-ink shadow-[0_24px_40px_-24px_rgba(22,33,58,0.6)]"
      >
        <p className="mb-2 flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink/45"><Sparkles size={12} /> Draft</p>
        {SENTENCES.map((s, i) => (
          <span key={s.t}>
            <Typed text={`${s.t} `} run={all >= i} onDone={handlers[i]} />
            {all > i && (
              <motion.sup initial={{ scale: 0 }} animate={{ scale: 1 }} className="mr-1 rounded-full px-1.5 py-0.5 text-[0.62rem] font-extrabold"
                style={{ backgroundColor: FACTS[s.f].bg, color: FACTS[s.f].c }}>{s.f + 1}</motion.sup>
            )}
          </span>
        ))}
        <AnimatePresence>
          {fake && !cutReady && (
            <motion.span key="fake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}
              className="mt-1 block text-[#E1457B] line-through decoration-2">Managed a team of 40.</motion.span>
          )}
        </AnimatePresence>
        {cutReady && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-1.5 rounded-full bg-[#FFE3EC] px-3 py-1.5 text-[0.72rem] font-bold text-[#B1305F]">
            <X size={12} /> No fact behind it — cut
          </motion.p>
        )}
      </motion.div>
      <FoxArt src={FOX_MAGNIFIER} className="bottom-[-4%] left-[4%] w-[30%] max-w-[170px]" />
    </div>
  );
};

/* ---------- 4. cursor presses approve ---------- */
const SceneApprove = () => {
  const s = useSteps(4, 700, 200);
  const { jobs } = useLiveJobs("all", 5);
  const j = jobs[0];
  return (
    <div className="relative h-full w-full overflow-hidden" data-testid="story-scene-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
        className="absolute inset-x-0 top-[12%] mx-auto w-[78%] max-w-[360px] rounded-[22px] bg-white p-5 shadow-[0_28px_50px_-26px_rgba(22,33,58,0.6)]"
      >
        <div className="flex items-center gap-2.5">
          <CompanyLogo name={j?.company || "Role"} domain={j?.domain} size={34} />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[0.9rem] font-bold text-ink">{j?.title || "Your next role"}</p>
            <p className="text-[0.74rem] font-semibold text-slate">{j?.company || "Live posting"} · draft ready</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {[92, 80, 64].map((w) => <span key={w} className="block h-2 rounded-full bg-[#EEF1F7]" style={{ width: `${w}%` }} />)}
        </div>
        <motion.button
          type="button"
          tabIndex={-1}
          animate={s === 2 ? { scale: 0.92 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-4 text-[1.05rem] font-extrabold transition-colors duration-300 ${s >= 3 ? "bg-[#2C8F6B] text-white" : "pill-ink"}`}
        >
          {s >= 3 ? <><Check size={18} strokeWidth={3} /> Approved</> : "Approve?"}
        </motion.button>
        {s >= 4 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-[0.76rem] font-bold text-slate">
            Sent by you, on your say-so.
          </motion.p>
        )}
        <motion.svg
          width="34" height="34" viewBox="0 0 24 24" className="pointer-events-none absolute left-[56%] top-[150px] drop-shadow-[0_6px_8px_rgba(22,33,58,0.35)]"
          initial={{ x: 160, y: 140, opacity: 0 }}
          animate={s >= 1 ? { x: 0, y: 0, opacity: 1, scale: s === 2 ? 0.85 : 1 } : { opacity: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
        >
          <path d="M4 2 L4 20 L9 15 L12.5 22 L15.5 20.6 L12 13.8 L19 13.8 Z" fill="#16213A" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>

      {s >= 3 && (
        <motion.span initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }} animate={{ x: 220, y: -200, opacity: 0, rotate: 20 }}
          transition={{ duration: 1.2, ease: EASE }} className="absolute left-1/2 top-[58%] text-accent">
          <Send size={26} />
        </motion.span>
      )}

    </div>
  );
};

/* ---------- 5. find the right person, send a note ---------- */
const PEOPLE = [
  { role: "Recruiter", av: 1 },
  { role: "Hiring manager", av: 2, pick: true },
  { role: "Team engineer", av: 3 },
];
const SceneReach = () => {
  const s = useSteps(6, 520, 200);
  const { jobs } = useLiveJobs("all", 5);
  const j = jobs[1] || jobs[0];
  const scan = Math.min(s, 3) - 1; // 0,1,2 highlight sweep
  const found = s >= 4;
  return (
    <div className="relative h-full w-full overflow-hidden" data-testid="story-scene-4">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        className="absolute inset-x-0 top-[5%] mx-auto flex w-fit items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-[0_8px_18px_-12px_rgba(22,33,58,0.6)]">
        <CompanyLogo name={j?.company || "Company"} domain={j?.domain} src={j?.logo} size={28} />
        <span className="max-w-[220px] truncate text-[0.8rem] font-bold text-ink">Who decides at {j?.company || "the company"}?</span>
      </motion.div>

      <div className="absolute inset-x-0 top-[18%] flex justify-center gap-3 px-4 sm:top-[22%]">
        {PEOPLE.map((p, i) => {
          const lit = found ? p.pick : scan === i;
          return (
            <motion.div
              key={p.role}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: found && !p.pick ? 0.4 : 1, y: 0, scale: found && p.pick ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 170, damping: 16, delay: i * 0.1 }}
              className={`relative flex w-[30%] max-w-[120px] flex-col items-center rounded-[18px] bg-white px-2 pb-2 pt-3 sm:pb-3 sm:pt-4 shadow-[0_12px_24px_-16px_rgba(22,33,58,0.6)] ring-2 transition-colors duration-300 ${lit ? "ring-[var(--accent)]" : "ring-transparent"}`}
            >
              <img src={AVATARS[p.av % AVATARS.length]} alt="" className="h-9 w-9 rounded-full object-cover sm:h-11 sm:w-11" />
              <p className="mt-2 text-center text-[0.72rem] font-bold leading-tight text-ink">{p.role}</p>
              {found && p.pick && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 14 }}
                  className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-[#2C8F6B] text-white">
                  <Check size={14} strokeWidth={3} />
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>

      {s >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 16 }}
          className="absolute inset-x-0 bottom-[4%] mx-auto w-[88%] max-w-[380px] rounded-[20px] rounded-bl-[6px] bg-ink p-3 sm:bottom-[7%] sm:p-4 text-white shadow-[0_24px_40px_-20px_rgba(22,33,58,0.8)]"
        >
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-bold"><Mail size={11} /> Email</span>
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-bold"><MessageCircle size={11} /> Chat</span>
            <span className="ml-auto text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white/50">to hiring manager</span>
          </div>
          <p className="mt-2 line-clamp-2 text-[0.8rem] leading-snug sm:mt-2.5 sm:text-[0.86rem]">Hi — I just applied for {j?.title ? <b>{j.title}</b> : "the role"}. Two lines on why I fit…</p>
          {s >= 6 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 flex items-center gap-1.5 text-[0.74rem] font-bold text-[#BEEBC5]">
              <Check size={13} strokeWidth={3} /> Sent after you said yes
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  );
};

/* ---------- 6. interview invite ---------- */
const DOTS = Array.from({ length: 14 }, (_, i) => ({
  a: (i / 14) * Math.PI * 2, d: 90 + (i % 3) * 30,
  c: ["#FFC2D6", "#BEEBC5", "#FFE59B", "#A9E4F2", "#DCC9F7"][i % 5],
}));
const SceneInvite = () => {
  const s = useSteps(2, 500, 200);
  return (
    <div className="relative h-full w-full" data-testid="story-scene-5">
      <motion.div
        initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: -2 }}
        transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.2 }}
        className="absolute left-[7%] top-[14%] w-[52%] max-w-[270px] overflow-hidden rounded-[22px] bg-white shadow-[0_30px_50px_-24px_rgba(22,33,58,0.6)]"
      >
        <div className="flex items-center gap-2 bg-bubble px-4 py-3 text-[#8A2F52]">
          <CalendarCheck size={16} /> <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.14em]">Invite</span>
        </div>
        <div className="p-4">
          <p className="font-display text-[1.35rem] leading-tight text-ink">Interview</p>
          <p className="font-display text-[1.35rem] leading-tight text-accent">Tue · 11:00</p>
          <p className="mt-1 text-[0.78rem] font-semibold text-slate">with the hiring team</p>
          <motion.div
            animate={s >= 2 ? { scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="mt-4 rounded-full bg-[#2C8F6B] py-2.5 text-center text-[0.88rem] font-bold text-white"
          >
            Accept
          </motion.div>
        </div>
      </motion.div>
      {s >= 1 && DOTS.map((d) => (
        <motion.span
          key={d.a}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
          animate={{ x: Math.cos(d.a) * d.d, y: Math.sin(d.a) * d.d, opacity: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE }}
          className="absolute left-[33%] top-[42%] h-3 w-3 rounded-full"
          style={{ backgroundColor: d.c }}
        />
      ))}
      <FoxArt src={FOX_CALENDAR} className="bottom-[-3%] right-[1%] w-[44%] max-w-[230px]" />
    </div>
  );
};

const SCENES = [SceneFacts, SceneFilter, SceneDraft, SceneApprove, SceneReach, SceneInvite];

const Stage = ({ beat, className = "" }) => {
  const Scene = SCENES[beat];
  return (
    <div className={`sky-soft relative overflow-hidden rounded-[2rem] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={beat}
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02, y: -16 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute inset-0"
        >
          <Scene />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Header = () => (
  <Reveal className="mx-auto max-w-[40rem] text-center">
    <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-accent">How it works</p>
    <h2 className="font-display mt-3 text-[2.1rem] leading-[1.05] text-ink sm:text-[3rem]">Resume in. Interview out.</h2>
  </Reveal>
);

const MobileBeat = ({ i }) => {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.45 });
  const Scene = SCENES[i];
  return (
    <div ref={ref} className="mt-10" data-testid={`story-beat-mobile-${i}`}>
      <p className="font-display flex items-baseline gap-3 text-[1.35rem] leading-tight text-ink">
        <span className="text-[0.9rem] text-accent">0{i + 1}</span>{BEATS[i]}
      </p>
      <div className="sky-soft relative mt-4 h-[330px] overflow-hidden rounded-[1.6rem]">
        {seen && <div className="absolute inset-0"><Scene /></div>}
      </div>
    </div>
  );
};

export const MotionStory = () => {
  const ref = useRef(null);
  const [beat, setBeat] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const fill = useTransform(smooth, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (p) => setBeat(Math.min(BEATS.length - 1, Math.max(0, Math.floor(p * BEATS.length)))));

  const jump = (i) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const y = top + span * ((i + 0.5) / BEATS.length);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="how" className="scroll-mt-28 px-3 pt-16 sm:px-5 md:pt-24" data-testid="motion-story">
      <Header />

      {/* desktop: scroll-pinned stage */}
      <div ref={ref} className="relative mx-auto hidden h-[540vh] max-w-[1100px] md:block">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="grid w-full grid-cols-12 items-center gap-8">
            <ol className="col-span-5 space-y-2" data-testid="story-captions">
              {BEATS.map((b, i) => (
                <li key={b}>
                  <button
                    onClick={() => jump(i)}
                    data-testid={`story-caption-${i}`}
                    className={`flex w-full items-baseline gap-4 rounded-2xl px-4 py-3 text-left transition-all duration-500 ${beat === i ? "bg-white shadow-[0_14px_34px_-22px_rgba(22,33,58,0.6)]" : "opacity-45 hover:opacity-80"}`}
                  >
                    <span className="font-display text-[0.95rem] text-accent">0{i + 1}</span>
                    <span className={`font-display leading-tight text-ink transition-all duration-500 ${beat === i ? "text-[1.55rem]" : "text-[1.15rem]"}`}>{b}</span>
                  </button>
                </li>
              ))}
              <li className="px-4 pt-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white">
                  <motion.div className="h-full rounded-full bg-[var(--accent)]" style={{ width: fill }} />
                </div>
              </li>
            </ol>
            <Stage beat={beat} className="col-span-7 h-[460px]" />
          </div>
        </div>
      </div>

      {/* mobile: stacked beats that play when they scroll in */}
      <div className="mx-auto max-w-[560px] pb-4 md:hidden">
        {BEATS.map((b, i) => <MobileBeat key={b} i={i} />)}
      </div>
    </section>
  );
};

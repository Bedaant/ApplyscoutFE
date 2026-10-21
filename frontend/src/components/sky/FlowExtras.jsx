import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, Loader2, MapPin } from "lucide-react";
import { EASE } from "./Bits";
import { CompanyLogo } from "./Extras";
import { API, daysAgo, useLiveJobs } from "./live";
import { getRef } from "./Invite";
import { Maggie } from "./FlowParts";
import { track } from "./track";

export const okEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((e || "").trim());
export const savedEmail = () => { try { return localStorage.getItem("as-signup") || ""; } catch { return ""; } };

/** Join the real early-access list from inside the flow (no event ever carries the address). */
export const saveEmail = async (email, source) => {
  const { data } = await axios.post(`${API}/signups`, { email: email.trim(), source, ref: getRef() });
  try { localStorage.setItem("as-signup", data.email); } catch { /* ignore */ }
  window.dispatchEvent(new Event("as-signed-up"));
  return data.email;
};

/* ---------- step counter: "Step 2 of 6 · about 1 minute left" ---------- */
export const FLOW_STEPS = ["about", "search", "pick", "facts", "draft"];
const LEFT = ["about 2 minutes left", "about 1 minute left", "about 1 minute left", "under a minute left", "about 30 seconds left", "last step"];

export const StepMeter = ({ step, paywall }) => {
  const idx = FLOW_STEPS.indexOf(step);
  const n = paywall ? 6 : idx + 1;
  const after = idx < 0;
  return (
    <div className="mx-auto mt-3 max-w-[640px]" data-testid="flow-step-meter">
      <div className="mb-1.5 flex items-center justify-between text-[0.76rem] font-bold text-slate">
        <span data-testid="flow-step-counter">{after ? "Preview · after payment" : `Step ${n} of 6`}</span>
        {!after && <span data-testid="flow-time-left">{LEFT[n - 1]}</span>}
      </div>
      <div className="flex gap-1.5" data-testid="flow-progress">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white">
            <motion.span className="block h-full rounded-full bg-[var(--accent)]" initial={false}
              animate={{ width: after || i < n ? "100%" : "0%" }} transition={{ duration: 0.5, delay: after ? 0 : 0.05 * i, ease: EASE }} />
          </span>
        ))}
      </div>
    </div>
  );
};

/* ---------- resume wait: live jobs rotate so it never looks frozen ---------- */
const WAIT_LINES = ["Reading your resume…", "Picking out your strongest facts…", "Checking today's live roles…", "Matching titles and cities…", "Almost there…"];

export const ReadingWait = () => {
  const { jobs } = useLiveJobs("all", 8);
  const [i, setI] = useState(0);
  const [line, setLine] = useState(0);
  useEffect(() => {
    const a = setInterval(() => setI((x) => x + 1), 2400);
    const b = setInterval(() => setLine((x) => Math.min(x + 1, WAIT_LINES.length - 1)), 4200);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);
  const job = jobs.length ? jobs[i % jobs.length] : null;
  return (
    <div className="space-y-5" data-testid="reading-wait">
      <Maggie img="/art/fox-magnifier.webp" line={WAIT_LINES[line]} />
      <div className="rounded-[26px] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(22,33,58,0.55)] sm:p-6">
        <div className="flex items-center justify-between text-[0.78rem] font-bold text-slate">
          <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin text-accent" /> About 20 seconds</span>
          <span>Your file isn't kept</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-page">
          <motion.div className="h-full rounded-full bg-[var(--accent)]" initial={{ width: "4%" }} animate={{ width: "92%" }} transition={{ duration: 22, ease: [0.1, 0.6, 0.3, 1] }} />
        </div>
        <p className="mt-5 flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-slate/80">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2C8F6B] opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2C8F6B]" /></span>
          Live right now
        </p>
        <div className="relative mt-2 h-[86px] overflow-hidden">
          <AnimatePresence mode="popLayout">
            {job && (
              <motion.div key={`${job.id}-${i}`} initial={{ y: 60, opacity: 0, rotate: 2 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: -60, opacity: 0, rotate: -2 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="absolute inset-x-0 flex items-center gap-3 rounded-[18px] bg-page p-3.5" data-testid="reading-wait-job">
                <CompanyLogo name={job.company} domain={job.domain} src={job.logo} size={40} />
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate font-display text-[1.02rem] text-ink">{job.title}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 truncate text-[0.8rem] font-semibold text-slate"><b className="text-ink">{job.company}</b><MapPin size={11} />{job.location} · {daysAgo(job.posted_at)}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ---------- soft, skippable email step after matches ---------- */
export const SaveMatches = ({ onSaved, onSkip }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");
  const save = async (e) => {
    e.preventDefault();
    if (!okEmail(email)) { setErr("That email doesn't look right."); return; }
    setErr(""); setState("busy");
    try {
      const saved = await saveEmail(email, "flow");
      track("email_saved", { src: "matches" });
      setState("done");
      setTimeout(() => onSaved(saved), 1100);
    } catch { setState("idle"); setErr("Couldn't save just now. Try again or skip."); }
  };
  return (
    <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
      className="rounded-[26px] border-2 border-dashed border-[var(--accent)]/35 bg-white p-5 sm:p-6" data-testid="save-matches-card">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"><Bell size={18} /></span>
        <div>
          <p className="font-display text-[1.12rem] leading-tight text-ink">Save these matches and get tomorrow's fresh ones</p>
          <p className="mt-1 text-[0.8rem] font-semibold text-slate">Optional. You'll join early access; morning emails start when sending opens.</p>
        </div>
      </div>
      {state === "done" ? (
        <p className="tick-in mt-4 flex items-center justify-center gap-2 rounded-full bg-[#E2F6E6] py-3 text-[0.92rem] font-bold text-[#1F7A52]" data-testid="save-matches-done"><Check size={16} strokeWidth={3} /> Saved. On to your jobs…</p>
      ) : (
        <form onSubmit={save} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" data-testid="save-matches-email"
            className="field min-w-0 flex-1 rounded-full px-4 py-3 text-[0.95rem] font-medium text-ink" />
          <button disabled={state === "busy"} className="pill-ink flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.92rem] font-bold disabled:opacity-60" data-testid="save-matches-btn">
            {state === "busy" ? <Loader2 size={15} className="animate-spin" /> : null} Save
          </button>
        </form>
      )}
      {err && <p className="mt-2 text-[0.8rem] font-bold text-[#C2365C]" data-testid="save-matches-error">{err}</p>}
      {state !== "done" && (
        <button onClick={() => { track("email_skipped"); onSkip(); }} className="mx-auto mt-3 block text-[0.9rem] font-bold text-slate underline decoration-2 underline-offset-4 hover:text-ink" data-testid="save-matches-skip">
          Skip for now
        </button>
      )}
    </motion.div>
  );
};

/* ---------- leave protection ---------- */
export const LeaveSheet = ({ email, onStay, onLeave }) => {
  const [val, setVal] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const saveLeave = async () => {
    if (!okEmail(val)) { setErr("Add a valid email, or leave anyway."); return; }
    setBusy(true);
    try { await saveEmail(val, "flow_leave"); track("email_saved", { src: "leave" }); onLeave(); } catch { setBusy(false); setErr("Couldn't save just now."); }
  };
  return (
    <motion.div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/30 backdrop-blur-[3px] sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onStay} data-testid="leave-sheet">
      <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ type: "spring", stiffness: 240, damping: 26 }}
        className="w-full max-w-[420px] rounded-t-[28px] bg-white p-6 sm:rounded-[28px]">
        <img src="/art/fox-peek2.webp" alt="" className="mx-auto h-[70px]" />
        <p className="font-display mt-2 text-center text-[1.35rem] leading-tight text-ink" data-testid="leave-title">Leave now?</p>
        {email ? (
          <p className="mt-1 text-center text-[0.92rem] font-semibold text-slate">This search will close. You're on the list as <b className="text-ink">{email}</b>.</p>
        ) : (
          <>
            <p className="mt-1 text-center text-[0.92rem] font-semibold text-slate">Your matches will be lost. Save them by email.</p>
            <input value={val} onChange={(e) => setVal(e.target.value)} type="email" placeholder="you@email.com" data-testid="leave-email" className="field mt-4 w-full rounded-full px-4 py-3 text-[0.95rem] font-medium text-ink" />
            {err && <p className="mt-2 text-center text-[0.8rem] font-bold text-[#C2365C]">{err}</p>}
            <button onClick={saveLeave} disabled={busy} className="pill-pink mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full text-[0.95rem] font-bold disabled:opacity-60" data-testid="leave-save-btn">
              {busy && <Loader2 size={15} className="animate-spin" />} Save & leave
            </button>
          </>
        )}
        <div className="mt-2 flex gap-2">
          <button onClick={onStay} className="pill-ink h-12 flex-1 rounded-full text-[0.95rem] font-bold" data-testid="leave-stay-btn">Stay</button>
          <button onClick={onLeave} className="h-12 flex-1 rounded-full bg-page text-[0.95rem] font-bold text-slate" data-testid="leave-anyway-btn">{email ? "Leave" : "Leave anyway"}</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

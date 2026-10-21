import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, FileUp, Inbox, Loader2, Mail, MapPin, Pause, Pencil, Play, RefreshCw, Send, Sparkles, Undo2, X } from "lucide-react";
import { EASE, Logo } from "./Bits";
import { CompanyLogo } from "./Extras";
import { Celebrate } from "./Celebrate";
import { API, daysAgo } from "./live";
import { AVATARS } from "./assets";
import { DemoNote, GmailConsent, Maggie, Paywall, Unmask } from "./FlowParts";

const STEPS = ["about", "search", "pick", "facts", "draft", "paid", "gmail", "review", "sent"];
const CITIES = ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Remote", "London", "Berlin", "New York", "San Francisco"];
const YEARS = [["0–1", 1], ["1–3", 2], ["3–5", 4], ["5–8", 6], ["8+", 9]];
const TAG_COLORS = [["#6C4BC4", "#EEE6FB"], ["#2C8F6B", "#E2F6E6"], ["#B26A00", "#FFF0DA"], ["#0F7FA3", "#DFF4FA"], ["#C2365C", "#FFE3EC"]];
const SEARCH_STEPS = ["Reading your resume", "Matching roles", "Finding people", "Ranking best fits"];

const Card = ({ children, className = "", ...rest }) => <div {...rest} className={`rounded-[26px] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(22,33,58,0.55)] sm:p-6 ${className}`}>{children}</div>;
const Primary = ({ children, className = "", ...p }) => (
  <button {...p} className={`pill-pink inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.98rem] font-bold disabled:opacity-50 ${className}`}>{children}</button>
);
const Chip = ({ on, children, ...p }) => (
  <button type="button" {...p} className={`rounded-full px-3.5 py-2 text-[0.85rem] font-bold transition-colors ${on ? "bg-ink text-white" : "bg-page text-slate hover:text-ink"}`}>{children}</button>
);

/* ---------- step: about you ---------- */
const About = ({ onDone }) => {
  const [mode, setMode] = useState("resume");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const [years, setYears] = useState(null);
  const [locs, setLocs] = useState([]);
  const [custom, setCustom] = useState("");
  const fileRef = useRef(null);

  const upload = async (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setMsg("That file is over 5 MB. Try a smaller one, or type the three fields."); return; }
    setBusy(true); setMsg("");
    try {
      const fd = new FormData(); fd.append("file", file);
      const { data } = await axios.post(`${API}/flow/resume`, fd, { timeout: 90000 });
      if (!data.readable) throw new Error("unreadable");
      onDone({ path: "resume", title: data.title, years: data.years, locations: data.locations || [], facts: data.facts || [] });
    } catch (e) {
      setBusy(false); setMode("manual");
      setMsg(e?.response?.status === 415 ? "I can read PDF, Word (.docx) or text files. Or just type three fields:" : "I couldn't read that resume, and I won't guess. Type three quick fields instead:");
    }
  };
  const toggle = (c) => setLocs((l) => (l.includes(c) ? l.filter((x) => x !== c) : [...l, c].slice(-4)));
  const ready = title.trim() && years && locs.length;

  return (
    <div className="space-y-5">
      <Maggie line={busy ? "Reading your resume… this takes about 20 seconds." : msg || "Let's find you some interviews. Tell me about you."} img={busy ? "/art/fox-magnifier.webp" : "/art/fox-wave.webp"} />
      <div className="mx-auto flex w-fit gap-1 rounded-full bg-white p-1 shadow-sm">
        {[["resume", "Upload resume"], ["manual", "Type 3 fields"]].map(([k, l]) => (
          <button key={k} onClick={() => setMode(k)} disabled={busy} data-testid={`about-${k}-tab`} className={`relative rounded-full px-4 py-2 text-[0.88rem] font-bold ${mode === k ? "text-white" : "text-slate"}`}>
            {mode === k && <motion.span layoutId="about-tab" className="absolute inset-0 rounded-full bg-ink" />}<span className="relative">{l}</span>
          </button>
        ))}
      </div>
      {mode === "resume" ? (
        <Card>
          <button type="button" onClick={() => fileRef.current?.click()} disabled={busy} data-testid="resume-dropzone"
            onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); upload(e.dataTransfer.files?.[0]); }}
            className="flex w-full flex-col items-center gap-3 rounded-[20px] border-2 border-dashed border-[var(--accent)]/40 bg-accent-soft/50 px-4 py-10 text-center">
            {busy ? <Loader2 size={30} className="animate-spin text-accent" /> : <FileUp size={30} className="text-accent" />}
            <span className="font-display text-[1.2rem] text-ink">{busy ? "Reading…" : "Drop your resume or tap to upload"}</span>
            <span className="text-[0.82rem] font-semibold text-slate">PDF, Word or text · up to 5 MB · not stored</span>
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.docx,.txt,.md" hidden data-testid="resume-file-input" onChange={(e) => upload(e.target.files?.[0])} />
        </Card>
      ) : (
        <Card className="space-y-5">
          <label className="block">
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-slate">Job title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} placeholder="e.g. Product Manager" data-testid="manual-title-input" className="field mt-2 w-full rounded-[14px] px-4 py-3 text-[1rem] font-semibold text-ink" />
          </label>
          <div>
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-slate">Years of experience</span>
            <div className="mt-2 flex flex-wrap gap-2">{YEARS.map(([l, v]) => <Chip key={l} on={years === v} onClick={() => setYears(v)} data-testid={`years-${v}`}>{l}</Chip>)}</div>
          </div>
          <div>
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-slate">Locations</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {[...CITIES, ...locs.filter((l) => !CITIES.includes(l))].map((c) => <Chip key={c} on={locs.includes(c)} onClick={() => toggle(c)} data-testid={`loc-${c.toLowerCase().replace(/\s/g, "-")}`}>{c}</Chip>)}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); if (custom.trim()) { toggle(custom.trim()); setCustom(""); } }} className="mt-2 flex gap-2">
              <input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Add another city" maxLength={40} className="field min-w-0 flex-1 rounded-full px-4 py-2 text-[0.9rem]" data-testid="loc-custom-input" />
              <button className="rounded-full bg-page px-4 text-[0.85rem] font-bold text-ink">Add</button>
            </form>
          </div>
          <Primary disabled={!ready} onClick={() => onDone({ path: "manual", title: title.trim(), years, locations: locs, facts: [] })} className="w-full" data-testid="manual-continue-btn">
            Find my jobs <ArrowRight size={16} />
          </Primary>
        </Card>
      )}
    </div>
  );
};

/* ---------- step: search ---------- */
const Search = ({ profile, onDone }) => {
  const [tick, setTick] = useState(profile.path === "resume" ? 1 : 0);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(false);
  const run = useCallback(() => {
    setErr(false);
    axios.post(`${API}/flow/match`, { title: profile.title, locations: profile.locations, years: profile.years }).then((r) => setRes(r.data)).catch(() => setErr(true));
  }, [profile]);
  useEffect(() => { run(); }, [run]);
  useEffect(() => {
    if (tick >= 4) return undefined;
    const id = setTimeout(() => setTick((t) => t + 1), tick === 0 ? 3500 : 4500);
    return () => clearTimeout(id);
  }, [tick]);
  const done = tick >= 4 && res;
  const steps = profile.path === "resume" ? SEARCH_STEPS : ["Reading your details", ...SEARCH_STEPS.slice(1)];

  return (
    <div className="space-y-5">
      <Maggie img={done ? "/art/fox-sorting.webp" : "/art/fox-magnifier.webp"} line={err ? "The job feed didn't answer. Let's try again." : done ? (res.widened || `Found them. Here's what's live for ${profile.title}.`) : "Searching today's live postings for you…"} />
      <Card>
        <ul className="space-y-3" data-testid="search-steps">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-500 ${tick > i ? "bg-[#2C8F6B] text-white" : tick === i ? "bg-accent-soft text-accent" : "bg-page text-slate/50"}`}>
                {tick > i ? <Check size={15} strokeWidth={3} /> : tick === i ? <Loader2 size={15} className="animate-spin" /> : i + 1}
              </span>
              <span className={`text-[1rem] font-bold ${tick >= i ? "text-ink" : "text-slate/50"}`}>{s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-page"><motion.div className="h-full rounded-full bg-[var(--accent)]" animate={{ width: `${Math.min(tick, 4) * 25}%` }} transition={{ duration: 0.8 }} /></div>
        {err && <Primary onClick={run} className="mt-4 w-full"><RefreshCw size={15} /> Try again</Primary>}
      </Card>
      <AnimatePresence>
        {done && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4" data-testid="search-results">
            <div className="grid grid-cols-3 gap-2.5">
              {[[res.count, "live matches", "match-count"], [res.companies, "companies", "company-count"], [`~${res.people_estimate}`, "people to reach", "people-count"]].map(([v, l, t]) => (
                <Card key={l} className="!p-4 text-center"><p className="font-display text-[1.8rem] leading-none text-ink" data-testid={t}>{v}</p><p className="mt-1 text-[0.76rem] font-bold text-slate">{l}</p></Card>
              ))}
            </div>
            <p className="text-center text-[0.74rem] font-semibold text-slate/80">Job counts are real, from today's feed. The people count is a sample estimate.</p>
            {res.jobs.length ? <Primary className="w-full" onClick={() => onDone(res)} data-testid="see-top-btn">See my top 3 <ArrowRight size={16} /></Primary>
              : <p className="text-center font-semibold text-slate">No live roles yet. Try a broader title.</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- step: pick a job ---------- */
const Pick = ({ jobs, offset, onPick }) => {
  const [sel, setSel] = useState(null);
  const list = jobs.slice(offset, offset + 3);
  return (
    <div className="space-y-4">
      <Maggie img="/art/fox-sorting.webp" line="Pick one. I'll write to a person there, not a job board." />
      {list.map((j) => (
        <button key={j.id} type="button" onClick={() => setSel(j)} data-testid="pick-job-card"
          className={`block w-full rounded-[24px] bg-white p-5 text-left shadow-[0_18px_40px_-28px_rgba(22,33,58,0.55)] ring-2 transition-all ${sel?.id === j.id ? "ring-[var(--accent)]" : "ring-transparent hover:ring-ink/10"}`}>
          <div className="flex items-start gap-3">
            <CompanyLogo name={j.company} domain={j.domain} src={j.logo} size={42} />
            <div className="min-w-0 flex-1">
              <p className="font-display text-[1.12rem] leading-tight text-ink">{j.title}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.82rem] font-semibold text-slate">
                <span className="font-bold text-ink">{j.company}</span><span className="flex items-center gap-1"><MapPin size={11} />{j.location}</span><span>· {daysAgo(j.posted_at)}</span>
              </p>
            </div>
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${sel?.id === j.id ? "bg-[var(--accent)] text-white" : "bg-page text-transparent"}`}><Check size={14} strokeWidth={3} /></span>
          </div>
          <div className="mt-4 space-y-2">
            {j.people.map((p) => (
              <div key={p.email} className="flex items-center gap-2.5 rounded-[14px] bg-page px-3 py-2">
                <img src={AVATARS[(p.avatar - 1) % AVATARS.length]} alt="" className="h-8 w-8 rounded-full object-cover" />
                <div className="min-w-0 flex-1 leading-tight"><p className="text-[0.86rem] font-bold text-ink">{p.name} <span className="font-semibold text-slate">· {p.role}</span></p><p className="font-mono text-[0.76rem] text-slate">{p.masked}</p></div>
                <span className="rounded-full bg-lemon px-2 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-wider text-[#7A5A00]">demo</span>
              </div>
            ))}
          </div>
          <a href={j.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="mt-3 inline-flex items-center gap-1 text-[0.82rem] font-bold text-accent" data-testid="pick-job-link">View real posting <ArrowUpRight size={13} /></a>
        </button>
      ))}
      <Primary disabled={!sel} className="sticky bottom-4 w-full" onClick={() => onPick(sel)} data-testid="pick-continue-btn">Write to {sel ? sel.people[0].name.split(" ")[0] : "them"} <ArrowRight size={16} /></Primary>
    </div>
  );
};

/* ---------- step: confirm facts ---------- */
const Facts = ({ profile, onDone }) => {
  const base = [
    profile.title && { id: "t", text: `${profile.title}${profile.years ? `, ${profile.years}+ years` : ""}`, locked: true },
    profile.locations?.length && { id: "l", text: `Based in / open to ${profile.locations.join(", ")}`, locked: true },
  ].filter(Boolean);
  const [items, setItems] = useState(() => [...base, ...profile.facts.map((t, i) => ({ id: `f${i + 1}`, text: t, on: true }))]);
  const extra = items.filter((f) => !f.locked);
  const upd = (id, patch) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const chosen = items.filter((f) => f.locked || (f.on && f.text.trim()));
  return (
    <div className="space-y-4">
      <Maggie img="/art/fox-peek2.webp" line="I'll only use what you tick." />
      <Card className="space-y-2.5" data-testid="facts-card">
        {items.map((f, i) => {
          const [c, bg] = TAG_COLORS[i % TAG_COLORS.length];
          return (
            <div key={f.id} className="flex items-center gap-2.5 rounded-[16px] px-3 py-2.5" style={{ backgroundColor: bg }} data-testid={`fact-${f.id}`}>
              {f.locked ? <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white" style={{ color: c }}><Check size={13} strokeWidth={3} /></span>
                : <button type="button" onClick={() => upd(f.id, { on: !f.on })} aria-pressed={f.on} data-testid={`fact-toggle-${f.id}`} className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 bg-white" style={{ borderColor: c, color: c }}>{f.on && <Check size={13} strokeWidth={3} />}</button>}
              {f.locked ? <span className="flex-1 text-[0.92rem] font-bold" style={{ color: c }}>{f.text}</span>
                : <input value={f.text} onChange={(e) => upd(f.id, { text: e.target.value })} maxLength={160} data-testid={`fact-input-${f.id}`} className="min-w-0 flex-1 bg-transparent text-[0.92rem] font-bold outline-none" style={{ color: c }} />}
              {f.locked ? <span className="text-[0.66rem] font-extrabold uppercase tracking-wider text-ink/40">locked</span> : <Pencil size={13} className="shrink-0 text-ink/30" />}
            </div>
          );
        })}
        {profile.path === "manual" && <p className="pt-1 text-[0.8rem] font-semibold text-slate">You typed these, so they're all I'll use. Upload a resume for richer drafts.</p>}
        {profile.path === "resume" && !extra.length && <p className="text-[0.8rem] font-semibold text-slate">I didn't find specific achievements, so I'll keep it short.</p>}
      </Card>
      <Primary className="w-full" onClick={() => onDone(chosen.map(({ id, text }) => ({ id, text })))} data-testid="facts-continue-btn">Write my draft <Sparkles size={15} /></Primary>
    </div>
  );
};

/* ---------- step: draft ---------- */
const tagStyle = (tag, facts) => {
  const i = facts.findIndex((f) => f.id === tag);
  if (i < 0) return { c: "#5A6B8C", bg: "#EEF1F7", label: tag === "job" ? "posting" : tag };
  const [c, bg] = TAG_COLORS[i % TAG_COLORS.length];
  return { c, bg, label: `fact ${i + 1}` };
};
const Draft = ({ job, person, facts, draft, setDraft, onSend }) => {
  const [busy, setBusy] = useState(!draft);
  const [err, setErr] = useState("");
  const [shown, setShown] = useState(draft ? 99 : 0);
  const [hl, setHl] = useState(null);
  const [edit, setEdit] = useState(false);
  const variant = useRef(0);
  const gen = useCallback(async () => {
    setBusy(true); setErr(""); setShown(0);
    try {
      const { data } = await axios.post(`${API}/flow/draft`, { job_title: job.title, company: job.company, person_name: person.name, person_role: person.role, facts, variant: variant.current }, { timeout: 90000 });
      setDraft(data);
    } catch { setErr("Maggie couldn't write just now. Try again."); }
    setBusy(false);
  }, [job, person, facts, setDraft]);
  useEffect(() => { if (!draft) gen(); }, []);
  useEffect(() => {
    if (!draft || shown >= draft.lines.length) return undefined;
    const id = setTimeout(() => setShown((s) => s + 1), 550);
    return () => clearTimeout(id);
  }, [draft, shown]);
  const setLine = (i, text) => setDraft({ ...draft, lines: draft.lines.map((l, k) => (k === i ? { ...l, text } : l)) });

  return (
    <div className="space-y-4">
      <Maggie img="/art/fox-magnifier.webp" line={busy ? `Writing to ${person.name.split(" ")[0]}… every line will cite a fact.` : "Every line points to a fact you ticked."} />
      <div className="flex flex-wrap gap-2" data-testid="draft-facts">
        {facts.map((f, i) => {
          const [c, bg] = TAG_COLORS[i % TAG_COLORS.length];
          return <span key={f.id} className="rounded-full px-3 py-1.5 text-[0.78rem] font-bold transition-all" style={{ color: c, backgroundColor: bg, boxShadow: hl === f.id ? `0 0 0 2px ${c}` : "none", transform: hl === f.id ? "scale(1.05)" : "none" }} data-testid={`draft-fact-${f.id}`}>{i + 1} · {f.text}</span>;
        })}
      </div>
      <Card>
        <div className="mb-3 flex items-center gap-2 rounded-[12px] bg-[#E2F6E6] px-3 py-2 text-[0.82rem] font-bold text-[#1F7A52]" data-testid="nothing-sent-banner"><Check size={14} strokeWidth={3} /> Nothing is sent.</div>
        <p className="text-[0.8rem] font-semibold text-slate">To <b className="text-ink">{person.name}</b> · {person.role}, {job.company} · <span className="font-mono">{person.masked}</span></p>
        {busy && <div className="mt-4 space-y-2">{[90, 75, 85, 60].map((w) => <span key={w} className="shimmer block h-4 rounded-full bg-page" style={{ width: `${w}%` }} />)}</div>}
        {err && <p className="mt-4 font-bold text-[#C2365C]">{err}</p>}
        {draft && !busy && (
          <div className="mt-3" data-testid="draft-body">
            <p className="font-display text-[1.05rem] text-ink" data-testid="draft-subject">{draft.subject}</p>
            <div className="mt-2 space-y-2">
              {draft.lines.slice(0, shown).map((l, i) => {
                const t = tagStyle(l.tag, facts);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2" data-testid="draft-line">
                    {edit ? <textarea value={l.text} onChange={(e) => setLine(i, e.target.value)} rows={2} className="field min-w-0 flex-1 rounded-[10px] px-2 py-1 text-[0.95rem]" />
                      : <p className="flex-1 text-[0.97rem] leading-relaxed text-ink">{l.text}</p>}
                    <button type="button" onMouseEnter={() => setHl(l.tag)} onMouseLeave={() => setHl(null)} onClick={() => setHl(hl === l.tag ? null : l.tag)}
                      className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[0.66rem] font-extrabold uppercase tracking-wider" style={{ color: t.c, backgroundColor: t.bg }} data-testid="draft-line-tag">{t.label}</button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </Card>
      <div className="flex gap-2">
        <button onClick={() => { variant.current += 1; gen(); }} disabled={busy} className="flex h-12 items-center gap-1.5 rounded-full bg-white px-4 text-[0.88rem] font-bold text-ink shadow-sm disabled:opacity-50" data-testid="draft-regenerate-btn"><RefreshCw size={14} /> Redo</button>
        <button onClick={() => setEdit((e) => !e)} disabled={busy || !draft} className="flex h-12 items-center gap-1.5 rounded-full bg-white px-4 text-[0.88rem] font-bold text-ink shadow-sm disabled:opacity-50" data-testid="draft-edit-btn"><Pencil size={14} /> {edit ? "Done" : "Edit"}</button>
        <Primary disabled={busy || !draft} className="flex-1" onClick={onSend} data-testid="draft-send-btn">Send <Send size={15} /></Primary>
      </div>
    </div>
  );
};

/* ---------- main flow ---------- */
export const FindFlow = ({ onExit }) => {
  const [step, setStep] = useState("about");
  const [profile, setProfile] = useState(null);
  const [results, setResults] = useState(null);
  const [offset, setOffset] = useState(0);
  const [job, setJob] = useState(null);
  const [facts, setFacts] = useState([]);
  const [draft, setDraft] = useState(null);
  const [paywall, setPaywall] = useState(false);
  const [account, setAccount] = useState(() => { try { return JSON.parse(sessionStorage.getItem("as-demo-account") || "null"); } catch { return null; } });
  const [sentAt, setSentAt] = useState(null);
  const [undoLeft, setUndoLeft] = useState(0);
  const [paused, setPaused] = useState(false);
  const top = useRef(null);
  const person = job?.people?.[0];

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [step]);
  useEffect(() => {
    if (!undoLeft) return undefined;
    const id = setTimeout(() => setUndoLeft((u) => u - 1), 1000);
    return () => clearTimeout(id);
  }, [undoLeft]);

  const back = () => {
    const map = { search: "about", pick: "about", facts: "pick", draft: "facts", paid: "draft", gmail: "draft", review: "draft", sent: "review" };
    if (step === "about") onExit(); else setStep(map[step]);
  };
  const onSend = () => (account ? setStep(account.gmail ? "review" : "gmail") : setPaywall(true));
  const pct = ((STEPS.indexOf(step) + 1) / STEPS.length) * 100;
  const msgRef = useMemo(() => `<${Math.random().toString(36).slice(2, 10)}.demo@mail.gmail.com>`, [sentAt]);

  return (
    <div className="min-h-screen bg-page pb-16" ref={top} data-testid="find-flow">
      <header className="sticky top-0 z-40 bg-page px-4 pb-3 pt-4">
        <div className="mx-auto flex max-w-[640px] items-center gap-3">
          <button onClick={back} aria-label="Back" data-testid="flow-back-btn" className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"><ArrowLeft size={17} /></button>
          <div className="flex-1"><Logo size={30} /></div>
          {account && <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] text-[0.95rem] font-extrabold uppercase text-white" title={account.email} data-testid="flow-avatar">{account.email[0]}</span>}
          <button onClick={onExit} aria-label="Exit" data-testid="flow-exit-btn" className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"><X size={17} /></button>
        </div>
        <div className="mx-auto mt-3 h-1.5 max-w-[640px] overflow-hidden rounded-full bg-white"><motion.div className="h-full rounded-full bg-[var(--accent)]" animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: EASE }} data-testid="flow-progress" /></div>
      </header>

      <main className="mx-auto max-w-[640px] px-4 pt-4">
        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, ease: EASE }} data-testid={`flow-step-${step}`}>
            {step === "about" && <About onDone={(p) => { setProfile(p); setStep("search"); }} />}
            {step === "search" && <Search profile={profile} onDone={(r) => { setResults(r); setOffset(0); setStep("pick"); }} />}
            {step === "pick" && <Pick jobs={results.jobs} offset={offset} onPick={(j) => { setJob(j); setDraft(null); setStep("facts"); }} />}
            {step === "facts" && <Facts profile={profile} onDone={(f) => { setFacts(f); setDraft(null); setStep("draft"); }} />}
            {step === "draft" && <Draft job={job} person={person} facts={facts} draft={draft} setDraft={setDraft} onSend={onSend} />}
            {step === "paid" && (
              <div className="space-y-4" data-testid="paid-screen">
                <Maggie img="/art/fox-cheer.webp" line="Payment received. Check your inbox!" />
                <Card>
                  <p className="font-display text-[1.4rem] text-ink">Payment received. We've emailed you a sign-in link.</p>
                  <div className="mt-4 rounded-[18px] border border-ink/10 p-4" data-testid="magic-link-email">
                    <p className="flex items-center gap-2 text-[0.78rem] font-bold text-slate"><Inbox size={14} /> Inbox · {account?.email}</p>
                    <p className="mt-2 text-[0.95rem] font-bold text-ink">Your ApplyScout account is ready</p>
                    <p className="text-[0.85rem] text-slate">Tap the button to sign in — no password needed.</p>
                    <span className="mt-3 inline-block rounded-full bg-[var(--accent)] px-4 py-2 text-[0.82rem] font-bold text-white">Sign in to ApplyScout</span>
                  </div>
                  <Primary className="mt-4 w-full" onClick={() => { const a = { ...account, signedIn: true }; setAccount(a); sessionStorage.setItem("as-demo-account", JSON.stringify(a)); setStep("gmail"); }} data-testid="magic-continue-btn">Continue <ArrowRight size={16} /></Primary>
                  <DemoNote>Demo: no payment was taken and no email was sent.</DemoNote>
                </Card>
              </div>
            )}
            {step === "gmail" && (
              <div className="space-y-4">
                <Maggie line="Connect Gmail so the email comes from you." />
                <GmailConsent email={account?.email || "you@gmail.com"} onCancel={() => setStep("draft")} onAllow={() => { const a = { ...account, gmail: true }; setAccount(a); sessionStorage.setItem("as-demo-account", JSON.stringify(a)); setStep("review"); }} />
              </div>
            )}
            {step === "review" && draft && (
              <div className="space-y-4" data-testid="review-screen">
                <Maggie line="Last look. Nothing goes until you approve." />
                <Card className="space-y-3">
                  <p className="text-[0.85rem] text-slate">To: <b className="text-ink">{person.name}</b> <Unmask masked={person.masked} full={person.email} /> <span className="rounded-full bg-lemon px-2 py-0.5 text-[0.6rem] font-extrabold uppercase text-[#7A5A00]">sample</span></p>
                  <p className="text-[0.85rem] text-slate">From: <b className="text-ink">{account?.email}</b> <span className="text-[0.75rem]">(your Gmail)</span></p>
                  <input value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} className="field w-full rounded-[12px] px-3 py-2.5 font-bold text-ink" data-testid="review-subject" />
                  {draft.lines.map((l, i) => {
                    const t = tagStyle(l.tag, facts);
                    return (
                      <div key={i} className="flex items-start gap-2">
                        <textarea value={l.text} rows={2} onChange={(e) => setDraft({ ...draft, lines: draft.lines.map((x, k) => (k === i ? { ...x, text: e.target.value } : x)) })} className="field min-w-0 flex-1 rounded-[10px] px-2 py-1.5 text-[0.93rem]" data-testid="review-line" />
                        <span className="mt-1.5 shrink-0 rounded-full px-2 py-0.5 text-[0.62rem] font-extrabold uppercase" style={{ color: t.c, backgroundColor: t.bg }}>{t.label}</span>
                      </div>
                    );
                  })}
                  <Primary className="w-full" onClick={() => { setSentAt(new Date()); setUndoLeft(30); setPaused(false); setStep("sent"); }} data-testid="approve-send-btn">Approve & send <Send size={15} /></Primary>
                  <DemoNote>Demo: no email is sent.</DemoNote>
                </Card>
              </div>
            )}
            {step === "sent" && (
              <div className="space-y-4" data-testid="sent-screen">
                <motion.div initial={{ x: -40, y: 30, opacity: 0, rotate: -10 }} animate={{ x: 260, y: -120, opacity: [0, 1, 0], rotate: 15 }} transition={{ duration: 1.4, ease: EASE }} className="pointer-events-none fixed left-1/3 top-1/2 z-50 text-accent"><Send size={40} /></motion.div>
                <Celebrate />
                <Card className="text-center">
                  <p className="font-display text-[1.5rem] text-ink" data-testid="sent-title">Sent from your Gmail</p>
                  <p className="text-[0.85rem] font-semibold text-slate" data-testid="sent-time">{sentAt?.toLocaleString()}</p>
                  <div className="mt-4 rounded-[18px] border border-ink/10 p-4 text-left" data-testid="sent-folder">
                    <p className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-wider text-slate"><Mail size={13} /> Sent</p>
                    <p className="mt-1 text-[0.92rem] font-bold text-ink">To {person.name} · {draft.subject}</p>
                    <p className="truncate text-[0.82rem] text-slate">{draft.lines.map((l) => l.text).join(" ")}</p>
                    <p className="mt-2 font-mono text-[0.7rem] text-slate/80" data-testid="message-ref">Message-ID: {msgRef}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setPaused((p) => !p)} className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-page text-[0.88rem] font-bold text-ink" data-testid="pause-btn">{paused ? <><Play size={14} /> Resume sends</> : <><Pause size={14} /> Pause sends</>}</button>
                    <button onClick={() => { setUndoLeft(0); setStep("review"); }} disabled={!undoLeft} className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-page text-[0.88rem] font-bold text-ink disabled:opacity-40" data-testid="undo-btn"><Undo2 size={14} /> {undoLeft ? `Undo (${undoLeft}s)` : "Undo ended"}</button>
                  </div>
                  {paused && <p className="mt-2 text-[0.8rem] font-bold text-[#B26A00]" data-testid="paused-note">Paused. No further emails will go out.</p>}
                  <DemoNote>Demo: nothing was actually sent.</DemoNote>
                </Card>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Primary className="sm:flex-1" disabled={offset + 3 >= results.jobs.length && results.jobs.length <= 3} onClick={() => { setOffset((o) => (o + 3 < results.jobs.length ? o + 3 : 0)); setDraft(null); setJob(null); setStep("pick"); }} data-testid="pick-another-btn">Pick another job</Primary>
                  <button onClick={onExit} className="h-12 rounded-full bg-white sm:flex-1 text-[0.95rem] font-bold text-ink shadow-sm" data-testid="back-home-btn">Back to home</button>
                </div>
              </div>
            )}
        </motion.div>
      </main>

      <AnimatePresence>
        {paywall && person && (
          <Paywall person={person} onClose={() => setPaywall(false)} onPaid={(p) => { setPaywall(false); setAccount({ email: p.email }); setStep("paid"); }} />
        )}
      </AnimatePresence>
    </div>
  );
};

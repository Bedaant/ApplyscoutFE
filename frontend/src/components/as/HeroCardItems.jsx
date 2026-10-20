import { useEffect, useState } from "react";
import { ArrowRight, Check, CheckCircle2, PenLine, RotateCcw, XCircle } from "lucide-react";

const Head = ({ n, title, chip, chipCls = "bg-brand/10 text-[#C2410C]" }) => (
  <div className="flex items-center justify-between gap-2">
    <div className="flex items-center gap-2.5">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#FF6A00] to-[#FF4500] text-sm font-bold text-white shadow-[0_6px_14px_-6px_rgba(255,69,0,0.8)]">{n}</span>
      <span className="font-display text-[15px] font-bold text-navy">{title}</span>
    </div>
    {chip && <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${chipCls}`}>{chip}</span>}
  </div>
);

const JOBS = [
  { t: "Product Operations Lead", c: "Northwind Labs · Remote", fit: 92, tags: ["Full-time", "Ops"] },
  { t: "Senior Ops Analyst", c: "Halden & Co. · London", fit: 86, tags: ["Hybrid", "SQL"] },
  { t: "Program Manager", c: "Brightloom · Remote", fit: 74, tags: ["Full-time", "7+ yrs"] },
];

export const CardFind = () => (
  <div className="card lift rounded-2xl p-4" data-testid="hero-card-find">
    <Head n={1} title="Find relevant jobs" chip="3 new" />
    <ul className="mt-3 space-y-2.5">
      {JOBS.map((j) => (
        <li key={j.t} className="flex items-start gap-2.5 rounded-xl border border-navy/[0.06] p-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-navy/[0.05] font-display text-sm font-bold text-navy">{j.c[0]}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[13px] font-semibold text-navy">{j.t}</p>
              <span className="shrink-0 text-[11px] font-semibold text-[#C2410C]">{j.fit}% match</span>
            </div>
            <p className="text-xs text-mute">{j.c}</p>
            <div className="mt-1.5 flex gap-1">{j.tags.map((t) => <span key={t} className="rounded-md bg-navy/[0.04] px-1.5 py-0.5 text-[11px] text-navy/70">{t}</span>)}</div>
          </div>
        </li>
      ))}
    </ul>
    <p className="label mt-2.5 text-[10px] text-mute">Sample roles</p>
  </div>
);

const Doc = ({ title, tailored }) => (
  <div className="flex-1 rounded-xl border border-navy/[0.08] bg-white p-2.5">
    <p className="text-[11px] font-semibold text-navy">{title}</p>
    <div className="mt-2 space-y-1.5">
      {[90, 70, 82, 60, 76, 50].map((w, i) => (
        <span key={w} className={`block h-1.5 rounded-full ${tailored && i % 2 === 0 ? "bg-brand/70" : "bg-navy/10"}`} style={{ width: `${w}%` }} />
      ))}
    </div>
  </div>
);

export const CardTailor = () => (
  <div className="card lift rounded-2xl p-4" data-testid="hero-card-tailor">
    <Head n={2} title="Tailor your resume" />
    <div className="mt-3 flex items-center gap-2">
      <Doc title="Your resume" />
      <ArrowRight size={16} className="shrink-0 text-brand" />
      <Doc title="Tailored for this role" tailored />
    </div>
    <p className="mt-2.5 text-xs text-mute">Reordered for the role. Titles, dates and numbers kept.</p>
  </div>
);

const DRAFT = "In my second role I rebuilt the customer onboarding flow, which reduced support tickets by 18%.";

export const CardDraft = ({ ready }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!ready) return undefined;
    let id;
    const t = setTimeout(() => { id = setInterval(() => setN((v) => Math.min(v + 2, DRAFT.length)), 30); }, 1400);
    return () => { clearTimeout(t); clearInterval(id); };
  }, [ready]);
  const done = n >= DRAFT.length;
  return (
    <div className="card lift rounded-2xl p-4" data-testid="hero-card-draft">
      <Head n={3} title="Tailored draft" chip={done ? "Sourced" : "Writing…"} />
      <p className="mt-3 text-xs text-mute">Tell us about a time you improved a process.</p>
      <p className="mt-1.5 min-h-[60px] text-[13px] leading-relaxed">
        <span className="text-navy">{DRAFT.slice(0, n)}</span>{!done && <span className="caret" />}<span className="text-navy/25">{DRAFT.slice(n)}</span>
      </p>
      <ul className="mt-2 space-y-1 font-mono text-[11px]">
        <li className="flex items-center gap-1.5 text-navy/75"><CheckCircle2 size={12} className="text-ok" /> onboarding rebuild → Resume, Role 2</li>
        <li className="flex items-center gap-1.5 text-[#B42318]"><XCircle size={12} /> <span className="line-through">“Managed a team of 12”</span> removed</li>
      </ul>
    </div>
  );
};

const NOTE = "Hi Northwind team, I'd love to bring my onboarding and process work to the Product Operations Lead role…";

export const CardReview = () => {
  const [approved, setApproved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(NOTE);
  return (
    <div className={`card lift rounded-2xl p-4 transition-colors duration-500 ${approved ? "!border-ok/50 bg-ok/[0.04]" : ""}`} data-testid="hero-approval-card">
      <Head n={4} title="Ready for your review" chip={approved ? "Approved · queued" : "Waiting for you"} chipCls={approved ? "bg-ok/10 text-[#067647]" : "bg-brand/10 text-[#C2410C]"} />
      <div className="mt-3 rounded-xl border border-navy/[0.06] p-2.5 text-xs">
        <p className="text-mute">To <span className="text-navy">Northwind Labs · Product Operations Lead</span></p>
        {editing ? (
          <textarea data-testid="hero-edit-textarea" value={text} onChange={(e) => setText(e.target.value)} rows={3} className="mt-2 w-full resize-none rounded-lg border border-brand/30 p-2 text-xs text-navy outline-none" />
        ) : <p className="mt-2 leading-relaxed text-navy/80">{text}</p>}
      </div>
      <p className="mt-2 text-xs text-mute" data-testid="hero-approval-status">{approved ? "Approved. Queued to send. You can still undo." : "Nothing is sent until you approve."}</p>
      <div className="mt-3 flex gap-2">
        {approved ? (
          <button data-testid="hero-undo-btn" onClick={() => setApproved(false)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy/10 py-2 text-xs font-semibold text-navy transition-colors hover:bg-navy/[0.03]"><RotateCcw size={13} /> Undo</button>
        ) : (
          <>
            <button data-testid="hero-edit-btn" onClick={() => setEditing((e) => !e)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy/10 py-2 text-xs font-semibold text-navy transition-colors hover:bg-navy/[0.03]"><PenLine size={13} /> {editing ? "Done" : "Edit"}</button>
            <button data-testid="hero-approve-btn" onClick={() => { setEditing(false); setApproved(true); }} className="btn-brand flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold"><Check size={13} /> Approve</button>
          </>
        )}
      </div>
    </div>
  );
};

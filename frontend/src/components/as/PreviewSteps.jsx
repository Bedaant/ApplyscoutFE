import { useState } from "react";
import { Check, CheckCircle2, FileUp, MapPin, PenLine, SkipForward, XCircle } from "lucide-react";
import { Maggie } from "./Brand";

export const UploadStep = ({ onStart, error }) => {
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const target = role.trim() || "Product Manager";
  return (
    <div data-testid="preview-upload-step">
      <h3 className="font-display text-3xl font-extrabold">Let's see what ApplyScout finds.</h3>
      <p className="mt-2 text-mute">Add a resume or use our sample. Nothing is stored beyond this preview, and nothing is sent anywhere.</p>
      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand/30 bg-blush px-6 py-10 text-center transition-colors hover:border-brand/60" data-testid="preview-dropzone">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand/10 text-brand"><FileUp size={20} /></span>
        <span className="font-semibold">{file ? file.name : "Drop your resume or click to choose"}</span>
        <span className="text-xs text-mute">PDF or DOCX · preview only</span>
        <input type="file" accept=".pdf,.doc,.docx" className="sr-only" data-testid="preview-upload-input" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </label>
      <label className="mt-6 block text-sm font-semibold" htmlFor="role">Target role</label>
      <input id="role" value={role} maxLength={80} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Product Manager" data-testid="preview-role-input" className="mt-2 w-full rounded-xl border border-navy/15 bg-white px-4 py-3 outline-none transition-shadow placeholder:text-mute focus:border-brand focus:shadow-[0_0_0_4px_rgba(255,90,31,0.15)]" />
      {error && <p className="mt-3 text-sm text-[#B42318]" data-testid="preview-error">{error}</p>}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button data-testid="preview-start-btn" disabled={!file} onClick={() => onStart(target, file?.name)} className="btn-brand rounded-xl px-6 py-3.5 font-semibold disabled:pointer-events-none disabled:opacity-40">Scout jobs with my resume</button>
        <button data-testid="preview-sample-btn" onClick={() => onStart(target, "sample-resume.pdf")} className="rounded-xl border border-navy/15 px-6 py-3.5 font-semibold transition-colors hover:bg-navy/[0.03]">Use sample resume</button>
      </div>
    </div>
  );
};

const CHECKS = ["Reading your resume", "Pulling out confirmed facts", "Scouting fresh roles", "Drafting a tailored answer"];

export const AnalyzingStep = () => (
  <div className="flex flex-col items-center py-4 text-center" data-testid="preview-analyzing-step">
    <div className="relative">
      <div className="glow-brand absolute -inset-10" />
      <div className="relative animate-bounce [animation-duration:2s]"><Maggie size={88} /></div>
    </div>
    <p className="font-display mt-4 text-2xl font-extrabold">Maggie is on it…</p>
    <ul className="mt-6 space-y-2.5 text-left">
      {CHECKS.map((c, i) => (
        <li key={c} className="check-in flex items-center gap-2.5 text-sm font-medium" style={{ animationDelay: `${i * 0.55}s` }}>
          <CheckCircle2 size={17} className="text-ok" /> {c}
        </li>
      ))}
    </ul>
  </div>
);

const MatchList = ({ matches, sel, setSel }) => (
  <div className="space-y-2.5 md:col-span-2">
    {matches.map((m, i) => (
      <button key={m.company} data-testid={`preview-match-${i}`} onClick={() => setSel(i)} className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${sel === i ? "border-brand bg-blush shadow-[0_10px_30px_-16px_rgba(255,69,0,0.6)]" : "border-navy/10 bg-white hover:border-brand/40"}`}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-mute">{m.posted}</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${m.fit >= 85 ? "bg-brand/10 text-[#C2410C]" : "bg-honey/20 text-[#93370D]"}`}>{m.fit}% match</span>
        </div>
        <p className="mt-2 font-semibold leading-snug">{m.title}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-mute"><MapPin size={12} /> {m.company} · {m.location}</p>
      </button>
    ))}
  </div>
);

export const ResultsStep = ({ data, onApprove }) => {
  const [sel, setSel] = useState(0);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState({});
  const m = data.matches[sel];
  const answer = text[sel] ?? m?.answer ?? "";
  return (
    <div data-testid="preview-results-step">
      <h3 className="font-display text-2xl font-extrabold md:text-3xl">{data.matches.length} fresh matches for “{data.target_role}”</h3>
      <p className="mt-1 text-sm text-mute">Sample data for this preview.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <MatchList matches={data.matches} sel={sel} setSel={(i) => { setSel(i); setEditing(false); }} />
        <div className="card rounded-2xl p-5 md:col-span-3" data-testid="preview-draft">
          <p className="text-sm text-mute">{m?.reason}</p>
          <p className="mt-4 font-semibold">{m?.question}</p>
          {editing ? (
            <textarea data-testid="preview-draft-textarea" value={answer} onChange={(e) => setText({ ...text, [sel]: e.target.value })} rows={6} className="mt-2 w-full rounded-xl border border-brand/40 bg-white p-3 text-sm leading-relaxed outline-none" />
          ) : (
            <p className="mt-2 rounded-xl bg-blush p-3 text-sm leading-relaxed">{answer}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(m?.sources ?? []).map((s) => <span key={s} className="rounded-full bg-navy/[0.05] px-2.5 py-1 font-mono text-xs text-navy/70">{s}</span>)}
          </div>
          <p className="mt-3 flex items-start gap-1.5 text-xs text-[#B42318]"><XCircle size={14} className="mt-px shrink-0" /> {m?.removed_claim}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button data-testid="preview-approve-btn" onClick={onApprove} className="btn-brand flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold"><Check size={15} /> Approve</button>
            <button data-testid="preview-edit-btn" onClick={() => setEditing((e) => !e)} className="flex items-center gap-1.5 rounded-xl border border-navy/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-navy/[0.03]"><PenLine size={15} /> {editing ? "Done editing" : "Edit"}</button>
            <button data-testid="preview-skip-btn" onClick={() => setSel((sel + 1) % data.matches.length)} className="flex items-center gap-1.5 rounded-xl border border-navy/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-navy/[0.03]"><SkipForward size={15} /> Skip</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DoneStep = ({ onRestart, onClose }) => (
  <div className="flex flex-col items-center py-6 text-center" data-testid="preview-done-step">
    <span className="grid h-16 w-16 place-items-center rounded-full bg-ok/10 text-[#067647]"><Check size={28} /></span>
    <h3 className="font-display mt-5 text-3xl font-extrabold">Approved, in preview.</h3>
    <p className="mt-2 max-w-md text-mute">Nothing was sent. This was a sample run. In the full product, approved applications go out only after this exact step.</p>
    <div className="mt-7 flex gap-3">
      <button data-testid="preview-restart-btn" onClick={onRestart} className="rounded-xl border border-navy/15 px-5 py-3 text-sm font-semibold transition-colors hover:bg-navy/[0.03]">Start over</button>
      <button data-testid="preview-close-btn" onClick={onClose} className="btn-brand rounded-xl px-5 py-3 text-sm font-semibold">Back to site</button>
    </div>
  </div>
);

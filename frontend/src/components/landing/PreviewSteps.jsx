import { useState } from "react";
import { CheckCircle2, FileUp, MapPin, PenLine, SkipForward, Check, XCircle } from "lucide-react";
import { Maggie } from "./Brand";

export const UploadStep = ({ onStart, error }) => {
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const target = role.trim() || "Product Manager";
  return (
    <div data-testid="preview-upload-step">
      <h3 className="font-display text-3xl font-bold">Let's see what ApplyScout finds.</h3>
      <p className="mt-2 text-soft">Add a resume or use our sample. Nothing is stored beyond this preview, and nothing is sent anywhere.</p>
      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/25 bg-white px-6 py-10 text-center transition-colors hover:border-ink/50 hover:bg-tint" data-testid="preview-dropzone">
        <FileUp size={22} />
        <span className="font-medium">{file ? file.name : "Drop your resume or click to choose"}</span>
        <span className="text-xs text-soft">PDF or DOCX · preview only</span>
        <input type="file" accept=".pdf,.doc,.docx" className="sr-only" data-testid="preview-upload-input" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </label>
      <label className="mt-5 block text-sm font-medium" htmlFor="role">Target role</label>
      <input id="role" value={role} maxLength={80} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Product Manager" data-testid="preview-role-input" className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(248,201,174,0.8)]" />
      {error && <p className="mt-3 text-sm text-ember" data-testid="preview-error">{error}</p>}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button data-testid="preview-start-btn" disabled={!file} onClick={() => onStart(target, file?.name)} className="btn-ink rounded-full bg-ink px-6 py-3.5 font-semibold text-cream disabled:pointer-events-none disabled:opacity-40">Scout jobs with my resume</button>
        <button data-testid="preview-sample-btn" onClick={() => onStart(target, "sample-resume.pdf")} className="rounded-full border border-ink/15 px-6 py-3.5 font-medium transition-colors hover:bg-white">Use sample resume</button>
      </div>
    </div>
  );
};

const CHECKS = ["Reading your resume", "Pulling out confirmed facts", "Scouting fresh roles", "Drafting a tailored answer"];

export const AnalyzingStep = () => (
  <div className="flex flex-col items-center py-6 text-center" data-testid="preview-analyzing-step">
    <div className="animate-bounce [animation-duration:2s]"><Maggie size={88} /></div>
    <p className="font-display mt-4 text-2xl font-bold">Maggie is on it…</p>
    <ul className="mt-6 space-y-2.5 text-left">
      {CHECKS.map((c, i) => (
        <li key={c} className="check-in flex items-center gap-2.5 text-sm" style={{ animationDelay: `${i * 0.55}s` }}>
          <CheckCircle2 size={16} className="text-leaf" /> {c}
        </li>
      ))}
    </ul>
  </div>
);

const MatchList = ({ matches, sel, setSel }) => (
  <div className="space-y-2.5 md:col-span-2">
    {matches.map((m, i) => (
      <button key={m.company} data-testid={`preview-match-${i}`} onClick={() => setSel(i)} className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${sel === i ? "border-ink bg-white shadow-md" : "border-ink/10 bg-white/60 hover:bg-white"}`}>
        <div className="flex items-center justify-between gap-2">
          <span className="eyebrow text-soft">{m.posted}</span>
          <span className={`rounded-full px-2 py-0.5 font-mono text-xs ${m.fit >= 85 ? "bg-leaf/15 text-[#2d7a57]" : "bg-honey/20 text-[#8a6212]"}`}>{m.fit}% fit</span>
        </div>
        <p className="mt-2 font-semibold leading-snug">{m.title}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-soft"><MapPin size={12} /> {m.company} · {m.location}</p>
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
      <h3 className="font-display text-2xl font-bold md:text-3xl">{data.matches.length} fresh matches for “{data.target_role}”</h3>
      <p className="mt-1 text-sm text-soft">Sample data for this preview.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <MatchList matches={data.matches} sel={sel} setSel={(i) => { setSel(i); setEditing(false); }} />
        <div className="rounded-2xl border border-ink/10 bg-white p-5 md:col-span-3" data-testid="preview-draft">
          <p className="text-sm text-soft">{m?.reason}</p>
          <p className="mt-4 font-semibold">{m?.question}</p>
          {editing ? (
            <textarea data-testid="preview-draft-textarea" value={answer} onChange={(e) => setText({ ...text, [sel]: e.target.value })} rows={6} className="mt-2 w-full rounded-xl border border-ink/15 bg-tint p-3 text-sm leading-relaxed outline-none focus:border-ink/40" />
          ) : (
            <p className="mt-2 rounded-xl bg-tint p-3 text-sm leading-relaxed">{answer}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(m?.sources ?? []).map((s) => <span key={s} className="rounded-full bg-canvas px-2.5 py-1 font-mono text-xs text-soft">{s}</span>)}
          </div>
          <p className="mt-3 flex items-start gap-1.5 text-xs text-ember"><XCircle size={14} className="mt-px shrink-0" /> {m?.removed_claim}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button data-testid="preview-approve-btn" onClick={onApprove} className="flex items-center gap-1.5 rounded-full bg-leaf px-4 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"><Check size={15} /> Approve</button>
            <button data-testid="preview-edit-btn" onClick={() => setEditing((e) => !e)} className="flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2.5 text-sm transition-colors hover:bg-tint"><PenLine size={15} /> {editing ? "Done editing" : "Edit"}</button>
            <button data-testid="preview-skip-btn" onClick={() => setSel((sel + 1) % data.matches.length)} className="flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2.5 text-sm transition-colors hover:bg-tint"><SkipForward size={15} /> Skip</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DoneStep = ({ onRestart, onClose }) => (
  <div className="flex flex-col items-center py-6 text-center" data-testid="preview-done-step">
    <span className="grid h-16 w-16 place-items-center rounded-full bg-leaf/15 text-[#2d7a57]"><Check size={28} /></span>
    <h3 className="font-display mt-5 text-3xl font-bold">Approved, in preview.</h3>
    <p className="mt-2 max-w-md text-soft">Nothing was sent. This was a sample run. In the full product, approved applications go out only after this exact step.</p>
    <div className="mt-7 flex gap-3">
      <button data-testid="preview-restart-btn" onClick={onRestart} className="rounded-full border border-ink/15 px-5 py-3 text-sm font-medium transition-colors hover:bg-white">Start over</button>
      <button data-testid="preview-close-btn" onClick={onClose} className="btn-ink rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream">Back to site</button>
    </div>
  </div>
);

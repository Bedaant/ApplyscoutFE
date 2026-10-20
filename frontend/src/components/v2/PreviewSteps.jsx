import { useState } from "react";
import { Check, FileUp, MapPin, Pencil, SkipForward } from "lucide-react";
import { HandCheck } from "./Hand";
import { Maggie } from "./Brand";

export const UploadStep = ({ onStart, error }) => {
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const target = role.trim() || "Product Manager";
  return (
    <div data-testid="preview-upload-step">
      <h3 className="font-display text-[1.6rem] font-bold leading-tight tight md:text-[1.9rem]">Let's see what it finds for you.</h3>
      <p className="mt-2 text-[0.97rem] leading-relaxed text-ash">
        Use your own resume or our sample one. This run is thrown away when you close the window, and no
        application leaves this page.
      </p>
      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-paper px-6 py-9 text-center transition-colors hover:border-brand/60" data-testid="preview-dropzone">
        <FileUp size={18} className="text-ash" />
        <span className="text-[0.95rem] font-semibold">{file ? file.name : "Drop a resume, or click to choose"}</span>
        <span className="font-mono text-[10.5px] text-ash">pdf or docx · not stored</span>
        <input type="file" accept=".pdf,.doc,.docx" className="sr-only" data-testid="preview-upload-input" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </label>
      <label className="mt-6 block text-[0.9rem] font-semibold" htmlFor="role">The role you're after</label>
      <input id="role" value={role} maxLength={80} onChange={(e) => setRole(e.target.value)} placeholder="Product Manager" data-testid="preview-role-input"
        className="field mt-2 h-12 w-full rounded-xl px-4 text-[0.95rem]" />
      {error && <p className="mt-3 text-[0.9rem] text-brand" data-testid="preview-error">{error}</p>}
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <button data-testid="preview-start-btn" disabled={!file} onClick={() => onStart(target, file?.name)}
          className="btn-o h-12 rounded-xl px-6 text-[0.95rem] font-semibold disabled:pointer-events-none disabled:opacity-35">
          Run it on my resume
        </button>
        <button data-testid="preview-sample-btn" onClick={() => onStart(target, "sample-resume.pdf")}
          className="h-12 rounded-xl border border-line px-6 text-[0.95rem] font-semibold transition-colors hover:bg-paper">
          Use the sample resume
        </button>
      </div>
    </div>
  );
};

const CHECKS = ["Reading the resume", "Listing the facts it can prove", "Checking postings from the last 14 days", "Writing one draft, cutting what it can't support"];

export const AnalyzingStep = () => (
  <div className="flex flex-col items-center py-6 text-center" data-testid="preview-analyzing-step">
    <Maggie size={76} className="animate-bounce [animation-duration:2.2s]" />
    <p className="font-display mt-4 text-[1.4rem] font-bold tight">Give her a few seconds.</p>
    <ul className="mt-6 space-y-2.5 text-left">
      {CHECKS.map((c, i) => (
        <li key={c} className="tick-in flex items-center gap-2.5 text-[0.93rem]" style={{ animationDelay: `${i * 0.55}s` }}>
          <HandCheck size={14} /> {c}
        </li>
      ))}
    </ul>
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
      <h3 className="font-display text-[1.5rem] font-bold leading-tight tight md:text-[1.8rem]">
        {data.matches.length} matches for “{data.target_role}”
      </h3>
      <p className="mt-1 font-mono text-[11px] text-ash">sample postings · invented companies</p>
      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="space-y-2 md:col-span-2">
          {data.matches.map((x, i) => (
            <button key={x.company} data-testid={`preview-match-${i}`} onClick={() => { setSel(i); setEditing(false); }}
              className={`w-full rounded-xl border p-3 text-left transition-colors ${sel === i ? "border-brand bg-brand/[0.05]" : "border-line hover:border-ash/40"}`}>
              <div className="flex items-center justify-between font-mono text-[10.5px] text-ash">
                <span>posted {x.posted}</span><span className={x.fit >= 85 ? "text-brand" : ""}>{x.fit}%</span>
              </div>
              <p className="mt-1.5 text-[0.92rem] font-semibold leading-snug">{x.title}</p>
              <p className="mt-1 flex items-center gap-1 text-[11.5px] text-ash"><MapPin size={11} /> {x.company} · {x.location}</p>
            </button>
          ))}
        </div>
        <div className="sheet rounded-2xl p-5 md:col-span-3" data-testid="preview-draft">
          <p className="text-[0.9rem] leading-relaxed text-ash">{m?.reason}</p>
          <p className="mt-4 text-[0.95rem] font-semibold">{m?.question}</p>
          {editing ? (
            <textarea data-testid="preview-draft-textarea" value={answer} rows={6}
              onChange={(e) => setText({ ...text, [sel]: e.target.value })}
              className="field mt-2 w-full rounded-xl p-3 text-[0.93rem] leading-relaxed" />
          ) : (
            <p className="mt-2 rounded-xl bg-paper p-3 text-[0.93rem] leading-relaxed">{answer}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(m?.sources ?? []).map((s) => <span key={s} className="rounded-md bg-paper px-2 py-0.5 font-mono text-[10px] text-ash">{s}</span>)}
          </div>
          <p className="mt-3 font-mono text-[10.5px] text-ash">{m?.removed_claim}</p>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
            <button data-testid="preview-approve-btn" onClick={onApprove} className="btn-o inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[0.9rem] font-semibold"><Check size={14} /> Approve</button>
            <button data-testid="preview-edit-btn" onClick={() => setEditing((e) => !e)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-[0.9rem] font-semibold transition-colors hover:bg-paper"><Pencil size={13} /> {editing ? "Done" : "Edit"}</button>
            <button data-testid="preview-skip-btn" onClick={() => setSel((sel + 1) % data.matches.length)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-[0.9rem] text-ash transition-colors hover:text-coal"><SkipForward size={13} /> Skip</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DoneStep = ({ onRestart, onClose }) => (
  <div className="py-6 text-center" data-testid="preview-done-step">
    <div className="mx-auto w-fit"><HandCheck size={34} /></div>
    <h3 className="font-display mt-4 text-[1.7rem] font-bold tight">Approved — and still nowhere near a company.</h3>
    <p className="mx-auto mt-2 max-w-md text-[0.97rem] leading-relaxed text-ash">
      Nothing was sent. That was a sample run on invented postings. In the real product, this press is the
      only thing that puts an application in front of anyone.
    </p>
    <div className="mt-7 flex justify-center gap-2.5">
      <button data-testid="preview-restart-btn" onClick={onRestart} className="h-11 rounded-xl border border-line px-5 text-[0.93rem] font-semibold transition-colors hover:bg-paper">Run it again</button>
      <button data-testid="preview-close-btn" onClick={onClose} className="btn-o h-11 rounded-xl px-5 text-[0.93rem] font-semibold">Back to the page</button>
    </div>
  </div>
);

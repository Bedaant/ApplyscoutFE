import { useState } from "react";
import { Check, FileUp, MapPin, Pencil, SkipForward } from "lucide-react";
import { FOX } from "./assets";

export const UploadStep = ({ onStart, error }) => {
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const target = role.trim() || "Product Manager";
  return (
    <div data-testid="preview-upload-step">
      <h3 className="font-display text-[1.55rem] leading-tight text-ink md:text-[1.85rem]">Let's see what it finds for you.</h3>
      <p className="mt-2 text-[0.96rem] leading-relaxed text-slate">
        Use your own resume or our sample one. This run is thrown away when you close the window, and nothing
        leaves this page.
      </p>
      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-[#F2F7FF] px-6 py-9 text-center transition-colors hover:bg-[#E8F0FF]" data-testid="preview-dropzone">
        <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-white text-[#3B6FE0]"><FileUp size={19} /></span>
        <span className="text-[0.96rem] font-bold text-ink">{file ? file.name : "Drop a resume, or click to choose"}</span>
        <span className="font-mono text-[11px] text-slate">pdf or docx · not stored</span>
        <input type="file" accept=".pdf,.doc,.docx" className="sr-only" data-testid="preview-upload-input" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </label>
      <label className="mt-6 block text-[0.9rem] font-bold text-ink" htmlFor="role">The role you're after</label>
      <input id="role" value={role} maxLength={80} onChange={(e) => setRole(e.target.value)} placeholder="Product Manager"
        data-testid="preview-role-input" className="field mt-2 w-full rounded-full px-5 py-3.5 text-[0.95rem] font-medium" />
      {error && <p className="mt-3 text-[0.9rem] font-semibold text-[#C2365C]" data-testid="preview-error">{error}</p>}
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <button data-testid="preview-start-btn" disabled={!file} onClick={() => onStart(target, file?.name)}
          className="pill-pink rounded-full px-7 py-3.5 text-[0.95rem] font-bold disabled:pointer-events-none disabled:opacity-40">
          Run it on my resume
        </button>
        <button data-testid="preview-sample-btn" onClick={() => onStart(target, "sample-resume.pdf")}
          className="pill-ghost rounded-full px-7 py-3.5 text-[0.95rem] font-bold">
          Use the sample resume
        </button>
      </div>
    </div>
  );
};

const CHECKS = ["Reading the resume", "Listing the facts it can prove", "Checking postings from the last 14 days", "Writing one draft, cutting what it can't support"];

export const AnalyzingStep = () => (
  <div className="flex flex-col items-center py-6 text-center" data-testid="preview-analyzing-step">
    <img src={FOX} alt="" className="h-20 w-20 animate-bounce rounded-[22px] object-cover [animation-duration:2.2s]" />
    <p className="font-display mt-4 text-[1.4rem] text-ink">Give her a few seconds.</p>
    <ul className="mt-6 space-y-2.5 text-left">
      {CHECKS.map((c, i) => (
        <li key={c} className="tick-in flex items-center gap-2.5 text-[0.94rem] font-medium text-ink" style={{ animationDelay: `${i * 0.55}s` }}>
          <span className="grid h-5 w-5 place-items-center rounded-full bg-mint text-[#1F7A52]"><Check size={12} /></span> {c}
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
      <h3 className="font-display text-[1.45rem] leading-tight text-ink md:text-[1.75rem]">
        {data.matches.length} matches for “{data.target_role}”
      </h3>
      <p className="mt-1 font-mono text-[11px] text-slate">sample postings · invented companies</p>
      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="space-y-2 md:col-span-2">
          {data.matches.map((x, i) => (
            <button key={x.company} data-testid={`preview-match-${i}`} onClick={() => { setSel(i); setEditing(false); }}
              className={`w-full rounded-2xl p-3.5 text-left transition-all duration-300 ${sel === i ? "bg-lilac shadow-[0_12px_24px_-16px_rgba(22,33,58,0.6)]" : "bg-[#F2F7FF] hover:bg-[#E8F0FF]"}`}>
              <div className="flex items-center justify-between font-mono text-[10.5px] text-ink/60">
                <span>posted {x.posted}</span><span className={x.fit >= 85 ? "font-bold text-ink" : ""}>{x.fit}%</span>
              </div>
              <p className="mt-1.5 text-[0.93rem] font-bold leading-snug text-ink">{x.title}</p>
              <p className="mt-1 flex items-center gap-1 text-[11.5px] font-medium text-slate"><MapPin size={11} /> {x.company} · {x.location}</p>
            </button>
          ))}
        </div>
        <div className="white-card p-5 md:col-span-3" data-testid="preview-draft">
          <p className="text-[0.9rem] leading-relaxed text-slate">{m?.reason}</p>
          <p className="mt-4 text-[0.95rem] font-bold text-ink">{m?.question}</p>
          {editing ? (
            <textarea data-testid="preview-draft-textarea" value={answer} rows={6}
              onChange={(e) => setText({ ...text, [sel]: e.target.value })}
              className="field mt-2 w-full rounded-2xl p-3.5 text-[0.93rem] leading-relaxed" />
          ) : (
            <p className="mt-2 rounded-2xl bg-lemon/60 p-3.5 text-[0.93rem] leading-relaxed text-ink">{answer}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(m?.sources ?? []).map((s) => <span key={s} className="rounded-full bg-[#F2F7FF] px-2.5 py-1 font-mono text-[10px] text-slate">{s}</span>)}
          </div>
          <p className="mt-3 font-mono text-[10.5px] text-slate">{m?.removed_claim}</p>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-[#EEF1F7] pt-4">
            <button data-testid="preview-approve-btn" onClick={onApprove} className="pill-pink inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[0.9rem] font-bold"><Check size={14} /> Approve</button>
            <button data-testid="preview-edit-btn" onClick={() => setEditing((e) => !e)} className="pill-ghost inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[0.9rem] font-bold"><Pencil size={13} /> {editing ? "Done" : "Edit"}</button>
            <button data-testid="preview-skip-btn" onClick={() => setSel((sel + 1) % data.matches.length)} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.9rem] font-bold text-slate transition-colors hover:text-ink"><SkipForward size={13} /> Skip</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DoneStep = ({ onRestart, onClose }) => (
  <div className="py-6 text-center" data-testid="preview-done-step">
    <span className="mx-auto grid h-16 w-16 place-items-center rounded-[20px] bg-mint text-[#1F7A52]"><Check size={30} /></span>
    <h3 className="font-display mt-5 text-[1.6rem] leading-tight text-ink">Approved — and still nowhere near a company.</h3>
    <p className="mx-auto mt-2 max-w-md text-[0.96rem] leading-relaxed text-slate">
      Nothing was sent. That was a sample run on invented postings. In the real product, this press is the
      only thing that puts an application in front of anyone.
    </p>
    <div className="mt-7 flex justify-center gap-2.5">
      <button data-testid="preview-restart-btn" onClick={onRestart} className="pill-ghost rounded-full px-5 py-3 text-[0.93rem] font-bold">Run it again</button>
      <button data-testid="preview-close-btn" onClick={onClose} className="pill-ink rounded-full px-5 py-3 text-[0.93rem] font-bold">Back to the page</button>
    </div>
  </div>
);

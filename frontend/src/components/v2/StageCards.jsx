import { useState } from "react";
import { Check, CornerUpLeft, Pencil } from "lucide-react";
import { HandCheck } from "./Hand";

export const JobCard = () => (
  <div className="sheet w-[244px] rounded-2xl p-4" data-testid="stage-job-card">
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="font-display text-[0.95rem] font-bold leading-tight tight">Product Operations Lead</p>
        <p className="mt-1 text-[11.5px] text-ash">Northwind Labs · Remote, Europe</p>
      </div>
      <span className="font-mono text-[10px] text-brand">92%</span>
    </div>
    <dl className="mt-3 space-y-1 border-t border-line pt-3 font-mono text-[10.5px] text-ash">
      <div className="flex justify-between"><dt>posted</dt><dd className="text-coal">6 hours ago</dd></div>
      <div className="flex justify-between"><dt>salary</dt><dd className="text-coal">£62,000–71,000</dd></div>
      <div className="flex justify-between"><dt>team</dt><dd className="text-coal">9 people, 2 open</dd></div>
      <div className="flex justify-between"><dt>found on</dt><dd className="text-coal">careers page</dd></div>
    </dl>
    <p className="mt-3 text-[11.5px] leading-relaxed text-ash">
      <span className="text-coal">Matched</span> on onboarding rebuild + SQL.
      <br />
      <span className="text-coal">Missing</span> 7+ years; they asked for it.
    </p>
  </div>
);

const FACTS = ["5 years in operations", "Rebuilt onboarding flow", "Support tickets −18%", "SQL, Figma, Jira"];

export const FactsCard = () => (
  <div className="sheet w-[214px] rounded-2xl p-4" data-testid="stage-facts-card">
    <div className="flex items-center justify-between">
      <p className="label text-[10px]">Confirmed by you</p>
      <button className="text-[11px] text-ash underline-offset-2 hover:text-coal hover:underline">edit</button>
    </div>
    <ul className="mt-2.5 space-y-2">
      {FACTS.map((f) => (
        <li key={f} className="flex items-start gap-2 text-[11.5px] leading-snug">
          <span className="mt-[1px] shrink-0"><HandCheck size={13} /></span>{f}
        </li>
      ))}
    </ul>
    <p className="mt-3 border-t border-line pt-2.5 font-mono text-[10px] text-ash">
      last edited 3 Mar · nothing added since
    </p>
  </div>
);

export const ApprovalCard = () => {
  const [approved, setApproved] = useState(false);
  return (
    <div className="sheet w-[262px] rounded-2xl p-4" data-testid="stage-approval-card">
      <div className="flex items-center justify-between">
        <p className="label text-[10px]">Waiting for you · 2 of 3</p>
        <span className="font-mono text-[10px] text-ash">4:12 pm</span>
      </div>
      <p className="mt-2.5 text-[12px] leading-relaxed text-coal">
        “In my second role I rebuilt the customer onboarding flow and support tickets dropped 18%. I'd start at Northwind by finding the biggest drop-off…”
      </p>
      <p className="mt-2 font-mono text-[10px] text-ash">source: resume · role 2, lines 3–4</p>
      {approved ? (
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3" data-testid="stage-approved-state">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-coal">
            <HandCheck size={14} /> Queued to send
          </span>
          <button onClick={() => setApproved(false)} data-testid="stage-undo-btn"
            className="flex items-center gap-1 text-[12px] text-ash transition-colors hover:text-coal">
            <CornerUpLeft size={12} /> Undo
          </button>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
          <button onClick={() => setApproved(true)} data-testid="stage-approve-btn"
            className="btn-o flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold">
            <Check size={13} /> Approve
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[12px] font-medium text-coal transition-colors hover:bg-paper">
            <Pencil size={12} /> Edit
          </button>
          <span className="ml-auto font-mono text-[10px] text-ash">skip</span>
        </div>
      )}
    </div>
  );
};

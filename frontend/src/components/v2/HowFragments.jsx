import { Check, Pencil, SkipForward, X } from "lucide-react";
import { HandCheck } from "./Hand";

const Frame = ({ children, caption, testid }) => (
  <div data-testid={testid}>
    <div className="sheet rounded-2xl p-4">{children}</div>
    <p className="mt-2 font-mono text-[10.5px] text-ash">{caption}</p>
  </div>
);

export const FragFacts = () => (
  <Frame testid="frag-facts" caption="your facts page — you write it once, then correct it">
    <div className="flex items-center justify-between">
      <p className="label text-[10px]">Facts from your resume</p>
      <span className="font-mono text-[10px] text-brand">2 to confirm</span>
    </div>
    <ul className="mt-3 space-y-2.5 text-[12.5px]">
      {[["5 years across operations and product", true],
        ["Rebuilt customer onboarding flow (Role 2)", true],
        ["Cut support tickets 18% in two quarters", true],
        ["Managed a team of 12", false]].map(([t, ok]) => (
        <li key={t} className="flex items-start gap-2 leading-snug">
          <span className="mt-[1px] shrink-0">{ok ? <HandCheck size={13} /> : <X size={13} className="text-ash" />}</span>
          <span className={ok ? "text-coal" : "text-ash line-through decoration-ash/50"}>{t}</span>
        </li>
      ))}
    </ul>
  </Frame>
);

export const FragRules = () => (
  <Frame testid="frag-rules" caption="search rules — changing these changes tomorrow's list">
    <p className="label text-[10px]">Search rules</p>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {["Product Ops", "Operations Manager", "Remote · Europe", "London (2 days)", "£58k floor", "no agencies"].map((c) => (
        <span key={c} className="rounded-full border border-line px-2.5 py-1 text-[11.5px] text-coal">{c}</span>
      ))}
      <span className="rounded-full border border-brand/40 bg-brand/[0.07] px-2.5 py-1 text-[11.5px] text-brand">3 companies blocked</span>
    </div>
  </Frame>
);

export const FragFeed = () => (
  <Frame testid="frag-feed" caption="7:02 am, the morning list — four new, one flagged">
    <div className="flex items-center justify-between">
      <p className="label text-[10px]">Tue 14 March · 7:02 am</p>
      <span className="font-mono text-[10px] text-ash">4 new</span>
    </div>
    <ul className="mt-3 divide-y divide-line">
      {[["Product Operations Lead", "Northwind Labs", "92%", "6h"],
        ["Senior Operations Analyst", "Halden & Co.", "86%", "1d"],
        ["Programme Manager, Payments", "Brightloom", "74%", "2d"]].map(([r, c, f, a]) => (
        <li key={c} className="flex items-center gap-3 py-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold">{r}</p>
            <p className="truncate text-[11px] text-ash">{c} · posted {a} ago</p>
          </div>
          <span className="font-mono text-[10.5px] text-ash">{f}</span>
        </li>
      ))}
    </ul>
  </Frame>
);

export const FragDraft = () => (
  <Frame testid="frag-draft" caption="the draft, with every sentence traced back to a line you confirmed">
    <p className="text-[12.5px] font-semibold">“Tell us about a time you improved a process.”</p>
    <p className="mt-2 text-[12.5px] leading-relaxed text-coal">
      In my second role I rebuilt our customer onboarding flow, and support tickets dropped 18% over the two
      quarters after. I'd take the same route at Northwind: find where people stall, fix the worst step first,
      and measure it either side<span className="caret" />
    </p>
    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line pt-3">
      {["resume · role 2, line 3", "resume · role 2, line 4", "resume · skills"].map((s) => (
        <span key={s} className="rounded-md bg-paper px-2 py-0.5 font-mono text-[10px] text-ash">{s}</span>
      ))}
    </div>
    <p className="mt-2 font-mono text-[10px] text-ash">“managed a team of 12” — removed, not in your facts</p>
  </Frame>
);

export const FragQueue = () => (
  <Frame testid="frag-queue" caption="the queue — it sits here until you deal with it">
    <div className="flex items-center justify-between">
      <p className="label text-[10px]">Waiting for you</p>
      <span className="rounded-full bg-coal px-2 py-0.5 font-mono text-[10px] text-white">3</span>
    </div>
    <div className="mt-3 rounded-xl border border-line p-3">
      <p className="text-[12.5px] font-semibold">Product Operations Lead</p>
      <p className="mt-0.5 text-[11px] text-ash">Northwind Labs · draft ready 4:12 pm</p>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="btn-o inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11.5px] font-semibold"><Check size={12} /> Approve</span>
        <span className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-[11.5px]"><Pencil size={11} /> Edit</span>
        <span className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-[11.5px] text-ash"><SkipForward size={11} /> Skip</span>
      </div>
    </div>
    <p className="mt-2 font-mono text-[10px] text-ash">sending is paused until you approve · 0 sent so far</p>
  </Frame>
);

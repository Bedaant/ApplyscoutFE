import { useState } from "react";
import { Check, CornerUpLeft, Pause, Pencil, Play, SkipForward } from "lucide-react";
import { Reveal } from "./Motion";

const START = [
  { id: 1, role: "Product Operations Lead", co: "Northwind Labs", at: "4:12 pm", note: "92% · asks for 7+ years, you have 5", status: "ready" },
  { id: 2, role: "Senior Operations Analyst", co: "Halden & Co.", at: "4:14 pm", note: "86% · hybrid, two days in London", status: "ready" },
  { id: 3, role: "Programme Manager, Payments", co: "Brightloom", at: "4:21 pm", note: "74% · payments experience not in your facts", status: "ready" },
];

const STATUS = {
  ready: ["Waiting", "text-white/60"],
  approved: ["Approved", "text-brand"],
  skipped: ["Skipped", "text-white/35"],
};

export const Queue = () => {
  const [items, setItems] = useState(START);
  const [past, setPast] = useState([]);
  const [paused, setPaused] = useState(false);

  const act = (id, status) => {
    setPast((h) => [...h, items]);
    setItems((l) => l.map((x) => (x.id === id ? { ...x, status } : x)));
  };
  const undo = () => {
    if (!past.length) return;
    setItems(past[past.length - 1]);
    setPast((h) => h.slice(0, -1));
  };

  const approved = items.filter((x) => x.status === "approved").length;
  const waiting = items.filter((x) => x.status === "ready").length;

  return (
    <section className="bg-coal px-5 py-16 text-white lg:px-8 lg:py-28" data-testid="queue-section">
      <div className="mx-auto max-w-[1040px]">
        <Reveal kind="wipe" className="max-w-2xl">
          <p className="label text-white/45">The queue, for real</p>
          <h2 className="font-display mt-4 text-[2rem] font-bold leading-[1.03] tight text-white sm:text-[2.9rem]">
            Go on — approve one. Then take it back.
          </h2>
          <p className="mt-4 max-w-lg text-[1.02rem] leading-relaxed text-white/60">
            This is the real control panel, running right here. Nothing in it reaches a company.
          </p>
        </Reveal>

        <Reveal kind="rise" delay={0.1} className="mt-10 rounded-2xl border border-white/12 bg-white/[0.04] p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <p className="font-mono text-[11.5px] text-white/60" data-testid="queue-counter">
              {waiting} waiting · {approved} approved · <span className="text-white">0 sent</span>
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPaused((p) => !p)} data-testid="queue-pause-btn"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-[12.5px] transition-colors hover:bg-white/10">
                {paused ? <Play size={12} /> : <Pause size={12} />} {paused ? "Resume" : "Pause everything"}
              </button>
              <button onClick={undo} disabled={!past.length} data-testid="queue-undo-btn"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-[12.5px] transition-colors hover:bg-white/10 disabled:opacity-30">
                <CornerUpLeft size={12} /> Undo
              </button>
            </div>
          </div>

          {paused && (
            <p className="tick-in mt-4 rounded-lg border border-brand/40 bg-brand/10 px-3 py-2 font-mono text-[11.5px] text-brand" data-testid="queue-paused-note">
              paused — approvals stay in the queue and nothing can go out until you resume
            </p>
          )}

          <ul className="mt-2 divide-y divide-white/10">
            {items.map((it) => {
              const [label, cls] = STATUS[it.status];
              return (
                <li key={it.id} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:gap-6" data-testid={`queue-item-${it.id}`}>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.98rem] font-semibold leading-tight">{it.role}</p>
                    <p className="mt-1 text-[12.5px] text-white/50">{it.co} · draft ready {it.at}</p>
                    <p className="mt-1 font-mono text-[10.5px] text-white/40">{it.note}</p>
                  </div>
                  <span className={`font-mono text-[10.5px] md:w-20 ${cls}`} data-testid={`queue-status-${it.id}`}>{label}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => act(it.id, "approved")} disabled={it.status === "approved"} data-testid={`queue-approve-${it.id}`}
                      className="btn-o inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold disabled:pointer-events-none disabled:opacity-35">
                      <Check size={13} /> Approve
                    </button>
                    <button data-testid={`queue-edit-${it.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-[12.5px] transition-colors hover:bg-white/10">
                      <Pencil size={12} /> Edit
                    </button>
                    <button onClick={() => act(it.id, "skipped")} disabled={it.status === "skipped"} data-testid={`queue-skip-${it.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-[12.5px] text-white/70 transition-colors hover:bg-white/10 disabled:opacity-35">
                      <SkipForward size={12} /> Skip
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 border-t border-white/10 pt-4 font-mono text-[11px] text-white/40">
            sample data · Northwind, Halden and Brightloom are made up for this page
          </p>
        </Reveal>
      </div>
    </section>
  );
};

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Eye, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const START = [
  { id: 1, title: "Product Operations Lead", company: "Northwind Labs", status: "ready" },
  { id: 2, title: "Senior Ops Analyst", company: "Halden & Co.", status: "ready" },
  { id: 3, title: "Program Manager", company: "Brightloom", status: "ready" },
];

const FEATURES = [
  { icon: Eye, title: "Review", text: "See the full application side by side with the job." },
  { icon: Check, title: "Approve", text: "One tap when it looks right. Not before." },
  { icon: Pause, title: "Pause", text: "Stop everything instantly. Resume when you're ready." },
  { icon: RotateCcw, title: "Undo", text: "Changed your mind? Pull it back before it sends." },
];

const BADGE = { ready: "bg-peach/20 text-peach", approved: "bg-leaf/20 text-leaf", skipped: "bg-cream/10 text-cream/60" };

const Queue = () => {
  const [items, setItems] = useState(START);
  const [history, setHistory] = useState([]);
  const [paused, setPaused] = useState(false);
  const act = (id, status) => { setHistory((h) => [...h, items]); setItems((list) => list.map((x) => (x.id === id ? { ...x, status } : x))); };
  const undo = () => { if (!history.length) return; setItems(history[history.length - 1]); setHistory((h) => h.slice(0, -1)); };

  return (
    <div className="rounded-3xl border border-cream/10 bg-cream/[0.04] p-4 md:p-6" data-testid="control-queue">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow text-cream/70">Your review queue</p>
        <div className="flex gap-2">
          <button data-testid="control-undo-btn" onClick={undo} disabled={!history.length} className="flex items-center gap-1.5 rounded-full bg-cream/10 px-3.5 py-2 text-xs text-cream transition-colors hover:bg-cream/20 disabled:opacity-40"><RotateCcw size={13} /> Undo</button>
          <button data-testid="control-pause-btn" onClick={() => setPaused((p) => !p)} className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${paused ? "bg-honey text-ink" : "bg-cream/10 text-cream hover:bg-cream/20"}`}>{paused ? <Play size={13} /> : <Pause size={13} />}{paused ? "Resume all" : "Pause all"}</button>
        </div>
      </div>
      {paused && <p className="mt-3 rounded-xl bg-honey/15 px-3 py-2 text-xs text-honey" data-testid="control-paused-banner">Paused. Nothing will be sent until you resume.</p>}
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <motion.li layout key={it.id} className="flex flex-col gap-3 rounded-2xl bg-cream/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between" data-testid={`control-item-${it.id}`}>
            <div>
              <p className="font-medium text-cream">{it.title}</p>
              <p className="text-sm text-cream/70">{it.company}</p>
            </div>
            {it.status === "ready" ? (
              <div className="flex gap-2">
                <button data-testid={`control-approve-${it.id}`} disabled={paused} onClick={() => act(it.id, "approved")} className="flex items-center gap-1.5 rounded-full bg-leaf px-3.5 py-2 text-xs font-semibold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-40"><Check size={13} /> Approve</button>
                <button data-testid={`control-skip-${it.id}`} onClick={() => act(it.id, "skipped")} className="flex items-center gap-1.5 rounded-full bg-cream/10 px-3.5 py-2 text-xs text-cream hover:bg-cream/20"><SkipForward size={13} /> Skip</button>
              </div>
            ) : (
              <span className={`eyebrow self-start rounded-full px-2.5 py-1 sm:self-auto ${BADGE[it.status]}`}>{it.status}</span>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export const Control = () => (
  <section id="control" className="px-3 py-10 sm:px-6 lg:py-16" data-testid="control-section">
    <div className="relative mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-cocoa px-5 py-16 sm:px-10 lg:rounded-[2.75rem] lg:px-16 lg:py-24">
      <div className="peach-glow pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] opacity-25" />
      <div className="relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHead dark eyebrow="Approval & control" title="You hold" accent="the send button." sub="ApplyScout prepares. You decide. Every application waits in your queue until you approve it." />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06} className="rounded-2xl border border-cream/10 p-4 sm:p-5">
                <Icon size={18} className="text-peach" />
                <p className="font-display mt-3 text-lg font-bold text-cream">{title}</p>
                <p className="mt-1 text-sm text-cream/70">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.15} className="lg:col-span-6 lg:pt-6">
          <Queue />
          <p className="mt-3 font-mono text-xs text-cream/60">Try it: approve, skip, pause and undo. It's a live demo.</p>
        </Reveal>
      </div>
    </div>
  </section>
);

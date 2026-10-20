import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Eye, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Reveal, SectionHead, Status } from "./Motion";
import { useQueue } from "./useQueue";

const FEATURES = [
  { icon: Eye, title: "Review", text: "See the full application side by side with the job." },
  { icon: Check, title: "Approve", text: "One tap when it looks right. Not before." },
  { icon: Pause, title: "Pause", text: "Stop everything instantly. Resume when you're ready." },
  { icon: RotateCcw, title: "Undo", text: "Changed your mind? Pull it back before it sends." },
];

const ROW_BG = { ready: "bg-white", approved: "bg-ok/[0.06]", skipped: "bg-navy/[0.025]" };

const Queue = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const q = useQueue();
  const pending = q.items.filter((x) => x.status === "ready").length;

  useEffect(() => {
    if (!inView) return undefined;
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea")) return;
      const k = e.key.toLowerCase();
      if (k === "a" && q.firstReady) q.act(q.firstReady.id, "approved");
      if (k === "s" && q.firstReady) q.act(q.firstReady.id, "skipped");
      if (k === "p") q.setPaused((p) => !p);
      if (k === "u") q.undo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, q]);

  return (
    <div ref={ref} className="card overflow-hidden rounded-3xl" data-testid="control-queue">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/[0.07] px-5 py-4">
        <span className="flex items-center gap-2 text-sm font-semibold text-navy"><span className={`h-2 w-2 rounded-full ${q.paused ? "bg-honey" : "dot-live bg-ok"}`} />Review queue · {pending} pending</span>
        <div className="flex gap-2">
          <button data-testid="control-undo-btn" onClick={q.undo} disabled={!q.canUndo} className="flex items-center gap-1.5 rounded-lg border border-navy/10 px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-navy/[0.03] disabled:opacity-40"><RotateCcw size={13} /> Undo <kbd className="key">U</kbd></button>
          <button data-testid="control-pause-btn" onClick={() => q.setPaused((p) => !p)} className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${q.paused ? "border-honey bg-honey/15 text-[#93370D]" : "border-navy/10 text-navy hover:bg-navy/[0.03]"}`}>{q.paused ? <Play size={13} /> : <Pause size={13} />}{q.paused ? "Resume all" : "Pause all"} <kbd className="key">P</kbd></button>
        </div>
      </div>
      {q.paused && <p className="border-b border-honey/30 bg-honey/10 px-5 py-2 text-xs font-medium text-[#93370D]" data-testid="control-paused-banner">Paused. Nothing will be sent until you resume.</p>}
      <ul className="divide-y divide-navy/[0.06]">
        {q.items.map((it) => (
          <motion.li layout transition={{ type: "spring", stiffness: 300, damping: 30 }} key={it.id} className={`flex flex-col gap-3 px-5 py-4 transition-colors duration-500 sm:flex-row sm:items-center sm:justify-between ${ROW_BG[it.status]}`} data-testid={`control-item-${it.id}`}>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy/[0.05] font-display font-bold text-navy">{it.company[0]}</span>
              <div>
                <p className="font-semibold text-navy">{it.title}</p>
                <p className="text-sm text-mute">{it.company}</p>
              </div>
            </div>
            {it.status === "ready" ? (
              <div className="flex gap-2">
                <button data-testid={`control-approve-${it.id}`} disabled={q.paused} onClick={() => q.act(it.id, "approved")} className="btn-brand flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold disabled:opacity-40"><Check size={13} /> Approve</button>
                <button data-testid={`control-skip-${it.id}`} onClick={() => q.act(it.id, "skipped")} className="flex items-center gap-1.5 rounded-lg border border-navy/10 px-3.5 py-2 text-xs font-semibold text-navy hover:bg-navy/[0.03]"><SkipForward size={13} /> Skip</button>
              </div>
            ) : (
              <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="self-start sm:self-auto"><Status status={it.status} /></motion.span>
            )}
          </motion.li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-navy/[0.07] bg-navy/[0.02] px-5 py-3 text-xs text-mute">
        <span><kbd className="key">A</kbd> approve</span><span><kbd className="key">S</kbd> skip</span><span><kbd className="key">P</kbd> pause</span><span><kbd className="key">U</kbd> undo</span>
      </div>
    </div>
  );
};

export const Control = () => (
  <section id="control" className="px-3 py-10 sm:px-6 lg:py-16" data-testid="control-section">
    <div className="dots-bg relative mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] border border-navy/[0.07] bg-white px-5 py-16 sm:px-10 lg:rounded-[2.75rem] lg:px-16 lg:py-24">
      <div className="glow-brand pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px]" />
      <div className="relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Approval & control" title="You hold" accent="the send button." sub="ApplyScout prepares. You decide. Every application waits in your queue until you approve it." />
          <div className="mt-10 grid grid-cols-2 gap-3">
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.05} className="card rounded-2xl p-4 sm:p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-brand"><Icon size={16} /></span>
                <p className="font-display mt-3 text-lg font-bold text-navy">{title}</p>
                <p className="mt-1 text-sm text-mute">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.12} className="lg:col-span-7 lg:pt-4">
          <Queue />
          <p className="mt-3 text-sm text-mute">Try it: approve, skip, pause and undo. It's a live demo.</p>
        </Reveal>
      </div>
    </div>
  </section>
);

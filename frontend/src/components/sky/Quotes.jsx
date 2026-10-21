import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Quote, X } from "lucide-react";
import { Reveal } from "./Bits";
import { AVATARS } from "./assets";

const OURS = [
  { q: "I sent six applications in a week and every one sounded like me.", who: "Product ops, Bengaluru" },
  { q: "Seeing which fact each sentence came from is what made me trust it.", who: "Analyst, London" },
  { q: "It told me to skip a role I'd have wasted an evening on.", who: "Programme manager, remote" },
  { q: "Nothing went out without my click. That's the whole point.", who: "Ops lead, Austin" },
];

const Slide = ({ item, track, i }) => (
  <div className="slide w-[86%] shrink-0 sm:w-[48%] lg:w-[32%]" data-testid={`quote-slide-${track}-${i}`}>
    <div className="white-card flex h-[240px] flex-col p-6 hover:translate-y-0">
      <div className="flex items-center justify-between">
        <Quote size={22} className="text-accent" />
        <span className="rounded-full bg-lemon px-2.5 py-1 text-[0.66rem] font-extrabold uppercase tracking-[0.12em] text-[#7A5A00]">Sample</span>
      </div>
      <p className="font-display mt-4 text-[1.28rem] leading-[1.2] text-ink">{item.q}</p>
      <div className="mt-auto flex items-center gap-2.5 pt-4">
        <img src={AVATARS[i % AVATARS.length]} alt="" className="h-8 w-8 rounded-full object-cover" />
        <p className="text-[0.82rem] font-bold text-slate">Sample quote · {item.who}</p>
      </div>
    </div>
  </div>
);

const Carousel = ({ items, track }) => {
  const wrap = useRef(null);
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIdx, setMaxIdx] = useState(items.length - 1);
  const [paused, setPaused] = useState(false);
  const inView = useInView(wrap, { amount: 0.4 });

  const measure = useCallback(() => {
    const el = wrap.current;
    if (!el) return;
    const first = el.querySelector(".slide");
    if (!first) return;
    const s = first.offsetWidth + 16;
    const visible = Math.max(1, Math.round((el.offsetWidth + 16) / s));
    setStep(s);
    setMaxIdx(Math.max(0, items.length - visible));
  }, [items.length]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => { setIdx(0); }, [track]);
  useEffect(() => { if (idx > maxIdx) setIdx(maxIdx); }, [idx, maxIdx]);

  useEffect(() => {
    if (paused || !inView) return undefined;
    const id = setInterval(() => setIdx((i) => (i >= maxIdx ? 0 : i + 1)), 4200);
    return () => clearInterval(id);
  }, [paused, inView, maxIdx]);

  const go = (d) => setIdx((i) => Math.min(maxIdx, Math.max(0, i + d)));

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div ref={wrap} className="overflow-hidden px-1 py-4" data-testid={`carousel-${track}`}>
        <motion.div
          className="flex cursor-grab gap-4 active:cursor-grabbing"
          animate={{ x: -idx * step }}
          transition={{ type: "spring", stiffness: 160, damping: 26 }}
          drag="x"
          dragConstraints={{ left: -maxIdx * step, right: 0 }}
          dragElastic={0.12}
          onDragStart={() => setPaused(true)}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 || info.velocity.x < -400) go(1);
            else if (info.offset.x > 50 || info.velocity.x > 400) go(-1);
            else setIdx((i) => i);
            setPaused(false);
          }}
        >
          {items.map((it, i) => <Slide key={it.q} item={it} track={track} i={i} />)}
        </motion.div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-4">
        <button onClick={() => go(-1)} aria-label="Previous" data-testid={`carousel-${track}-prev`} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow disabled:opacity-40" disabled={idx === 0}>
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-2" data-testid={`carousel-${track}-dots`}>
          {Array.from({ length: maxIdx + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={idx === i}
              data-testid={`carousel-${track}-dot-${i}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${idx === i ? "w-7 bg-ink" : "w-2.5 bg-ink/20 hover:bg-ink/40"}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next" data-testid={`carousel-${track}-next`} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow disabled:opacity-40" disabled={idx === maxIdx}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const TOOLS = ["Auto-apply bots", "AI resume writers", "Paid portal boosts"];
// y = usually yes, n = usually no, p = partly. Typical behaviour by tool type, from public reviews.
const TABLE = [
  { need: "Shows you every field before it's sent", fix: "You review each application first", cells: ["n", "p", "n"] },
  { need: "Uses only true facts about you", fix: "Only facts you confirmed, each one cited", cells: ["n", "n", "p"] },
  { need: "Picks fewer, better-fit roles", fix: "Filters out poor fits before drafting", cells: ["n", "n", "n"] },
  { need: "Sounds like you, not a robot", fix: "Written from your own words and tone", cells: ["n", "p", "n"] },
  { need: "A real person answers support", fix: "A named person replies to early users", cells: ["p", "p", "p"] },
  { need: "Your data stays yours", fix: "Export your history any time", cells: ["p", "p", "p"] },
  { need: "No account-ban risk", fix: "Never logs into LinkedIn for you", cells: ["n", "y", "y"] },
  { need: "No paid 'priority' tricks", fix: "No boosts, no fake badges", cells: ["y", "y", "n"] },
];

const Mark = ({ v }) => (
  v === "y" ? <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-[#E2F6E6] text-[#2C8F6B]"><Check size={14} strokeWidth={3} /></span>
    : v === "p" ? <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-[#FFF0DA] text-[0.95rem] font-extrabold text-[#B26A00]">~</span>
      : <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-[#FFE3EC] text-[#B1305F]"><X size={14} strokeWidth={3} /></span>
);

const ProblemTable = () => (
  <div data-testid="problem-table">
    {/* desktop table */}
    <div className="white-card hidden overflow-hidden p-2 hover:translate-y-0 md:block">
      <div className="grid grid-cols-[1.5fr_repeat(3,0.8fr)_1.7fr] items-end gap-2 px-4 pb-3 pt-4">
        <p className="text-[0.74rem] font-bold uppercase tracking-[0.14em] text-slate">What you need</p>
        {TOOLS.map((t) => <p key={t} className="text-center text-[0.74rem] font-bold uppercase leading-tight tracking-[0.1em] text-slate">{t}</p>)}
        <p className="flex items-center gap-2 rounded-t-[16px] bg-ink px-4 py-2.5 text-[0.8rem] font-extrabold uppercase tracking-[0.12em] text-white">
          <Check size={14} strokeWidth={3} /> ApplyScout
        </p>
      </div>
      {TABLE.map((r, i) => (
        <motion.div
          key={r.need}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className={`grid grid-cols-[1.5fr_repeat(3,0.8fr)_1.7fr] items-center gap-2 px-4 ${i % 2 ? "" : "zebra"} rounded-[14px]`}
          data-testid={`problem-row-${i}`}
        >
          <p className="py-3.5 text-[0.95rem] font-bold text-ink">{r.need}</p>
          {r.cells.map((c, k) => <div key={k} className="py-3.5"><Mark v={c} /></div>)}
          <p className={`flex h-full items-center gap-2 bg-ink px-4 py-3.5 text-[0.9rem] font-semibold text-white ${i === TABLE.length - 1 ? "rounded-b-[16px]" : ""}`}>
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#2C8F6B]"><Check size={11} strokeWidth={3} /></span>
            {r.fix}
          </p>
        </motion.div>
      ))}
    </div>

    {/* mobile: stacked rows */}
    <div className="space-y-3 md:hidden">
      {TABLE.map((r, i) => (
        <Reveal key={r.need} delay={(i % 3) * 0.05}>
          <div className="white-card p-4 hover:translate-y-0" data-testid={`problem-card-${i}`}>
            <p className="font-display text-[1.05rem] leading-tight text-ink">{r.need}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {TOOLS.map((t, k) => (
                <div key={t} className="flex flex-col items-center gap-1 rounded-[12px] bg-page p-2 text-center">
                  <Mark v={r.cells[k]} />
                  <span className="text-[0.66rem] font-bold leading-tight text-slate">{t}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-2 rounded-[12px] bg-ink px-3 py-2.5 text-[0.86rem] font-semibold text-white">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#2C8F6B]"><Check size={11} strokeWidth={3} /></span>
              ApplyScout: {r.fix}
            </p>
          </div>
        </Reveal>
      ))}
    </div>

    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.76rem] font-semibold text-slate">
      <span className="flex items-center gap-1.5"><Mark v="y" /> usually yes</span>
      <span className="flex items-center gap-1.5"><Mark v="p" /> sometimes</span>
      <span className="flex items-center gap-1.5"><Mark v="n" /> usually no</span>
      <span className="w-full text-center text-slate/80">Typical behaviour by tool type, based on public reviews. Tools not named.</span>
    </div>
  </div>
);

export const Quotes = () => (
  <section id="table" className="scroll-mt-28 px-3 py-14 sm:px-5 md:py-20" data-testid="quotes-section">
    <div className="mx-auto max-w-[1100px]">
      <Reveal className="mx-auto max-w-[40rem] text-center">
        <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-accent">Side by side</p>
        <h2 className="font-display mt-3 text-[2rem] leading-[1.06] text-ink sm:text-[2.6rem]">The real problems, and how we fix them.</h2>
      </Reveal>
      <div className="mt-10"><ProblemTable /></div>

      <Reveal className="mt-20 text-center">
        <h3 className="font-display text-[1.7rem] leading-tight text-ink sm:text-[2.1rem]">What early users tell us.</h3>
        <p className="mt-2 text-[0.84rem] font-semibold text-slate">Sample quotes until real ones are in.</p>
      </Reveal>
      <div className="mt-4">
        <Carousel items={OURS} track="ours" />
      </div>
    </div>
  </section>
);

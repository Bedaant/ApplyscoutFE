import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "./Bits";
import { AVATARS } from "./assets";

const OTHERS = [
  { q: "5,000 applications. 5 interviews.", who: "Mass auto-apply bot", src: "Summary of public reviews" },
  { q: "Over 1,000 jobs applied. Zero callbacks.", who: "Bulk-apply service", src: "Summary of public reviews" },
  { q: "The resume it wrote had job titles I never held.", who: "AI job copilot", src: "Summary of public reviews" },
  { q: "Fields left blank. Applications that never submitted.", who: "Auto-fill extension", src: "Summary of public reviews" },
  { q: "Paid for “priority applicant”. Still no calls.", who: "Job-portal paid plan", src: "Summary of public reviews" },
  { q: "The service shut down and took my history with it.", who: "AI job-search service, 2024", src: "Summary of public reports" },
  { q: "Cover letters that read as robotic.", who: "Resume-tailoring tool", src: "Summary of public reviews" },
  { q: "67% of hiring managers say AI-written applications slow hiring.", who: "Robert Half survey", src: "As reported in press — survey not opened by us" },
];

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
        <Quote size={22} className={track === "others" ? "text-[#E1457B]" : "text-accent"} />
        <span className={`rounded-full px-2.5 py-1 text-[0.66rem] font-extrabold uppercase tracking-[0.12em] ${track === "others" ? "bg-[#FFE3EC] text-[#B1305F]" : "bg-lemon text-[#7A5A00]"}`}>
          {track === "others" ? item.src : "Sample"}
        </span>
      </div>
      <p className="font-display mt-4 text-[1.28rem] leading-[1.2] text-ink">{item.q}</p>
      <div className="mt-auto flex items-center gap-2.5 pt-4">
        {track === "ours" && <img src={AVATARS[i % AVATARS.length]} alt="" className="h-8 w-8 rounded-full object-cover" />}
        <p className="text-[0.82rem] font-bold text-slate">{track === "others" ? item.who : `Sample quote · ${item.who}`}</p>
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
    if (paused) return undefined;
    const id = setInterval(() => setIdx((i) => (i >= maxIdx ? 0 : i + 1)), 4200);
    return () => clearInterval(id);
  }, [paused, maxIdx]);

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

const TRACKS = [
  ["others", "About other tools"],
  ["ours", "From early users"],
];

export const Quotes = () => {
  const [track, setTrack] = useState("others");
  return (
    <section className="px-3 py-14 sm:px-5 md:py-20" data-testid="quotes-section">
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="text-center">
          <h2 className="font-display text-[2rem] leading-[1.06] text-ink sm:text-[2.6rem]">What job seekers say.</h2>
          <div className="mx-auto mt-6 flex w-fit items-center gap-1 rounded-full bg-white p-1 shadow-[0_10px_26px_-18px_rgba(22,33,58,0.6)]">
            {TRACKS.map(([id, label]) => (
              <button key={id} onClick={() => setTrack(id)} data-testid={`quotes-track-${id}`} aria-pressed={track === id}
                className={`relative rounded-full px-4 py-2 text-[0.86rem] font-bold ${track === id ? "text-white" : "text-slate hover:text-ink"}`}>
                {track === id && <motion.span layoutId="track-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-6">
          <Carousel key={track} items={track === "others" ? OTHERS : OURS} track={track} />
        </div>
        {track === "others" && (
          <p className="mt-4 text-center text-[0.74rem] font-medium text-slate/80">Paraphrased from public reviews and reports. Tools not named.</p>
        )}
      </div>
    </section>
  );
};

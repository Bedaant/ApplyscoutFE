import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CornerUpLeft, Users } from "lucide-react";
import { AVATARS } from "./assets";
import { EASE, Reveal } from "./Bits";

const CARDS = [
  { co: "Northwind Labs", mono: "N", pay: "£62k – £71k", title: "Product Operations Lead", blurb: "Remote across Europe. They want someone who has rebuilt an onboarding flow and can prove it.", bg: "bg-lilac", rot: -13, y: 56, n: "18" },
  { co: "Halden & Co.", mono: "H", pay: "£58k – £64k", title: "Senior Operations Analyst", blurb: "Hybrid in London, two days in. SQL-heavy, process-heavy, no agency fluff.", bg: "bg-peach2", rot: -6, y: 24, n: "31" },
  { co: "Brightloom", mono: "B", pay: "£70k – £80k", title: "Programme Manager, Payments", blurb: "Fully remote. Payments background preferred — flagged because yours is adjacent, not exact.", bg: "bg-mint", rot: 0, y: 0, n: "12", hero: true },
  { co: "Kesten Health", mono: "K", pay: "£55k – £60k", title: "Operations Manager", blurb: "Hybrid in Manchester. Smaller team, broad remit, quick hiring loop.", bg: "bg-rose", rot: 6, y: 24, n: "44" },
  { co: "Fernhill Group", mono: "F", pay: "£64k – £72k", title: "Senior Account Executive", blurb: "Remote UK. Posted this morning, nobody has applied yet.", bg: "bg-aqua", rot: 13, y: 56, n: "3" },
];

const Card = ({ c, approved, onApprove, onUndo }) => (
  <div className={`${c.bg} soft-card flex h-[320px] w-[260px] shrink-0 flex-col p-5 text-ink`} data-testid={`job-card-${c.mono}`}>
    <div className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/80 text-[0.85rem] font-extrabold">{c.mono}</span>
      <div className="leading-tight">
        <p className="text-[0.8rem] font-bold">{c.co}</p>
        <p className="text-[0.78rem] font-semibold text-ink/60">{c.pay}</p>
      </div>
    </div>

    <h3 className="font-display mt-4 text-[1.35rem] leading-[1.12]">{c.title}</h3>
    <p className="mt-2 text-[0.84rem] leading-snug text-ink/70">{c.blurb}</p>

    <div className="mt-auto">
      <div className="flex items-center gap-2">
        <span className="flex -space-x-2">
          {AVATARS.slice(0, 3).map((a) => (
            <img key={a} src={a} alt="" loading="lazy" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
          ))}
        </span>
        <span className="flex items-center gap-1 text-[0.78rem] font-semibold text-ink/60"><Users size={12} /> {c.n} applied</span>
      </div>

      {c.hero ? (
        approved ? (
          <div className="tick-in mt-3 flex items-center justify-between rounded-full bg-white px-4 py-2.5" data-testid="job-card-approved">
            <span className="flex items-center gap-1.5 text-[0.86rem] font-bold text-[#1F7A52]"><Check size={15} /> Queued, not sent</span>
            <button onClick={onUndo} data-testid="job-card-undo-btn" className="flex items-center gap-1 text-[0.82rem] font-semibold text-slate hover:text-ink">
              <CornerUpLeft size={12} /> Undo
            </button>
          </div>
        ) : (
          <button onClick={onApprove} data-testid="job-card-approve-btn"
            className="pill-ink mt-3 w-full rounded-full py-2.5 text-[0.88rem] font-bold">
            Approve this draft
          </button>
        )
      ) : (
        <p className="mt-3 rounded-full bg-white/70 py-2.5 text-center text-[0.84rem] font-bold text-ink/70">Draft ready to read</p>
      )}
    </div>
  </div>
);

export const JobCards = () => {
  const [approved, setApproved] = useState(false);
  const props = { approved, onApprove: () => setApproved(true), onUndo: () => setApproved(false) };

  return (
    <section id="jobs" className="relative z-10 -mt-16 scroll-mt-28 px-3 sm:px-5" data-testid="job-cards">
      {/* desktop: fanned deck */}
      <div className="relative mx-auto hidden h-[400px] max-w-[1100px] md:block">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.co}
            initial={{ opacity: 0, y: 90, rotate: 0 }}
            whileInView={{ opacity: 1, y: c.y, rotate: c.rot }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: EASE }}
            whileHover={{ rotate: 0, y: c.y - 26, zIndex: 40, transition: { duration: 0.35, ease: EASE } }}
            className="absolute left-1/2 top-0"
            style={{ marginLeft: -130 + (i - 2) * 218, zIndex: c.hero ? 30 : 10 + i }}
          >
            <Card c={c} {...props} />
          </motion.div>
        ))}
      </div>

      {/* mobile: swipeable row */}
      <div className="no-bar -mx-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-2 md:hidden">
        {CARDS.map((c) => (
          <div key={c.co} className="snap-center">
            <Card c={c} {...props} />
          </div>
        ))}
      </div>

      <Reveal delay={0.2} className="mx-auto mt-8 max-w-[1100px] text-center md:mt-10">
        <p className="text-[0.84rem] font-semibold text-slate">
          Sample postings — Northwind, Halden, Brightloom, Kesten and Fernhill are invented for this page.
        </p>
      </Reveal>
    </section>
  );
};

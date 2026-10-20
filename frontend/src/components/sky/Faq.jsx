import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Plus, Search } from "lucide-react";
import { AVATARS } from "./assets";
import { EASE, Reveal } from "./Bits";

const QA = [
  ["Is this auto-apply with a nicer name?",
   "No. There is no setting that lets it apply without you. Approving each application is the only way anything is sent, and the button sits in one place so you always know where it is. Stop opening the queue and nothing goes out — annoying by design."],
  ["Will it write things about me that aren't true?",
   "It can only write from the fact list you confirmed. When a posting asks for something that isn't on that list, it leaves the gap and tells you, instead of filling it. Each draft shows which resume line every sentence came from."],
  ["What happens to my resume and my email address?",
   "The resume is stored so drafts can be built from it, and deleting it from the account page takes the extracted facts with it. We don't sell it, don't show it to companies you haven't approved, and don't train a public model on it. Sample runs on this page aren't kept at all."],
  ["What does it cost?",
   "Nothing is priced yet. There's no plan to show you and no card to enter, because the product isn't finished enough to charge for. When that changes, the list hears first and nobody is charged by surprise."],
  ["Does it work for my field?",
   "Matching is strongest for operations, product, programme and analyst roles today. Engineering and design are usable. Nursing, trades, academia and licence-heavy fields aren't covered yet, and signing up won't change that this quarter."],
];

const PhoneMock = () => (
  <div className="w-[236px] rounded-[2rem] border-[7px] border-ink bg-white shadow-[0_30px_60px_-30px_rgba(22,33,58,0.6)]" data-testid="faq-phone">
    <div className="rounded-t-[1.5rem] bg-gradient-to-b from-[#DCE8FF] to-white px-4 pb-3 pt-4">
      <div className="flex items-center justify-between">
        <img src={AVATARS[0]} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
        <Bell size={15} className="text-slate" />
      </div>
      <p className="font-display mt-3 text-[1.05rem] leading-tight text-ink">Morning, Priya</p>
      <p className="text-[0.78rem] font-semibold text-[#3B6FE0]">4 new matches, 3 drafts ready</p>
      <div className="mt-3 flex h-8 items-center gap-2 rounded-full bg-white px-3 text-[10.5px] text-slate shadow-sm">
        <Search size={11} /> product ops · remote
      </div>
    </div>
    <div className="space-y-2 px-3 pb-4 pt-1">
      {[["Northwind Labs", "Product Operations Lead", "bg-mint", "£62–71k"],
        ["Halden & Co.", "Senior Operations Analyst", "bg-peach2", "£58–64k"],
        ["Brightloom", "Programme Manager", "bg-lilac", "£70–80k"]].map(([co, role, bg, pay]) => (
        <div key={co} className={`${bg} rounded-2xl p-3`}>
          <p className="text-[9.5px] font-bold uppercase tracking-wider text-ink/60">{co} · {pay}</p>
          <p className="mt-1 text-[12px] font-bold leading-tight text-ink">{role}</p>
          <p className="mt-1.5 font-mono text-[9.5px] text-ink/60">draft ready · waiting for you</p>
        </div>
      ))}
    </div>
  </div>
);

export const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="scroll-mt-28 px-3 py-14 sm:px-5 md:py-20" data-testid="faq-section">
      <div className="mx-auto grid max-w-[1100px] items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-[#3B6FE0]">Straight answers</p>
          <h2 className="font-display mt-3 text-[2rem] leading-[1.08] text-ink sm:text-[2.5rem]">
            The questions that stop people signing up.
          </h2>

          <ul className="mt-8 space-y-3">
            {QA.map(([q, a], i) => (
              <li key={q} className={`white-card overflow-hidden ${open === i ? "ring-1 ring-[#BFD6FF]" : ""}`}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  data-testid={`faq-question-${i}`}
                  className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left"
                >
                  <span className="font-display text-[1.02rem] leading-snug text-ink md:text-[1.1rem]">{q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${open === i ? "rotate-45 bg-bubble text-[#8A2F52]" : "bg-[#F2F7FF] text-slate"}`}>
                    <Plus size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-slate" data-testid={`faq-answer-${i}`}>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center lg:col-span-5 lg:justify-end">
          <div className="float-b"><PhoneMock /></div>
        </Reveal>
      </div>
    </section>
  );
};

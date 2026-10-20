import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Lock, X } from "lucide-react";
import { EASE, Reveal } from "./Bits";

const FACTS = [
  { id: "years", label: "Five years across operations and product", clause: "I've spent five years in operations, most of it sitting inside the product team." },
  { id: "onboarding", label: "Rebuilt the customer onboarding flow (Role 2)", clause: "In my second role I rebuilt our customer onboarding flow end to end." },
  { id: "tickets", label: "Support tickets down 18% over two quarters", clause: "Support tickets dropped 18% across the two quarters after it shipped." },
  { id: "sql", label: "Comfortable writing SQL", clause: "I checked that in SQL myself, before and after, rather than trusting the dashboard." },
];

const WONT = [
  "Apply in the background while you sleep",
  "Write a line of experience you never claimed",
  "Email a recruiter under your name",
  "Keep going once you've hit pause",
];

const NOT_YET = [
  "Live sourcing covers a limited set of role types",
  "Inbox tracking is in testing, and Gmail only",
  "No mobile app, no work-sample uploads",
  "Nursing, trades and licence-heavy fields aren't covered",
];

export const Truth = () => {
  const [on, setOn] = useState({ years: true, onboarding: true, tickets: true, sql: true });
  const active = FACTS.filter((f) => on[f.id]);
  const removed = FACTS.length - active.length;

  return (
    <section id="limits" className="scroll-mt-28 px-3 py-14 sm:px-5 md:py-20" data-testid="truth-section">
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="mx-auto max-w-[40rem] text-center">
          <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-fox">Try the truth rule</p>
          <h2 className="font-display mt-3 text-[2rem] leading-[1.08] text-ink sm:text-[2.6rem]">
            Untick a fact. Watch the draft lose it.
          </h2>
          <p className="mx-auto mt-4 max-w-[32rem] text-base leading-relaxed text-slate">
            This is the whole argument, and it's quicker to try than to read about.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <Reveal className="lg:col-span-5">
            <div className="white-card h-full p-6" data-testid="fact-list">
              <p className="text-[0.84rem] font-bold uppercase tracking-[0.16em] text-slate/80">Confirmed facts</p>
              <ul className="mt-4 space-y-1.5">
                {FACTS.map((f) => (
                  <li key={f.id}>
                    <button
                      onClick={() => setOn((s) => ({ ...s, [f.id]: !s[f.id] }))}
                      aria-pressed={on[f.id]}
                      data-testid={`fact-toggle-${f.id}`}
                      className="flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-[#F2F7FF]"
                    >
                      <span className={`mt-[2px] grid h-[20px] w-[20px] shrink-0 place-items-center rounded-[7px] transition-colors ${on[f.id] ? "bg-mint text-[#1F7A52]" : "bg-[#EEF1F7] text-slate"}`}>
                        {on[f.id] ? <Check size={13} /> : <X size={12} />}
                      </span>
                      <span className={`text-[0.95rem] font-medium leading-snug ${on[f.id] ? "text-ink" : "text-slate line-through decoration-slate/40"}`}>
                        {f.label}
                      </span>
                    </button>
                  </li>
                ))}
                <li className="flex items-start gap-3 px-3 py-3 opacity-70">
                  <span className="mt-[2px] grid h-[20px] w-[20px] shrink-0 place-items-center rounded-[7px] bg-[#EEF1F7] text-slate"><Lock size={11} /></span>
                  <span className="text-[0.95rem] font-medium leading-snug text-slate">
                    Managed a team of 12
                    <span className="mt-1 block font-mono text-[11px]">never confirmed — can't be used, even if it would land the job</span>
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="bg-lemon soft-card h-full p-6 md:p-7" data-testid="truth-draft">
              <div className="flex items-center justify-between">
                <p className="text-[0.84rem] font-bold uppercase tracking-[0.16em] text-ink/60">Draft · Northwind Labs</p>
                <span className="rounded-full bg-white/80 px-3 py-1 font-mono text-[11px] text-ink/70">{active.length} of 4 facts in use</span>
              </div>
              <p className="mt-5 text-[0.95rem] font-bold text-ink">“Tell us about a time you improved a process.”</p>
              <div className="mt-3 min-h-[9rem] text-[1.02rem] leading-[1.75] text-ink">
                <AnimatePresence mode="popLayout" initial={false}>
                  {active.map((f) => (
                    <motion.span
                      key={f.id}
                      layout
                      initial={{ opacity: 0, filter: "blur(5px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(5px)" }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="inline"
                    >
                      {f.clause}{" "}
                    </motion.span>
                  ))}
                </AnimatePresence>
                {!active.length && <span className="text-ink/50">Nothing left to write with. Tick a fact and the draft comes back.</span>}
              </div>
              <p className="mt-5 rounded-2xl bg-white/70 px-4 py-3 font-mono text-[11px] text-ink/70" data-testid="truth-removed-note">
                {removed === 0
                  ? "0 sentences removed · 0 claims invented"
                  : `${removed} ${removed === 1 ? "sentence" : "sentences"} removed because the fact behind ${removed === 1 ? "it is" : "them are"} switched off · 0 claims invented`}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:gap-5">
          <Reveal>
            <div className="white-card h-full p-6" data-testid="wont-do-card">
              <h3 className="font-display text-[1.25rem] text-ink">What it will never do</h3>
              <ul className="mt-4 space-y-2.5">
                {WONT.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[0.95rem] text-slate">
                    <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose/60 text-[#9A2B22]"><X size={12} /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="white-card h-full p-6" data-testid="not-yet-card">
              <h3 className="font-display text-[1.25rem] text-ink">What doesn't work yet</h3>
              <ul className="mt-4 space-y-2.5">
                {NOT_YET.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[0.95rem] text-slate">
                    <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-peach2 text-[#9A5A00]">·</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

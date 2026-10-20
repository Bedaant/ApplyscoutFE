import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Reveal, EASE } from "./Motion";
import { HandCheck } from "./Hand";

const FACTS = [
  { id: "years", label: "Five years across operations and product", clause: "I've spent five years in operations, most of it sitting inside the product team." },
  { id: "onboarding", label: "Rebuilt the customer onboarding flow (Role 2)", clause: "In my second role I rebuilt our customer onboarding flow end to end." },
  { id: "tickets", label: "Support tickets down 18% over two quarters", clause: "Support tickets dropped 18% across the two quarters after it shipped." },
  { id: "sql", label: "Comfortable writing SQL", clause: "I checked that in SQL myself, before and after, rather than taking the dashboard's word for it." },
];

export const Facts = () => {
  const [on, setOn] = useState({ years: true, onboarding: true, tickets: true, sql: true });
  const active = FACTS.filter((f) => on[f.id]);
  const removed = FACTS.length - active.length;

  return (
    <section className="border-t border-line px-5 py-16 lg:px-8 lg:py-28" data-testid="facts-section">
      <div className="mx-auto max-w-[1180px]">
        <Reveal kind="rise" className="max-w-2xl">
          <p className="label">The truth rule</p>
          <h2 className="font-display mt-4 text-[2rem] font-bold leading-[1.03] tight sm:text-[2.9rem]">
            Untick a fact. Watch the paragraph lose it.
          </h2>
          <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ash">
            This is the whole argument, and it's easier to try than to read about. The draft on the right is
            built only from the lines ticked on the left.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="label">Confirmed facts</p>
            <ul className="mt-4 space-y-1">
              {FACTS.map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => setOn((s) => ({ ...s, [f.id]: !s[f.id] }))}
                    data-testid={`fact-toggle-${f.id}`}
                    aria-pressed={on[f.id]}
                    className="flex w-full items-start gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition-colors hover:border-line hover:bg-sheet"
                  >
                    <span className={`mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[6px] border transition-colors ${on[f.id] ? "border-brand bg-brand/10" : "border-line bg-white"}`}>
                      {on[f.id] && <HandCheck size={12} />}
                    </span>
                    <span className={`text-[0.97rem] leading-snug transition-colors ${on[f.id] ? "text-coal" : "text-ash line-through decoration-ash/40"}`}>
                      {f.label}
                    </span>
                  </button>
                </li>
              ))}
              <li className="flex items-start gap-3 px-3 py-3 opacity-70">
                <span className="mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[6px] border border-line bg-paper text-ash">
                  <Lock size={10} />
                </span>
                <span className="text-[0.97rem] leading-snug text-ash">
                  Managed a team of 12
                  <span className="mt-1 block font-mono text-[10.5px]">never confirmed — can't be used, even if you'd get the job with it</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="sheet rounded-2xl p-5 md:p-7" data-testid="facts-draft">
              <div className="flex items-center justify-between">
                <p className="label text-[10px]">Draft · Northwind Labs</p>
                <span className="font-mono text-[10.5px] text-ash">{active.length} of 4 facts in use</span>
              </div>
              <p className="mt-4 text-[0.95rem] font-semibold">“Tell us about a time you improved a process.”</p>
              <div className="mt-3 min-h-[8.5rem] text-[1rem] leading-[1.8] text-coal">
                <AnimatePresence mode="popLayout" initial={false}>
                  {active.map((f) => (
                    <motion.span
                      key={f.id}
                      layout
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="inline"
                    >
                      {f.clause}{" "}
                    </motion.span>
                  ))}
                </AnimatePresence>
                {!active.length && (
                  <span className="text-ash">Nothing left to write with. Confirm a fact and the draft comes back.</span>
                )}
              </div>
              <p className="mt-5 border-t border-line pt-4 font-mono text-[10.5px] text-ash" data-testid="facts-removed-note">
                {removed === 0
                  ? "0 sentences removed · 0 claims invented"
                  : `${removed} ${removed === 1 ? "sentence" : "sentences"} removed because the fact behind ${removed === 1 ? "it is" : "them are"} switched off · 0 claims invented`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

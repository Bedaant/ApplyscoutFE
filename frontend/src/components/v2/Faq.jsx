import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, EASE } from "./Motion";

const QA = [
  ["Is this auto-apply with a nicer name?",
   "No. There is no setting that lets it apply without you. Approving each application is the only way anything is sent, and the button sits in one place so you always know where it is. If you stop opening the queue, nothing goes out — which is annoying by design."],
  ["Will it write things about me that aren't true?",
   "It can only write from the fact list you confirmed. When a posting asks for something that isn't on that list, it leaves a gap and tells you, rather than filling it. Drafts show which resume line each sentence came from, and what was cut for being unsupported."],
  ["What happens to my resume and my email address?",
   "The resume is stored so drafts can be built from it, and you can delete it from the account page — when you do, the file and the facts pulled out of it go with it. We don't sell it, don't show it to companies you haven't approved, and don't train a public model on it. Sample runs on this page aren't kept at all."],
  ["What does it cost?",
   "Nothing is priced yet. There's no plan to show you and no card to enter, because the product isn't finished enough to charge for. When that changes, the list hears first and nobody gets charged by surprise."],
  ["Does it work for my field?",
   "Right now matching is strongest for operations, product, programme and analyst roles, because that's where the first users are and where the job data is cleanest. Engineering and design are usable. Nursing, trades, academia and anything licence-heavy are not covered yet, and signing up won't change that this quarter."],
  ["What doesn't work yet?",
   "Live sourcing runs for a limited set of role types. Inbox tracking is in testing and Gmail-only. There's no mobile app. Multi-page portfolios and work-sample uploads aren't supported. If one of those is the thing you need, you'll be waiting a while."],
];

export const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="scroll-mt-20 border-t border-line bg-sheet px-5 py-16 lg:px-8 lg:py-28" data-testid="faq-section">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal kind="slide" className="lg:col-span-4">
          <p className="label">Straight answers</p>
          <h2 className="font-display mt-4 text-[1.9rem] font-bold leading-[1.04] tight sm:text-[2.4rem]">
            The questions that stop people signing up.
          </h2>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-ash">
            Including the ones with answers we'd rather not have to give yet.
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          <ul className="border-t border-line">
            {QA.map(([q, a], i) => (
              <li key={q} className="border-b border-line">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  data-testid={`faq-question-${i}`}
                  aria-expanded={open === i}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-[1.08rem] font-bold leading-snug tight md:text-[1.2rem]">{q}</span>
                  <Plus
                    size={18}
                    className={`mt-1 shrink-0 text-ash transition-transform duration-300 ${open === i ? "rotate-45 text-brand" : ""}`}
                  />
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
                      <p className="max-w-[46rem] pb-6 pr-8 text-[0.98rem] leading-[1.75] text-ash" data-testid={`faq-answer-${i}`}>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EmailForm } from "./EmailForm";
import { Underlined } from "./Hand";
import { Stage } from "./Stage";
import { EASE } from "./Motion";

const line = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: EASE },
});

export const Hero = ({ onSample }) => (
  <section id="top" className="relative px-5 pb-6 pt-14 lg:px-8 lg:pb-16 lg:pt-20" data-testid="hero">
    <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-5 lg:pt-6">
        <motion.p {...line(0.05)} className="label flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Early access · built in the open
        </motion.p>

        <h1 className="font-display mt-5 font-bold leading-[0.95] tight text-coal">
          <motion.span {...line(0.12)} className="block text-[2.6rem] sm:text-[3.4rem] lg:text-[3.7rem]">We find the jobs.</motion.span>
          <motion.span {...line(0.2)} className="block text-[2.6rem] sm:text-[3.4rem] lg:text-[3.7rem]">We write the first draft.</motion.span>
          <motion.span {...line(0.28)} className="mt-1 block text-[2.85rem] sm:text-[3.7rem] lg:text-[4.1rem]">
            <Underlined>You decide</Underlined> what goes out.
          </motion.span>
        </h1>

        <motion.p {...line(0.4)} className="mt-7 max-w-[30rem] text-[1.02rem] leading-relaxed text-ash md:text-[1.08rem]">
          ApplyScout reads the postings that went up this morning, drafts each application from facts you
          confirmed yourself, and leaves it sitting in a queue. You read it, change what you want, and press
          approve. Nothing leaves without that press.
        </motion.p>

        <motion.div {...line(0.5)} id="start" className="mt-8 scroll-mt-28">
          <EmailForm source="hero" id="hero" />
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <button onClick={onSample} data-testid="hero-sample-btn"
              className="group inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-coal underline decoration-line underline-offset-4 transition-colors hover:decoration-brand">
              See a sample run
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <span className="font-mono text-[11px] text-ash">takes about a minute · nothing is sent</span>
          </div>
          <p className="mt-6 max-w-[28rem] text-[0.88rem] leading-relaxed text-ash">
            No card. No background applying on your behalf. No sentence in your application that you didn't
            tell us was true.
          </p>
        </motion.div>
      </div>

      <div className="lg:col-span-7 lg:-mr-4 xl:-mr-14">
        <Stage />
      </div>
    </div>
  </section>
);

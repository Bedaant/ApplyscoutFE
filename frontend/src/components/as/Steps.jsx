import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Reveal } from "./Motion";

const STEPS = [
  { title: "Share your resume", text: "We pull out the facts you've confirmed: roles, dates, skills and results. That becomes your source of truth." },
  { title: "Find fresh jobs", text: "New listings that match your role, level and location, so you're not sifting through stale posts." },
  { title: "Pick strong matches", text: "Each role gets a fit score and a plain reason why it fits, or why it might not." },
  { title: "Draft tailored applications", text: "Resume tweaks and answers written for that specific role, using only your confirmed facts." },
  { title: "You review and approve", text: "Nothing is sent until you say so. Edit, pause or skip anything, anytime." },
];

const Num = ({ n }) => (
  <motion.span
    initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.8 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#FF6A00] to-[#FF4500] font-display font-bold text-white shadow-[0_8px_18px_-8px_rgba(255,69,0,0.9)]"
  >
    {n}
  </motion.span>
);

export const Steps = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="how" className="px-3 sm:px-6" data-testid="workflow-section">
      <div className="mx-auto max-w-[88rem] rounded-[2rem] bg-blush px-5 py-20 sm:px-10 lg:rounded-[2.75rem] lg:px-14 lg:py-24">
        <Reveal className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display mt-4 text-[2.1rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-[3.3rem]">
            From search to interviews. <span className="text-brand-grad">In five steps.</span>
          </h2>
        </Reveal>
        <div ref={ref} className="relative mt-14">
          <div className="absolute left-5 right-5 top-5 hidden h-0.5 bg-navy/10 lg:block" />
          <motion.div style={{ scaleX: p }} className="absolute left-5 right-5 top-5 hidden h-0.5 origin-left bg-brand lg:block" />
          <div className="absolute bottom-5 left-5 top-5 w-0.5 bg-navy/10 lg:hidden" />
          <motion.div style={{ scaleY: p }} className="absolute bottom-5 left-5 top-5 w-0.5 origin-top bg-brand lg:hidden" />
          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="flex gap-5 lg:block" data-testid={`workflow-step-${i + 1}`}>
                <div className="flex items-center lg:justify-between">
                  <Num n={i + 1} />
                  {i < 4 && <ArrowRight size={18} className="hidden text-brand/70 lg:block" />}
                </div>
                <div className="card lift rounded-2xl p-5 lg:mt-6">
                  <h3 className="font-display text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mute">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

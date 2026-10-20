import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, CheckCircle2, FileText, PenLine, Radar } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const STEPS = [
  { icon: FileText, title: "Share your resume", text: "We pull out the facts you've confirmed: roles, dates, skills and results. That becomes your source of truth." },
  { icon: Radar, title: "We find fresh jobs", text: "New listings that match your role, level and location, so you're not sifting through stale posts." },
  { icon: Briefcase, title: "We pick strong matches", text: "Each role gets a fit score and a plain reason why it fits, or why it might not." },
  { icon: PenLine, title: "We draft tailored applications", text: "Resume tweaks and answers written for that specific role, using only your confirmed facts." },
  { icon: CheckCircle2, title: "You review and approve", text: "Nothing is sent until you say so. Edit, pause or skip anything, anytime." },
];

const Step = ({ step, i }) => (
  <Reveal delay={0.05} className="relative pl-16 md:pl-20">
    <motion.span
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-2xl border border-ink/10 bg-white md:h-12 md:w-12"
    >
      <step.icon size={18} />
    </motion.span>
    <div className="card-surface group rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1 md:p-8" data-testid={`workflow-step-${i + 1}`}>
      <p className="font-mono text-xs text-soft">Step 0{i + 1}</p>
      <h3 className="font-display mt-2 text-2xl font-bold md:text-[1.75rem]">{step.title}</h3>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-soft">{step.text}</p>
    </div>
  </Reveal>
);

export const Workflow = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="how" className="px-5 py-24 sm:px-8 lg:py-36" data-testid="workflow-section">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead eyebrow="What ApplyScout does" title="Five plain steps." accent="You approve the last one." sub="ApplyScout handles the repetitive parts of applying. The decisions stay with you." />
          </div>
        </div>
        <div ref={ref} className="relative space-y-6 lg:col-span-7">
          <div className="absolute bottom-6 left-[21px] top-6 w-px bg-ink/10 md:left-[23px]" />
          <motion.div style={{ scaleY }} className="absolute bottom-6 left-[21px] top-6 w-px origin-top bg-ink md:left-[23px]" />
          {STEPS.map((s, i) => <Step key={s.title} step={s} i={i} />)}
        </div>
      </div>
    </section>
  );
};

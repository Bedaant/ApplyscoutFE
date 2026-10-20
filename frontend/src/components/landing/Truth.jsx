import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AlertTriangle, CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const AnswerCard = () => (
  <Reveal className="card-surface flex h-full flex-col rounded-3xl p-6 md:col-span-7 md:row-span-2 md:p-9" data-testid="truth-answer-card">
    <p className="eyebrow text-soft">Application question</p>
    <p className="font-display mt-3 text-2xl font-bold md:text-3xl">“Tell us about a time you improved a process.”</p>
    <div className="mt-6 rounded-2xl bg-tint p-5 text-[15px] leading-relaxed text-ink/85">
      In my second role I <mark className="rounded bg-peach/70 px-1 text-ink">rebuilt the customer onboarding flow</mark>, which <mark className="rounded bg-peach/70 px-1 text-ink">reduced support tickets by 18%</mark>. I measured the change with SQL before and after launch.
    </div>
    <ul className="mt-6 space-y-3 text-sm">
      <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-leaf" /> “Rebuilt onboarding flow”: Resume, Role 2</li>
      <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-leaf" /> “18% fewer tickets”: Resume, Role 2</li>
      <li className="flex items-center gap-2.5 text-ember"><XCircle size={16} /> <span className="line-through decoration-ember/60">“Managed a team of 12”</span> removed. Not in your resume.</li>
    </ul>
    <div className="mt-7 rounded-2xl border border-ink/10 p-5">
      <p className="eyebrow text-soft">Resume, tailored for this role</p>
      <ul className="mt-3 space-y-2 text-sm">
        <li className="flex gap-2"><span className="font-mono text-xs text-[#2d7a57]">↑ moved</span> Onboarding rebuild is now your first bullet</li>
        <li className="flex gap-2"><span className="font-mono text-xs text-[#2d7a57]">+ shown</span> SQL listed in skills, since the job asks for it</li>
        <li className="flex gap-2"><span className="font-mono text-xs text-soft">= kept</span> Titles, dates and numbers stay exactly as you wrote them</li>
      </ul>
    </div>
    <p className="mt-auto pt-8 font-mono text-xs text-soft">Sample draft · every highlighted claim links to a source</p>
  </Reveal>
);

const PhotoCard = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <Reveal delay={0.1} className="md:col-span-5">
      <div ref={ref} className="relative h-72 overflow-hidden rounded-3xl md:h-[320px]" data-testid="truth-photo-card">
        <motion.img src="/images/desk.jpg" alt="A calm, organised desk with a laptop" style={{ y }} className="absolute inset-0 h-[124%] w-full -translate-y-[12%] object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,251,242,0)_0%,rgba(42,36,33,0.15)_45%,rgba(42,36,33,0.78)_100%)]" />
        <p className="absolute bottom-6 left-6 right-6 font-display text-2xl font-bold leading-tight text-cream">Your resume, tailored per role. <span className="font-serif font-normal italic">Reordered, never invented.</span></p>
      </div>
    </Reveal>
  );
};

const AskCard = () => (
  <Reveal delay={0.2} className="flex flex-col rounded-3xl border border-ink/10 bg-cream p-6 md:col-span-5 md:p-8" data-testid="truth-ask-card">
    <div className="flex items-center gap-2 text-[#8a6212]"><AlertTriangle size={16} /><span className="eyebrow">Missing a fact?</span></div>
    <p className="font-display mt-4 text-2xl font-bold">We ask. We don't guess.</p>
    <div className="mt-5 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm">
      <HelpCircle size={18} className="mt-0.5 shrink-0 text-honey" />
      <span>This role asks about budget ownership. Have you managed a budget? <span className="text-soft">Answer once, reuse forever.</span></span>
    </div>
  </Reveal>
);

export const Truth = () => (
  <section className="bg-white/60 px-5 py-24 sm:px-8 lg:py-32" data-testid="truth-section">
    <div className="mx-auto max-w-7xl">
      <SectionHead eyebrow="Tailored resume & answers" title="Every line traces back" accent="to something you did." sub="ApplyScout adapts your resume and writes answers for each role, but it only works from facts you've confirmed. If you haven't done it, it won't claim you did." />
      <div className="mt-14 grid gap-5 md:grid-cols-12">
        <AnswerCard />
        <PhotoCard />
        <AskCard />
      </div>
    </div>
  </section>
);

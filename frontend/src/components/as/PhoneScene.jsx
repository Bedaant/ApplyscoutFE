import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, FileUp, SlidersHorizontal, Sparkles } from "lucide-react";
import { Phone } from "./Phone";
import { SectionHead } from "./Motion";

const Float = ({ className, delay, children, testid }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`card absolute z-20 w-[150px] rounded-2xl p-3 sm:w-[210px] sm:p-4 ${className}`}
    data-testid={testid}
  >
    {children}
  </motion.div>
);

const Dash = ({ d, delay }) => (
  <motion.path d={d} fill="none" stroke="#FF5A1F" strokeWidth="1.5" strokeDasharray="5 6" vectorEffect="non-scaling-stroke"
    initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, delay }} />
);

const AppScreen = () => (
  <>
    <div className="flex gap-1.5">
      {["Remote", "Full-time"].map((c) => <span key={c} className="rounded-full border border-navy/10 px-2.5 py-1 text-[11px] font-medium text-navy">{c}</span>)}
      <span className="grid h-6 w-6 place-items-center rounded-full border border-navy/10"><SlidersHorizontal size={11} /></span>
    </div>
    <div className="mt-3 overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF7A1A] to-[#FF4500] p-3.5 text-white">
      <p className="text-[11px] opacity-90">Northwind Labs</p>
      <p className="font-display mt-1 text-lg font-bold leading-tight">Product Operations Lead</p>
      <div className="mt-2 flex gap-1">{["Ops", "Remote"].map((t) => <span key={t} className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">{t}</span>)}</div>
      <div className="mt-3 flex items-center justify-between text-[11px]"><span className="font-semibold">92% fit</span><span className="flex items-center gap-1"><Clock size={11} /> 6h ago</span></div>
    </div>
    <div className="mt-2.5 rounded-2xl border border-navy/[0.07] p-3">
      <p className="text-[11px] text-mute">Halden & Co.</p>
      <p className="text-sm font-semibold text-navy">Senior Ops Analyst</p>
      <p className="mt-1 text-[11px] font-semibold text-[#C2410C]">86% fit</p>
    </div>
    <div className="mt-3 rounded-xl bg-navy py-2.5 text-center text-xs font-semibold text-white">Review 3 drafts</div>
  </>
);

export const PhoneScene = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32" data-testid="phone-scene-section">
      <SectionHead center eyebrow="On your phone" title="Your job search," accent="in your pocket." sub="ApplyScout works in your phone's browser, so you can check matches, review drafts and approve from anywhere." />
      <div className="relative mx-auto mt-16 h-[560px] max-w-5xl sm:h-[640px]">
        <div className="glow-brand absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/15" />
        <svg className="absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
          <Dash d="M250 150 C 330 150, 340 220, 400 240" delay={0.4} />
          <Dash d="M250 500 C 320 500, 340 440, 400 420" delay={0.6} />
          <Dash d="M750 300 C 680 300, 660 260, 600 250" delay={0.8} />
        </svg>
        <div className="absolute left-1/2 top-4 z-10 w-[230px] -translate-x-1/2 sm:w-[270px]">
          <motion.div style={{ y }} data-testid="phone-mockup">
            <Phone title="My Jobs"><AppScreen /></Phone>
          </motion.div>
        </div>
        <Float className="left-0 top-6 sm:left-[4%] sm:top-[16%]" delay={0.2} testid="float-match">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#C2410C]"><Sparkles size={12} /> Fresh match · 92% fit</p>
          <p className="mt-1.5 text-xs font-semibold text-navy sm:text-sm">Product Operations Lead</p>
          <p className="text-[11px] text-mute">Northwind Labs · 6h ago</p>
        </Float>
        <Float className="bottom-8 left-0 sm:bottom-[14%] sm:left-[6%]" delay={0.4} testid="float-upload">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-navy sm:text-sm"><FileUp size={14} className="text-brand" /> Upload CV</p>
          <p className="mt-1 text-[11px] leading-snug text-mute">We pull out only the facts you confirm.</p>
        </Float>
        <Float className="right-0 top-[44%] sm:right-[4%] sm:top-[40%]" delay={0.6} testid="float-approval">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-navy"><span className="dot-live h-2 w-2 rounded-full bg-brand" /> Waiting for your approval</p>
          <p className="mt-1.5 text-[11px] text-mute">3 tailored drafts ready</p>
          <div className="mt-2 flex gap-1.5"><span className="rounded-md border border-navy/10 px-2 py-1 text-[11px]">Edit</span><span className="btn-brand rounded-md px-2 py-1 text-[11px]">Approve</span></div>
        </Float>
      </div>
    </section>
  );
};

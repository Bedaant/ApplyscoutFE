import { AlertTriangle, CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { Reveal, SectionHead } from "./Motion";

const Box = ({ span, delay = 0, testid, className = "", children }) => (
  <Reveal delay={delay} className={span}>
    <div className={`card lift h-full rounded-3xl p-6 md:p-8 ${className}`} data-testid={testid}>{children}</div>
  </Reveal>
);

const DIFF = [
  ["↑", "text-brand", "moved", "Onboarding rebuild is now your first bullet"],
  ["+", "text-[#067647]", "shown", "SQL listed in skills, since the job asks for it"],
  ["=", "text-mute", "kept", "Titles, dates and numbers stay exactly as you wrote them"],
];

export const Truth = () => (
  <section className="bg-blush/60 px-5 py-24 sm:px-8 lg:py-32" data-testid="truth-section">
    <div className="mx-auto max-w-7xl">
      <SectionHead eyebrow="Tailored resume & answers" title="Every line traces back" accent="to something you did." sub="ApplyScout adapts your resume and writes answers for each role, but it only works from facts you've confirmed. If you haven't done it, it won't claim you did." />
      <div className="mt-14 grid gap-5 md:grid-cols-12">
        <Box span="md:col-span-7" testid="truth-answer-card">
          <p className="label text-mute">Application question</p>
          <p className="font-display mt-3 text-2xl font-bold text-navy md:text-[1.7rem]">“Tell us about a time you improved a process.”</p>
          <div className="mt-5 rounded-2xl bg-blush p-5 text-[15px] leading-relaxed text-navy/85">
            In my second role I <mark className="rounded bg-brand/15 px-1 text-navy">rebuilt the customer onboarding flow</mark>, which <mark className="rounded bg-brand/15 px-1 text-navy">reduced support tickets by 18%</mark>. I measured the change with SQL before and after launch.
          </div>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5 text-navy/80"><CheckCircle2 size={16} className="text-ok" /> “Rebuilt onboarding flow”: Resume, Role 2</li>
            <li className="flex items-center gap-2.5 text-navy/80"><CheckCircle2 size={16} className="text-ok" /> “18% fewer tickets”: Resume, Role 2</li>
          </ul>
          <p className="label mt-6 text-mute">Sample draft · every highlighted claim links to a source</p>
        </Box>
        <Box span="md:col-span-5" delay={0.08} testid="truth-removed-card" className="flex flex-col">
          <div className="flex items-center gap-2 text-[#B42318]"><XCircle size={16} /><span className="label">Made-up claim caught</span></div>
          <p className="font-display mt-4 text-3xl font-extrabold text-navy/30 line-through decoration-[#D9534F] decoration-[3px]">“Managed a team of 12”</p>
          <p className="mt-4 text-[15px] leading-relaxed text-mute">Not in your resume, so it was removed before you ever saw the draft.</p>
          <div className="mt-auto pt-6"><span className="rounded-full bg-ember/10 px-3 py-1.5 text-xs font-semibold text-[#B42318]">0 invented facts sent</span></div>
        </Box>
        <Box span="md:col-span-5" delay={0.12} testid="truth-diff-card">
          <p className="label text-mute">Resume, tailored for this role</p>
          <p className="font-display mt-3 text-xl font-bold text-navy">Your resume, tailored per role. <span className="text-brand-grad">Reordered, never invented.</span></p>
          <ul className="mt-5 space-y-2 font-mono text-[13px]">
            {DIFF.map(([sym, color, tag, text]) => (
              <li key={tag} className="flex gap-3 rounded-xl bg-navy/[0.03] px-3 py-2.5">
                <span className={`${color} w-3 shrink-0 font-bold`}>{sym}</span>
                <span className={`${color} w-12 shrink-0`}>{tag}</span>
                <span className="font-sans text-navy/80">{text}</span>
              </li>
            ))}
          </ul>
        </Box>
        <Box span="md:col-span-7" delay={0.16} testid="truth-ask-card" className="flex flex-col">
          <div className="flex items-center gap-2 text-[#93370D]"><AlertTriangle size={16} /><span className="label">Missing a fact?</span></div>
          <p className="font-display mt-3 text-3xl font-extrabold text-navy">We ask. We don't guess.</p>
          <div className="mt-auto pt-6">
            <div className="flex items-start gap-3 rounded-2xl border border-honey/40 bg-honey/10 p-4 text-[15px] text-navy">
              <HelpCircle size={18} className="mt-0.5 shrink-0 text-[#93370D]" />
              <span>This role asks about budget ownership. Have you managed a budget? <span className="text-mute">Answer once, reuse forever.</span></span>
            </div>
          </div>
        </Box>
      </div>
    </div>
  </section>
);

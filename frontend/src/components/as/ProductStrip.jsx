import { CheckCircle2, FileText, Mail, Search, ShieldCheck } from "lucide-react";
import { FoxMark } from "./Brand";
import { Reveal } from "./Motion";

const ITEMS = [
  { icon: Search, title: "Relevant opportunities", text: "Fresh roles matched to your role, level and location." },
  { icon: FileText, title: "Tailored resumes", text: "Reordered for each role, never invented." },
  { icon: ShieldCheck, title: "Truth-only answers", text: "Every claim traces back to your resume." },
  { icon: CheckCircle2, title: "You approve everything", text: "Nothing is sent until you say so." },
  { icon: Mail, title: "Gmail follow-ups", text: "Replies tracked, nudges drafted for your approval." },
];

const WORDS = ["Fresh roles, found for you", "Tailored, not templated", "Only confirmed facts", "Nothing sent without approval", "Pause anytime", "Hours back every week"];

const Row = ({ hidden }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden}>
    {WORDS.map((w, i) => (
      <span key={w} className="flex items-center">
        <span className={`font-display whitespace-nowrap px-8 text-4xl font-extrabold sm:text-6xl lg:text-7xl ${i % 2 ? "text-navy/20" : "text-navy"}`}>{w}</span>
        <FoxMark size={34} />
      </span>
    ))}
  </div>
);

export const ProductStrip = () => (
  <section className="px-5 sm:px-8" data-testid="product-strip">
    <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-3xl border border-navy/[0.07] bg-navy/[0.07] sm:grid-cols-2 lg:grid-cols-5">
      {ITEMS.map(({ icon: Icon, title, text }, i) => (
        <Reveal key={title} delay={i * 0.06} className="flex items-start gap-3.5 bg-white p-5 lg:p-6">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"><Icon size={19} /></span>
          <div>
            <p className="font-display text-[15px] font-bold text-navy">{title}</p>
            <p className="mt-1 text-sm leading-snug text-mute">{text}</p>
          </div>
        </Reveal>
      ))}
    </div>
    <div className="marquee -mx-5 mt-20 overflow-hidden border-y border-navy/[0.07] py-10 sm:-mx-8 md:py-14" data-testid="editorial-marquee">
      <div className="marquee-track"><Row /><Row hidden /></div>
    </div>
  </section>
);

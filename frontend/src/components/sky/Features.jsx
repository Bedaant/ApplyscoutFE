import { Check, Inbox, ListChecks, Sparkles, Target } from "lucide-react";
import { Reveal } from "./Bits";

const FEATURES = [
  {
    bg: "bg-lilac", ink: "#5A33B0", icon: <Target size={20} />,
    title: "Matches that show their working",
    body: "Every role arrives with the two or three things it matched on and the one thing it's short on, so you can argue with it instead of guessing.",
    chip: "92% · matched on onboarding rebuild + SQL",
  },
  {
    bg: "bg-peach2", ink: "#9A5A00", icon: <ListChecks size={20} />,
    title: "Written only from what you confirmed",
    body: "You tick off the facts from your resume once. Anything the draft can't trace back to a ticked line gets cut, and it tells you what it cut.",
    chip: "“managed a team of 12” — removed",
  },
  {
    bg: "bg-mint", ink: "#1F7A52", icon: <Check size={20} />,
    title: "One queue, one button, zero surprises",
    body: "Approve, edit or skip. Pause the whole thing from one switch. Until you act, the application sits exactly where you left it.",
    chip: "3 waiting · 0 sent",
  },
  {
    bg: "bg-aqua", ink: "#0F6E8C", icon: <Inbox size={20} />,
    title: "Replies land in your inbox",
    body: "Applications go from your own address, so interviews, rejections and follow-ups stay in the thread you already read. We just flag the ones gone quiet.",
    chip: "Brightloom · no answer in 9 days",
  },
];

export const Features = () => (
  <section className="px-3 py-10 sm:px-5 md:py-16" data-testid="features">
    <div className="mx-auto max-w-[1100px]">
      <Reveal className="mx-auto max-w-[36rem] text-center">
        <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-[#3B6FE0]">What you actually get</p>
        <h2 className="font-display mt-3 text-[2rem] leading-[1.08] text-ink sm:text-[2.6rem]">
          Four things, done properly.
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className={`${f.bg} soft-card h-full p-6 md:p-7`} data-testid={`feature-card-${i}`}>
              <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-white/80" style={{ color: f.ink }}>
                {f.icon}
              </span>
              <h3 className="font-display mt-4 text-[1.3rem] leading-tight text-ink md:text-[1.45rem]">{f.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink/70">{f.body}</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 font-mono text-[11px] text-ink/70">
                <Sparkles size={12} style={{ color: f.ink }} /> {f.chip}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

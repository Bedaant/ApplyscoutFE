import { Briefcase, Globe2, GraduationCap, Shuffle } from "lucide-react";
import { Reveal, SectionHead } from "./Motion";

const CARDS = [
  { icon: Briefcase, title: "Busy professionals", text: "Apply in minutes in the evening, without retyping the same answers." },
  { icon: GraduationCap, title: "Students & recent grads", text: "Apply in volume with drafts that still sound like you, in a mature tone." },
  { icon: Shuffle, title: "Career switchers", text: "Every claim links back to your real resume, so your experience translates honestly." },
  { icon: Globe2, title: "International job seekers", text: "One consistent, structured process across every market you apply to." },
];

export const BuiltFor = () => (
  <section className="px-5 py-24 sm:px-8 lg:py-32" data-testid="built-for-section">
    <div className="mx-auto max-w-7xl">
      <SectionHead eyebrow="Built for" title="Made for people who are" accent="actively applying." sub="ApplyScout starts with one pain: applying takes too much time. Here's who it helps most." />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="card lift group h-full rounded-3xl p-6" data-testid={`built-for-card-${i}`}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush text-brand transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"><Icon size={21} /></span>
              <p className="font-display mt-6 text-xl font-bold text-navy">{title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-mute">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

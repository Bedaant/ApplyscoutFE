import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Reveal, SectionHead } from "./Motion";
import { Phone } from "./Phone";
import { SAMPLE_QUEUE } from "./useQueue";

const QA = [
  ["What happens when I click “Try it”?", "You get a short preview: add your resume (or use a sample), pick a target role, and see how matches and a tailored draft look. No sign-in needed. In this early version the preview uses sample data."],
  ["Will ApplyScout send anything without my approval?", "No. Every application and every follow-up waits in your queue until you approve it. You can pause everything at any time."],
  ["How do you avoid made-up facts?", "Drafts are built only from facts in your resume or facts you've confirmed. If a role asks for something we can't find, we ask you instead of guessing."],
  ["Can I edit what ApplyScout writes?", "Yes. You can edit any resume tweak or answer before approving, or skip the application entirely."],
  ["Who is ApplyScout for?", "Anyone actively applying who's tired of spending hours on repetitive applications, including students and recent grads, people switching roles, and international job seekers."],
  ["Is it free?", "The preview is free. We'll share pricing once the full product is ready."],
];

const MiniQueue = () => (
  <>
    <p className="text-xs text-mute">3 drafts waiting for you</p>
    <ul className="mt-3 space-y-2">
      {SAMPLE_QUEUE.map((it) => (
        <li key={it.id} className="rounded-xl border border-navy/[0.07] p-2.5">
          <p className="text-[13px] font-semibold text-navy">{it.title}</p>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[11px] text-mute">{it.company}</span>
            <span className="flex items-center gap-1 rounded-md bg-brand px-1.5 py-0.5 text-[10px] font-semibold text-white"><Check size={10} /> Approve</span>
          </div>
        </li>
      ))}
    </ul>
  </>
);

export const Faq = () => (
  <section id="faq" className="overflow-hidden px-5 py-24 sm:px-8 lg:py-32" data-testid="faq-section">
    <div className="mx-auto max-w-7xl">
      <SectionHead eyebrow="FAQ" title="Fair" accent="questions." />
      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <Accordion type="single" collapsible className="space-y-3">
            {QA.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="card rounded-2xl border-b-0 px-5">
                <AccordionTrigger data-testid={`faq-trigger-${i}`} className="font-display py-5 text-left text-base font-bold text-navy hover:no-underline md:text-lg [&>svg]:text-brand">{q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-mute">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal delay={0.15} className="flex justify-center lg:col-span-4">
          <div className="relative">
            <div className="glow-brand absolute -inset-16" />
            <Phone title="Review" className="w-[250px]"><MiniQueue /></Phone>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

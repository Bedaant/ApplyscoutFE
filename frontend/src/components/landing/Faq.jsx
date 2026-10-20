import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Reveal, SectionHead } from "./Reveal";

const QA = [
  ["What happens when I click “Try it”?", "You get a short preview: add your resume (or use a sample), pick a target role, and see how matches and a tailored draft look. No sign-in needed. In this early version the preview uses sample data."],
  ["Will ApplyScout send anything without my approval?", "No. Every application and every follow-up waits in your queue until you approve it. You can pause everything at any time."],
  ["How do you avoid made-up facts?", "Drafts are built only from facts in your resume or facts you've confirmed. If a role asks for something we can't find, we ask you instead of guessing."],
  ["Can I edit what ApplyScout writes?", "Yes. You can edit any resume tweak or answer before approving, or skip the application entirely."],
  ["Who is ApplyScout for?", "Anyone actively applying who's tired of spending hours on repetitive applications, including students and recent grads, people switching roles, and international job seekers."],
  ["Is it free?", "The preview is free. We'll share pricing once the full product is ready."],
];

export const Faq = () => (
  <section id="faq" className="px-5 py-24 sm:px-8 lg:py-32" data-testid="faq-section">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <SectionHead eyebrow="FAQ" title="Fair" accent="questions." />
      </div>
      <Reveal className="lg:col-span-8">
        <Accordion type="single" collapsible className="border-t border-ink/10">
          {QA.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-ink/10">
              <AccordionTrigger data-testid={`faq-trigger-${i}`} className="font-display py-6 text-left text-lg font-bold hover:no-underline md:text-xl">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-soft">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);

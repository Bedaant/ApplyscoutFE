import { Bell, Mail, Reply } from "lucide-react";
import { Maggie } from "./Brand";
import { Reveal, SectionHead } from "./Reveal";

const POINTS = [
  { icon: Bell, text: "Spots replies from employers so they don't get buried." },
  { icon: Reply, text: "Drafts a polite follow-up when a reasonable time has passed." },
  { icon: Mail, text: "Follow-ups wait for your approval, just like applications." },
];

const Thread = () => (
  <div className="card-surface relative rounded-3xl p-5 md:p-7" data-testid="gmail-thread-card">
    <div className="flex items-center justify-between border-b border-ink/10 pb-4">
      <p className="font-medium">Re: Your application, Product Operations Lead</p>
      <span className="eyebrow rounded-full bg-leaf/15 px-2.5 py-1 text-[#2d7a57]">Reply</span>
    </div>
    <p className="mt-4 text-sm leading-relaxed text-soft">“Thanks for applying. We'd love to find a time for a first conversation next week…”</p>
    <div className="mt-6 rounded-2xl bg-tint p-4">
      <p className="eyebrow text-soft">Follow-up draft · Halden & Co.</p>
      <p className="mt-2 text-sm leading-relaxed">Hi Sam, I wanted to follow up on my application from last week. I'm still very interested in the role…</p>
      <div className="mt-4 flex gap-2">
        <button data-testid="gmail-approve-btn" className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream transition-transform hover:-translate-y-0.5">Approve & send</button>
        <button data-testid="gmail-edit-btn" className="rounded-full border border-ink/15 px-4 py-2 text-xs transition-colors hover:bg-white">Edit</button>
      </div>
    </div>
    <div className="absolute -bottom-6 -right-2 flex items-center gap-2 rounded-full border border-ink/10 bg-white py-1.5 pl-1.5 pr-4 shadow-lg md:-right-6" data-testid="maggie-helper">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-tint"><Maggie size={30} /></span>
      <span className="text-xs">It's been 7 days. Want a gentle nudge?</span>
    </div>
  </div>
);

export const Gmail = () => (
  <section className="px-5 py-24 sm:px-8 lg:py-32" data-testid="gmail-section">
    <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <SectionHead eyebrow="Gmail follow-ups · optional" title="Follow-ups," accent="without the inbox dig." sub="Connect Gmail if you want. ApplyScout keeps track of replies and helps you follow up at the right time." />
        <ul className="mt-8 space-y-4">
          {POINTS.map(({ icon: Icon, text }, i) => (
            <Reveal key={text} delay={i * 0.06} className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white"><Icon size={15} /></span>
              <span className="pt-1 text-base">{text}</span>
            </Reveal>
          ))}
        </ul>
      </div>
      <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
        <Thread />
      </Reveal>
    </div>
  </section>
);

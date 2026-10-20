import { Bell, Mail, Reply } from "lucide-react";
import { Maggie } from "./Brand";
import { Reveal, SectionHead } from "./Motion";

const POINTS = [
  { icon: Bell, text: "Spots replies from employers so they don't get buried." },
  { icon: Reply, text: "Drafts a polite follow-up when a reasonable time has passed." },
  { icon: Mail, text: "Follow-ups wait for your approval, just like applications." },
];

const Thread = () => (
  <div className="card relative rounded-3xl" data-testid="gmail-thread-card">
    <div className="flex items-center justify-between gap-3 border-b border-navy/[0.07] px-5 py-4">
      <p className="truncate text-sm font-semibold text-navy">Re: Your application, Product Operations Lead</p>
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-ok/10 px-2.5 py-1 text-xs font-semibold text-[#067647]"><span className="dot-live h-1.5 w-1.5 rounded-full bg-ok" />Reply detected</span>
    </div>
    <div className="p-5">
      <p className="text-sm leading-relaxed text-mute">“Thanks for applying. We'd love to find a time for a first conversation next week…”</p>
      <div className="mt-5 rounded-2xl border border-brand/20 bg-blush p-4">
        <p className="label text-[#C2410C]">Follow-up draft · Halden & Co.</p>
        <p className="mt-2 text-sm leading-relaxed text-navy">Hi Sam, I wanted to follow up on my application from last week. I'm still very interested in the role…</p>
        <div className="mt-4 flex gap-2">
          <button data-testid="gmail-approve-btn" className="btn-brand rounded-lg px-4 py-2 text-xs font-semibold">Approve & send</button>
          <button data-testid="gmail-edit-btn" className="rounded-lg border border-navy/10 bg-white px-4 py-2 text-xs font-semibold text-navy transition-colors hover:bg-navy/[0.03]">Edit</button>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-7 right-2 flex items-center gap-2 rounded-full border border-navy/[0.08] bg-white py-1.5 pl-1.5 pr-4 shadow-[0_16px_40px_-14px_rgba(11,19,32,0.35)] md:-right-6" data-testid="maggie-helper">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-blush"><Maggie size={32} /></span>
      <span className="text-xs font-medium text-navy">It's been 7 days. Want a gentle nudge?</span>
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
            <Reveal key={text} delay={i * 0.05} className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"><Icon size={16} /></span>
              <span className="pt-1.5 text-base text-navy/85">{text}</span>
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

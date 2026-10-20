import { Reveal } from "./Motion";
import { Maggie } from "./Brand";

const THREADS = [
  { from: "Rachel Obi · Northwind Labs", sub: "Re: Product Operations Lead — a few questions", tag: "Replied · 2 days ago", hot: true },
  { from: "careers@halden.co", sub: "We've received your application", tag: "Auto-reply · 4 days ago" },
  { from: "Dan Whitlock · Brightloom", sub: "Programme Manager, Payments", tag: "No answer · 9 days", quiet: true },
];

export const Followups = () => (
  <section className="border-t border-line bg-sheet px-5 py-16 lg:px-8 lg:py-28" data-testid="followups-section">
    <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-12 lg:gap-16">
      <Reveal kind="slide" className="lg:col-span-5">
        <p className="label">After it's sent</p>
        <h2 className="font-display mt-4 text-[1.9rem] font-bold leading-[1.04] tight sm:text-[2.5rem]">
          Replies come to your inbox. Not ours.
        </h2>
        <p className="mt-4 text-[1rem] leading-[1.7] text-ash">
          Applications go out from your own address, so every reply, rejection and interview invitation lands
          where you already read your mail. ApplyScout watches the thread and tells you which ones have gone
          quiet — it doesn't answer for you.
        </p>
        <p className="mt-4 font-mono text-[11px] text-ash">
          connecting Gmail is optional · we read subject lines and dates, not your personal mail
        </p>
      </Reveal>

      <Reveal kind="rise" delay={0.12} className="lg:col-span-7">
        <div className="sheet rounded-2xl p-4 md:p-5" data-testid="inbox-mock">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <p className="label text-[10px]">Your inbox · applications</p>
            <span className="font-mono text-[10.5px] text-ash">3 threads</span>
          </div>
          <ul className="divide-y divide-line">
            {THREADS.map((t) => (
              <li key={t.sub} className="flex items-start gap-3 py-3.5">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${t.hot ? "bg-brand" : "bg-line"}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.93rem] font-semibold">{t.from}</p>
                  <p className="truncate text-[0.88rem] text-ash">{t.sub}</p>
                </div>
                <span className={`shrink-0 font-mono text-[10.5px] ${t.quiet ? "text-ash" : "text-coal"}`}>{t.tag}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-start gap-3 rounded-xl bg-paper p-3">
            <Maggie size={38} className="shrink-0" />
            <div>
              <p className="text-[0.9rem] leading-snug">
                Brightloom hasn't answered in nine days. Want a two-line nudge drafted for you to read?
              </p>
              <div className="mt-2 flex gap-2">
                <button className="btn-ink rounded-lg px-3 py-1.5 text-[12px] font-semibold" data-testid="nudge-draft-btn">Draft a nudge</button>
                <button className="rounded-lg border border-line px-3 py-1.5 text-[12px] text-ash transition-colors hover:text-coal" data-testid="nudge-dismiss-btn">Leave it</button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

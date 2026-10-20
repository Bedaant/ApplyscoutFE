import { Quote } from "lucide-react";
import { Reveal } from "./Bits";

const ITEMS = [
  {
    bg: "bg-lilac", ink: "#5A33B0",
    q: "“Isn't this just a bot that spams my name everywhere?”",
    a: "No. There's no setting that lets it apply without you, and the approve button is the only way out.",
  },
  {
    bg: "bg-peach2", ink: "#9A5A00",
    q: "“Will it make things up to fill the gaps?”",
    a: "It can't. It writes from the fact list you ticked and tells you what it cut for being unsupported.",
  },
  {
    bg: "bg-mint", ink: "#1F7A52",
    q: "“What happens to my resume?”",
    a: "Stored so drafts can be built, deletable from the account page, never sold and never shown to a company you haven't approved.",
  },
  {
    bg: "bg-aqua", ink: "#0F6E8C",
    q: "“What does it cost?”",
    a: "Nothing yet. There's no plan to show and no card to enter — the list hears first when that changes.",
  },
];

export const Voices = () => (
  <section className="px-3 py-14 sm:px-5 md:py-20" data-testid="voices">
    <div className="mx-auto max-w-[1100px]">
      <Reveal className="mx-auto max-w-[38rem] text-center">
        <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-[#E1457B]">Asked every single time</p>
        <h2 className="font-display mt-3 text-[2rem] leading-[1.08] text-ink sm:text-[2.6rem]">
          The four things people say first.
        </h2>
        <p className="mx-auto mt-4 max-w-[30rem] text-base leading-relaxed text-slate">
          There are no customer quotes here yet. There's nobody to quote — it's early, and borrowed praise
          wouldn't tell you anything.
        </p>
      </Reveal>

      <div className="no-bar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 lg:gap-5">
        {ITEMS.map((it, i) => (
          <Reveal key={it.q} delay={i * 0.08} className="min-w-[82%] snap-center sm:min-w-[52%] md:min-w-0">
            <div className={`${it.bg} soft-card flex h-full flex-col p-6`} data-testid={`voice-card-${i}`}>
              <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-white/80" style={{ color: it.ink }}>
                <Quote size={17} />
              </span>
              <p className="font-display mt-4 text-[1.1rem] leading-snug text-ink">{it.q}</p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">{it.a}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

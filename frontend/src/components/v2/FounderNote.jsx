import { Reveal } from "./Motion";
import { Signature } from "./Hand";
import { FoxMark } from "./Brand";

export const FounderNote = () => (
  <section className="px-5 py-16 lg:px-8 lg:py-28" data-testid="founder-note">
    <div className="mx-auto max-w-[1180px]">
      <div className="mx-auto max-w-[700px]">
        <Reveal kind="fade">
          <div className="flex items-center gap-2">
            <FoxMark size={20} />
            <p className="label">A note from the person building this</p>
          </div>
        </Reveal>

        <Reveal kind="rise" delay={0.08} className="mt-6">
          <div className="space-y-5 text-[1.02rem] leading-[1.8] text-coal">
            <p>
              I built the first version of this for myself, in a month where I sent out forty applications and
              rewrote the same three paragraphs forty times. The rewriting wasn't the hard part. Trusting that
              the thing I'd written was still true after the fourth rewrite — that was the hard part.
            </p>
            <p>
              So this is deliberately not an apply-bot. It does the searching and the first draft, which is the
              dull half, and then it stops and waits for you, which is the half that decides whether you get
              the interview.
            </p>
            <p>
              It's early. Today the matching, the fact list, the drafting and the approval queue work. Live job
              sourcing is running for a handful of role types and not yet for all of them. There's no pricing
              because I haven't earned the right to set one. If you join the list, you'll get an honest email
              when there's something real to use — not a drip campaign.
            </p>
            <p>
              If you try it and it writes something that isn't true about you, tell me and I'll treat it as the
              most serious bug on the list. That's the one promise worth making at this stage.
            </p>
          </div>
        </Reveal>

        <Reveal kind="fade" delay={0.15} className="mt-8">
          <Signature className="h-14 w-[200px]" />
          <p className="mt-2 text-[0.95rem] font-semibold">The ApplyScout founder</p>
          <p className="font-mono text-[11px] text-ash">written March 2026 · updated whenever this changes</p>
        </Reveal>
      </div>
    </div>
  </section>
);

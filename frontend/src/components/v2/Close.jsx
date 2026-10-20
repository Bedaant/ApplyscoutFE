import { Reveal } from "./Motion";
import { EmailForm } from "./EmailForm";
import { Maggie, Wordmark } from "./Brand";
import { Underlined } from "./Hand";

export const Close = ({ onSample }) => (
  <section className="border-t border-line px-5 py-20 lg:px-8 lg:py-28" data-testid="final-cta">
    <div className="mx-auto grid max-w-[1180px] items-end gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Reveal kind="rise">
          <h2 className="font-display text-[2.2rem] font-bold leading-[1.0] tight sm:text-[3.1rem]">
            Tomorrow morning, four jobs worth reading.
            <br className="hidden sm:block" />
            <Underlined>Nothing sent</Underlined> until you say so.
          </h2>
          <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-ash">
            Leave an address and you'll hear from us when there's a working version to use. One email, written
            by a person, no countdown timers.
          </p>
        </Reveal>
        <Reveal kind="rise" delay={0.1} className="mt-8">
          <EmailForm source="footer" id="footer" label="Join the list" />
          <button onClick={onSample} data-testid="final-sample-btn"
            className="mt-4 text-[0.95rem] font-medium text-coal underline decoration-line underline-offset-4 transition-colors hover:decoration-brand">
            Or walk through the sample run first
          </button>
        </Reveal>
      </div>
      <Reveal kind="fade" delay={0.2} className="flex justify-start lg:col-span-5 lg:justify-end">
        <Maggie size={150} />
      </Reveal>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="border-t border-line bg-sheet px-5 py-10 lg:px-8" data-testid="footer">
    <div className="mx-auto flex max-w-[1180px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <Wordmark size={26} />
      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] text-ash">
        <a href="#how" className="transition-colors hover:text-coal" data-testid="footer-link-how">How it works</a>
        <a href="#limits" className="transition-colors hover:text-coal" data-testid="footer-link-limits">What it won't do</a>
        <a href="#faq" className="transition-colors hover:text-coal" data-testid="footer-link-faq">FAQ</a>
        <a href="#start" className="transition-colors hover:text-coal" data-testid="footer-link-start">Early access</a>
      </nav>
      <p className="font-mono text-[11px] leading-relaxed text-ash">
        sample companies on this page are invented
        <br />
        © {new Date().getFullYear()} ApplyScout
      </p>
    </div>
  </footer>
);

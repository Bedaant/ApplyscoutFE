const WORDS = ["Fresh roles, found for you", "Tailored, not templated", "Only confirmed facts", "Nothing sent without approval", "Pause anytime", "Hours back every week"];

const Row = ({ hidden }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden}>
    {WORDS.map((w, i) => (
      <span key={w} className="flex items-center">
        <span className={`whitespace-nowrap px-8 text-4xl sm:text-6xl lg:text-7xl ${i % 2 ? "font-serif italic text-ink/80" : "font-display font-bold text-ink"}`}>{w}</span>
        <span className="h-3 w-3 rotate-45 rounded-[3px] bg-peach" />
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <section className="marquee overflow-hidden border-y border-ink/10 py-10 md:py-14" data-testid="editorial-marquee">
    <div className="marquee-track">
      <Row />
      <Row hidden />
    </div>
  </section>
);

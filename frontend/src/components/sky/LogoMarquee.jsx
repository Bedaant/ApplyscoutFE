import { Reveal } from "./Bits";
import { CompanyLogo } from "./Extras";
import { useCompanies } from "./live";

const Row = ({ list }) => (
  <div className="flex items-center gap-4 pr-4">
    {list.map((c) => (
      <span key={c.name} className="flex shrink-0 items-center gap-2.5 rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_8px_20px_-16px_rgba(22,33,58,0.6)]">
        <CompanyLogo name={c.name} domain={c.domain} size={30} className="rounded-full shadow-none" />
        <span className="whitespace-nowrap text-[0.95rem] font-bold text-ink/80">{c.name}</span>
      </span>
    ))}
  </div>
);

export const LogoMarquee = () => {
  const list = useCompanies();
  const half = Math.ceil(list.length / 2);
  return (
    <section className="px-3 pb-4 pt-16 sm:px-5 md:pt-24" data-testid="logo-marquee">
      <Reveal className="mx-auto max-w-[1100px] text-center">
        <p className="text-[0.84rem] font-bold uppercase tracking-[0.18em] text-slate/80">Fresh roles from teams like</p>
      </Reveal>
      {list.length > 0 && (
        <div className="mx-auto mt-7 max-w-[1180px] space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee marquee-slow overflow-hidden">
            <div className="marquee-track"><Row list={list.slice(0, half)} /><Row list={list.slice(0, half)} /></div>
          </div>
          <div className="marquee marquee-slow overflow-hidden">
            <div className="marquee-track [animation-direction:reverse]"><Row list={list.slice(half)} /><Row list={list.slice(half)} /></div>
          </div>
        </div>
      )}
      <p className="mx-auto mt-5 max-w-[34rem] text-center text-[0.78rem] font-medium text-slate/80">
        Where postings come from — not customers. Not affiliated.
      </p>
    </section>
  );
};

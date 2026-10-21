import { ArrowRight } from "lucide-react";

export const FIND_LABEL = "Find my jobs — free";
export const REASSURE = ["No sign-up", "about 2 minutes", "nothing is sent without your OK"];

/** The one main action on the page. */
export const FindButton = ({ onClick, testid, small = false, className = "", label = FIND_LABEL }) =>
  small ? (
    <button onClick={onClick} data-testid={testid} className={`pill-ink whitespace-nowrap rounded-full px-4 py-2.5 text-[0.86rem] font-bold sm:px-5 sm:text-[0.9rem] ${className}`}>
      {label}
    </button>
  ) : (
    <button onClick={onClick} data-testid={testid}
      className={`pill-pink group inline-flex items-center justify-center gap-2 rounded-full py-3.5 pl-7 pr-3 text-[0.98rem] font-bold ${className}`}>
      {label}
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/70 transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowRight size={16} />
      </span>
    </button>
  );

/** One calm reassurance line under every main button. */
export const Reassure = ({ className = "", testid = "reassure-line" }) => (
  <p className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.82rem] font-semibold text-slate/85 ${className}`} data-testid={testid}>
    {REASSURE.map((t, i) => (
      <span key={t} className="flex items-center gap-2">
        {i > 0 && <span className="h-1 w-1 rounded-full bg-slate/40" aria-hidden="true" />}
        {t}
      </span>
    ))}
  </p>
);

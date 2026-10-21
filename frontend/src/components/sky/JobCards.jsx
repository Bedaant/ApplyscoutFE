import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Clock, CornerUpLeft, MapPin, RefreshCw, Search, X } from "lucide-react";
import { EASE, Reveal } from "./Bits";
import { CompanyLogo } from "./Extras";
import { daysAgo, useLiveJobs } from "./live";

const FAN = [
  { rot: -13, y: 56, bg: "var(--card-1)" },
  { rot: -6, y: 24, bg: "var(--card-2)" },
  { rot: 0, y: 0, bg: "var(--card-3)", hero: true },
  { rot: 6, y: 24, bg: "var(--card-4)" },
  { rot: 13, y: 56, bg: "var(--card-5)" },
];
const GAP = 218;

const REGIONS = [
  ["all", "All"],
  ["india", "India"],
  ["remote", "Remote"],
  ["us", "US"],
  ["europe", "Europe"],
];
const TAG = { remote: "Remote", india: "India", us: "US", europe: "Europe" };

const regionTag = (job, region) => {
  if (region !== "all") return TAG[region];
  return TAG[job.regions?.[0]] || null;
};

const Card = ({ job, slot, region, approved, onApprove, onUndo }) => {
  const tag = regionTag(job, region);
  return (
    <div
      className="pcard soft-card flex h-[320px] w-[260px] shrink-0 flex-col p-5 text-ink"
      style={{ backgroundColor: slot.bg }}
      data-testid="live-job-card"
    >
      <div className="flex items-center gap-2.5">
        <CompanyLogo name={job.company} domain={job.domain} src={job.logo} size={38} />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[0.9rem] font-extrabold" data-testid="live-job-company">{job.company}</p>
          <p className="flex items-center gap-1 text-[0.76rem] font-semibold text-ink/60">
            <Clock size={11} /> {daysAgo(job.posted_at)}
          </p>
        </div>
      </div>

      <h3 className="font-display mt-4 line-clamp-3 text-[1.3rem] leading-[1.14]" data-testid="live-job-title">{job.title}</h3>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {tag && <span className="rounded-full bg-ink px-2.5 py-1 text-[0.7rem] font-bold text-white">{tag}</span>}
        <span className="flex min-w-0 items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[0.74rem] font-semibold text-ink/70">
          <MapPin size={11} className="shrink-0" /> <span className="truncate">{job.location}</span>
        </span>
      </div>

      <div className="mt-auto space-y-2">
        {slot.hero && (
          approved ? (
            <div className="tick-in flex items-center justify-between rounded-full bg-white px-4 py-2.5" data-testid="job-card-approved">
              <span className="flex items-center gap-1.5 text-[0.86rem] font-bold text-[#1F7A52]"><Check size={15} /> Queued, not sent</span>
              <button onClick={onUndo} data-testid="job-card-undo-btn" className="flex items-center gap-1 text-[0.82rem] font-semibold text-slate hover:text-ink">
                <CornerUpLeft size={12} /> Undo
              </button>
            </div>
          ) : (
            <button onClick={onApprove} data-testid="job-card-approve-btn" className="pill-ink w-full rounded-full py-2.5 text-[0.88rem] font-bold">
              Approve this draft
            </button>
          )
        )}
        <a
          href={job.url}
          target="_blank"
          rel="noreferrer"
          data-testid="live-job-link"
          className="group flex items-center justify-center gap-1.5 rounded-full bg-white/75 py-2.5 text-[0.84rem] font-bold text-ink/80 transition-colors hover:bg-white"
        >
          Open real posting <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
};

const Skeleton = ({ slot }) => (
  <div className="pcard soft-card shimmer h-[320px] w-[260px] p-5" style={{ backgroundColor: slot.bg }}>
    <div className="flex items-center gap-2.5">
      <span className="h-[38px] w-[38px] rounded-[12px] bg-white/70" />
      <span className="h-3 w-24 rounded-full bg-white/70" />
    </div>
    <span className="mt-5 block h-5 w-[85%] rounded-full bg-white/60" />
    <span className="mt-2 block h-5 w-[60%] rounded-full bg-white/60" />
    <span className="mt-[110px] block h-10 w-full rounded-full bg-white/60" />
  </div>
);

export const RegionSwitch = ({ region, setRegion }) => (
  <div className="mx-auto flex w-fit items-center gap-1 rounded-full bg-white p-1 shadow-[0_10px_26px_-18px_rgba(22,33,58,0.6)]" data-testid="region-switch">
    {REGIONS.map(([id, label]) => (
      <button
        key={id}
        onClick={() => setRegion(id)}
        data-testid={`region-${id}-btn`}
        aria-pressed={region === id}
        className={`relative rounded-full px-3.5 py-2 text-[0.84rem] font-bold transition-colors sm:px-4 ${region === id ? "text-white" : "text-slate hover:text-ink"}`}
      >
        {region === id && <motion.span layoutId="region-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
        <span className="relative">{label}</span>
      </button>
    ))}
  </div>
);

const SUGGEST = ["Product", "Engineer", "Design", "Sales", "Data", "Marketing"];

export const RoleSearch = ({ value, onChange }) => (
  <div className="mx-auto w-full max-w-[560px]" data-testid="role-search">
    <label className="flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 shadow-[0_14px_34px_-20px_rgba(22,33,58,0.6)] ring-1 ring-ink/5 focus-within:ring-2 focus-within:ring-[var(--accent)]">
      <Search size={18} className="shrink-0 text-slate" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Try a job title — e.g. product designer"
        maxLength={60}
        data-testid="role-search-input"
        className="min-w-0 flex-1 bg-transparent py-1.5 text-[0.98rem] font-semibold text-ink outline-none placeholder:font-medium placeholder:text-slate/70"
      />
      {value && (
        <button onClick={() => onChange("")} aria-label="Clear search" data-testid="role-search-clear" className="grid h-9 w-9 place-items-center rounded-full bg-page text-slate hover:text-ink">
          <X size={15} />
        </button>
      )}
    </label>
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      {SUGGEST.map((s) => (
        <button key={s} onClick={() => onChange(s)} data-testid={`role-suggest-${s.toLowerCase()}`}
          className={`rounded-full px-3.5 py-1.5 text-[0.8rem] font-bold transition-colors ${value.toLowerCase() === s.toLowerCase() ? "bg-ink text-white" : "bg-white/80 text-slate hover:bg-white hover:text-ink"}`}>
          {s}
        </button>
      ))}
    </div>
  </div>
);

export const JobCards = () => {
  const [region, setRegion] = useState("all");
  const [approved, setApproved] = useState(false);
  const [typed, setTyped] = useState("");
  const [q, setQ] = useState("");
  useEffect(() => {
    const id = setTimeout(() => { setQ(typed); setApproved(false); }, 350);
    return () => clearTimeout(id);
  }, [typed]);
  const { status, jobs, adzuna, sources = [] } = useLiveJobs(region, 5, q);
  const pick = (r) => { setApproved(false); setRegion(r); };
  const props = { region, approved, onApprove: () => setApproved(true), onUndo: () => setApproved(false) };
  const ready = status === "ready" && jobs.length > 0;
  const deckKey = ready ? `${region}-${q}-${jobs.map((j) => j.id).join("|")}` : `sk-${status}`;
  // centre the hero slot on whatever count came back
  const slots = ready ? (jobs.length >= 5 ? FAN : FAN.slice(2 - Math.floor(jobs.length / 2), 2 - Math.floor(jobs.length / 2) + jobs.length)) : FAN;

  return (
    <section id="jobs" className="relative z-10 -mt-16 scroll-mt-28 px-3 sm:px-5" data-testid="job-cards">
      {/* desktop: fanned deck, re-dealt on region change */}
      <div className="relative mx-auto hidden h-[400px] max-w-[1100px] md:block">
        <AnimatePresence mode="wait">
          <motion.div key={deckKey} className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.25 } }}>
            {slots.map((slot, i) => {
              const off = (FAN.indexOf(slot) - 2) * GAP;
              const job = ready ? jobs[i] : null;
              return (
                <motion.div
                  key={job ? job.id : `sk${i}`}
                  initial={{ opacity: 0, x: -off, y: 140, rotate: 0, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, y: slot.y, rotate: slot.rot, scale: 1 }}
                  exit={{ opacity: 0, x: -off * 0.8, y: 160, rotate: slot.rot * -0.5, transition: { duration: 0.45, ease: EASE } }}
                  transition={{ type: "spring", stiffness: 120, damping: 17, mass: 0.9, delay: 0.08 + i * 0.07 }}
                  whileHover={job ? { rotate: 0, y: slot.y - 26, zIndex: 40, transition: { duration: 0.35, ease: EASE } } : undefined}
                  className="absolute left-1/2 top-0"
                  style={{ marginLeft: -130 + off, zIndex: slot.hero ? 30 : 10 + i }}
                >
                  {job ? <Card job={job} slot={slot} {...props} /> : <Skeleton slot={slot} />}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* mobile: swipeable row */}
      <div className="no-bar -mx-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-2 md:hidden" data-testid="job-cards-mobile">
        {(ready ? jobs : FAN.map(() => null)).map((job, i) => (
          <motion.div
            key={job ? job.id : `msk${i}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
            className="snap-center"
          >
            {job ? <Card job={job} slot={{ ...FAN[i % 5], hero: i === 0 }} {...props} /> : <Skeleton slot={FAN[i]} />}
          </motion.div>
        ))}
      </div>

      {status === "error" && (
        <div className="mx-auto mt-6 flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 shadow" data-testid="jobs-error">
          <span className="text-[0.88rem] font-semibold text-slate">Live postings didn't load.</span>
          <button onClick={() => window.location.reload()} className="flex items-center gap-1 text-[0.88rem] font-bold text-ink"><RefreshCw size={13} /> Retry</button>
        </div>
      )}
      {status === "ready" && jobs.length === 0 && (
        <p className="mx-auto mt-6 w-fit rounded-full bg-white px-5 py-3 text-[0.88rem] font-semibold text-slate" data-testid="jobs-empty">
          {q ? `No fresh "${q}" roles here in the last 14 days. Try another title or region.` : "No fresh postings here in the last 14 days. Try another region."}
        </p>
      )}

      <Reveal delay={0.2} className="mx-auto mt-8 flex max-w-[1100px] flex-col items-center gap-4 md:mt-10">
        <RoleSearch value={typed} onChange={setTyped} />
        <RegionSwitch region={region} setRegion={pick} />
        <p className="flex flex-wrap items-center justify-center gap-x-2 text-center text-[0.8rem] font-semibold text-slate" data-testid="jobs-caption">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2C8F6B] opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2C8F6B]" /></span>
          Live from company career pages and open job boards · last 14 days
          {sources.includes("remotive") && (
            <a href="https://remotive.com" target="_blank" rel="noreferrer" className="underline" data-testid="remotive-credit">· Remote jobs via Remotive</a>
          )}
          {sources.includes("arbeitnow") && (
            <a href="https://www.arbeitnow.com" target="_blank" rel="noreferrer" className="underline" data-testid="arbeitnow-credit">· Jobs via Arbeitnow</a>
          )}
          {adzuna && (
            <a href="https://www.adzuna.com" target="_blank" rel="noreferrer" className="underline" data-testid="adzuna-credit">· Jobs by Adzuna</a>
          )}
        </p>
      </Reveal>
    </section>
  );
};

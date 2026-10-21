import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { animate, motion, useInView } from "framer-motion";
import { API } from "./live";
import { EASE } from "./Bits";

const CountUp = ({ to, testid }) => {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return undefined;
    const c = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [seen, to]);
  return <span ref={ref} className="tabular-nums" data-testid={testid}>{v.toLocaleString("en-US")}</span>;
};

const ago = (iso) => {
  if (!iso) return "";
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  return m < 2 ? "just now" : m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`;
};

/** Real numbers from the live feed: postings and companies seen this week. */
export const ProofStrip = ({ className = "" }) => {
  const [s, setS] = useState(null);
  useEffect(() => {
    let alive = true;
    axios.get(`${API}/jobs/stats`).then((r) => alive && setS(r.data)).catch(() => {});
    return () => { alive = false; };
  }, []);
  if (!s || !s.roles) return <div className={`h-[46px] ${className}`} aria-hidden="true" />;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full bg-white/85 px-5 py-2.5 text-[0.88rem] font-semibold text-slate shadow-[0_12px_30px_-20px_rgba(22,33,58,0.7)] backdrop-blur ${className}`}
      data-testid="proof-strip"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2C8F6B] opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2C8F6B]" />
      </span>
      <span><b className="text-ink"><CountUp to={s.roles} testid="proof-roles" /> fresh roles</b> from <b className="text-ink"><CountUp to={s.companies} testid="proof-companies" /> companies</b> this week</span>
      <span className="text-slate/70">· updated hourly{s.refreshed_at ? ` · last ${ago(s.refreshed_at)}` : ""}</span>
    </motion.div>
  );
};

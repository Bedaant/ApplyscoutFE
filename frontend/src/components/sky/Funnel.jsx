import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Logo } from "./Bits";
import { API } from "./live";

const RANGES = [[7, "7 days"], [30, "30 days"], [null, "All time"]];

/** Private funnel page: /funnel?key=SECRET */
export const Funnel = () => {
  const key = new URLSearchParams(window.location.search).get("key") || "";
  const [days, setDays] = useState(7);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const load = useCallback(() => {
    setStatus("loading");
    axios.get(`${API}/funnel`, { params: { key, ...(days ? { days } : {}) } })
      .then((r) => { setData(r.data); setStatus("ready"); })
      .catch(() => setStatus("denied"));
  }, [key, days]);
  useEffect(() => { load(); }, [load]);

  if (status === "denied") {
    return <div className="grid min-h-screen place-items-center bg-page text-[1.1rem] font-bold text-slate" data-testid="funnel-denied">Not found.</div>;
  }
  const top = data?.steps?.[0]?.sessions || 0;
  return (
    <div className="min-h-screen bg-page px-4 pb-16 pt-6 text-ink" data-testid="funnel-page">
      <meta name="robots" content="noindex" />
      <div className="mx-auto max-w-[860px]">
        <div className="flex flex-wrap items-center gap-3">
          <Logo size={30} />
          <span className="rounded-full bg-white px-3 py-1 text-[0.75rem] font-extrabold uppercase tracking-wider text-slate">Private · funnel</span>
          <div className="ml-auto flex gap-1 rounded-full bg-white p-1">
            {RANGES.map(([d, l]) => (
              <button key={l} onClick={() => setDays(d)} data-testid={`funnel-range-${d || "all"}`} className={`rounded-full px-3.5 py-1.5 text-[0.82rem] font-bold ${days === d ? "bg-ink text-white" : "text-slate"}`}>{l}</button>
            ))}
            <button onClick={load} aria-label="Refresh" className="grid h-8 w-8 place-items-center rounded-full text-slate" data-testid="funnel-refresh"><RefreshCw size={14} /></button>
          </div>
        </div>
        <h1 className="font-display mt-6 text-[2rem] leading-tight">Landing → paywall</h1>
        <p className="text-[0.88rem] font-semibold text-slate">Unique anonymous visits (per browser tab) that reached each step. No names or emails are stored with events.</p>

        <div className="mt-6 space-y-2.5" data-testid="funnel-steps">
          {(data?.steps || []).map((s, i) => (
            <div key={s.key} className={`rounded-[18px] bg-white p-4 ${s.key === "paywall_reached" ? "ring-2 ring-[var(--accent)]" : ""}`} data-testid={`funnel-step-${s.key}`}>
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-page text-[0.8rem] font-extrabold">{i + 1}</span>
                <p className="flex-1 text-[0.95rem] font-bold">{s.label}{s.key === "paywall_reached" && <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[0.65rem] font-extrabold uppercase text-accent">conversion</span>}</p>
                <p className="font-display text-[1.4rem] tabular-nums" data-testid={`funnel-count-${s.key}`}>{s.sessions}</p>
              </div>
              <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-page">
                <motion.div className="h-full rounded-full bg-[var(--accent)]" initial={{ width: 0 }} animate={{ width: `${top ? (100 * s.sessions) / top : 0}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} />
              </div>
              <div className="mt-1.5 flex justify-between text-[0.76rem] font-semibold text-slate">
                <span>{s.of_first != null ? `${s.of_first}% of step 1` : "—"} · {s.total} events</span>
                {s.drop_off != null && <span className={s.drop_off > 50 ? "font-bold text-[#C2365C]" : ""} data-testid={`funnel-drop-${s.key}`}>{s.drop_off}% drop-off from previous</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3" data-testid="funnel-side">
          {(data?.side || []).map((s) => (
            <div key={s.key} className="rounded-[18px] bg-white p-4">
              <p className="text-[0.8rem] font-bold text-slate">{s.label}</p>
              <p className="font-display mt-1 text-[1.5rem] tabular-nums" data-testid={`funnel-side-${s.key}`}>{s.sessions}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2" data-testid="funnel-breakdowns">
          {Object.entries({ cta_click: "Which button was clicked", flow_start: "How they started", flow_left: "Where they left", pay_method: "Payment method tapped" }).map(([k, t]) => (
            <div key={k} className="rounded-[18px] bg-white p-4">
              <p className="text-[0.85rem] font-bold">{t}</p>
              <ul className="mt-2 space-y-1">
                {(data?.breakdowns?.[k] || []).map((b) => (
                  <li key={b.value} className="flex justify-between text-[0.85rem] font-semibold text-slate"><span>{b.value.replace(/_/g, " ")}</span><span className="tabular-nums text-ink">{b.sessions}</span></li>
                ))}
                {!(data?.breakdowns?.[k] || []).length && <li className="text-[0.8rem] text-slate/70">No data yet</li>}
              </ul>
            </div>
          ))}
        </div>
        {status === "loading" && <p className="mt-6 text-center text-[0.85rem] font-semibold text-slate">Loading…</p>}
      </div>
    </div>
  );
};

import { motion } from "framer-motion";
import { Bookmark, Search, SlidersHorizontal } from "lucide-react";
import { EASE } from "./Motion";

const ROWS = [
  { mono: "N", co: "Northwind Labs", role: "Product Operations Lead", pay: "£62–71k", age: "6h", fit: 92, live: true },
  { mono: "H", co: "Halden & Co.", role: "Senior Operations Analyst", pay: "£58–64k", age: "1d", fit: 86 },
  { mono: "B", co: "Brightloom", role: "Programme Manager, Payments", pay: "£70–80k", age: "2d", fit: 74 },
  { mono: "K", co: "Kesten Health", role: "Operations Manager (Hybrid)", pay: "£55–60k", age: "3d", fit: 71 },
];

export const Phone = () => (
  <div className="relative w-[248px] rounded-[2.2rem] border border-line bg-coal p-[6px] shadow-[0_40px_80px_-40px_rgba(17,17,16,0.55)] sm:w-[268px]" data-testid="phone-mock">
    <div className="overflow-hidden rounded-[1.85rem] bg-white">
      <div className="flex items-center justify-between px-5 pb-1 pt-2.5 font-mono text-[10px] text-coal/70">
        <span>9:41</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-coal/70" />5G</span>
      </div>
      <div className="px-4 pb-2 pt-2">
        <p className="label text-[9.5px]">Tue 14 · 7:02 am</p>
        <h4 className="font-display mt-1 text-[1.05rem] font-bold tight leading-tight">4 new matches</h4>
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="flex h-7 flex-1 items-center gap-1.5 rounded-lg border border-line px-2 text-[10.5px] text-ash">
            <Search size={11} /> product ops · remote
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-line text-ash"><SlidersHorizontal size={11} /></span>
        </div>
      </div>
      <div className="no-bar scroll-shadow h-[232px] overflow-y-auto px-4 pb-4">
        {ROWS.map((r, i) => (
          <motion.div
            key={r.co}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: EASE }}
            className="mb-2 rounded-xl border border-line bg-white p-2.5"
            data-testid={`phone-feed-row-${i}`}
          >
            <div className="flex items-start gap-2">
              <span className="font-display grid h-6 w-6 shrink-0 place-items-center rounded-md bg-coal text-[11px] font-bold text-white">{r.mono}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11.5px] font-semibold leading-tight">{r.role}</p>
                <p className="mt-0.5 truncate text-[10px] text-ash">{r.co} · {r.pay}</p>
              </div>
              <Bookmark size={12} className="mt-0.5 shrink-0 text-ash/60" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-mono text-[9.5px] text-ash">
                {r.live && <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" />}
                posted {r.age} ago
              </span>
              <span className={`font-mono text-[9.5px] ${r.fit >= 85 ? "text-brand" : "text-ash"}`}>{r.fit}% match</span>
            </div>
          </motion.div>
        ))}
        <p className="pb-1 pt-1 text-center font-mono text-[9.5px] text-ash/70">checked 7:02 am · nothing older than 14 days</p>
      </div>
    </div>
  </div>
);

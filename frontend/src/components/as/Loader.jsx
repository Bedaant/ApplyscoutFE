import { motion } from "framer-motion";
import { FOX_PATHS, FoxGradient } from "./Brand";
import { EASE } from "./Motion";

export const Loader = () => (
  <motion.div
    data-testid="maggie-loader"
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    initial={{ clipPath: "inset(0 0 0% 0)" }}
    exit={{ clipPath: "inset(0 0 100% 0)" }}
    transition={{ duration: 0.9, ease: EASE }}
  >
    <div className="glow-brand absolute h-[460px] w-[460px]" />
    <svg width="120" height="120" viewBox="0 0 100 100" className="relative" aria-hidden="true">
      <FoxGradient />
      {FOX_PATHS.map((d, i) => (
        <motion.path
          key={d} d={d} fill="url(#fox-grad)" stroke="#FF5A1F" strokeWidth="1.2" strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{ pathLength: { duration: 0.7, delay: i * 0.12, ease: EASE }, fillOpacity: { duration: 0.4, delay: 0.6 + i * 0.08 } }}
        />
      ))}
      <motion.circle cx="81" cy="33" r="3" fill="#0B1320" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }} />
    </svg>
    <motion.p
      className="label relative mt-8 tracking-[0.3em] text-mute"
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
    >
      Jobs find you now
    </motion.p>
  </motion.div>
);

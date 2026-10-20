import { motion } from "framer-motion";
import { FOX_PATHS } from "./Brand";
import { EASE } from "./Motion";

export const Loader = () => (
  <motion.div
    data-testid="loader"
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
  >
    <svg width="96" height="96" viewBox="0 0 100 100" aria-hidden="true">
      {FOX_PATHS.map((d, i) => (
        <motion.path
          key={d} d={d} fill="#FF5A1F" stroke="#FF5A1F" strokeWidth="1.1" strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{ pathLength: { duration: 0.6, delay: i * 0.1, ease: EASE }, fillOpacity: { duration: 0.35, delay: 0.5 + i * 0.07 } }}
        />
      ))}
      <motion.circle cx="81" cy="33" r="3" fill="#111110" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.85 }} />
    </svg>
    <motion.p
      className="label mt-7"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.5 }}
    >
      Reading this morning's postings
    </motion.p>
  </motion.div>
);

import { motion } from "framer-motion";
import { Maggie } from "./Brand";
import { EASE } from "./Reveal";

export const Loader = () => (
  <motion.div
    data-testid="maggie-loader"
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-canvas"
    exit={{ clipPath: "inset(0 0 100% 0)" }}
    initial={{ clipPath: "inset(0 0 0% 0)" }}
    transition={{ duration: 0.9, ease: EASE }}
  >
    <div className="relative grid place-items-center">
      <svg width="168" height="168" viewBox="0 0 168 168" className="absolute">
        <circle cx="84" cy="84" r="78" fill="none" stroke="rgba(28,25,23,0.08)" strokeWidth="2" />
        <motion.circle
          cx="84" cy="84" r="78" fill="none" stroke="#F8C9AE" strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0, rotate: -90 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: EASE }} style={{ originX: "50%", originY: "50%" }}
        />
      </svg>
      <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: EASE }}>
        <Maggie size={104} />
      </motion.div>
    </div>
    <motion.p
      className="eyebrow mt-16 text-soft"
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
    >
      Maggie is scouting fresh roles
    </motion.p>
  </motion.div>
);

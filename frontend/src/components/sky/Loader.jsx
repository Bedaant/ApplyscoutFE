import { motion } from "framer-motion";
import { FOX } from "./assets";
import { EASE } from "./Bits";

export const Loader = () => (
  <motion.div
    data-testid="loader"
    className="sky fixed inset-0 z-[100] flex flex-col items-center justify-center"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
  >
    <motion.img
      src={FOX}
      alt=""
      initial={{ scale: 0.7, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
      transition={{ scale: { duration: 0.5, ease: EASE }, opacity: { duration: 0.4 }, y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" } }}
      className="h-24 w-24 rounded-[26px] object-cover shadow-[0_18px_34px_-18px_rgba(22,33,58,0.6)]"
    />
    <motion.p
      className="mt-6 text-[0.84rem] font-bold uppercase tracking-[0.2em] text-slate"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}
    >
      Reading this morning's postings
    </motion.p>
  </motion.div>
);

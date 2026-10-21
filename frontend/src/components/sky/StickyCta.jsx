import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FindButton } from "./Cta";

/** Mobile only: a "Find my jobs" bar once the hero is gone, hidden again near the final section. */
export const StickyCta = ({ onFind }) => {
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("top");
    const end = document.getElementById("final-cta");
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.target === hero) setPastHero(!e.isIntersecting);
      if (e.target === end) setNearEnd(e.isIntersecting);
    }), { threshold: 0 });
    if (hero) io.observe(hero);
    if (end) io.observe(end);
    return () => io.disconnect();
  }, []);
  const show = pastHero && !nearEnd;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 md:hidden"
          data-testid="sticky-cta"
        >
          <div className="rounded-full bg-white/95 p-1.5 shadow-[0_18px_40px_-16px_rgba(22,33,58,0.55)] backdrop-blur">
            <FindButton onClick={() => onFind({ src: "sticky_mobile" })} testid="sticky-cta-btn" className="w-full !py-2.5" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

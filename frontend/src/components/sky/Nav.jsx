import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo, EASE } from "./Bits";

const LINKS = [
  ["Find a job", "#jobs"],
  ["How it works", "#how"],
  ["Honest limits", "#limits"],
  ["FAQ", "#faq"],
];

export const Nav = ({ onStart }) => {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4" data-testid="nav">
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`pointer-events-auto mx-auto flex max-w-[1060px] items-center gap-6 rounded-full px-4 py-2.5 transition-shadow duration-500 sm:px-5 ${
          solid ? "bg-white/95 shadow-[0_14px_34px_-20px_rgba(22,33,58,0.6)] backdrop-blur" : "bg-white/90 shadow-[0_10px_26px_-20px_rgba(22,33,58,0.5)] backdrop-blur"
        }`}
      >
        <a href="#top" data-testid="nav-logo-link" className="shrink-0"><Logo /></a>

        <nav className="ml-2 hidden items-center gap-6 lg:flex">
          {LINKS.map(([t, h]) => (
            <a
              key={h}
              href={h}
              data-testid={`nav-link-${h.slice(1)}`}
              className="relative text-[0.92rem] font-semibold text-slate transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-bubble after:transition-all after:duration-300 hover:after:w-full"
            >
              {t}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button data-testid="nav-login-btn" className="hidden rounded-full px-4 py-2 text-[0.9rem] font-semibold text-slate transition-colors hover:bg-[#EEF3FF] hover:text-ink sm:block">
            Log in
          </button>
          <button onClick={onStart} data-testid="nav-cta-btn" className="pill-ink rounded-full px-5 py-2.5 text-[0.9rem] font-bold">
            Get early access
          </button>
        </div>
      </motion.header>
    </div>
  );
};

import { motion } from "framer-motion";
import { Logo } from "./Brand";
import { EASE } from "./Reveal";

const LINKS = [
  ["How it works", "#how"],
  ["Why it's safer", "#compare"],
  ["Control", "#control"],
  ["FAQ", "#faq"],
];

export const Nav = ({ onTry, ready }) => (
  <motion.header
    initial={{ y: -20, opacity: 0 }}
    animate={ready ? { y: 0, opacity: 1 } : {}}
    transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
    className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
  >
    <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-ink/10 bg-canvas/75 py-2 pl-4 pr-2 backdrop-blur-xl">
      <a href="#top" data-testid="nav-logo-link"><Logo /></a>
      <div className="hidden items-center gap-8 md:flex">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} data-testid={`nav-link-${href.slice(1)}`} className="text-sm text-soft transition-colors duration-300 hover:text-ink">
            {label}
          </a>
        ))}
      </div>
      <button onClick={onTry} data-testid="nav-try-it-btn" className="btn-ink rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream">
        Try it
      </button>
    </nav>
  </motion.header>
);

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "./Brand";
import { EASE } from "./Motion";

const LINKS = [["How it works", "#how"], ["Why it's safer", "#compare"], ["Control", "#control"], ["FAQ", "#faq"]];

export const Nav = ({ onTry, ready }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${scrolled ? "bg-white/90 shadow-[0_8px_30px_-12px_rgba(11,19,32,0.18)] backdrop-blur-xl" : "bg-transparent"}`}
      data-testid="site-nav"
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" data-testid="nav-logo-link"><Logo /></a>
        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} data-testid={`nav-link-${href.slice(1)}`} className="text-[15px] font-medium text-navy/75 transition-colors duration-300 hover:text-brand">{label}</a>
          ))}
        </div>
        <button onClick={onTry} data-testid="nav-try-it-btn" className="btn-brand group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
          Try it <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </nav>
    </motion.header>
  );
};

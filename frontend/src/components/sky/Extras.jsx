import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { logoUrl } from "./live";

const TINTS = ["#3B6FE0", "#E1457B", "#2C8F6B", "#6C4BC4", "#B26A00", "#0F7FA3"];

export const CompanyLogo = ({ name = "?", domain, size = 36, className = "" }) => {
  const [failed, setFailed] = useState(!domain);
  const tint = TINTS[(name.charCodeAt(0) || 0) % TINTS.length];
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-[12px] bg-white shadow-[0_4px_12px_-6px_rgba(22,33,58,0.45)] ${className}`}
      style={{ width: size, height: size }}
      data-testid="company-logo"
    >
      {failed ? (
        <span className="text-[0.85em] font-extrabold" style={{ color: tint, fontSize: size * 0.42 }}>{name.charAt(0)}</span>
      ) : (
        <img
          src={logoUrl(domain)}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-[72%] w-[72%] object-contain"
        />
      )}
    </span>
  );
};

/** Gently pulls its child toward the cursor. */
export const Magnetic = ({ children, strength = 0.28, className = "" }) => {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.span ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.span>
  );
};

const PALETTES = [
  { id: "sky", label: "Sky", swatch: "linear-gradient(135deg,#BCD4FF,#EDF3FF)" },
  { id: "peach", label: "Peach", swatch: "linear-gradient(135deg,#FFCDB4,#FFF3E8)" },
];

export const PaletteToggle = () => {
  const [palette, setPalette] = useState(() => {
    try { return localStorage.getItem("as-palette") || "sky"; } catch { return "sky"; }
  });
  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    try { localStorage.setItem("as-palette", palette); } catch { /* private mode */ }
  }, [palette]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="fixed bottom-3 left-3 z-50 flex items-center gap-0.5 rounded-full bg-white/95 p-1 sm:bottom-4 sm:left-4 sm:gap-1 shadow-[0_14px_34px_-14px_rgba(22,33,58,0.55)] backdrop-blur"
      data-testid="palette-toggle"
      role="radiogroup"
      aria-label="Colour palette"
    >
      {PALETTES.map((p) => (
        <button
          key={p.id}
          role="radio"
          aria-checked={palette === p.id}
          onClick={() => setPalette(p.id)}
          data-testid={`palette-${p.id}-btn`}
          aria-label={`${p.label} palette`}
          className="relative flex items-center gap-2 rounded-full p-1.5 text-[0.8rem] font-bold text-ink sm:px-3 sm:py-1.5"
        >
          {palette === p.id && (
            <motion.span layoutId="palette-pill" className="absolute inset-0 rounded-full bg-[#16213A]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
          )}
          <span className="relative h-4 w-4 rounded-full border border-white" style={{ background: p.swatch }} />
          <span className={`relative hidden sm:inline ${palette === p.id ? "text-white" : ""}`}>{p.label}</span>
        </button>
      ))}
    </motion.div>
  );
};

/** Illustration that drifts slower than the page as you scroll. */
export const ParallaxArt = ({ src, className = "", range = 80 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const r = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  return (
    <motion.img ref={ref} src={src} alt="" aria-hidden="true" style={{ y, rotate: r }}
      className={`pointer-events-none absolute select-none ${className}`} />
  );
};

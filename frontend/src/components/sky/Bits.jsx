import { useId } from "react";
import { motion } from "framer-motion";
import { AVATARS, FOX } from "./assets";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 26, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

// Fox inside a speech bubble: we find the job, then reach the right person.
export const BrandMark = ({ size = 40 }) => {
  const id = `bm${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className="drop-shadow-[0_8px_12px_rgba(224,102,61,0.45)]">
    <defs>
      <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFA57E" />
        <stop offset="1" stopColor="#E0623A" />
      </linearGradient>
    </defs>
    <path
      d="M32 6 H68 A26 26 0 0 1 94 32 V52 A26 26 0 0 1 68 78 H46 L22 95 Q26 86 26.5 76 A26 26 0 0 1 6 52 V32 A26 26 0 0 1 32 6 Z"
      fill={`url(#${id}-g)`}
    />
    <path d="M26 19 L43 32 L23 41 Z" fill="#fff" />
    <path d="M74 19 L77 41 L57 32 Z" fill="#fff" />
    <path d="M29 25 L38 32 L27 36 Z" fill="#FFC9B3" />
    <path d="M71 25 L73 36 L62 32 Z" fill="#FFC9B3" />
    <path d="M22 37 Q50 26 78 37 Q74 56 50 69 Q26 56 22 37 Z" fill="#fff" />
    <circle cx="39.5" cy="45" r="3.6" fill="#16213A" />
    <circle cx="60.5" cy="45" r="3.6" fill="#16213A" />
    <circle cx="40.6" cy="43.8" r="1.1" fill="#fff" />
    <circle cx="61.6" cy="43.8" r="1.1" fill="#fff" />
    <path d="M45.5 54 Q50 51.5 54.5 54 Q52.5 58.5 50 58.5 Q47.5 58.5 45.5 54 Z" fill="#16213A" />
  </svg>
  );
};

export const Logo = ({ size = 40 }) => (
  <span className="flex items-center gap-2" data-testid="brand-logo">
    <img src="/logo-mark.png" alt="" width={size} height={size} className="shrink-0 drop-shadow-[0_6px_10px_rgba(224,102,61,0.35)]" style={{ width: size, height: size }} />
    <span className="font-display text-[1.25rem] tracking-[-0.035em] text-ink">
      Apply<span className="text-accent">Scout</span>
    </span>
  </span>
);

const Cloud = ({ className = "", w = 220, drift = "drift", opacity = 0.95 }) => (
  <span className={`pointer-events-none absolute ${drift} ${className}`} style={{ width: w, height: w * 0.42, opacity }}>
    <span className="absolute bottom-0 left-0 h-[52%] w-full rounded-full bg-white" />
    <span className="absolute bottom-[26%] left-[12%] h-[74%] w-[46%] rounded-full bg-white" />
    <span className="absolute bottom-[30%] left-[44%] h-[58%] w-[36%] rounded-full bg-white" />
    <span className="absolute bottom-[14%] left-[66%] h-[46%] w-[28%] rounded-full bg-white" />
  </span>
);

export const Clouds = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <Cloud className="left-[2%] top-[14%]" w={300} opacity={0.95} />
    <Cloud className="right-[3%] top-[8%]" w={250} drift="drift-slow" opacity={0.9} />
    <Cloud className="left-[26%] top-[4%] hidden lg:block" w={150} drift="drift-slow" opacity={0.7} />
    <Cloud className="bottom-[16%] left-[-5%]" w={340} opacity={0.9} />
    <Cloud className="bottom-[6%] right-[-4%]" w={300} drift="drift-slow" opacity={0.85} />
    <Cloud className="bottom-[34%] right-[22%] hidden lg:block" w={140} opacity={0.6} />
  </div>
);

export const FloatBadge = ({ children, className = "", float = "float-a", size = 54, tint = "#16213A" }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
    className={`badge-tile ${float} absolute grid place-items-center ${className}`}
    style={{ width: size, height: size, color: tint }}
    aria-hidden="true"
  >
    {children}
  </motion.span>
);

export const AvatarCluster = ({ size = 44, count = 3, className = "" }) => (
  <span className={`inline-flex -space-x-3 align-middle ${className}`} data-testid="avatar-cluster">
    {AVATARS.slice(0, count).map((src, i) => (
      <img
        key={src}
        src={src}
        alt=""
        loading="lazy"
        className="inline-block rounded-full border-[3px] border-white object-cover shadow-[0_6px_14px_-8px_rgba(22,33,58,0.8)]"
        style={{ width: size, height: size, zIndex: count - i }}
      />
    ))}
  </span>
);

export const FoxChip = ({ w = 92, className = "" }) => (
  <span
    className={`relative inline-block overflow-hidden rounded-[18px] align-middle shadow-[0_10px_22px_-12px_rgba(255,120,166,0.9)] ${className}`}
    style={{ width: w, height: w * 0.72 }}
    aria-hidden="true"
  >
    <img src={FOX} alt="" className="h-full w-full scale-[1.15] object-cover object-top" />
  </span>
);

export const Eyebrow = ({ children, tone = "text-accent" }) => (
  <p className={`text-[0.82rem] font-bold uppercase tracking-[0.16em] ${tone}`}>{children}</p>
);

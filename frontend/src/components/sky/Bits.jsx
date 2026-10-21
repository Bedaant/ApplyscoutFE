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

const FOX_PATHS = [
  "M28 12 L54 36 L38 46 Z",
  "M50 38 L80 6 L94 60 Q76 58 60 52 Z",
  "M6 94 Q24 60 50 38 L60 52 Q36 70 6 94 Z",
  "M36 76 Q64 58 86 68 Q93 82 96 96 Q68 82 36 76 Z",
];

export const Logo = ({ size = 38 }) => (
  <span className="flex items-center gap-2.5" data-testid="brand-logo">
    <span
      className="brand-mark grid place-items-center rounded-[13px]"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 100 100" aria-hidden="true">
        {FOX_PATHS.map((d) => <path key={d} d={d} fill="#fff" />)}
      </svg>
    </span>
    <span className="font-display text-[1.22rem] text-ink">ApplyScout</span>
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

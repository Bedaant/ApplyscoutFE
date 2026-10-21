import { useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
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

// Animated fox-in-a-speech-bubble mark (vector copy of /public/logo-mark.png).
// Blinks once on load, then gently every few seconds; ears twitch + bubble bounces on hover or tap.
const EAR = { transformBox: "fill-box" };
export const FoxMark = ({ size = 40 }) => {
  const body = useAnimationControls();
  const left = useAnimationControls();
  const right = useAnimationControls();
  const poke = useCallback(() => {
    body.start({ scale: [1, 1.12, 0.96, 1], rotate: [0, -4, 2, 0], transition: { duration: 0.55, ease: "easeOut" } });
    left.start({ rotate: [0, -16, 7, 0], transition: { duration: 0.5 } });
    right.start({ rotate: [0, 16, -7, 0], transition: { duration: 0.5, delay: 0.05 } });
  }, [body, left, right]);
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 192 192"
      aria-hidden="true"
      onMouseEnter={poke}
      onTouchStart={poke}
      animate={body}
      className="shrink-0 overflow-visible"
      data-testid="fox-mark"
    >
      <path d="M50 8 H142 A40 40 0 0 1 182 48 V120 A40 40 0 0 1 142 160 H76 L40 186 Q44 172 44 159 A40 40 0 0 1 10 120 V48 A40 40 0 0 1 50 8 Z" fill="#FF6E4F" />
      <motion.g style={{ ...EAR, originX: 0.7, originY: 1 }} animate={left}>
        <path d="M40 92 L52 22 L94 60 Z" fill="#FFA872" />
        <path d="M51 78 L57 38 L82 60 Z" fill="#FDF9E5" />
      </motion.g>
      <motion.g style={{ ...EAR, originX: 0.3, originY: 1 }} animate={right}>
        <path d="M152 92 L140 22 L98 60 Z" fill="#FFA872" />
        <path d="M141 78 L135 38 L110 60 Z" fill="#FDF9E5" />
      </motion.g>
      <path d="M38 70 Q96 46 154 70 L160 98 Q140 136 96 154 Q52 136 32 98 Z" fill="#FFA872" />
      <path d="M32 98 Q58 84 82 98 L96 108 L110 98 Q134 84 160 98 Q140 136 96 154 Q52 136 32 98 Z" fill="#FDF9E5" />
      <path d="M82 98 Q96 92 110 98 L101 124 L91 124 Z" fill="#FFA872" />
      <g className="fox-blink">
        <g className="fox-blink-once">
          <ellipse cx="68" cy="104" rx="8" ry="9" fill="#3F4044" />
          <ellipse cx="124" cy="104" rx="8" ry="9" fill="#3F4044" />
          <circle cx="70.5" cy="100.5" r="2.4" fill="#fff" />
          <circle cx="126.5" cy="100.5" r="2.4" fill="#fff" />
        </g>
      </g>
      <path d="M85 123 Q96 118 107 123 Q101 135 96 135 Q91 135 85 123 Z" fill="#3F4044" />
    </motion.svg>
  );
};

export const Logo = ({ size = 40 }) => (
  <span className="flex items-center gap-2" data-testid="brand-logo">
    <FoxMark size={size} />
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

/** Hero fox that waves hello on a loop (and on hover/tap), with a little "Hi!" bubble. */
export const WavingFox = ({ w = 84, className = "" }) => (
  <span
    className={`fox-wave-chip group relative inline-block align-middle ${className}`}
    style={{ width: w, height: w * 0.72 }}
    data-testid="hero-waving-fox"
    aria-hidden="true"
  >
    <span className="absolute inset-0 overflow-hidden rounded-[18px] bg-gradient-to-br from-[#FFD3C0] to-[#FFB59A] shadow-[0_10px_22px_-12px_rgba(232,110,70,0.9)]">
      <img src="/art/fox-wave.webp" alt="" className="fox-wave absolute bottom-[-30%] left-1/2 h-[150%] w-auto max-w-none -translate-x-1/2" />
    </span>
    <span className="fox-hi pointer-events-none absolute -right-3 -top-5 rounded-full bg-white px-2 py-0.5 text-[0.7rem] font-extrabold leading-tight tracking-normal text-ink shadow-[0_6px_14px_-8px_rgba(22,33,58,0.6)]">Hi! 👋</span>
  </span>
);

export const Eyebrow = ({ children, tone = "text-accent" }) => (
  <p className={`text-[0.82rem] font-bold uppercase tracking-[0.16em] ${tone}`}>{children}</p>
);

import { motion, useReducedMotion } from "framer-motion";

const COLORS = ["#FF6E4F", "#FFA872", "#FFD36E", "#BEEBC5", "#A9E4F2", "#DCC9F7", "#FFC2D6"];
// deterministic pseudo-random so every burst looks hand-placed, not noisy
const PIECES = Array.from({ length: 34 }, (_, i) => {
  const r = (n) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  const angle = -Math.PI / 2 + (r(1) - 0.5) * Math.PI * 1.5;
  const dist = 110 + r(2) * 130;
  return {
    x: Math.cos(angle) * dist,
    peak: Math.sin(angle) * dist,
    fall: 90 + r(3) * 120,
    rot: (r(4) - 0.5) * 720,
    w: 6 + r(5) * 6,
    h: r(6) > 0.5 ? 6 + r(5) * 6 : 12 + r(7) * 6,
    round: r(8) > 0.6,
    c: COLORS[i % COLORS.length],
    d: r(9) * 0.15,
  };
});

/** Cheering fox + one-off confetti burst, shown when someone joins early access. */
export const Celebrate = () => {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none relative mx-auto h-[150px] w-[150px]" aria-hidden="true" data-testid="celebrate">
      {!reduce && PIECES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{ width: p.w, height: p.h, backgroundColor: p.c, borderRadius: p.round ? 999 : 2, marginLeft: -p.w / 2, marginTop: -p.h / 2 }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
          animate={{ x: [0, p.x * 0.8, p.x], y: [0, p.peak, p.peak + p.fall], opacity: [1, 1, 0], rotate: p.rot, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.15 + p.d, ease: [0.2, 0.7, 0.4, 1], times: [0, 0.45, 1] }}
          data-testid="confetti-piece"
        />
      ))}
      <motion.img
        src="/art/fox-cheer.webp"
        alt=""
        className="absolute inset-x-0 bottom-0 mx-auto h-[140px] w-auto"
        initial={reduce ? false : { y: 60, scale: 0.4, opacity: 0, rotate: -8 }}
        animate={reduce ? undefined : { y: [60, -18, 0, -10, 0], scale: [0.4, 1.08, 1, 1.02, 1], opacity: 1, rotate: [-8, 4, 0, -2, 0] }}
        transition={{ duration: 1.1, ease: "easeOut", times: [0, 0.35, 0.6, 0.8, 1] }}
        data-testid="celebrate-fox"
      />
    </div>
  );
};

import { motion } from "framer-motion";

/* Hand-drawn artwork. Strokes are deliberately uneven: each shape is drawn
   twice with slightly different paths so it reads as pen on paper. */

export const HandUnderline = ({ color = "#FF5A1F" }) => (
  <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
    <motion.path
      d="M4 13 C 52 6, 104 5, 156 8 C 206 11, 252 14, 296 9"
      fill="none" stroke={color} strokeWidth="4.2" strokeLinecap="round"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.path
      d="M12 17 C 70 12, 130 11, 190 13 C 232 14, 266 16, 290 14"
      fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" opacity="0.55"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
    />
  </svg>
);

export const Underlined = ({ children }) => (
  <span className="underline-hand">
    {children}
    <HandUnderline />
  </span>
);

export const HandArrow = ({ d, head, delay = 0.6, className = "", width = 1.7, viewBox = "0 0 120 90" }) => (
  <svg className={className} viewBox={viewBox} fill="none" aria-hidden="true">
    <motion.path
      d={d} stroke="#111110" strokeWidth={width} strokeLinecap="round" opacity="0.7"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.path
      d={head} stroke="#111110" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" opacity="0.7"
      initial={{ opacity: 0 }} whileInView={{ opacity: 0.7 }} viewport={{ once: true }}
      transition={{ duration: 0.3, delay: delay + 0.85 }}
    />
  </svg>
);

export const HandCheck = ({ size = 15, color = "#FF5A1F" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 13.5 C 6.6 15.2, 8.2 17.4, 9.6 20 C 12.8 13.2, 16.2 7.6, 21 3.4"
      stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HandCross = ({ size = 15, color = "#6B6A66" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 4.6 C 10 9.4, 14.6 14.2, 19.4 19.6" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M19 5 C 14.2 9.6, 9.6 14.6, 4.8 19.4" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const HandRule = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 400 8" preserveAspectRatio="none" aria-hidden="true">
    <path d="M2 5 C 90 2, 160 6, 240 3.4 C 310 1.4, 360 5, 398 3"
      fill="none" stroke="#111110" strokeWidth="1.4" opacity="0.28" strokeLinecap="round" />
  </svg>
);

export const Signature = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 240 72" fill="none" aria-hidden="true">
    <motion.path
      d="M8 54 C 18 30, 26 12, 33 14 C 40 16, 32 44, 28 54 C 24 64, 34 62, 42 52 C 50 42, 56 28, 60 32 C 64 36, 56 52, 62 54 C 68 56, 76 40, 82 30 C 86 24, 90 28, 86 40 C 82 52, 90 56, 100 46 C 112 34, 118 18, 126 22 C 132 25, 120 48, 128 52 C 136 56, 150 38, 160 26 C 166 19, 172 22, 168 34 C 164 46, 176 50, 190 40 C 204 30, 214 18, 226 20"
      stroke="#111110" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
    />
  </svg>
);

export const LogoMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="16" fill="#2A2421" />
    <path d="M14 48 L32 14 L50 48 L41 48 L32 31 L23 48 Z" fill="#F8C9AE" />
    <path d="M26 42 L31 47 L40 36" fill="none" stroke="#4FB286" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Logo = () => (
  <span className="flex items-center gap-2.5" data-testid="brand-logo">
    <LogoMark size={30} />
    <span className="font-display text-[1.35rem] font-bold">ApplyScout</span>
  </span>
);

export const Maggie = ({ size = 96, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className} role="img" aria-label="Maggie the fox">
    <polygon points="22,12 48,42 18,48" fill="#F8C9AE" />
    <polygon points="27,23 41,40 24,44" fill="#2A2421" />
    <polygon points="98,12 72,42 102,48" fill="#F8C9AE" />
    <polygon points="93,23 79,40 96,44" fill="#2A2421" />
    <polygon points="16,44 60,34 104,44 90,76 60,106 30,76" fill="#EDA27F" />
    <polygon points="16,44 30,76 60,106 48,70" fill="#FFFBF2" />
    <polygon points="104,44 90,76 60,106 72,70" fill="#FFFBF2" />
    <polygon points="60,34 50,46 60,58 70,46" fill="#F8C9AE" />
    <g className="maggie-blink">
      <circle cx="45" cy="60" r="4" fill="#1C1917" />
      <circle cx="75" cy="60" r="4" fill="#1C1917" />
    </g>
    <polygon points="54,92 66,92 60,100" fill="#1C1917" />
  </svg>
);

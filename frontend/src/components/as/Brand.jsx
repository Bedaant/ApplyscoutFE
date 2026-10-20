export const FOX_PATHS = [
  "M28 12 L54 36 L38 46 Z",
  "M50 38 L80 6 L94 60 Q76 58 60 52 Z",
  "M6 94 Q24 60 50 38 L60 52 Q36 70 6 94 Z",
  "M36 76 Q64 58 86 68 Q93 82 96 96 Q68 82 36 76 Z",
];

export const FoxGradient = () => (
  <defs>
    <linearGradient id="fox-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FF7A1A" />
      <stop offset="1" stopColor="#FF4500" />
    </linearGradient>
  </defs>
);

export const FoxMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <FoxGradient />
    {FOX_PATHS.map((d) => <path key={d} d={d} fill="url(#fox-grad)" />)}
    <circle cx="81" cy="33" r="3" fill="#0B1320" />
    <path d="M66 50 Q71 46 77 50 Q71 53 66 50 Z" fill="#0B1320" />
  </svg>
);

export const Logo = ({ tagline = false }) => (
  <span className="flex items-center gap-2" data-testid="brand-logo">
    <FoxMark size={tagline ? 44 : 34} />
    <span className="flex flex-col">
      <span className={`font-display font-extrabold leading-none ${tagline ? "text-2xl" : "text-[1.35rem]"}`}>
        <span className="text-navy">Apply</span><span className="text-brand">Scout</span>
      </span>
      {tagline && <span className="label mt-1.5 tracking-[0.3em] text-mute">Jobs find you now</span>}
    </span>
  </span>
);

export const Maggie = ({ size = 96, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className} role="img" aria-label="Maggie the fox">
    <polygon points="22,12 48,42 18,48" fill="#FF6A00" />
    <polygon points="27,23 41,40 24,44" fill="#FFD9C2" />
    <polygon points="98,12 72,42 102,48" fill="#FF6A00" />
    <polygon points="93,23 79,40 96,44" fill="#FFD9C2" />
    <polygon points="16,44 60,34 104,44 90,76 60,106 30,76" fill="#FF5A1F" />
    <polygon points="16,44 30,76 60,106 48,70" fill="#FFFFFF" />
    <polygon points="104,44 90,76 60,106 72,70" fill="#FFFFFF" />
    <polygon points="60,34 50,46 60,58 70,46" fill="#FF8A3D" />
    <g className="maggie-blink">
      <circle cx="45" cy="60" r="4" fill="#0B1320" />
      <circle cx="75" cy="60" r="4" fill="#0B1320" />
    </g>
    <polygon points="54,92 66,92 60,100" fill="#0B1320" />
  </svg>
);

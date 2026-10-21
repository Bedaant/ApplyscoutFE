import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CreditCard, Loader2, Lock, ShieldCheck, Smartphone, X } from "lucide-react";
import { EASE } from "./Bits";

/* ---------- Maggie the fox: one short line per step ---------- */
export const Maggie = ({ line, img = "/art/fox-wave.webp", testid = "maggie" }) => (
  <div className="flex items-end gap-3" data-testid={testid}>
    <motion.img
      key={img}
      src={img}
      alt="Maggie the fox"
      initial={{ y: 16, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className="h-[64px] w-[64px] shrink-0 object-contain sm:h-[76px] sm:w-[76px]"
    />
    <AnimatePresence mode="wait">
      <motion.p
        key={line}
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="mb-2 rounded-[18px] rounded-bl-[6px] bg-white px-4 py-2.5 text-[0.95rem] font-semibold leading-snug text-ink shadow-[0_10px_24px_-18px_rgba(22,33,58,0.7)]"
        data-testid={`${testid}-line`}
      >
        {line}
      </motion.p>
    </AnimatePresence>
  </div>
);

export const DemoNote = ({ children = "Demo: no payment is taken and no email is sent." }) => (
  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.74rem] font-semibold text-slate/80" data-testid="demo-note">
    <ShieldCheck size={12} /> {children}
  </p>
);

/* ---------- local price from browser region (no location lookup) ---------- */
const EU = ["AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"];
export const detectRegion = () => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const lang = (navigator.languages || [navigator.language || ""]).join(",");
  if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta" || /-IN\b/.test(lang)) return "IN";
  if (tz === "Europe/London" || /-GB\b/.test(lang)) return "GB";
  const m = lang.match(/-([A-Z]{2})\b/);
  if (m && EU.includes(m[1])) return "EU";
  if (tz.startsWith("Europe/")) return "EU";
  if (tz.startsWith("America/") || /-US\b/.test(lang)) return "US";
  return "OTHER";
};
export const PRICES = {
  IN: { label: "₹499", per: "/ month", methods: ["upi", "gpay", "card", "apple"] },
  US: { label: "$9", per: "/ month", methods: ["apple", "gpay", "card", "upi"] },
  EU: { label: "€9", per: "/ month", methods: ["apple", "gpay", "card", "upi"] },
  GB: { label: "£8", per: "/ month", methods: ["apple", "gpay", "card", "upi"] },
  OTHER: { label: "$9", per: "/ month", methods: ["card", "gpay", "apple", "upi"] },
};
const METHOD = {
  apple: { label: "Apple Pay", icon: null, cls: "bg-black text-white" },
  gpay: { label: "Google Pay", icon: <span className="font-extrabold"><span className="text-[#4285F4]">G</span></span>, cls: "bg-white text-ink ring-1 ring-ink/15" },
  upi: { label: "UPI", icon: <Smartphone size={16} />, cls: "bg-[#0F7A3C] text-white" },
  card: { label: "Card", icon: <CreditCard size={16} />, cls: "bg-ink text-white" },
};

/* ---------- 7/8. paywall + mock payment ---------- */
export const Paywall = ({ person, onPaid, onClose }) => {
  const region = detectRegion();
  const price = PRICES[region];
  const [method, setMethod] = useState(null);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [card, setCard] = useState({ num: "", exp: "", cvc: "" });
  const [upi, setUpi] = useState("");
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  const pay = () => {
    if (!ok) { setErr("Add the email for your account."); return; }
    if (method === "card" && card.num.replace(/\D/g, "").length < 12) { setErr("That card number looks short."); return; }
    if (method === "upi" && !/^[\w.-]+@[\w]+$/.test(upi.trim())) { setErr("Use a UPI ID like name@bank."); return; }
    setErr(""); setBusy(true);
    setTimeout(() => onPaid({ email: email.trim().toLowerCase(), method, price: price.label }), 1600);
  };

  return (
    <motion.div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/30 backdrop-blur-[3px] sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-testid="paywall">
      <motion.div
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="relative max-h-[92vh] w-full max-w-[460px] overflow-y-auto rounded-t-[28px] bg-white p-6 sm:rounded-[28px]"
      >
        <button onClick={onClose} aria-label="Close" data-testid="paywall-close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-page text-slate"><X size={16} /></button>
        <img src="/art/fox-cheer.webp" alt="" className="mx-auto h-[84px]" />
        <h3 className="font-display mt-2 text-center text-[1.45rem] leading-tight text-ink" data-testid="paywall-title">
          Your email to {person.name}, {person.role} is ready.
        </h3>
        <div className="mt-4 rounded-[20px] bg-accent-soft p-4 text-center">
          <p className="font-display text-[2.2rem] leading-none text-ink" data-testid="paywall-price">{price.label}<span className="text-[1rem] text-slate"> {price.per}</span></p>
          <ul className="mx-auto mt-3 w-fit space-y-1.5 text-left text-[0.9rem] font-semibold text-ink">
            {["Send from your own Gmail, only when you approve", "Fresh matches and drafts every morning", "Pause or undo any send"].map((b) => (
              <li key={b} className="flex items-center gap-2"><Check size={15} className="shrink-0 text-[#2C8F6B]" strokeWidth={3} />{b}</li>
            ))}
          </ul>
          <p className="mt-2 text-[0.78rem] font-bold text-slate">Cancel anytime</p>
        </div>

        {!method ? (
          <div className="mt-5 grid grid-cols-2 gap-2.5" data-testid="pay-methods">
            {price.methods.map((m) => (
              <button key={m} onClick={() => setMethod(m)} data-testid={`pay-${m}-btn`}
                className={`flex h-12 items-center justify-center gap-2 rounded-[14px] text-[0.92rem] font-bold transition-transform active:scale-95 ${METHOD[m].cls}`}>
                {METHOD[m].icon} {METHOD[m].label}
              </button>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-[20px] border border-ink/10 p-4" data-testid={`pay-sheet-${method}`}>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-[0.95rem] font-bold text-ink">{METHOD[method].icon} {METHOD[method].label}</p>
              <button onClick={() => { setMethod(null); setErr(""); }} className="text-[0.8rem] font-bold text-slate">Change</button>
            </div>
            <label className="mt-3 block text-[0.78rem] font-bold text-slate">Email for your account
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" data-testid="pay-email-input"
                className="field mt-1 w-full rounded-[12px] px-3 py-2.5 text-[0.95rem] font-medium text-ink" />
            </label>
            {method === "card" && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                <input value={card.num} onChange={(e) => setCard({ ...card, num: e.target.value })} placeholder="Card number" inputMode="numeric" data-testid="pay-card-number" className="field col-span-3 rounded-[12px] px-3 py-2.5 text-[0.95rem]" />
                <input value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} placeholder="MM / YY" className="field col-span-2 rounded-[12px] px-3 py-2.5 text-[0.95rem]" />
                <input value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} placeholder="CVC" className="field rounded-[12px] px-3 py-2.5 text-[0.95rem]" />
              </div>
            )}
            {method === "upi" && (
              <div className="mt-2 flex items-center gap-3">
                <input value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="name@bank" data-testid="pay-upi-id" className="field min-w-0 flex-1 rounded-[12px] px-3 py-2.5 text-[0.95rem]" />
                <div className="grid h-16 w-16 shrink-0 grid-cols-5 gap-[2px] rounded-[8px] bg-white p-1.5 ring-1 ring-ink/15" aria-label="QR code placeholder" data-testid="pay-upi-qr">
                  {Array.from({ length: 25 }, (_, k) => <span key={k} className={(k * 7 + 3) % 3 ? "bg-ink" : "bg-transparent"} />)}
                </div>
              </div>
            )}
            {(method === "apple" || method === "gpay") && (
              <p className="mt-2 text-[0.8rem] font-semibold text-slate">{method === "apple" ? "Confirm with Face ID or Touch ID." : "Pay with the card saved in Google Pay."}</p>
            )}
            {err && <p className="mt-2 text-[0.82rem] font-bold text-[#C2365C]" data-testid="pay-error">{err}</p>}
            <button onClick={pay} disabled={busy} data-testid="pay-confirm-btn"
              className={`mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[14px] text-[0.95rem] font-bold disabled:opacity-80 ${METHOD[method].cls}`}>
              {busy ? <><Loader2 size={16} className="animate-spin" /> Processing…</> : <><Lock size={14} /> Pay {price.label}</>}
            </button>
          </motion.div>
        )}
        <DemoNote />
      </motion.div>
    </motion.div>
  );
};

/* ---------- 9. Google-style permission (mock) ---------- */
export const GmailConsent = ({ email, onAllow, onCancel }) => (
  <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto w-full max-w-[420px] rounded-[24px] border border-ink/10 bg-white p-6" data-testid="gmail-consent">
    <p className="text-center text-[1.4rem] font-bold"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></p>
    <p className="mt-3 text-center text-[1.25rem] font-semibold text-ink">ApplyScout wants to access your Google Account</p>
    <p className="mx-auto mt-3 w-fit rounded-full border border-ink/15 px-3 py-1 text-[0.85rem] font-semibold text-ink" data-testid="gmail-account">{email}</p>
    <p className="mt-5 text-[0.9rem] font-semibold text-ink">This will allow ApplyScout to:</p>
    <div className="mt-2 flex items-start gap-3 border-y border-ink/10 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E8F0FE] text-[#1A73E8]">✉</span>
      <p className="text-[0.9rem] text-ink">Send email on your behalf <span className="block text-[0.78rem] text-slate">Only emails you approve, one at a time.</span></p>
    </div>
    <p className="mt-3 text-[0.75rem] leading-relaxed text-slate">Make sure you trust ApplyScout. You can remove access any time in your Google Account.</p>
    <div className="mt-5 flex justify-end gap-2">
      <button onClick={onCancel} className="rounded-full px-5 py-2.5 text-[0.9rem] font-bold text-[#1A73E8]" data-testid="gmail-cancel-btn">Cancel</button>
      <button onClick={onAllow} className="rounded-full bg-[#1A73E8] px-6 py-2.5 text-[0.9rem] font-bold text-white" data-testid="gmail-allow-btn">Allow</button>
    </div>
    <DemoNote>Demo: Gmail isn't really connected.</DemoNote>
  </motion.div>
);

/* masked -> full address reveal */
export const Unmask = ({ masked, full }) => {
  const [n, setN] = useState(0);
  const ref = useRef();
  useEffect(() => {
    ref.current = setInterval(() => setN((v) => (v >= full.length ? v : v + 1)), 45);
    return () => clearInterval(ref.current);
  }, [full]);
  const shown = full.slice(0, n) + masked.slice(Math.min(n, masked.length));
  return <span className="font-mono text-[0.88rem]" data-testid="to-address">{n >= full.length ? full : shown}</span>;
};

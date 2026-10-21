import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Download, Share2 } from "lucide-react";

const FOX_SRC = "/art/fox-cheer.webp";
const SITE = () => window.location.origin;
const LINE = (n) => `I'm #${n} on the ApplyScout early-access list 🦊 — interviews, not just applications. Join me:`;

const loadImg = (src) => new Promise((res, rej) => {
  const im = new Image();
  im.onload = () => res(im);
  im.onerror = rej;
  im.src = src;
});

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

/** Draws the share card (1080x1080) on a canvas and returns a PNG blob. */
export const renderCard = async (n) => {
  const S = 1080;
  const c = document.createElement("canvas");
  c.width = S; c.height = S;
  const ctx = c.getContext("2d");
  try { await document.fonts?.ready; } catch { /* ignore */ }

  const g = ctx.createRadialGradient(S / 2, 0, 80, S / 2, 0, S * 1.1);
  g.addColorStop(0, "#FFC7AC"); g.addColorStop(0.45, "#FFE1CF"); g.addColorStop(1, "#FFF6EE");
  ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);

  // soft clouds
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  [[150, 190, 90], [230, 170, 70], [900, 230, 80], [970, 260, 60], [120, 900, 70], [960, 880, 90]].forEach(([x, y, r]) => {
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  });

  // confetti
  const colors = ["#FF6E4F", "#FFA872", "#FFD36E", "#BEEBC5", "#A9E4F2", "#DCC9F7"];
  for (let i = 0; i < 46; i += 1) {
    const x = (Math.sin(i * 91.7) * 0.5 + 0.5) * S;
    const y = (Math.cos(i * 37.3) * 0.5 + 0.5) * 520 + 40;
    ctx.save(); ctx.translate(x, y); ctx.rotate(i);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(-7, -4, 14, 8 + (i % 3) * 4);
    ctx.restore();
  }

  try {
    const fox = await loadImg(FOX_SRC);
    const fh = 470; const fw = (fox.width / fox.height) * fh;
    ctx.drawImage(fox, (S - fw) / 2, 90, fw, fh);
  } catch { /* card still works without the fox */ }

  ctx.textAlign = "center";
  ctx.fillStyle = "#16213A";
  ctx.font = "800 150px Figtree, sans-serif";
  ctx.fillText(`#${n}`, S / 2, 720);
  ctx.font = "700 46px Figtree, sans-serif";
  ctx.fillText("on the ApplyScout early-access list", S / 2, 790);
  ctx.fillStyle = "#5A6B8C";
  ctx.font = "600 36px Figtree, sans-serif";
  ctx.fillText("Interviews, not just applications.", S / 2, 850);

  // brand pill
  const host = window.location.host.replace(/^www\./, "");
  const label = host.length <= 28 ? `Join me at ${host}` : "Join early access · ApplyScout";
  ctx.font = "800 34px Figtree, sans-serif";
  const tw = ctx.measureText(label).width + 80;
  roundRect(ctx, (S - tw) / 2, 920, tw, 76, 38);
  ctx.fillStyle = "#16213A"; ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillText(label, S / 2, 970);

  return new Promise((res) => c.toBlob(res, "image/png"));
};

const IconBtn = ({ onClick, href, label, children, testid }) => {
  const cls = "flex items-center justify-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[0.82rem] font-bold text-ink shadow-[0_8px_18px_-14px_rgba(22,33,58,0.6)] transition-colors hover:bg-accent-soft";
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls} data-testid={testid} aria-label={label}>{children}</a>
  ) : (
    <button type="button" onClick={onClick} className={cls} data-testid={testid} aria-label={label}>{children}</button>
  );
};

export const ShareCard = ({ position }) => {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const text = LINE(position);
  const url = SITE();
  const enc = encodeURIComponent;

  const download = async () => {
    setBusy(true);
    try {
      const blob = await renderCard(position);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `applyscout-${position}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } finally { setBusy(false); }
  };

  const share = async () => {
    setBusy(true);
    try {
      const blob = await renderCard(position);
      const file = new File([blob], `applyscout-${position}.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text, url });
      } else if (navigator.share) {
        await navigator.share({ text, url });
      } else {
        await download();
      }
    } catch { /* user closed the share sheet */ } finally { setBusy(false); }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(`${text} ${url}`); } catch { /* clipboard blocked */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.9 }}
      className="mt-5 w-full max-w-[360px]"
      data-testid="share-card"
    >
      <div className="sky relative overflow-hidden rounded-[28px] px-6 pb-6 pt-5 text-center shadow-[0_24px_44px_-24px_rgba(224,102,61,0.7)]">
        <img src={FOX_SRC} alt="" className="mx-auto h-[110px] w-auto" />
        <p className="font-display mt-1 text-[3rem] leading-none text-ink" data-testid="share-card-position">#{position}</p>
        <p className="mt-1 text-[0.95rem] font-bold text-ink">on the ApplyScout early-access list</p>
        <p className="mt-1 text-[0.8rem] font-semibold text-slate">Interviews, not just applications.</p>
      </div>
      <p className="mt-4 text-[0.84rem] font-bold text-slate">Share it with a friend who's job hunting</p>
      <div className="mt-2.5 flex flex-wrap justify-center gap-2">
        <IconBtn onClick={share} label="Share" testid="share-native-btn"><Share2 size={14} /> {busy ? "…" : "Share"}</IconBtn>
        <IconBtn onClick={download} label="Download image" testid="share-download-btn"><Download size={14} /> Image</IconBtn>
        <IconBtn onClick={copy} label="Copy link" testid="share-copy-btn">{copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}</IconBtn>
        <IconBtn href={`https://wa.me/?text=${enc(`${text} ${url}`)}`} label="Share on WhatsApp" testid="share-whatsapp-link">WhatsApp</IconBtn>
        <IconBtn href={`https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`} label="Share on X" testid="share-x-link">X</IconBtn>
        <IconBtn href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} label="Share on LinkedIn" testid="share-linkedin-link">LinkedIn</IconBtn>
      </div>
    </motion.div>
  );
};

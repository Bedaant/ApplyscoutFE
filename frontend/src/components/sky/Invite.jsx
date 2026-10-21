import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, X } from "lucide-react";
import { API } from "./live";

const REF_KEY = "as-ref";

/** Reads ?ref=CODE once, remembers it, and cleans it from the address bar. */
export const getRef = () => {
  try {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("ref");
    if (code && /^[a-f0-9]{6,16}$/i.test(code)) {
      localStorage.setItem(REF_KEY, code.toLowerCase());
      url.searchParams.delete("ref");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
    return localStorage.getItem(REF_KEY);
  } catch {
    return null;
  }
};

export const inviteLink = (code) => `${window.location.origin}/?ref=${code}`;

export const InviteBanner = ({ onJoin }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const code = getRef();
    let joined = false;
    try { joined = !!localStorage.getItem("as-signup"); } catch { /* ignore */ }
    const hide = () => setShow(false);
    window.addEventListener("as-signed-up", hide);
    if (!code || joined) return () => window.removeEventListener("as-signed-up", hide);
    axios.get(`${API}/signups/invite/${code}`).then((r) => {
      if (r.data.valid) setShow(true);
      else localStorage.removeItem(REF_KEY);
    }).catch(() => {});
    return () => window.removeEventListener("as-signed-up", hide);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 22, delay: 1.4 } }}
          exit={{ y: 80, opacity: 0, transition: { duration: 0.25 } }}
          className="fixed inset-x-3 bottom-4 z-[60] mx-auto flex max-w-[560px] items-center gap-3 rounded-[22px] bg-ink py-3 pl-3 pr-2 text-white shadow-[0_20px_40px_-20px_rgba(22,33,58,0.9)]"
          data-testid="invite-banner"
        >
          <img src="/art/fox-wave.webp" alt="" className="h-11 w-11 shrink-0 object-contain" />
          <p className="flex-1 text-[0.88rem] font-semibold leading-snug">
            <Gift size={14} className="mr-1 inline -mt-0.5" />Your friend invited you. Join early access and they move up the list.
          </p>
          <button onClick={() => { setShow(false); onJoin(); }} className="pill-pink shrink-0 rounded-full px-4 py-2 text-[0.85rem] font-bold" data-testid="invite-banner-join">Join</button>
          <button onClick={() => setShow(false)} aria-label="Dismiss" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/70 hover:text-white" data-testid="invite-banner-close"><X size={15} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

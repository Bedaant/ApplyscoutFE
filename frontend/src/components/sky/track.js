import { API } from "./live";

// Anonymous funnel events: a random per-tab id, an event name and a few short labels. No names or emails.
const sid = () => {
  try {
    let s = sessionStorage.getItem("as-sid");
    if (!s) {
      s = (window.crypto?.randomUUID?.() || `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`).slice(0, 36);
      sessionStorage.setItem("as-sid", s);
    }
    return s;
  } catch {
    return "nosession0";
  }
};

const clean = (v) => String(v ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "_").slice(0, 32);

export const track = (name, props = {}) => {
  try {
    const p = Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined && v !== null && v !== "").map(([k, v]) => [k, clean(v)]));
    fetch(`${API}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sid: sid(), props: p }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* tracking must never break the page */
  }
};

// fire an event only once per tab (e.g. landing_view)
export const trackOnce = (name, props) => {
  try {
    const k = `as-ev-${name}`;
    if (sessionStorage.getItem(k)) return;
    sessionStorage.setItem(k, "1");
  } catch { /* ignore */ }
  track(name, props);
};

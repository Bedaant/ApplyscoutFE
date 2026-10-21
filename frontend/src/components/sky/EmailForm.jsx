import { useState } from "react";
import axios from "axios";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Celebrate } from "./Celebrate";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const EmailForm = ({ source = "hero", id = "hero", label = "Join the list" }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [msg, setMsg] = useState("");
  const [fresh, setFresh] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setState("error");
      setMsg("That address is missing something — give it another look.");
      return;
    }
    setState("sending");
    try {
      const res = await axios.post(`${API}/signups`, { email: value, source });
      setFresh(!res.data?.already_on_list);
      setState("done");
      setMsg(res.data?.already_on_list
        ? `${value} is already on the list — you keep place #${res.data.position}.`
        : `You're #${res.data?.position} on the list. We'll write when there's something real to use.`);
    } catch {
      setState("error");
      setMsg("That didn't save. Try again in a moment.");
    }
  };

  if (state === "done") {
    return (
      <div className="flex flex-col items-center" data-testid={`${id}-signup-success`}>
        {fresh && (
          <>
            <Celebrate />
            <motion.p
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.5 }}
              className="font-display mt-1 text-[1.5rem] leading-tight text-ink"
              data-testid={`${id}-signup-cheer`}
            >
              You're in! 🎉
            </motion.p>
          </>
        )}
        <div className="tick-in mt-3 flex items-start gap-3 rounded-3xl bg-mint/70 px-5 py-4 text-left">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[#1F7A52]"><Check size={14} /></span>
          <p className="text-[0.95rem] font-medium leading-relaxed text-ink">{msg}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate data-testid={`${id}-signup-form`}>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
          placeholder="you@email.com"
          aria-label="Email address"
          data-testid={`${id}-email-input`}
          className="field h-13 w-full rounded-full px-5 py-3.5 text-[0.98rem] font-medium text-ink placeholder:text-slate/60 sm:w-[19rem]"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          data-testid={`${id}-signup-submit`}
          className="pill-pink group inline-flex items-center justify-center gap-2 rounded-full py-3.5 pl-7 pr-3 text-[0.98rem] font-bold disabled:opacity-70"
        >
          {state === "sending" ? <Loader2 size={16} className="animate-spin" /> : null}
          {label}
          {state !== "sending" && (
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/70 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          )}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-[0.9rem] font-semibold text-[#C2365C]" data-testid={`${id}-signup-error`}>{msg}</p>}
    </form>
  );
};

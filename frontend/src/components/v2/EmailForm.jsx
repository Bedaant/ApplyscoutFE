import { useState } from "react";
import axios from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import { HandCheck } from "./Hand";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const EmailForm = ({ source = "hero", id = "hero", label = "Get started" }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setState("error");
      setMsg("That address is missing something — check it over.");
      return;
    }
    setState("sending");
    try {
      const res = await axios.post(`${API}/signups`, { email: value, source });
      setState("done");
      setMsg(res.data?.already_on_list
        ? `${value} is already on the list — you keep your place at #${res.data.position}.`
        : `You're #${res.data?.position} on the list. We'll write when there's something real to show you.`);
    } catch {
      setState("error");
      setMsg("That didn't save. Try again in a moment.");
    }
  };

  if (state === "done") {
    return (
      <div className="flex items-start gap-2.5 rounded-xl border border-brand/35 bg-brand/[0.06] px-4 py-3.5" data-testid={`${id}-signup-success`}>
        <span className="mt-0.5 shrink-0"><HandCheck size={17} /></span>
        <p className="text-sm leading-relaxed text-coal">{msg}</p>
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
          className="field h-12 w-full rounded-xl px-4 text-[0.95rem] text-coal placeholder:text-ash/70 sm:w-[19rem]"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          data-testid={`${id}-signup-submit`}
          className="btn-o inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-[0.95rem] font-semibold disabled:opacity-70"
        >
          {state === "sending" ? <Loader2 size={16} className="animate-spin" /> : null}
          {label}
          {state !== "sending" && <ArrowRight size={16} />}
        </button>
      </div>
      {state === "error" && (
        <p className="mt-2 text-sm text-brand" data-testid={`${id}-signup-error`}>{msg}</p>
      )}
    </form>
  );
};

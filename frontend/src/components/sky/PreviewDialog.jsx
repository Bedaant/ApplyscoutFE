import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Logo } from "./Bits";
import { UploadStep, AnalyzingStep, ResultsStep, DoneStep } from "./PreviewSteps";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STEPS = ["Resume", "Scouting", "Review", "Done"];

export const PreviewDialog = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const reset = () => { setStep(0); setData(null); setError(""); };
  const change = (v) => { onOpenChange(v); if (!v) setTimeout(reset, 300); };

  const start = async (role, fileName) => {
    setError("");
    setStep(1);
    const wait = new Promise((r) => setTimeout(r, 2500));
    try {
      const [res] = await Promise.all([axios.post(`${API}/preview`, { target_role: role, file_name: fileName }), wait]);
      const matches = Array.isArray(res.data?.matches) ? res.data.matches : [];
      if (!matches.length) throw new Error("empty");
      setData({ ...res.data, matches });
      setStep(2);
    } catch {
      setError("That didn't load. Try again in a moment.");
      setStep(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={change}>
      <DialogContent data-lenis-prevent data-testid="preview-dialog"
        className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-3xl overflow-y-auto rounded-[1.75rem] border-0 bg-white p-0 text-ink sm:rounded-[1.75rem]">
        <DialogTitle className="sr-only">ApplyScout sample run</DialogTitle>
        <DialogDescription className="sr-only">A sample run of ApplyScout. Nothing is sent.</DialogDescription>
        <div className="flex flex-wrap items-center gap-4 bg-[#F2F7FF] px-5 py-3.5 pr-12">
          <Logo size={30} />
          <div className="flex items-center gap-3">
            {STEPS.map((l, i) => (
              <span key={l} className={`flex items-center gap-1.5 text-[0.78rem] font-bold ${i <= step ? "text-ink" : "text-slate/50"}`}>
                <span className={`h-2 w-2 rounded-full ${i < step ? "bg-mint" : i === step ? "bg-bubble" : "bg-[#DCE4F0]"}`} />
                <span className={i === step ? "" : "hidden sm:inline"}>{l}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="p-6 md:p-8">
          {step === 0 && <UploadStep onStart={start} error={error} />}
          {step === 1 && <AnalyzingStep />}
          {step === 2 && data && <ResultsStep data={data} onApprove={() => setStep(3)} />}
          {step === 3 && <DoneStep onRestart={reset} onClose={() => change(false)} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

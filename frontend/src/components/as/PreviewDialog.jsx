import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { FoxMark } from "./Brand";
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
    const wait = new Promise((r) => setTimeout(r, 2600));
    try {
      const [res] = await Promise.all([axios.post(`${API}/preview`, { target_role: role, file_name: fileName }), wait]);
      const matches = Array.isArray(res.data?.matches) ? res.data.matches : [];
      if (!matches.length) throw new Error("empty");
      setData({ ...res.data, matches });
      setStep(2);
    } catch {
      setError("We couldn't load the preview right now. Please try again.");
      setStep(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={change}>
      <DialogContent data-lenis-prevent data-testid="preview-dialog" className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-3xl overflow-y-auto rounded-3xl border-navy/10 bg-white p-0 text-navy sm:rounded-3xl">
        <DialogTitle className="sr-only">ApplyScout preview</DialogTitle>
        <DialogDescription className="sr-only">Try a sample run of ApplyScout</DialogDescription>
        <div className="flex items-center gap-3 border-b border-navy/[0.07] bg-blush px-5 py-3.5 pr-12">
          <FoxMark size={24} />
          <div className="flex items-center gap-3">
            {STEPS.map((l, i) => (
              <span key={l} className={`flex items-center gap-1.5 text-xs font-semibold ${i <= step ? "text-navy" : "text-navy/40"}`}>
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${i < step ? "bg-ok text-white" : i === step ? "bg-brand text-white" : "bg-navy/10 text-navy/60"}`}>{i + 1}</span>
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

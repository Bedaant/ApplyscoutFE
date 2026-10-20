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
        className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border-line bg-sheet p-0 text-coal sm:rounded-2xl">
        <DialogTitle className="sr-only">ApplyScout sample run</DialogTitle>
        <DialogDescription className="sr-only">A sample run of ApplyScout. Nothing is sent.</DialogDescription>
        <div className="flex items-center gap-4 border-b border-line bg-paper px-5 py-3 pr-12">
          <FoxMark size={20} />
          <div className="flex items-center gap-3">
            {STEPS.map((l, i) => (
              <span key={l} className={`flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] ${i <= step ? "text-coal" : "text-ash/60"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${i < step ? "bg-coal" : i === step ? "bg-brand" : "bg-line"}`} />
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

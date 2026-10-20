import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { UploadStep, AnalyzingStep, ResultsStep, DoneStep } from "./PreviewSteps";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
      <DialogContent data-lenis-prevent data-testid="preview-dialog" className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-3xl overflow-y-auto rounded-3xl border-ink/10 bg-canvas p-0 sm:rounded-3xl">
        <DialogTitle className="sr-only">ApplyScout preview</DialogTitle>
        <DialogDescription className="sr-only">Try a sample run of ApplyScout</DialogDescription>
        <div className="flex items-center gap-2 border-b border-ink/10 px-6 py-4">
          {["Resume", "Scouting", "Review", "Done"].map((l, i) => (
            <span key={l} className={`eyebrow flex items-center gap-1.5 ${i <= step ? "text-ink" : "text-ink/40"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${i <= step ? "bg-ink" : "bg-ink/25"}`} />
              <span className={i === step ? "" : "hidden sm:inline"}>{l}</span>
            </span>
          ))}
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

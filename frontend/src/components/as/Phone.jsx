import { ArrowLeft, Search } from "lucide-react";
import { FoxMark } from "./Brand";

export const Phone = ({ title, children, className = "" }) => (
  <div className={`relative rounded-[2.6rem] border-[9px] border-navy bg-white shadow-[0_50px_90px_-40px_rgba(11,19,32,0.55)] ${className}`}>
    <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-navy" />
    <div className="flex items-center justify-between px-5 pt-3 text-[11px] font-semibold text-navy"><span>9:41</span><span>5G</span></div>
    <div className="flex items-center justify-between px-4 pt-5">
      <ArrowLeft size={17} className="text-navy" />
      <span className="font-display text-base font-bold text-navy">{title}</span>
      <span className="flex items-center gap-2"><Search size={16} className="text-navy" /><FoxMark size={20} /></span>
    </div>
    <div className="px-3.5 pb-5 pt-4">{children}</div>
  </div>
);

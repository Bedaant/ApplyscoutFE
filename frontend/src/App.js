import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "@/App.css";
import { Loader } from "@/components/landing/Loader";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { Marquee } from "@/components/landing/Marquee";
import { Workflow } from "@/components/landing/Workflow";
import { Compare } from "@/components/landing/Compare";
import { Truth } from "@/components/landing/Truth";
import { Control } from "@/components/landing/Control";
import { Gmail } from "@/components/landing/Gmail";
import { Faq } from "@/components/landing/Faq";
import { FinalCta, Footer } from "@/components/landing/FinalCta";
import { PreviewDialog } from "@/components/landing/PreviewDialog";

function App() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -90 } });
    lenisRef.current = lenis;
    let id;
    const raf = (time) => { lenis.raf(time); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (open) lenis.stop(); else lenis.start();
  }, [open]);

  const onTry = () => setOpen(true);
  const ready = !loading;

  return (
    <div className="grain min-h-screen bg-canvas text-ink" data-testid="landing-page">
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <Nav onTry={onTry} ready={ready} />
      <main>
        <Hero onTry={onTry} ready={ready} />
        <TrustBar />
        <div className="mt-20 lg:mt-28"><Marquee /></div>
        <Workflow />
        <Compare />
        <Truth />
        <Control />
        <Gmail />
        <Faq />
        <FinalCta onTry={onTry} />
      </main>
      <Footer />
      <PreviewDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

export default App;

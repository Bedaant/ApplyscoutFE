import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "@/orange.css";
import { Loader } from "@/components/as/Loader";
import { Nav } from "@/components/as/Nav";
import { Hero } from "@/components/as/Hero";
import { ProductStrip } from "@/components/as/ProductStrip";
import { BuiltFor } from "@/components/as/BuiltFor";
import { Steps } from "@/components/as/Steps";
import { PhoneScene } from "@/components/as/PhoneScene";
import { Compare } from "@/components/as/Compare";
import { Truth } from "@/components/as/Truth";
import { Control } from "@/components/as/Control";
import { Gmail } from "@/components/as/Gmail";
import { Faq } from "@/components/as/Faq";
import { FinalCta, Footer } from "@/components/as/FinalCta";
import { PreviewDialog } from "@/components/as/PreviewDialog";

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
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white text-navy" data-testid="landing-page">
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <Nav onTry={onTry} ready={ready} />
      <main>
        <Hero onTry={onTry} ready={ready} />
        <ProductStrip />
        <BuiltFor />
        <Steps />
        <PhoneScene />
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
    </MotionConfig>
  );
}

export default App;

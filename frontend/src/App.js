import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "@/sky.css";
import { Loader } from "@/components/sky/Loader";
import { Nav } from "@/components/sky/Nav";
import { Hero } from "@/components/sky/Hero";
import { JobCards } from "@/components/sky/JobCards";
import { LogoMarquee } from "@/components/sky/LogoMarquee";
import { MotionStory } from "@/components/sky/MotionStory";
import { Compare } from "@/components/sky/Compare";
import { Quotes } from "@/components/sky/Quotes";
import { PaletteToggle } from "@/components/sky/Extras";
import { Faq } from "@/components/sky/Faq";
import { FinalCta, Footer } from "@/components/sky/FinalCta";
import { PreviewDialog } from "@/components/sky/PreviewDialog";

function App() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -90 } });
    lenisRef.current = lenis;
    window.__lenis = lenis;
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

  const onSample = () => setOpen(true);
  const onStart = () => {
    lenisRef.current?.scrollTo("#start", { offset: -140 });
    setTimeout(() => document.getElementById("footer-email")?.focus(), 900);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-page text-ink" data-testid="landing-page">
        <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
        <Nav onStart={onStart} />
        <main>
          <Hero onStart={onStart} onSample={onSample} />
          <JobCards />
          <LogoMarquee />
          <MotionStory />
          <Compare />
          <Quotes />
          <Faq />
          <FinalCta onSample={onSample} />
        </main>
        <Footer />
        <PreviewDialog open={open} onOpenChange={setOpen} />
        <PaletteToggle />
      </div>
    </MotionConfig>
  );
}

export default App;

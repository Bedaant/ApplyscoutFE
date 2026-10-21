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

  // Smooth-scroll only on desktop with a mouse; phones keep native scrolling.
  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (touch || reduce) {
      document.documentElement.classList.add("native-scroll");
      return undefined;
    }
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -90 } });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    let id;
    const raf = (time) => { lenis.raf(time); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = undefined; };
  }, []);

  // Pause every CSS animation inside a section while it is off-screen.
  useEffect(() => {
    if (loading) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("offscreen", !e.isIntersecting)),
      { rootMargin: "120px 0px" }
    );
    const id = setTimeout(() => document.querySelectorAll("main section, footer, [data-pause-offscreen]").forEach((el) => io.observe(el)), 50);
    return () => { clearTimeout(id); io.disconnect(); };
  }, [loading]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (open) lenis.stop(); else lenis.start();
  }, [open]);

  const onSample = () => setOpen(true);
  const onStart = () => {
    if (lenisRef.current) lenisRef.current.scrollTo("#start", { offset: -140 });
    else document.getElementById("start")?.scrollIntoView({ behavior: "smooth", block: "center" });
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
      </div>
    </MotionConfig>
  );
}

export default App;

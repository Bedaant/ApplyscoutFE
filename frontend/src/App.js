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
import { NeverDo } from "@/components/sky/NeverDo";
import { StickyCta } from "@/components/sky/StickyCta";
import { Funnel } from "@/components/sky/Funnel";
import { track, trackOnce } from "@/components/sky/track";
import { Faq } from "@/components/sky/Faq";
import { FinalCta, Footer } from "@/components/sky/FinalCta";
import { FindFlow } from "@/components/sky/FindFlow";
import { InviteBanner, getRef } from "@/components/sky/Invite";

function Landing({ onFind }) {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => { trackOnce("landing_view"); }, []);

  const onStart = () => {
    if (lenisRef.current) lenisRef.current.scrollTo("#start", { offset: -140 });
    else document.getElementById("start")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => document.getElementById("footer-email")?.focus(), 900);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-page text-ink" data-testid="landing-page">
        <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
        <Nav onFind={onFind} />
        <InviteBanner onJoin={onStart} />
        <main>
          <Hero onFind={onFind} />
          <JobCards onFind={onFind} />
          <LogoMarquee />
          <MotionStory />
          <Compare />
          <NeverDo />
          <Faq />
          <FinalCta onFind={onFind} />
        </main>
        <Footer />
        <StickyCta onFind={onFind} />
      </div>
    </MotionConfig>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [seed, setSeed] = useState(null);
  useEffect(() => {
    const on = () => {
      const next = window.location.pathname;
      // leave protection: browser Back mid-flow asks first
      if (!next.startsWith("/find") && typeof window.__flowGuard === "function") {
        window.history.pushState({}, "", "/find");
        window.__flowGuard();
        return;
      }
      setPath(next);
    };
    window.addEventListener("popstate", on);
    return () => window.removeEventListener("popstate", on);
  }, []);
  useEffect(() => { getRef(); }, []);
  const fromLanding = useRef(false);
  const go = (p) => { window.history.pushState({}, "", p); setPath(p); window.scrollTo(0, 0); };
  const exitFlow = () => {
    if (fromLanding.current) { fromLanding.current = false; window.history.back(); } else go("/");
  };
  if (path.startsWith("/funnel")) return <Funnel />;
  if (path.startsWith("/find")) {
    return <MotionConfig reducedMotion="user"><FindFlow seed={seed} onExit={() => { setSeed(null); exitFlow(); }} /></MotionConfig>;
  }
  const onFind = (opts = {}) => {
    track("cta_click", { src: opts.src || "unknown" });
    setSeed(opts);
    fromLanding.current = true;
    go("/find");
  };
  return <Landing onFind={onFind} />;
}

export default App;

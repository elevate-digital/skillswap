'use client';

import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lottie from "react-lottie-player";
import type { AnimationItem } from "lottie-web";
import { AnimatePresence, motion } from "framer-motion";
import skillswapLoader from "@/lib/assets/loader-arrows-only.json";

// TypeScript voor props van Page Transition
interface PageTransitionProps {
  children?: ReactNode;
}

// Animatie varianten voor de pagina overgang
const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 24,
  },
};

const pageTransition = {
  y: { 
    duration: 0.25, 
    ease: [0.22, 1, 0.36, 1] as const },
  opacity: { 
    delay: 0.2, 
    duration: 0.2, 
    ease: "easeOut" as const },
};

// View Page transition functie
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname(); // Huidige url pad ophalen  
  const [loading, setLoading] = useState(true); // Checked of de pagina aan het laden is
  const lottieRef = useRef<AnimationItem | null>(null); // Lottie animatie referentie
  const loaderPhaseRef = useRef<"forward" | "reverse">("forward"); // Houdt bij of de loader vooruit of achteruit speelt

  // Detecteer reduced motion
  const prefersReducedMotion = typeof window !== "undefined" 
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Pas transition aan bij reduced motion
  const effectiveTransition = prefersReducedMotion
    ? { y: { duration: 0 }, opacity: { duration: 0 } }
    : pageTransition;

  useEffect(() => {
    setLoading(true); // Zodra het pad veranderd laadt de pagina
    loaderPhaseRef.current = "forward"; // Animiatie speelt op volgorde af
  }, [pathname]);

  // Functie die ervoor zorgt dat de animatie reverse afspeelt
  const handleLottieComplete = useCallback(() => {
    // Als de animatie afgespeeld is, speel dan de animatie reverse af
    if (loaderPhaseRef.current === "forward") {
      loaderPhaseRef.current = "reverse";
      lottieRef.current?.setDirection(-1); // Speel de animatie achteruit af
      lottieRef.current?.play(); // Start de animatie
    } else {
      // Als de animatie afgelopen is stop dan de animatie
      setLoading(false);
    }
  }, []);

  return (
    <>
      {/* AnimatePresence zorgt ervoor dat exit-animaties */}
      <AnimatePresence mode="sync">
        {loading && !prefersReducedMotion && (
          <motion.div key="loader" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="page-transition-loader fixed inset-0 z-10 flex items-center justify-center bg-[var(--primary-bg-color)]">
            <Lottie ref={lottieRef} animationData={skillswapLoader} play loop={false} speed={1.2} direction={1} segments={[15, 60]} onComplete={handleLottieComplete} style={{ width: 400, height: 400 }} />
          </motion.div>
        )}
        <motion.div key={pathname} variants={pageVariants} initial="initial" animate={loading ? "initial" : "animate"} exit="exit" transition={effectiveTransition} className="page-transition-content">
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
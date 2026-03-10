'use client';

import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lottie from "react-lottie-player";
import type { AnimationItem } from "lottie-web";
import { AnimatePresence, motion } from "framer-motion";
import skillswapLoader from "@/lib/assets/loader-arrows-only.json";

// Typescript props Page Transitions
interface PageTransitionProps {
  children?: ReactNode;
}

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
  y: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  opacity: { delay: 0.2, duration: 0.2, ease: "easeOut" as const },
};

// View Page transition functie
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const lottieRef = useRef<AnimationItem | null>(null);
  const loaderPhaseRef = useRef<"forward" | "reverse">("forward");

  useEffect(() => {
    setLoading(true);
    loaderPhaseRef.current = "forward";
  }, [pathname]);

  const handleLottieComplete = useCallback(() => {
    if (loaderPhaseRef.current === "forward") {
      loaderPhaseRef.current = "reverse";
      lottieRef.current?.setDirection(-1);
      lottieRef.current?.play();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="sync">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="page-transition-loader fixed inset-0 z-10 flex items-center justify-center bg-[var(--primary-bg-color)]"
          >
            <Lottie
              ref={lottieRef}
              animationData={skillswapLoader}
              play
              loop={false}
              speed={1.2}
              direction={1}
              segments={[15, 60]}
              onComplete={handleLottieComplete}
              style={{ width: 400, height: 400 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="sync">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate={loading ? "initial" : "animate"}
          exit="exit"
          transition={pageTransition}
          className="page-transition-content"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
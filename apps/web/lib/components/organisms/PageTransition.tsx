"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lottie from "react-lottie-player";
import { AnimatePresence, motion } from "framer-motion";
import skillswapSplash from "@/lib/assets/loader-arrows-only.json";

interface PageTransitionProps {
  children?: ReactNode;
  animationData?: object;
  durationMs?: number;
}

export function PageTransition({
  children,
  animationData = skillswapSplash,
  durationMs = 1000,
}: PageTransitionProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, durationMs);

    return () => clearTimeout(timeout);
  }, [pathname, durationMs]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex items-center justify-center h-screen bg-white"
        >
          <Lottie
            animationData={animationData}
            play
            loop={false}
            speed={1.2}
            segments={[15, 60]}
            style={{ width: 400, height: 400 }}
          />
        </motion.div>
      ) : (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
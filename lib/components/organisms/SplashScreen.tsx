"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "react-lottie-player";
import skillswapSplash from "@/lib/assets/skillswap-loader.json";
import { useAuth } from "@/lib/components";

export function SplashScreen() {
  const { authStatus } = useAuth();
  const [showSplash, setShowSplash] = useState(false); // Staat standaard op false, we tonen de splash alleen als de gebruiker nog niet eerder op de site is geweest
  const delaySplash = 1800;

  // Eerst checken of de gebruiker al eens op de site is geweest (via localStorage) en alleen dan de splash tonen
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    // Als de gebruiker nog niet eerder op de site is geweest, toon de splash en sla op dat ze nu wel hebben bezocht
    if (!hasVisited) {
      setShowSplash(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  // Zodra de auth status niet meer "loading" is, verberg de splash na een korte vertraging
  useEffect(() => {
    if (!showSplash) return;

    // Wanneer de status verandert van "loading" naar iets anders, start een timer om de splash te verbergen
    if (authStatus !== "loading") {
      const timeout = setTimeout(() => {
        setShowSplash(false);
      }, delaySplash);

      return () => clearTimeout(timeout);
    }
  }, [authStatus, showSplash]);

  return (
    // AnimatePresence zorgt ervoor dat de exit animatie wordt afgespeeld wanneer showSplash verandert naar false
    <AnimatePresence>
      {showSplash && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
          <Lottie animationData={skillswapSplash} play loop={false} speed={1.2} style={{ width: 300, height: 300 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

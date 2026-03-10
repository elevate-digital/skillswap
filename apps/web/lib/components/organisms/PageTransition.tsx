'use client';

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lottie from "react-lottie-player";
import { AnimatePresence, motion } from "framer-motion";
import skillswapLoader from "@/lib/assets/loader-arrows-only.json";

// Typescript props Page Transitions
interface PageTransitionProps {
  children?: ReactNode;
}

// View Page transition functie
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname(); // Om te checken ofdat de route veranderd
  const [loading, setLoading] = useState(true); // Standaard true zodat de loader direct wordt getoond bij laden pagina
  const delayTransition = 1000;

  useEffect(() => {
    setLoading(true); // Zet loading op true bij route verandering

    const timeout = setTimeout(() => {
      setLoading(false); // Zet loading op false na 1 seconde, zodat de loader minimaal 1 seconde zichtbaar is
    }, delayTransition);

    return () => clearTimeout(timeout); 
  }, [pathname]); // Wanneer de pathname verandert, wordt loading weer op true gezet en start de timeout opnieuw

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div key="loader" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: "easeOut" }} className="flex items-center justify-center h-screen bg-white" >
          <Lottie animationData={skillswapLoader} play loop={false} speed={1.2} segments={[15, 60]} style={{ width: 400, height: 400 }} />
        </motion.div>
      ) : (
        <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15, ease: "easeOut" }}> 
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
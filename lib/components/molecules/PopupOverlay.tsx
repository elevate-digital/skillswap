'use client'

import React, { useEffect } from "react";
import FocusLock from "react-focus-lock";

// Props voor de PopupOverlay component
interface PopupOverlayProps {
    children?: React.ReactNode;
  }

export function PopupOverlay({ children }: PopupOverlayProps) {

  // Wanneer de component geladen wordt
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Wanneer de component wordt geladen 
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    // Zorgt ervoor dat je niet kunt tabben door de achtergrond wanneer de popup open is
    <FocusLock autoFocus={false}>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center inset-0 bg-black/70 ">
        {children}
      </div>
    </FocusLock>
  )
}
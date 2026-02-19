'use client'

import React, { useEffect } from "react";
import FocusLock from "react-focus-lock";

interface PopupOverlayProps {
    children?: React.ReactNode;
  }

export function PopupOverlay({ children }: PopupOverlayProps) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <FocusLock autoFocus={false}>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center inset-0 bg-black/50 ">
        
          {children}

      </div>
    </FocusLock>
  )
}
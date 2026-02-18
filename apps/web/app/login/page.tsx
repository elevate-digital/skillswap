"use client";

import FocusLock from "react-focus-lock";
import { PopupLogin } from "@/lib/components";
import { PopupOverlay } from "@/lib/components";

export default function Home() {
  return ( 
    <main>
        <FocusLock>
          <PopupOverlay>
                  <PopupLogin title="Welkom bij SkillSwap" description="Log in of maak een account aan om skills te delen en hulp te vragen."/>
          </PopupOverlay>
        </FocusLock>
    </main>
  )
}
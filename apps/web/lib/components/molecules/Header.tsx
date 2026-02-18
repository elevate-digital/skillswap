'use client'
import { createContext } from 'react'

import { useCallback } from "react";
import { Button } from "@/lib/components";
import { ProfilePicture } from "@/lib/components";
import { LogoFull } from "@/lib/assets/LogoFull";
import { PlusCircleIcon } from "@phosphor-icons/react";

export function Header() {

    // Functie wordt maar één keer aangemaakt en blijft hetzelfde
    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);

        // Check of het element bestaat
        if (element) {
            element.scrollIntoView({ behavior: "smooth" }); 
            element.focus();
        }
    }, []);

    return (
        <header className="flex justify-between items-center m-auto sticky top-0 bg-[var(--primary-bg-color)] py-[.5em] md:py-[1em] z-[1000]">
          <LogoFull />

          <nav className="flex gap-2 w-[100%] justify-end">
            <button>
              <ProfilePicture name="EV" />
            </button>

            <Button variant="primary" icon={PlusCircleIcon}>Skill aanbieden</Button>
            <Button variant="secondary" icon={PlusCircleIcon}>Hulp vragen</Button>
          </nav>
        </header>
    )
}
'use client';

import { useCallback } from "react";
import { LinkButton, ProfilePicture, useAuth } from "@/lib/components";
import { LogoFull } from "@/lib/assets/LogoFull";
import { PlusCircleIcon, UserIcon } from "@phosphor-icons/react";

export function Header() {

    const { user } = useAuth();

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
            {!user && (<a href="/login" className='flex items-center gap-1 self-center'><UserIcon />Inloggen</a>)}
            
            <a href="/login"><ProfilePicture name={user?.name || ""} /><span className="sr-only">Bekijk account</span></a>

            <div className='hidden md:flex gap-2'>
              <LinkButton variant="primary" href="/" icon={PlusCircleIcon}>Skill aanbieden</LinkButton>
              <LinkButton variant="secondary" href="/" icon={PlusCircleIcon}>Hulp vragen</LinkButton>
            </div>
          </nav>
        </header>
    )
}
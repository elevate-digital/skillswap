'use client'

import { createContext, useEffect, useState } from 'react'

import { useCallback } from "react";
import { Button } from "@/lib/components";
import { ProfilePicture } from "@/lib/components";
import { LogoFull } from "@/lib/assets/LogoFull";
import { PlusCircleIcon, UserIcon } from "@phosphor-icons/react";

export function Header() {

    const [user, setUser] = useState(null);

    useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
      else setUser(null);
    };

    loadUser(); // initial load
    window.addEventListener("auth-changed", loadUser);

      return () => window.removeEventListener("auth-changed", loadUser);
    }, []);

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
            {!user && (<a href="/login" className='flex items-center gap-1 self-center'><UserIcon /> Inloggen</a>)}
            
            <a href="/login"><ProfilePicture /></a>

            <div className='hidden md:flex gap-2'>
              <Button variant="primary" icon={PlusCircleIcon}>Skill aanbieden</Button>
              <Button variant="secondary" icon={PlusCircleIcon}>Hulp vragen</Button>
            </div>
          </nav>
        </header>
    )
}
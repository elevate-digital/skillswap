'use client';

import { LinkButton, ProfilePicture, useAuth } from "@/lib/components";
import { LogoFull } from "@/lib/assets/LogoFull";
import { PlusCircleIcon, UserIcon } from "@phosphor-icons/react";

export function Header() {

  // User ophalen uit de useAuth voor het checken of een gebruiker is ingelogd
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center m-auto sticky top-0 bg-[var(--primary-bg-color)] py-[.5em] md:py-[1em] z-[1000]">
      {/* Logo SkillSwap */}
      <LogoFull />

      {/* Navigatie met knoppen naar inlog + knoppen */}
      <nav className="flex gap-2 w-[100%] justify-end">
        {/* Wanneer een gebruiker niet ingelogd is toon dan 'Inloggen knop'  */}
        {!user && (<a href="/login" className='flex items-center gap-1 self-center'><UserIcon />Inloggen</a>)}

        {/* Wanneer een gebruiker ingelogd is toon dan 'Profile knop' */}
        {user && (<a href="/login"><ProfilePicture name={user?.name || ""} /><span className="sr-only">Account beheren</span></a>)}

        <div className='hidden md:flex gap-2'>
          <LinkButton variant="primary" href="/skill-aanvraag" icon={PlusCircleIcon}>Skill aanbieden</LinkButton>
          <LinkButton variant="secondary" href="/hulp-nodig" icon={PlusCircleIcon}>Hulp vragen</LinkButton>
        </div>
      </nav>
    </header>
  )
}
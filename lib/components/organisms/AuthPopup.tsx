'use client'

import { useAuth, useSkills, Switch, PopupHeader } from "@/lib/components";
import { PlusIcon } from "@phosphor-icons/react";

// Props voor de AuthPopup component
interface PopupProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  showSwitch?: boolean;
  showHeader?: boolean;
}

export function AuthPopup({ title, description, icon, children, showSwitch, showHeader }: PopupProps) {

  // Haal de authenticatie status en gebruikersgegevens op uit de context
  const { user, authStatus } = useAuth();
  const { SkillFormStatus } = useSkills();

  // Wanneer de authenticatie of skillstatus aan het laden is, laat dan de loading state zien
  if (authStatus === "loading" || SkillFormStatus === "loading") {
    return (
      <section className="px-[1.5em] py-[3em] flex flex-col gap-3 w-[90%] max-w-[500px] rounded-[var(--border-radius-md)] bg-[var(--primary-bg-color)] items-center">
        <p className="text-blue-600 animate-pulse">Bezig met laden…</p>
        <img className="animate-spin" src="/assets/loading-icon.svg" alt="Loading" width={50} height={50} />
      </section>
    );
  }

  // De header in de popup is zichtbaar als de gebruiker nog niet is ingelogd en het formulier niet verzonden is
  const shouldShowHeader = (showHeader ?? !user) && SkillFormStatus !== "success";
  // De switch is zichtbaar als de gebruiker nog niet is ingelogd, tenzij showSwitch expliciet is ingesteld op true of false
  const shouldShowSwitch = showSwitch ?? !user;

  return (
    <section className="relative px-[1.5em] py-[3em] flex flex-col gap-3 w-[90%] max-w-[500px] rounded-[var(--border-radius-md)] bg-[var(--primary-bg-color)]">
      <a href="/" className="absolute right-[1.2em] top-[1em]"><span className="sr-only">Sluit popup</span><PlusIcon width={26} height={26} className="rotate-45" /></a>
      
      {/* Zichtbaarheid van de header */}
      {shouldShowHeader && ( <PopupHeader title={title} description={description} icon={icon} />)}

      {/* Zichtbaarheid van de switch */}
      {shouldShowSwitch && <Switch param="mode" options={["login", "register"]} labels={["Inloggen", "Registreren"]} />}

      {/* Laat children zien */}
      {children}
    </section>
  );
}
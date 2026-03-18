'use client'

import { useAuth, useSkills, Switch, PopupHeader } from "@/lib/components";
import { PlusIcon } from "@phosphor-icons/react";

interface PopupProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  showSwitch?: boolean;
  showHeader?: boolean;
}

export function AuthPopup({ title, description, icon, children, showSwitch, showHeader }: PopupProps) {
  const { user, authStatus } = useAuth();
  const { SkillFormStatus } = useSkills();

  if (authStatus === "loading" || SkillFormStatus === "loading") {
    return (
      <section className="px-[1.5em] py-[3em] flex flex-col gap-3 w-[90%] max-w-[500px] rounded-[var(--border-radius-md)] bg-[var(--primary-bg-color)] items-center">
        <p className="text-blue-600 animate-pulse">Bezig met laden…</p>
        <img className="animate-spin" src="/assets/loading-icon.svg" alt="Loading" width={50} height={50} />
      </section>
    );
  }

  const shouldShowHeader = (showHeader ?? !user) && SkillFormStatus !== "success";
  const shouldShowSwitch = showSwitch ?? !user;

  return (
    <section className="relative px-[1.5em] py-[3em] flex flex-col gap-3 w-[90%] max-w-[500px] rounded-[var(--border-radius-md)] bg-[var(--primary-bg-color)]">
      <a href="/" className="absolute right-[1.2em] top-[1em]"><span className="sr-only">Sluit popup</span><PlusIcon width={26} height={26} className="rotate-45" /></a>
      {shouldShowHeader && (
        <PopupHeader
          title={title}
          description={description}
          icon={icon}
        />
      )}

      {shouldShowSwitch && <Switch param="mode" options={["login", "register"]} labels={["Inloggen", "Registreren"]} />}

      {children}
    </section>
  );
}
'use client'

import { useAuth, Switch, PopupHeader } from "@/lib/components";
import { PlusIcon } from "@phosphor-icons/react";

interface PopupProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  showSwitch?: boolean;
}

export function AuthPopup({ title, description, icon, children, showSwitch = true }: PopupProps) {
  const { user, status } = useAuth();

  if (status === "loading") {
    return (
      <section className="px-[1.5em] py-[3em] flex flex-col gap-3 w-[90%] max-w-[500px] rounded-[var(--border-radius-md)] bg-[var(--primary-bg-color)] items-center">
        <p className="text-blue-600 animate-pulse">Bezig met laden…</p>
        <img className="animate-spin" src="/assets/loading-icon.svg" alt="Loading" width={50} height={50} />
      </section>
    );
  }

  return (
    <section className="relative px-[1.5em] py-[3em] flex flex-col gap-3 w-[90%] max-w-[500px] rounded-[var(--border-radius-md)] bg-[var(--primary-bg-color)]">
      <a href="/" className="absolute right-[2em]"><span className="sr-only">Sluit popup</span><PlusIcon width={26} height={26} className="rotate-45" /></a>
      {!user && <PopupHeader title={title} description={description} icon={icon} />}
      {!user && showSwitch && <Switch />}
      {children}
    </section>
  );
}
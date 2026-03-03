'use client'

import { PopupHeader } from "@/lib/components";
import { useAuth } from "@/lib/components";
import { Switch } from "@/lib/components";

interface PopupProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function AuthPopup({ title, description, icon, children }: PopupProps) {
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
    <section className="px-[1.5em] py-[3em] flex flex-col gap-3 w-[90%] max-w-[500px] rounded-[var(--border-radius-md)] bg-[var(--primary-bg-color)]">
      {!user && <PopupHeader title={title} description={description} icon={icon} />}
      {!user && <Switch />}
      {children}
    </section>
  );
}
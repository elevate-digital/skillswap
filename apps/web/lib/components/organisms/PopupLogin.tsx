'use client'

import React, { useEffect } from "react";
import { Switch } from "@/lib/components";
import { PopupHeader } from "@/lib/components";

interface PopupProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function PopupLogin({ title, description, icon, children }: PopupProps) {
  return (
      <section className="px-[1.5em] py-[3em] flex flex-col gap-3 w-[90%] max-w-[500px] rounded-[var(--border-radius-md)] bg-[var(--primary-bg-color)]">
          <PopupHeader title={title} description={description} icon={icon} />

          <Switch />

          {children}
      </section> 
  )
}

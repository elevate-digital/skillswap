'use client'

import { PlusCircleIcon } from "@phosphor-icons/react";
import { LinkButton } from "@/lib/components";

export function MobileHeader() { 
  return (
    <div className="fixed bottom-[0] left-0 w-full bg-[var(--primary-bg-color)] flex gap-2 py-2 px-[5%] md:hidden">
      <LinkButton variant="primary" href="/skill-aanvraag" icon={PlusCircleIcon} className="flex-1">Skill aanbieden</LinkButton>
      <LinkButton variant="secondary" href="/hulp-nodig" icon={PlusCircleIcon} className="flex-1">Hulp vragen</LinkButton>
    </div>
  )
}
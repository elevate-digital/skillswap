'use client'

import { LinkButton } from "@/lib/components";
import { PlusCircleIcon } from "@phosphor-icons/react";

export function AddButton() { 
  return (
    <div className="fixed bottom-[1.5em] right-[5%] md:hidden">
      <LinkButton variant="primary" icon={PlusCircleIcon} className="w-[3.2em] h-[3.2em] !p-[1em]"><span className="sr-only">Skill of vraag aanmaken</span></LinkButton>
    </div>
 )
}
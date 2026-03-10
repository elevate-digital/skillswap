'use client'

import React from "react";
import { LinkButton } from "@/lib/components";
import { PlusCircleIcon } from "@phosphor-icons/react";

export function AddButton() { 
  return (
    <div className="fixed bottom-[1.5em] right-[5%] md:hidden">
      <LinkButton variant="primary" icon={PlusCircleIcon}><span className="sr-only">Skill of vraag aanmaken</span></LinkButton>
    </div>
 )
}
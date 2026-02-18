'use client'

import React from "react";
import { Button } from "@/lib/components";
import { PlusCircleIcon } from "@phosphor-icons/react";

export function AddButton() { 
  return (
    <div className="fixed bottom-[1.5em] right-[5%] md:hidden">
      <Button variant="secondary" icon={PlusCircleIcon}></Button>
    </div>
 )
}
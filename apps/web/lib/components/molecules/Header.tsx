"use client";

import { Button } from "@/lib/components";
import { LogoFull } from "@/lib/assets/LogoFull";
import { PlusCircleIcon } from "@phosphor-icons/react";

export function Header() {
    return (
        <header className="flex justify-between items-center m-auto sticky top-0 bg-[var(--primary-bg-color)] py-[.5em] md:py-[1em] max-w-[1600px]">
          <LogoFull />

          <nav className="flex gap-2 w-[100%] justify-end">
            <Button variant="primary" icon={PlusCircleIcon}>Skill aanbieden</Button>
            <Button variant="secondary" icon={PlusCircleIcon}>Hulp vragen</Button>
          </nav>
        </header>
    )
}
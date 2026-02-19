"use client";

import { Button } from "@/lib/components";
import { UserPlusIcon } from "@phosphor-icons/react";

interface FormProps {
  type: "login" | "register";
}

export function Form({ type }: FormProps) {
  return (
    <form className="flex flex-col gap-2">
      {type === "register" && (
        <label className="flex flex-col gap-2 text-[var(--primary-text-color)]">
          Naam
          <input
            type="text"
            placeholder="Bijv. Dirk van Huizen"
            className="bg-[var(--third-bg-color)] py-[7px] px-[10px] sm:py-[12px] sm:px-[32px] rounded-lg"
          />
        </label>
      )}

      <label className="flex flex-col gap-2 text-[var(--primary-text-color)]">
        Email
        <input
          type="text"
          placeholder="Bijv. dirkvanhuizen@gmail.com"
          className="bg-[var(--third-bg-color)] py-[7px] px-[10px] sm:py-[12px] sm:px-[32px] rounded-lg"
        />
      </label>

      <label className="flex flex-col gap-2 text-[var(--primary-text-color)]">
        Wachtwoord
        <input
          type="password"
          placeholder="Wachtwoord"
          className="bg-[var(--third-bg-color)] py-[7px] px-[10px] sm:py-[12px] sm:px-[32px] rounded-lg"
        />
      </label>

      <Button variant="secondary" icon={UserPlusIcon}>
        {type === "login" ? "Inloggen" : "Account aanmaken"}
      </Button>
    </form>
  );
}

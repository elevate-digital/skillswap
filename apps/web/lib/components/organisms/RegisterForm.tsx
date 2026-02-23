"use client";

import { Button } from "@/lib/components";
import { UserPlusIcon } from "@phosphor-icons/react";
import { NameField } from "@/lib/components";
import { EmailField } from "@/lib/components";
import { PasswordField } from "@/lib/components";

export function RegisterForm() {
  return (
    <form action="/register" className="flex flex-col gap-3">
      <NameField label="Naam" placeholder="Jan Jansen" />
      <EmailField label="Email" placeholder="Bijv. janjansen@gmail.com" />
      <PasswordField label="Wachtwoord" placeholder="Vul wachtwoord in" />

      <Button type="submit" variant="secondary" icon={UserPlusIcon}>
        Account aanmaken
      </Button>
    </form>
  );
}

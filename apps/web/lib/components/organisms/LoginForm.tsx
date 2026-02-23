"use client";

import { Button, PasswordField } from "@/lib/components";
import { NameField } from "@/lib/components";
import { EmailField } from "@/lib/components";
import { UserPlusIcon } from "@phosphor-icons/react";


export function LoginForm() {
  return (
    <form action="/login" className="flex flex-col gap-3">
    
      <NameField label="Naam" placeholder="Jan Jansen" />
      <EmailField label="Email" placeholder="Bijv. janjansen@gmail.com" />

      <Button type="submit" variant="secondary" icon={UserPlusIcon}>
        Inloggen
      </Button>
    </form>
  );
}

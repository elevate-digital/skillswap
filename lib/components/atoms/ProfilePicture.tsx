"use client";

// Importeren van functie voor het ophalen van de initialen van een gebruiker
import { GetInitials } from "@/lib/utils";

// Props voor de profile picture 
type ProfilePictureProps = {
  name: string;
};

export function ProfilePicture({ name }: ProfilePictureProps) {

  // Als er geen naam is, return null
  if (!name) return null;

  // Haal de initialen op uit de naam
  const initials = GetInitials(name);

  // Als er geen initialen zijn, return null
  if (!initials) return null;

  return (
    <p className="w-[45px] h-[45px] rounded-full bg-[var(--primary-highlight-color)] flex items-center justify-center !text-[var(--secondary-text-color)] !font-[var(--font-weight-m)]">
      {initials}
    </p>
  );
}
"use client";

// Importeren van functie voor het ophalen van de initialen van een gebruiker
import { GetInitials } from "@/lib/utils";

// Props voor de profile picture 
type ProfilePictureProps = {
  name: string;
  className?: string;
  small?: boolean;
};

export function ProfilePicture({ name, className, small = false }: ProfilePictureProps) {

  // Als er geen naam is, return null
  if (!name) return null;

  // Haal de initialen op uit de naam
  const initials = GetInitials(name);

  // Als er geen initialen zijn, return null
  if (!initials) return null;

  const sizeClass = small ? "w-[30px] h-[30px] !text-sm" : "w-[45px] h-[45px]";

  return (
    <p className={`rounded-full bg-[var(--primary-highlight-color)] flex items-center justify-center !text-[var(--secondary-text-color)] !font-[var(--font-weight-m)] flex-shrink-0 ${sizeClass}`}>
      {initials}
    </p>
  );
}
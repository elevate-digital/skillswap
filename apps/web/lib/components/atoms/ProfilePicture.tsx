"use client";
import { GetInitials } from "@/lib/utils";

type ProfilePictureProps = {
  name: string;
};

export function ProfilePicture({ name }: ProfilePictureProps) {
  if (!name) return null;

  const initials = GetInitials(name);

  if (!initials) return null;

  return (
    <p className="w-[45px] h-[45px] rounded-full bg-[var(--primary-highlight-color)] flex items-center justify-center !text-[var(--secondary-text-color)] !font-[var(--font-weight-m)]">
      {initials}
    </p>
  );
}

export default ProfilePicture;

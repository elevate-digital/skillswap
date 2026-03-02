"use client";

type ProfilePictureProps = {
  name: string;
};

export function ProfilePicture({ name }: ProfilePictureProps) {
  if (!name) return null;

  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  const initials = (first + last).toUpperCase();

  return (
    <p className="w-[45px] h-[45px] rounded-full bg-[var(--primary-highlight-color)] flex items-center justify-center !text-[var(--secondary-text-color)] !font-[var(--font-weight-m)]">
      {initials}
    </p>
  );
}

export default ProfilePicture;

import React from "react";

interface PopupHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function PopupHeader({ title, description, icon }: PopupHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="flex gap-2 items-center !text-[24px]">{icon}{title}</h2>
      <p>{description}</p>
    </div>
  );
}

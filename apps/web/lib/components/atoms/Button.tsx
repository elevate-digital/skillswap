'use client';

import React from "react";

type ButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ElementType;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const variants = {
  primary: {
    baseBg: "bg-[var(--secondary-bg-color)]",
    hoverBg: "bg-[var(--primary-text-color)]",
    text: "text-[var(--primary-text-color)]",
    hoverText: "group-hover:!text-[var(--secondary-text-color)]",
    baseBorder: "border-[var(--secondary-bg-color)]",
    hoverBorder: "border-[var(--primary-text-color)]",
  },
  secondary: {
    baseBg: "bg-[var(--primary-tbg-color)]",
    hoverBg: "bg-[var(--primary-text-color)]",
    text: "text-[var(--primary-text-color)]",
    hoverText: "group-hover:!text-[var(--secondary-text-color)]",
    baseBorder: "border-[var(--primary-text-color)]",
    hoverBorder: "border-[var(--primary-text-color)]",
  },
};

export function Button({
  children = "Klik hier",
  variant = "secondary",
  icon: Icon,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  const v = variants[variant];

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`relative inline-flex items-center gap-2 py-[7px] px-[10px] lg:py-[12px] lg:px-[32px] group rounded-[var(--border-radius-sm)] overflow-hidden transition-colors duration-300 disabled:opacity-50 justify-center cursor-pointer ${className}`}>
      {/* Base background */}
      <span className={`absolute inset-0 ${v.baseBg}`} />

      {/* Hover background reveal */}
      <span className={`absolute inset-0 ${v.hoverBg} [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-300 ease-out group-hover:[clip-path:inset(0_0%_0_0)]`} />

      {/* Base border */}
      <span className={`pointer-events-none absolute inset-0 border ${v.baseBorder} rounded-[var(--border-radius-sm)]`} />

      {/* Hover border reveal */}
      <span className={`pointer-events-none absolute inset-0 border ${v.hoverBorder} rounded-[var(--border-radius-sm)] [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-300 ease-out group-hover:[clip-path:inset(0_0%_0_0)]`} />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && (
          <Icon size={23} className={`transition-transform duration-300 transition-colors  ${v.text} ${v.hoverText} group-hover:rotate-y-180`} />
        )}

        <span className={`transition-colors duration-300 ${v.text} ${v.hoverText}`}>
          {children}
        </span>
      </span>
    </button>
  );
}

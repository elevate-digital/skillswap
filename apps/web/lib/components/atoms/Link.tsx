'use client';

import React from "react";
import { PlusCircleIcon } from "@phosphor-icons/react";

type LinkProps = {
  children?: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  icon?: React.ElementType;
  className?: string;
};

const variants = {
  primary: {
    baseBg: "bg-[var(--secondary-bg-color)]",
    hoverBg: "bg-[var(--primary-text-color)]",
    text: "text-[var(--primary-text-color)]",
    hoverText: "!text-[var(--secondary-text-color)]",
    baseBorder: "border-[var(--secondary-bg-color)]",
    hoverBorder: "border-[var(--primary-text-color)]",
  },
  secondary: {
    baseBg: "bg-[var(--primary-tbg-color)]",
    hoverBg: "bg-[var(--primary-text-color)]",
    text: "text-[var(--primary-text-color)]",
    hoverText: "!text-[var(--secondary-text-color)]",
    baseBorder: "border-[var(--primary-text-color)]",
    hoverBorder: "border-[var(--primary-text-color)]",
  },
};

export function Link({ children = "Klik hier", href = "#", variant = "secondary", icon: Icon = PlusCircleIcon, className = "",}: LinkProps) {
    
    const v = variants[variant];

     const paddingClasses = children
    ? "py-[15px] pl-[15px] pr-[8px] lg:py-[12px] lg:px-[32px]"
    : "p-[8px] lg:p-[12px]";

    return (
        <a href={href} className={`relative inline-flex items-center justify-center gap-2 ${paddingClasses} lg:py-[12px] lg:px-[32px] group rounded-[var(--border-radius-sm)] overflow-hidden ${className}`}>
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
                    <Icon size={22} className={`transition-transform duration-300 transition-colors duration-300 ${v.text} group-hover:${v.hoverText} group-hover:rotate-y-180`} />
                )}

                <span className={`transition-colors duration-300 ${v.text} group-hover:${v.hoverText}`}>
                    {children}
                </span>
            </span>
        </a>
    );
    }
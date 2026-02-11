"use client";

import React from "react";
import { PlusCircleIcon, UserPlusIcon, SignInIcon } from "@phosphor-icons/react";

const icons = { 
  plus: PlusCircleIcon, 
  add: UserPlusIcon, 
  login: SignInIcon 
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: keyof typeof icons;
};

export function Button({ children, variant = "secondary", icon }: ButtonProps) {
  const Icon = icon ? icons[icon] : null;

  const variantStyles = {
    primary: "bg-[var(--primary-bg-color)] text-[var(--primary-text-color)] border-1 border-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)]",
    secondary: "bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)]",
  };

  return (
    <button className={`flex items-center gap-3 rounded-[var(--border-radius-sm)] py-[7px] px-[10px] sm:py-[12px] sm:px-[32px] cursor-pointer transition-colors ${variantStyles[variant]}`}>
    
      {Icon && <Icon size={25} className="hidden sm:block" />}
      {children}
    </button>
  );
}

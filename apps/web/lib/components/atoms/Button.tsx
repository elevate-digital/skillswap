"use client";

import React from "react";
import { PlusCircleIcon, UserPlusIcon, SignInIcon } from "@phosphor-icons/react";

// Object waarin de iconen gekoppeld worden aan een key (voor dynamisch kiezen van een icoon)
const icons = { 
  plus: PlusCircleIcon, 
  add: UserPlusIcon, 
  login: SignInIcon 
};

// Type definitie voor de props van de button component
type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; // Voor het kiezen van de styling van de knop
  icon?: keyof typeof icons; // Voor het kiezen van de juiste icon
};

// Verschillende variaties voor primaire en secundair knop
const variantStyles = {
  primary: "bg-[var(--primary-bg-color)] text-[var(--primary-text-color)] border-1 border-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)]",
  secondary: "bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)]",
};

// Button component
export function Button({ children, variant = "secondary", icon }: ButtonProps) {

  // Variabele die het juiste icon component selecteert. Als er geen icon prop is wordt er geen icon gerenderd
  const Icon = icon ? icons[icon] : null;

  return (
    <button className={`flex items-center gap-3 rounded-[var(--border-radius-sm)] py-[7px] px-[10px] sm:py-[12px] sm:px-[32px] cursor-pointer transition-colors ${variantStyles[variant]}`}>
    
      {Icon && <Icon size={25} className="hidden sm:block" />}
      {children}
    </button>
  );
}

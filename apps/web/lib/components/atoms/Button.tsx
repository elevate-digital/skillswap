import React from "react";

// Type definitie voor de props van de button component
type ButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "secondary"; // Voor het kiezen van de styling van de knop
  icon?: React.ElementType; // Voor het kiezen van de juiste icon
};

// Verschillende variaties voor primaire en secundair knop
const variantStyles = {
  primary: "bg-[var(--primary-bg-color)] text-[var(--primary-text-color)] border-1 border-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)]",
  secondary: "bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)]",
};

// Button component
export function Button({ children, variant = "secondary", icon: Icon, }: ButtonProps) {

  return (
    <button className={`flex items-center justify-center gap-3 rounded-[var(--border-radius-sm)] cursor-pointer transition-colors ${variantStyles[variant]} ${!children && Icon ? "p-[12px] sm:p-[12px]" : "py-[7px] px-[10px] sm:py-[12px] sm:px-[32px]"}`}>
      {Icon && (<Icon className={!children ? "block text-[22px] md:text-[20px]" : "hidden sm:block text-[24px] md:text-[22px]"} />)}
      {children}
    </button>
  );
}

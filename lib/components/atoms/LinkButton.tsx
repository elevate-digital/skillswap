'use client';

// Props voor de link 
type LinkProps = {
  children?: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  icon?: React.ElementType;
  className?: string;
};

// Stijlvarianten (voor primary en secondary)
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

export function LinkButton({ children = "Klik hier", href = "#", variant = "secondary", icon: Icon, className = "",}: LinkProps) {
  
  // Variabele voor de varianten
  const v = variants[variant];

  // Padding voor knoppen met of zonder icon
  const paddingClasses = children ? "lg:py-[12px] lg:px-[32px]" : "p-[8px] lg:p-[12px]";

  return (

    <a href={href} className={`relative inline-flex items-center justify-center gap-2 ${paddingClasses} py-[12px] px-[16px] md:py-[12px] md:px-[32px] group rounded-[var(--border-radius-sm)] overflow-hidden ${className}`}>
      {/* Basis achtergrond */}
      <span className={`absolute inset-0 ${v.baseBg}`} />

      {/* Hover vullen van achtergrond */}
      <span className={`absolute inset-0 ${v.hoverBg} [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-300 ease-out group-hover:[clip-path:inset(0_0%_0_0)]`} />

      {/* Basis border */}
      <span className={`pointer-events-none absolute inset-0 border ${v.baseBorder} rounded-[var(--border-radius-sm)]`} />

      {/* Hover vullen van borderkleur */}
      <span className={`pointer-events-none absolute inset-0 border ${v.hoverBorder} rounded-[var(--border-radius-sm)] [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-300 ease-out group-hover:[clip-path:inset(0_0%_0_0)]`} />

      {/* Text met eventueel icon */}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && (
            <Icon size={22} className={`transition-transform duration-300 transition-colors duration-300 ${v.text} ${v.hoverText} group-hover:rotate-y-180`} />
        )}

        <span className={`transition-colors duration-300 ${v.text} ${v.hoverText}`}>
            {children}
        </span>
      </span>
    </a>

  );
}
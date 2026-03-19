"use client";

import { StarIcon, IconProps } from "@phosphor-icons/react";

// Props voor icon met achtergrond
type IconBgProps = {
  icon?: React.ComponentType<IconProps>;
  bg?: string;
  size?: number;
  padding?: number;
  color?: string;
};

export function IconBg({ icon: Icon = StarIcon, bg = "var(--third-highlight-color)", padding = 10, color = "var(--primary-text-color)",}: IconBgProps ) {
  return (
    // Icon wordt geïmporteerd uit de phosphor icons library
    <Icon weight="regular" width={45} height={45} className="rounded-[var(--border-radius-md)]" style={{ backgroundColor: bg, padding: padding, color: color, }} />
  );
}

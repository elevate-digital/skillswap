"use client";

import { IconBg } from "@/lib/components";

// Props voor result info
type ResultProps = {
  icon?: any;
  count: number;
  label: string;
  bg?: string;
};

export function Result({ icon, count, label, bg }: ResultProps) {
  return (
    <div className="flex-1 items-center min-w-[260px] xl:min-w-0 flex gap-3 bg-[var(--third-bg-color)] p-[15px] md:p-[21px] border border-[#E5E7E2] rounded-[var(--border-radius-md)]">
      <IconBg icon={icon} bg={bg} />

      <div>
        <p className="!text-[22px] !font-medium">{count}</p>
        <p>{label}</p>
      </div>
    </div>
  );
}   

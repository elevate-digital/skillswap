"use client";

import { Result, useSkills } from "@/lib/components";
import { StarIcon, QuestionIcon, UsersIcon, ChartLineUpIcon } from "@phosphor-icons/react";

export function ResultPanel() {
  const { offerCount, requestCount, openCount, completedCount } = useSkills();

  return (
    <div className=" flex gap-4 w-full overflow-x-auto xl:grid xl:grid-cols-4 xl:gap-4 xl:overflow-visible">
      <Result icon={StarIcon} bg="var(--third-highlight-color)" count={offerCount} label="Skills" />
      <Result icon={QuestionIcon} bg="#F3EFFE" count={requestCount} label="Hulpvragen" />
      <Result icon={UsersIcon} bg="#E7F8F2" count={openCount} label="Open skills" />
      <Result icon={ChartLineUpIcon} bg="#FEF5E7" count={completedCount} label="Afgeronde skills" />
    </div>
  );
}

"use client";

import { Result, useSkills } from "@/lib/components";
import { StarIcon, QuestionIcon, UsersIcon, ChartLineUpIcon } from "@phosphor-icons/react";

export function ResultPanel() {
  // Haal het aantal offers, requests, open en completed skills op uit de useSkills hook
  const { offerCount, requestCount, offerOpenCount, offerCompletedCount, requestOpenCount, requestCompletedCount } = useSkills();

  const openCount = offerOpenCount + requestOpenCount;
  const completedCount = offerCompletedCount + requestCompletedCount;

  return (
    <div className=" flex gap-4 w-full overflow-x-auto xl:grid xl:grid-cols-4 xl:gap-4 xl:overflow-visible">
      <Result icon={StarIcon} bg="#EBF2E1" count={offerCount} label="Skills" />
      <Result icon={QuestionIcon} bg="#F3EFFE" count={requestCount} label="Hulpvragen" />
      <Result icon={UsersIcon} bg="var(--third-highlight-color)" count={openCount} label="Open skills" />
      <Result icon={ChartLineUpIcon} bg="#FEF5E7" count={completedCount} label="Afgeronde skills" />
    </div>
  );
}

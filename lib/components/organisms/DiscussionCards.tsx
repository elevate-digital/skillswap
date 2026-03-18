"use client";

import { useSearchParams } from "next/navigation";
import { DiscussionCard, useSkills } from "@/lib/components";

export function DiscussionCards() {
const params = useSearchParams();
  const type = params.get("type"); // OFFER of REQUEST
  const { skills } = useSkills();

  const filtered = type
    ? skills.filter((s) => s.type === type)
    : skills;

  return (
    <ul className="list-none flex flex-col gap-4">
      {filtered.map((skill) => (
        <li key={skill.id}>
          <DiscussionCard item={skill} />
        </li>
      ))}
    </ul>
  );
}

"use client";

import { DiscussionCard, useSkills } from "@/lib/components";

export function DiscussionCards() {
  const { skills } = useSkills();

  return (
    <ul className="list-none flex flex-col gap-4">
      {skills.map((skill) => (
        <li key={skill.id}>
          <DiscussionCard item={skill} />
        </li>
      ))}
    </ul>
  );
}

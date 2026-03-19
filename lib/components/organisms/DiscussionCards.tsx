"use client";

import { useSearchParams } from "next/navigation";
import { DiscussionCard, useSkills } from "@/lib/components";

export function DiscussionCards() {
  // Bepaal op basis van de search params of we in offer of request modus zitten
  const params = useSearchParams();
  const type = params.get("type");

  // Haal alle skills op uit de useSkills hook
  const { skills } = useSkills();

  // Filter de skills op basis van het type (offer of request) als er een type is opgegeven in de search params
  const filtered = type ? skills.filter((s) => s.type === type) : skills;

  return (
    <ul className="list-none flex flex-col gap-4">
      {/* Loop met alle skills */}
      {filtered.map((skill) => (
        <li key={skill.id}>
          <DiscussionCard item={skill} />
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { DiscussionCard, useSkills } from "@/lib/components";
import { motion } from "framer-motion";

export function DiscussionCards() {
  // Bepaal op basis van de search params of we in offer of request modus zitten
  const params = useSearchParams();
  const type = params.get("type");

  // Haal alle skills op uit de useSkills hook
  const { skills } = useSkills();

  // Filter de skills op basis van het type (offer of request) als er een type is opgegeven in de search params
  const filtered = type ? skills.filter((s) => s.type === type) : skills;

  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {  
        staggerChildren: 0.2,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
      },
    },
  }

  return (
    <motion.ul key={`${type}-${filtered.length}`} className="list-none flex flex-col gap-4" variants={parentVariants} initial="hidden" animate="show">
      {filtered.map((skill) => (
      <motion.li key={skill.id} variants={childVariants}>
        <DiscussionCard item={skill} />
      </motion.li>
    ))}
</motion.ul>
  );
}

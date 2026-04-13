'use client';

import { useSearchParams } from "next/navigation";
import { DiscussionCard, useSkills } from "@/lib/components";
import { useReducedMotion, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DiscussionCardsProps {
  searchTerm: string;
  status: string;
}

export function DiscussionCards({ searchTerm, status }: DiscussionCardsProps) {
  const params = useSearchParams();
  const type = params.get("type");
  const { skills } = useSkills();

  const filtered = skills.filter(skill => {
    // Filter op type
    if (type && skill.type !== type) return false;

    // Filter op status
    if (status === "open" && skill.completed) return false;
    if (status === "done" && !skill.completed) return false;

    // Variabelen voor het verzamelen van het zoeken op de juiste informatie
    const term = searchTerm?.toLowerCase();
    const inTitle = skill.title.toLowerCase().includes(term);
    const inDescription = skill.description?.toLowerCase().includes(term);
    const inTags = skill.tags?.some(tag => tag.title.toLowerCase().includes(term));
    const inAuthor = skill.user?.name?.toLowerCase().includes(term);

    return inTitle || inDescription || inTags || inAuthor;
  });

  const [show, setShow] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), shouldReduceMotion ? 0 : 1300);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  if (!show) return null;

  if (filtered.length === 0) {
    return (
      <motion.div className="flex text-center text-gray-500 p-4 h-[54vh] items-center justify-center">
        <p>Geen skills gevonden.</p>
      </motion.div>
    );
  }

  return (
    <motion.ul
      key={`${status}-${searchTerm}-${type}`}
      className="list-none flex flex-col gap-4"
      transition={{ delay: shouldReduceMotion ? 0 : 0.25 }}
      animate={show ? "show" : "hidden"}
    >
      {filtered.map((skill, index) => (
        <motion.li
          key={skill.id}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: index * 0.1,
          }}
        >
          <DiscussionCard item={skill} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

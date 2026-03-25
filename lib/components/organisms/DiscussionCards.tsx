"use client";

import { useSearchParams } from "next/navigation";
import { DiscussionCard, useSkills } from "@/lib/components";
import { useReducedMotion, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function DiscussionCards() {
  // Checked URL-parameter om te filteren op type (offer of request)
  const params = useSearchParams();
  const type = params.get("type");

  // Haal skills op uit de useSkills hook en filter ze op basis van het type
  const { skills } = useSkills();
  const filtered = type ? skills.filter((s) => s.type === type) : skills;

  // Voor zichtbaar maken van de cards na een korte delay (voor animatie)
  const [show, setShow] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Toon de cards na een korte delay, of meteen als reduced motion is ingesteld
  useEffect(() => { 
    const timer = setTimeout(() => { 
      setShow(true);
    }, shouldReduceMotion ? 0 : 1300); 
      return () => clearTimeout(timer); 
  }, [shouldReduceMotion]);

  // Als show false is, render dan niets (voor animatie)
  if (!show) return null;

  // Fallback als er geen skills zijn
  if (filtered.length === 0) {
    return (
      <motion.div className="text-center text-gray-500 p-4" transition={{ delay: 3 }}>
        Geen skills gevonden.
      </motion.div>
    );
  }

  return (
    <motion.ul className="list-none flex flex-col gap-4" 
      transition={{ delay: shouldReduceMotion ? 0 : 0.25 }} 
      animate={show ? "show" : "hidden"}>

      {filtered.map((skill, index) => (
        <motion.li
          key={skill.id}
          initial={{ opacity: shouldReduceMotion ? 0 : 0, y: shouldReduceMotion ? 0 : 50 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: shouldReduceMotion ? 0.5 : 0.5,
            ease: "easeOut",
            delay: shouldReduceMotion ? index * 0.1 : index * 0.1, 
          }}>
            <DiscussionCard item={skill} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
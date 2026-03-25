"use client";

import { useSearchParams } from "next/navigation";
import { DiscussionCard, useSkills } from "@/lib/components";
import { useReducedMotion, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function DiscussionCards() {
  const params = useSearchParams();
  const type = params.get("type");

  const { skills } = useSkills();
  const filtered = type ? skills.filter((s) => s.type === type) : skills;

  const [show, setShow] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => { 
    const timer = setTimeout(() => { 
      setShow(true);
    }, shouldReduceMotion ? 0 : 1500); 
      return () => clearTimeout(timer); 
  }, [shouldReduceMotion]);

  if (!show) return null;

  return (
    <motion.ul className="list-none flex flex-col gap-4" 
      transition={{ delay: shouldReduceMotion ? 0 : 0.25 }} 
      animate={show ? "show" : "hidden"}>

      {filtered.map((skill, index) => (
        <motion.li
          key={skill.id}
          initial={{ opacity: shouldReduceMotion ? 0 : 0, y: shouldReduceMotion ? 0 : 50 }} // fade, geen y-beweging
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: shouldReduceMotion ? 0.5 : 0.5, // subtiele fade voor reduced motion
            ease: "easeOut",
            delay: shouldReduceMotion ? index * 0.1 : index * 0.1, // houd kleine stagger
          }}>
            <DiscussionCard item={skill} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
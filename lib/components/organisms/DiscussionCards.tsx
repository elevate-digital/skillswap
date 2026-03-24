"use client";

import { useSearchParams } from "next/navigation";
import { DiscussionCard, useSkills } from "@/lib/components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function DiscussionCards() {
  const params = useSearchParams();
  const type = params.get("type");

  const { skills } = useSkills();
  const filtered = type ? skills.filter((s) => s.type === type) : skills;

  const [show, setShow] = useState(false);

  useEffect(() => { 
    const timer = setTimeout(() => { 
      setShow(true); }, 1500); 
      
      return () => clearTimeout(timer); 
    }, []);

  if (!show) return null;

  return (
    <motion.ul className="list-none flex flex-col gap-4" transition={{ delay: 250 }} animate={show ? "show" : "hidden"}>
      {filtered.map((skill, index) => (
        <motion.li key={skill.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1, }}>
          <DiscussionCard item={skill} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
'use client';
import { createContext, useContext, useState, useEffect } from "react";
import type { SkillItem } from "@/lib/components";

import axios from "axios";

type SkillsContextType = {
  skills: SkillItem[];
  addSkill: (skill: SkillItem) => void;
  fetchSkills: () => void;

  // Skill Form state
  SkillFormStatus: "idle" | "loading" | "success" | "error";
  SkillFormError: string | null;
  setSkillFormStatus: (status: any) => void;
  setSkillFormError: (error: string | null) => void;
};

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export function SkillsProvider({ children }: { children: React.ReactNode }) {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [SkillFormStatus, setSkillFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [SkillFormError, setSkillFormError] = useState<string | null>(null);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("/api/skill");
      setSkills(res.data);
    } catch (err) {
      console.error("Kon skills niet ophalen", err);
    }
  };

  const addSkill = (skill: SkillItem) => {
    setSkills(prev => [skill, ...prev]);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <SkillsContext.Provider value={{ skills, addSkill, fetchSkills, SkillFormStatus, SkillFormError, setSkillFormStatus, setSkillFormError }}>
      {children}
    </SkillsContext.Provider>
  );
}

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) throw new Error("useSkills moet binnen SkillsProvider");
  return context;
};
'use client';
import { createContext, useContext, useState, useEffect } from "react";
import type { SkillType } from "@/lib/components";
import { useAuth } from "@/lib/components";

import axios from "axios";

type SkillsContextType = {
  skills: SkillType[];
  addSkill: (skill: SkillType) => void;
  fetchSkills: () => void;
  toggleSkillStatus: (id: number, completed: boolean) => void;

  // Skill Form state
  SkillFormStatus: "idle" | "loading" | "success" | "error";
  SkillFormError: string | null;
  setSkillFormStatus: (status: any) => void;
  setSkillFormError: (error: string | null) => void;
};

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export function SkillsProvider({ children }: { children: React.ReactNode }) {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [SkillFormStatus, setSkillFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [SkillFormError, setSkillFormError] = useState<string | null>(null);

  const { token } = useAuth();

  const fetchSkills = async () => {
    try {
      const res = await axios.get("/api/skill");
      setSkills(res.data);
    } catch (err) {
      console.error("Kon skills niet ophalen", err);
    }
  };

  const addSkill = (skill: SkillType) => {
    setSkills(prev => [skill, ...prev]);
  };

  const toggleSkillStatus = async (id: number, completed: boolean) => {
    try {
      setSkillFormStatus("loading");

      await axios.put(
        `/api/skill/${id}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ← verplicht voor protected routes
          },
        }
      );

      // Update lokale state
      setSkills(prev =>
        prev.map(skill =>
          skill.id === id ? { ...skill, completed: !completed } : skill
        )
      );

      setSkillFormStatus("success");
    } catch (err) {
      console.error("Kon status niet updaten", err);
      setSkillFormStatus("error");
      setSkillFormError("Kon status niet updaten");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <SkillsContext.Provider value={{ skills, addSkill, toggleSkillStatus, fetchSkills, SkillFormStatus, SkillFormError, setSkillFormStatus, setSkillFormError }}>
      {children}
    </SkillsContext.Provider>
  );
}

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) throw new Error("useSkills moet binnen SkillsProvider");
  return context;
};
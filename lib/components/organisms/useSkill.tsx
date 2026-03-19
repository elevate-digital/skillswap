'use client';
import { createContext, useContext, useState, useEffect } from "react";
import type { SkillType } from "@/lib/components";
import { useAuth } from "@/lib/components";

import axios from "axios";

type SkillsContextType = {
  // Skills data en functies
  skills: SkillType[];
  addSkill: (skill: SkillType) => void;
  fetchSkills: () => void;
  toggleSkillStatus: (id: number, completed: boolean) => void;

  // Status en error voor skill form
  SkillFormStatus: "idle" | "loading" | "success" | "error";
  SkillFormError: string | null;
  setSkillFormStatus: (status: any) => void;
  setSkillFormError: (error: string | null) => void;

  // Resulten voor dashboard
  offerCount: number;
  requestCount: number;
  openCount: number;
  completedCount: number;
};

//  Context aanmaken met default waarde undefined
const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export function SkillsProvider({ children }: { children: React.ReactNode }) {
  // State voor skills, form status en error
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [SkillFormStatus, setSkillFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [SkillFormError, setSkillFormError] = useState<string | null>(null);

  // Resulten voor dashboard berekenen op basis van skills state
  const offerCount = skills.filter(s => s.type === "OFFER").length;
  const requestCount = skills.filter(s => s.type === "REQUEST").length;
  const openCount = skills.filter(s => !s.completed).length;
  const completedCount = skills.filter(s => s.completed).length;

  // Token ophalen voor authenticatie
  const { token } = useAuth();

  // Functie om skills op te halen uit API
  const fetchSkills = async () => {
    try {
      const res = await axios.get("/api/skill");
      setSkills(res.data);
    } catch (err) {
      console.error("Kon skills niet ophalen", err);
    }
  };

  // Functie om nieuwe skill toe te voegen aan de state (zonder refresh van de pagina)
  const addSkill = (skill: SkillType) => {
    setSkills(prev => [skill, ...prev]);
  };

  // Functie om de status van een skill te toggelen (compleet/niet compleet)
  const toggleSkillStatus = async (id: number, completed: boolean) => {
    try {
      setSkillFormStatus("loading");

      await axios.put(
        `/api/skill/${id}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update de status van de skill in de state zonder de hele lijst opnieuw op te halen
      setSkills(prev =>
        prev.map(skill =>
          skill.id === id ? { ...skill, completed: !completed } : skill
        )
      );

      // Status update succesvol
      setSkillFormStatus("success");

      // Voor het opvangen van een fout
    } catch (err) {
      console.error("Kon status niet updaten", err);
      setSkillFormStatus("error");
      setSkillFormError("Kon status niet updaten");
    }
  };

  // Skills ophalen zodra de provider component geladen wordt
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <SkillsContext.Provider value={{ 
        skills, 
        addSkill, 
        toggleSkillStatus, 
        fetchSkills, 
        SkillFormStatus, 
        SkillFormError, 
        setSkillFormStatus, 
        setSkillFormError, 
        offerCount,
        requestCount,
        openCount,
        completedCount, }}>
      {children}
    </SkillsContext.Provider>
  );
}

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) throw new Error("useSkills moet binnen SkillsProvider");
  return context;
};
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Input, Button } from "@/lib/components";

type Tag = {
  id: number;
  title: string;
};

type TagsFieldProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export function TagsField({ value, onChange, ...props }: TagsFieldProps) {
  const [input, setInput] = useState("");
  const [popularTags, setPopularTags] = useState<Tag[]>([]);

  useEffect(() => { 
    async function fetchTags() { 
      try { 
        const response = await axios.get<Tag[]>("/api/tag"); 
        console.log("API response:", response.data); 
        setPopularTags(response.data); 
      } catch (error) { 
        console.error("Fout bij ophalen tags:", error); 
      } 
    } 
    
    fetchTags(); 
  }, []);

  // Functie om te controleren of een tag kan worden toegevoegd
  const canAdd = (tag: string) =>
    tag && !value.includes(tag) && value.length < 5;

  // Functie om een tag toe te voegen
  const addTag = () => {
    const trimmed = input.trim();
    if (!canAdd(trimmed)) return;

    onChange([...value, trimmed]);
    setInput("");
  };

  // Functie om een tag te verwijderen
  const removeTag = (tag: string) => {
    onChange(value.filter(t => t !== tag));
  };

  // Functie om een populaire tag toe te voegen
  const addTagFromPopular = (tag: string) => {
    if (canAdd(tag)) onChange([...value, tag]);
  };

  return (
    <div className="flex flex-col gap-1">
      <label>Tags (max 5)</label>

      <div className="flex gap-2">
        <Input {...props} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") { 
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Voeg een tag toe..."
        />

        <Button type="button" variant="primary" onClick={addTag}>Toevoegen</Button>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {value.map(tag => (
          <button key={tag} type="button" onClick={() => removeTag(tag)} className="text-[16px] text-[var(--primary-text-color)] bg-[var(--secondary-bg-color)] px-2 border border-[var(--secondary-bg-color)] rounded-full cursor-pointer hover:bg-[#D9D9D9] hover:border-[#D9D9D9] transition">
            {tag} ×
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1 pt-[.7em]">
        <span>Populaire tags:</span>

        <div className="flex flex-wrap gap-2 mt-2">
          {popularTags.map(tag => (
            
            <button key={tag.id} type="button" onClick={() => addTagFromPopular(tag.title)} className="text-[16px] text-[var(--primary-text-color)] px-2 border border-[#D9D9D9] rounded-full cursor-pointer hover:bg-[#D9D9D9] transition">
              {tag.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

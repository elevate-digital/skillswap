"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Input, Button } from "@/lib/components";
import { TagType } from "@/lib/components";

// Props voor de TagsField component
type TagsFieldProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export function TagsField({ value, onChange, ...props }: TagsFieldProps) {

  // State voor input waarde en populaire tags
  const [input, setInput] = useState("");
  const [popularTags, setPopularTags] = useState<TagType[]>([]);

  // Populaire tags ophalen
  useEffect(() => {

    // Functie om tags op te halen uit API
    async function fetchTags() {
      try {

        // Tags ophalen uit API
        const response = await axios.get<TagType[]>("/api/tag");

        // Tags sorteren op aantal skills en de top 8 nemen
        const sorted = response.data
          .sort((a, b) => b._count.skills - a._count.skills)
          .slice(0, 8);

        // Populaire tags in state zetten
        setPopularTags(sorted);

      // Zo niet? Error melding laten zien
      } catch (error) {
        console.error("Fout bij ophalen tags:", error);
      }
    }

    // Tags ophalen zodra de pagina geladen is
    fetchTags();
  }, []);

  // Check of een tag toegevoegd mag worden
  const canAdd = (tag: string) =>
    tag && !value.includes(tag) && value.length < 5; // Max 5 tags, geen lege of dubbele tags

  // Tag toevoegen via input
  const addTag = () => {
    const trimmed = input.trim(); // Spaties aan het begin en einde verwijderen
    if (!canAdd(trimmed)) return; // Checken of de tag toegevoegd mag worden

    onChange([...value, trimmed]); // Nieuwe tag toevoegen aan de lijst
    setInput(""); // Input veld leegmaken
  };

  // Tag verwijderen
  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag)); // Alle tags behalve de verwijderde tag in de lijst houden
  };

  // Tag toevoegen via populaire tags
  const addTagFromPopular = (tag: string) => {
    if (!canAdd(tag)) return; // Checken of de tag toegevoegd mag worden
    onChange([...value, tag]); // Nieuwe tag toevoegen aan de lijst
  };

  return (
    <div className="flex flex-col gap-1">
      <label>Tags (max 5)</label>

      <div className="flex gap-2">
        <Input {...props} value={input} className="flex-1 min-w-0" onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {
            // Wanneer op Enter gedrukt wordt, tag toevoegen
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Voeg een tag toe..."
        />

        <Button type="button" variant="primary" onClick={addTag}>Toevoegen</Button>
      </div>

      {/* Geselecteerde tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {value.map((tag) => (
          <button key={tag} type="button" onClick={() => removeTag(tag)} className="text-[16px] text-[var(--primary-text-color)] bg-[var(--secondary-bg-color)] px-2 border border-[var(--secondary-bg-color)] rounded-full cursor-pointer hover:bg-[#D9D9D9] hover:border-[#D9D9D9] transition">
            {tag} ×
          </button>
        ))}
      </div>

      {/* Alle populaire tags */}
      <div className="flex flex-col">
        <p>Populaire tags:</p>
        <ul className="flex flex-wrap gap-2 mt-2">
          {/* Map met alle tags die getoond worden */}
          {popularTags.map((tag) => {
            const isSelected = value.includes(tag.title);
            return (
              <li key={tag.id}>
                <button
                  type="button"
                  onClick={() => addTagFromPopular(tag.title)}
                  className={`text-[16px] px-2 border rounded-full cursor-pointer transition ${
                    isSelected ? "bg-[#D9D9D9] border-[#D9D9D9]" : "text-[var(--primary-text-color)] border-[#D9D9D9] hover:bg-[#D9D9D9]" }`}>
                  {tag.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
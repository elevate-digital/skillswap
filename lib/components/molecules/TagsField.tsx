"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Input, Button } from "@/lib/components";
import { useAuth } from "@/lib/components";

// Props voor een tag object
type Tag = {
  id: number;
  title: string;
  _count: {
    skills: number;
  };
};

// Props voor de TagsField component
type TagsFieldProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export function TagsField({ value, onChange, ...props }: TagsFieldProps) {
  const [input, setInput] = useState("");
  const [popularTags, setPopularTags] = useState<Tag[]>([]);

  const { token } = useAuth();

  // Populaire tags ophalen
  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await axios.get<Tag[]>("/api/tag");

        const sorted = response.data
          .sort((a, b) => b._count.skills - a._count.skills)
          .slice(0, 9);

        setPopularTags(sorted);
      } catch (error) {
        console.error("Fout bij ophalen tags:", error);
      }
    }

    fetchTags();
  }, []);

  // Check of een tag toegevoegd mag worden
  const canAdd = (tag: string) =>
    tag && !value.includes(tag) && value.length < 5;

  // Tag aanmaken of ophalen
  const createTag = async (tag: string) => {
    try {
      const res = await axios.post(
        "/api/tag/find-or-create",
        { title: tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onChange([...value, res.data.title]);
    } catch (error) {
      console.error("Fout bij toevoegen tag:", error);
    }
  };

  // Tag toevoegen via input
  const addTag = async () => {
    const trimmed = input.trim();
    if (!canAdd(trimmed)) return;

    await createTag(trimmed);
    setInput("");
  };

  // Tag verwijderen
  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  // Tag toevoegen via populaire tags
  const addTagFromPopular = async (tag: string) => {
    if (!canAdd(tag)) return;
    await createTag(tag);
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

      {/* Geselecteerde tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {value.map((tag) => (
          <button key={tag} type="button" onClick={() => removeTag(tag)} className="text-[16px] text-[var(--primary-text-color)] bg-[var(--secondary-bg-color)] px-2 border border-[var(--secondary-bg-color)] rounded-full cursor-pointer hover:bg-[#D9D9D9] hover:border-[#D9D9D9] transition">
            {tag} ×
          </button>
        ))}
      </div>

      {/* Populaire tags */}
      <div className="flex flex-col">
        <p>Populaire tags:</p>
        <ul className="flex flex-wrap gap-2 mt-2">
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
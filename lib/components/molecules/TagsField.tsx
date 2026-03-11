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
  const [input, setInput] = useState(""); // Huidige waarde van het inputveld
  const [popularTags, setPopularTags] = useState<Tag[]>([]); // Populaire tags opgehaald van de server
  const [loading, setLoading] = useState(false); // Status voor het toevoegen van een tag

  const { token } = useAuth(); // token ophalen uit jouw auth systeem

  // Ophalen van populaire tags bij het laden van de component
  useEffect(() => {
  async function fetchTags() {
    try {
      const response = await axios.get<Tag[]>("/api/tag");

      // Sorteer op aantal skills (desc) en pak de top 6
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


  // Controleert of een tag kan worden toegevoegd (niet leeg, niet al toegevoegd, en max 5 tags)
  const canAdd = (tag: string) =>
    tag && !value.includes(tag) && value.length < 5;

  // Voegt een nieuwe tag
  const addTag = async () => {
    const trimmed = input.trim();
    if (!canAdd(trimmed)) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "/api/tag/find-or-create",
        { title: trimmed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onChange([...value, res.data.title]);
      setInput("");
    } catch (error) {
      console.error("Fout bij toevoegen tag:", error);
    } finally {
      setLoading(false);
    }
  };

  // Verwijdert een tag uit de lijst
  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  // Voegt een tag toe vanuit de populaire tags lijst
  const addTagFromPopular = async (tag: string) => {
    if (!canAdd(tag)) return;

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
      console.error("Fout bij toevoegen populaire tag:", error);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label>Tags (max 5)</label>

      <div className="flex gap-2">
        <Input {...props} value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Voeg een tag toe..."/>

        <Button type="button" variant="primary" onClick={addTag} disabled={loading}>
          {loading ? "..." : "Toevoegen"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {value.map((tag) => (
          <button key={tag} type="button" onClick={() => removeTag(tag)} className="text-[16px] text-[var(--primary-text-color)] bg-[var(--secondary-bg-color)] px-2 border border-[var(--secondary-bg-color)] rounded-full cursor-pointer hover:bg-[#D9D9D9] hover:border-[#D9D9D9] transition">
            {tag} ×
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {popularTags.map((tag) => {
          const isSelected = value.includes(tag.title);

          return (
            <button key={tag.id} type="button" onClick={() => addTagFromPopular(tag.title)} className={`text-[16px] px-2 border rounded-full cursor-pointer transition 
                ${ isSelected
                    ? "bg-[#D9D9D9] border-[#D9D9D9]"
                    : "text-[var(--primary-text-color)] border-[#D9D9D9] hover:bg-[#D9D9D9]"
                }`}
            >
              {tag.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

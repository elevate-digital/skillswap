"use client";

import { useState } from "react";
import { Input, Button } from "@/lib/components";

type TagsFieldProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export function TagsField({ value, onChange, ...props }: TagsFieldProps) {
  const [input, setInput] = useState("");

  const popularTags = ["React", "JavaScript", "CSS", "Node.js", "Python", "SQL", "Git", "Design"];

  const addTag = () => {
    const tag = input.trim();

    if (!tag) return;
    if (value.includes(tag)) return;
    if (value.length >= 5) return;

    onChange([...value, tag]);
    setInput("");
  };

  const addTagFromPopular = (tag: string) => {
    if (value.includes(tag)) return;
    if (value.length >= 5) return;

    onChange([...value, tag]);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t: string) => t !== tag));
  };

  return (
    <div className="flex flex-col gap-1">
      <label>Tags (max 5)</label>

      <div className="flex gap-2">
        <Input {...props} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Voeg een tag toe..." />

        <Button variant="primary" onClick={addTag}>Toevoegen</Button>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {value.map(tag => (
          <button key={tag} type="button"  onClick={() => removeTag(tag)} className="text-[16px] text-[var(--primary-text-color)] bg-[var(--secondary-bg-color)] px-2 border border-[var(--secondary-bg-color)] rounded-full cursor-pointer hover:bg-[#D9D9D9] hover:border-[#D9D9D9] transition">
            {tag} ×
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 pt-[.7em]">
        <span>Populaire tags:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {popularTags.map(tag => (
            <button key={tag} type="button" onClick={() => addTagFromPopular(tag)} className="text-[16px] text-[var(--primary-text-color)] px-2 border border-[#D9D9D9] rounded-full cursor-pointer hover:bg-[#D9D9D9] transition">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

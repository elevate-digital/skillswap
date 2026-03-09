'use client';

import { useState } from "react";
import { useAuth, TextField, TagsField } from "@/lib/components";

export function SkillForm() {
    const [tags, setTags] = useState<string[]>([]);

    return (
        <form className="flex flex-col gap-3 login-form">
            <TextField name="title" label="Titel" placeholder="Bijv. React Hooks uitleg" />
            <TextField name="description" label="Beschrijving" placeholder="Beschrijf wat je kunt aanbieden.." />
            <TagsField value={tags} onChange={setTags} />
        </form>
    )
}
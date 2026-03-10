'use client';

import axios from "axios"; 
import { useState } from "react";
import { useAuth, TextField, TagsField, Button, LinkButton } from "@/lib/components";

export function SkillForm() {
    const [tags, setTags] = useState<string[]>([]);
    const [form, setForm] = useState({ title: "", description: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);
    const { user, status: authStatus } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setError(null);

        try {
            // POST naar je skill API
            const response = await axios.post("/api/skill", { ...form, tags });

            setStatus("success");
            setForm({ title: "", description: "" });
            setTags([]);
        } catch (err) {
            if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message ?? err.message);
            } else {
            setError("Onbekende fout");
            }
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 login-form">
            <TextField name="title" label="Titel" value={form.title} onChange={handleChange} placeholder="Bijv. React Hooks uitleg" />
            <TextField name="description" label="Beschrijving" value={form.description} onChange={handleChange} placeholder="Beschrijf wat je kunt aanbieden.." />
            <TagsField value={tags} onChange={setTags} />

            {error && <p className="!text-red-600">{error}</p>}
            {status === "success" && <p className="!text-green-600">Skill succesvol toegevoegd!</p>}

            <div className="h-[1px] bg-[#CBCBCB] w-[100%] mt-[.8em]"></div>
            <div className="flex items-center gap-2 justify-end pt-[.8em]">
                <LinkButton variant="secondary">Annuleren</LinkButton>
                <Button type="submit" variant="primary">Skill toevoegen</Button>
            </div>
        </form>
    )
}
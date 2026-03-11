'use client';

import axios from "axios"; 
import { useState } from "react";
import { useAuth, TextField, TagsField, Button, LinkButton } from "@/lib/components";

export function SkillForm() {
    const [tags, setTags] = useState<string[]>([]);
    const [form, setForm] = useState({ title: "", description: "", type: "OFFER" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    const { user, token } = useAuth(); // <-- haal token hier ook op

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setError(null);

        if (!user || !token) {
            setError("Je moet ingelogd zijn om een skill toe te voegen.");
            setStatus("error");
            return;
        }

        try {
            const response = await axios.post(
            "/api/skill",
            { 
                ...form, 
                tags
            },
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                }
            }
            );

            console.log(response.data);
            setStatus("success");

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
            <TextField name="title" label="Titel" value={form.title} onChange={handleChange} placeholder="Bijv: React Hooks Uitleg"/>
            <TextField name="description" label="Beschrijving" value={form.description} onChange={handleChange} placeholder="Beschrijf wat je kunt aanbieden..." />
            <TagsField value={tags} onChange={setTags} />

            {error && <p className="!text-red-600">{error}</p>}
            {status === "success" && <p className="!text-green-600">Skill succesvol toegevoegd!</p>}

            <div className="h-[1px] bg-[#CBCBCB] w-full mt-3"></div>
            <div className="flex items-center gap-2 justify-end pt-3">
                <LinkButton variant="secondary">Annuleren</LinkButton>
                <Button type="submit" variant="primary">Skill toevoegen</Button>
            </div>
        </form>
    );
}

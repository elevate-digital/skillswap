'use client';

import axios from "axios"; 
import { useState } from "react";
import { useAuth, useSkills, TextField, TagsField, Button, LinkButton } from "@/lib/components";

export function OfferForm() {
    const [tags, setTags] = useState<string[]>([]);
    const [form, setForm] = useState({ title: "", description: "", type: "OFFER" });

    // Form status ophalen uit useAuth
    const { user, token } = useAuth();
    const { addSkill, SkillFormStatus, SkillFormError, setSkillFormStatus, setSkillFormError } = useSkills();

    // Update de form state zodra een inputveld verandert
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Verwerkt het formulier bij het indienen
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Voorkomt dat de pagina herlaadt
        setSkillFormStatus("loading"); // Zet status op loading
        setSkillFormError(null); // Reset eventuele eerdere foutmelding

        // Controleer of de gebruiker is ingelogd voordat je de API-aanroep doet
        if (!user || !token) {
            setSkillFormError("Je moet ingelogd zijn om een skill toe te voegen.");
            setSkillFormStatus("error");
            return;
        }

        // API-aanroep om de skill toe te voegen
        try {
            const response = await axios.post(
                "/api/skill",
                { ...form, tags },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            addSkill(response.data);
            // Toon de success state als het aanmaken successvol is gelukt
            setSkillFormStatus("success");

        // Toon anders een foutmelding (error state)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setSkillFormError(err.response?.data?.message ?? err.message);
            } else {
                setSkillFormError("Onbekende fout");
            }
            setSkillFormStatus("error");
        }
    };

    // Success state
    if (SkillFormStatus === "success") {
        return (
            <>
                <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
                    <h2 className="text-green-600 !text-[20px]">Skill toegevoegd!</h2>
                    <p className="text-green-600 text-center">Je skill is succesvol opgeslagen.</p>

                    <LinkButton variant="primary" href="/">Bekijk alle skills</LinkButton>
                </section>

                <div className="flex items-center gap-4 my-2 w-full">
                    <div className="flex-1 h-px bg-gray-300" />
                    <p className="text-green-600">Nog een skill toevoegen</p>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                <Button variant="secondary" onClick={() => { setForm({ title: "", description: "", type: "OFFER" }); setTags([]); setSkillFormStatus("idle"); setSkillFormError(null); }}>
                    Nieuwe skill toevoegen
                </Button>
            </>
        );
    }

    return (
        // Standaard formulier voor toevoegen van een skill
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 login-form">
            <TextField name="title" label="Titel" value={form.title} onChange={handleChange} placeholder="Bijv: React Hooks Uitleg" />
            <TextField name="description" label="Beschrijving" value={form.description} onChange={handleChange} placeholder="Beschrijf wat je kunt aanbieden..." />
            <TagsField value={tags} onChange={setTags} />

            {SkillFormError && <p className="!text-red-600">{SkillFormError}</p>}

            <div className="h-[1px] bg-[#CBCBCB] w-full mt-3"></div>

            <div className="flex items-center gap-2 justify-end pt-3">
                <LinkButton variant="secondary">Annuleren</LinkButton>
                <Button type="submit" variant="primary">Skill toevoegen</Button>
            </div>
        </form>
    );
}

'use client';

import axios from "axios"; 
import { useState } from "react";
import { useAuth, TextField, TagsField, Button, LinkButton } from "@/lib/components";

export function OfferForm() {
    const [tags, setTags] = useState<string[]>([]);
    const [form, setForm] = useState({ title: "", description: "", type: "OFFER" });

    // Form status ophalen uit useAuth
    const { user, token, formStatus, formError, setFormStatus, setFormError, resetFormState } = useAuth();

    // Update de form state zodra een inputveld verandert
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Verwerkt het formulier bij het indienen
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Voorkomt dat de pagina herlaadt
        setFormStatus("loading"); // Zet status op loading
        setFormError(null); // Reset eventuele eerdere foutmelding

        // Controleer of de gebruiker is ingelogd voordat je de API-aanroep doet
        if (!user || !token) {
            setFormError("Je moet ingelogd zijn om een skill toe te voegen.");
            setFormStatus("error");
            return;
        }

        // API-aanroep om de skill toe te voegen
        try {
            await axios.post(
                "/api/skill",
                { ...form, tags },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            // Toon de success state als het aanmaken successvol is gelukt
            setFormStatus("success");

        // Toon anders een foutmelding (error state)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setFormError(err.response?.data?.message ?? err.message);
            } else {
                setFormError("Onbekende fout");
            }
            setFormStatus("error");
        }
    };

    // Success state
    if (formStatus === "success") {
        return (
            <>
                <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
                    <h2 className="text-green-600 !text-[20px]">Skill toegevoegd!</h2>
                    <p className="text-green-600 text-center">Je skill is succesvol opgeslagen.</p>

                    <LinkButton variant="primary" href="/">Bekijk skills</LinkButton>
                </section>

                <div className="flex items-center gap-4 my-2 w-full">
                    <div className="flex-1 h-px bg-gray-300" />
                    <p className="text-green-600">Nog een skill toevoegen</p>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                <Button
                    variant="secondary"
                    onClick={() => {
                        resetFormState();
                        setForm({ title: "", description: "", type: "OFFER" });
                        setTags([]);
                    }}
                >
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

            {formError && <p className="!text-red-600">{formError}</p>}

            <div className="h-[1px] bg-[#CBCBCB] w-full mt-3"></div>

            <div className="flex items-center gap-2 justify-end pt-3">
                <LinkButton variant="secondary">Annuleren</LinkButton>
                <Button type="submit" variant="primary">Skill toevoegen</Button>
            </div>
        </form>
    );
}

'use client';

import axios from "axios";
import { useState } from "react";
import { useAuth, useSkills, TextField, TagsField, Button, LinkButton } from "@/lib/components";
import { PlusCircleIcon } from "@phosphor-icons/react";

export function SkillForm({
    type,
    titlePlaceholder,
    descriptionPlaceholder,
    successTitle,
    successText,
    submitLabel,
    listLinkLabel
}: {
    type: "OFFER" | "REQUEST";
    titlePlaceholder: string;
    descriptionPlaceholder: string;
    successTitle: string;
    successText: string;
    submitLabel: string;
    listLinkLabel: string;
}) {
    const [tags, setTags] = useState<string[]>([]);
    const [form, setForm] = useState({ title: "", description: "", type });

    const { user, token } = useAuth();
    const { addSkill, SkillFormStatus, SkillFormError, setSkillFormStatus, setSkillFormError } = useSkills();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSkillFormStatus("loading");
        setSkillFormError(null);

        if (!user || !token) {
            setSkillFormError("Je moet ingelogd zijn om een skill toe te voegen.");
            setSkillFormStatus("error");
            return;
        }

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
            setSkillFormStatus("success");

        } catch (err) {
            if (axios.isAxiosError(err)) {
                setSkillFormError(err.response?.data?.message ?? err.message);
            } else {
                setSkillFormError("Onbekende fout");
            }
            setSkillFormStatus("error");
        }
    };

    if (SkillFormStatus === "success") {
        return (
            <>
                <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
                    <h2 className="text-green-600 !text-[20px]">{successTitle}</h2>
                    <p className="text-green-600 text-center">{successText}</p>

                    <LinkButton variant="primary" href="/">
                        {listLinkLabel}
                    </LinkButton>
                </section>

                <div className="flex items-center gap-4 my-2 w-full">
                    <div className="flex-1 h-px bg-gray-300" />
                    <p className="text-green-600">Nog een toevoegen</p>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                <Button icon={PlusCircleIcon} variant="secondary" onClick={() => { setForm({ title: "", description: "", type }); setTags([]); setSkillFormStatus("idle"); setSkillFormError(null); }}>
                    Nieuwe toevoegen
                </Button>
            </>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 login-form">
            <TextField name="title" label="Titel" value={form.title} onChange={handleChange} placeholder={titlePlaceholder} />
            <TextField name="description" label="Beschrijving" value={form.description} onChange={handleChange} placeholder={descriptionPlaceholder} />
            <TagsField value={tags} onChange={setTags} />

            {SkillFormError && <p className="!text-red-600">{SkillFormError}</p>}

            <div className="h-[1px] bg-[#CBCBCB] w-full mt-3"></div>

            <div className="flex flex-col-reverse md:flex-row md:items-center gap-2 justify-end pt-3">
                <LinkButton variant="secondary">Annuleren</LinkButton>
                <Button type="submit" variant="primary" icon={PlusCircleIcon} disabled={SkillFormStatus === "loading"}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}

import { SkillForm } from "@/lib/components";

export function RequestForm() {
    return (
        <SkillForm
            type="REQUEST"
            titlePlaceholder="Bijv: Hoe gebruik je hooks in React?"
            descriptionPlaceholder="Beschrijf waar je hulp bij nodig hebt"
            successTitle="Jouw vraag is toegevoegd!"
            successText="Je vraag is succesvol opgeslagen."
            submitLabel="Vraag toevoegen"
            listLinkLabel="Bekijk alle vragen"
        />
    );
}

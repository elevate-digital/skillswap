import { SkillForm } from "@/lib/components";

export function OfferForm() {
    return (
        <SkillForm
            type="OFFER"
            titlePlaceholder="Bijv: React Hooks Uitleg"
            descriptionPlaceholder="Beschrijf wat je kunt aanbieden..."
            successTitle="Skill toegevoegd!"
            successText="Je skill is succesvol opgeslagen."
            submitLabel="Skill toevoegen"
            listLinkLabel="Bekijk alle skills"
        />
    );
}

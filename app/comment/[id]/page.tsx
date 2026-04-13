'use client';

import { use, useState } from "react";
import { PopupOverlay, CommentPopup, CommentProvider, DiscussionCards, Switch, useSkills, FilterPanel, ResultPanel } from "@/lib/components";

export default function CommentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); // <-- unwrap de Promise
    const skillId = Number(id);

    // Haal het aantal offers en requests op uit de useSkills hook
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("all");
    const { offerCount, requestCount, openCount, completedCount } = useSkills();


    return (
        <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
            <PopupOverlay>
                <CommentProvider skillId={skillId}>
                    <CommentPopup />
                </CommentProvider>
            </PopupOverlay>

            <ResultPanel />
        
            <FilterPanel
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                status={status}
                setStatus={setStatus}
                openCount={openCount}
                completedCount={completedCount}
            />

            <div className="w-[100%] md:w-[26em] self-baseline">
                <Switch
                param="type"
                options={["OFFER", "REQUEST"]}
                labels={[`Skills (${offerCount})`, `Hulpvragen (${requestCount})`]}
                /> 
            </div>

            <DiscussionCards searchTerm={searchTerm} status={status} />
        </main>
    );
}

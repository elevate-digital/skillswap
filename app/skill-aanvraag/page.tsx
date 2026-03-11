'use client';

import { AuthPopup, PopupOverlay, OfferForm, DiscussionCard } from "@/lib/components";

export default function Skill() {
  return ( 
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
          <PopupOverlay>
            <AuthPopup title="Biedt je skill aan" description="Deel je kennis met andere studenten en junior developers." showHeader={true} showSwitch={false}>  
                <OfferForm />
            </AuthPopup>
          </PopupOverlay>

        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
    </main>
  )
}
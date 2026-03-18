'use client';

import { Suspense } from "react";
import { AuthPopup, PopupOverlay, OfferForm, DiscussionCards, Switch, useSkills } from "@/lib/components";

export default function Skill() {

  const { offerCount, requestCount } = useSkills();

  return ( 
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
      <PopupOverlay>
        <AuthPopup title="Biedt je skill aan" description="Deel je kennis met andere studenten en junior developers." showHeader={true} showSwitch={false}>  
            <OfferForm />
        </AuthPopup>
      </PopupOverlay>

      <Suspense fallback={null}>
        <div className="w-[100%] md:w-[26em] self-baseline">
          <Switch
            param="type"
            options={["OFFER", "REQUEST"]}
            labels={[`Skills (${offerCount})`, `Hulpvragen (${requestCount})`]}
          /> 
        </div>
        
        <DiscussionCards />
      </Suspense>
    </main>
  )
}
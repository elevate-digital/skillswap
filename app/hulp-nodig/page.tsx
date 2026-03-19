'use client';

import { Suspense } from "react"; 
import { AuthPopup, PopupOverlay, RequestForm, DiscussionCards, Switch, useSkills } from "@/lib/components";

export default function Hulp() {

  // Haal het aantal offers en requests op uit de useSkills hook
  const { offerCount, requestCount } = useSkills();

  return ( 
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">

      {/* Overlay met popup + request formulier */}
      <PopupOverlay>
        <AuthPopup title="Vraag om hulp" description="Loop je ergens tegen aan? Vraag andere developers om hulp." showHeader={true} showSwitch={false}>  
            <RequestForm />
        </AuthPopup>
      </PopupOverlay>

      {/* Render pas de volgende elementen als tot search params (useSearchParams) beschikbaar is */}
      <Suspense fallback={null}>
        <div className="w-[100%] md:w-[26em] self-baseline">
          <Switch param="type" options={["OFFER", "REQUEST"]} labels={[`Skills (${offerCount})`, `Hulpvragen (${requestCount})`]} /> 
        </div>
        
        <DiscussionCards />
      </Suspense>
    </main>
  )
}
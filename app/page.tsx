'use client';

import { Suspense } from "react";
import { DiscussionCards, Switch, useSkills, ResultPanel } from "@/lib/components";

export default function Home() {

  // Haal het aantal offers en requests op uit de useSkills hook
  const { offerCount, requestCount } = useSkills();

  return (  
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
      <Suspense fallback={null}>
        {/* Panel met alle resultaten */}
        <ResultPanel />
        
        <div className="w-[100%] md:w-[26em] self-baseline">
          <Switch param="type" options={["OFFER", "REQUEST"]} labels={[`Skills (${offerCount})`, `Hulpvragen (${requestCount})`]} /> 
        </div>
        
      
        <DiscussionCards />
      </Suspense>
    </main>
  )
}
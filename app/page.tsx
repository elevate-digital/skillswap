'use client';

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DiscussionCards, Switch, useSkills, ResultPanel } from "@/lib/components";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Haal het aantal offers en requests op uit de useSkills hook
  const { offerCount, requestCount } = useSkills();

  // Redirect wanneer ?type ontbreekt
  useEffect(() => {
    const type = searchParams.get("type");
    if (!type) {
      router.replace("/?type=OFFER");
    }
  }, [searchParams, router]);

  return (  
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
      <Suspense fallback={null}>
        <ResultPanel />
        
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
  );
}

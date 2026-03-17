'use client';

import { AuthPopup, PopupOverlay, RequestForm, DiscussionCards } from "@/lib/components";

export default function Hulp() {

  return ( 
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
          <PopupOverlay>
            <AuthPopup title="Vraag om hulp" description="Loop je ergens tegen aan? Vraag andere developers om hulp." showHeader={true} showSwitch={false}>  
                <RequestForm />
            </AuthPopup>
          </PopupOverlay>

        <DiscussionCards />
    </main>
  )
}
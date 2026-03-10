'use client';

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { AuthPopup, PopupOverlay, LoginForm, RegisterForm, DiscussionCard } from "@/lib/components";

export default function Login() {

  const params = useSearchParams();
  const mode = params.get("mode") === "register" ? "register" : "login";

  return ( 
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
          <PopupOverlay>
            <AuthPopup title="Welkom bij SkillSwap" description="Log in of maak een account aan om skills te delen en hulp te vragen.">  
                {mode === "login" && <LoginForm />}
                {mode === "register" && <RegisterForm />}
            </AuthPopup>
          </PopupOverlay>

        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
    </main>
  )
}
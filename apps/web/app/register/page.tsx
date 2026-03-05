'use client';

import { useSearchParams } from "next/navigation";
import { RegisterForm, DiscussionCard, LoginForm, PopupOverlay, AuthPopup } from "@/lib/components";

export default function Login() {

  const params = useSearchParams();
  const mode = params.get("mode") === "register" ? "register" : "login";

  return ( 
    <main id="inhoud" className="py-[1em] md:py-[2em]">
          <PopupOverlay>
            <AuthPopup title="Welkom bij SkillSwap" description="Log in of maak een account aan om skills te delen en hulp te vragen.">  
                {mode === "login" && <LoginForm />}
                {mode === "register" && <RegisterForm />}
            </AuthPopup>
          </PopupOverlay>

          <DiscussionCard />
    </main>
  )
}
'use client';

import { useSearchParams } from "next/navigation";
import { AuthPopup } from "@/lib/components";
import { PopupOverlay } from "@/lib/components";
import { LoginForm } from "@/lib/components";
import { RegisterForm } from "@/lib/components";

export default function Login() {

  const params = useSearchParams();
  const mode = params.get("mode") === "register" ? "register" : "login";

  return ( 
    <main id="inhoud">
          <PopupOverlay>
            <AuthPopup title="Welkom bij SkillSwap" description="Log in of maak een account aan om skills te delen en hulp te vragen.">  
                {mode === "login" && <LoginForm />}
                {mode === "register" && <RegisterForm />}
            </AuthPopup>
          </PopupOverlay>
    </main>
  )
}
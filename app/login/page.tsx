'use client';

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RegisterForm, DiscussionCards, LoginForm, PopupOverlay, AuthPopup, Switch, useSkills } from "@/lib/components";

function LoginContent() {

  // Bepaal op basis van de search params of we in login of register modus zitten
  const params = useSearchParams();
  const mode = params.get("mode") === "register" ? "register" : "login";

  // Haal het aantal offers en requests op uit de useSkills hook
  const { offerCount, requestCount } = useSkills();

  return (
    <>
      <PopupOverlay>
        <AuthPopup
          title="Welkom bij SkillSwap"
          description="Log in of maak een account aan om skills te delen en hulp te vragen."
        >
          {mode === "login" && <LoginForm />}
          {mode === "register" && <RegisterForm />}
        </AuthPopup>
      </PopupOverlay>

      <div className="w-[100%] md:w-[26em] self-baseline">
        <Switch
          param="type"
          options={["OFFER", "REQUEST"]}
          labels={[`Skills (${offerCount})`, `Hulpvragen (${requestCount})`]}
        /> 
      </div>

      <DiscussionCards />
    </>
  );
}

export default function Login() {
  return (
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
      <Suspense fallback={null}>
        <LoginContent />
      </Suspense>
    </main>
  );
}
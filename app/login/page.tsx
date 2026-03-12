'use client';

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RegisterForm, DiscussionCards, LoginForm, PopupOverlay, AuthPopup } from "@/lib/components";

function LoginContent() {
  const params = useSearchParams();
  const mode = params.get("mode") === "register" ? "register" : "login";

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

      <DiscussionCards />
    </>
  );
}

export default function Login() {
  return (
    <main id="inhoud" className="py-[1em] md:py-[2em]">
      <Suspense fallback={null}>
        <LoginContent />
      </Suspense>
    </main>
  );
}
import { PopupLogin } from "@/lib/components";
import { PopupOverlay } from "@/lib/components";

export default function Login() {
  return ( 
    <main id="inhoud">
          <PopupOverlay>
                  <PopupLogin title="Welkom bij SkillSwap" description="Log in of maak een account aan om skills te delen en hulp te vragen."/>
          </PopupOverlay>
    </main>
  )
}
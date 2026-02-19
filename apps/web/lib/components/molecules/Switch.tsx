"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export function Switch() {
  const router = useRouter();
  const params = useSearchParams();
  const mode = params.get("mode") === "register" ? "register" : "login";

  function setMode(next: "login" | "register") {
    router.push(`?mode=${next}`, { scroll: false });
  }

  useEffect(() => {
    document.querySelectorAll(".test").forEach(element => {
        element.classList.remove("hidden");
        element.classList.add("block");
    });
}, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex bg-[#E5E7E2] p-1 rounded-full w-full">

        {/* Witte background die heen en weer animeert bij het switchen */}
        <span className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[var(--third-bg-color)] transition-transform duration-300 ${mode === "register" ? "translate-x-full" : "translate-x-0"}`}/>

        {/* Standaard staan deze knoppen uit en worden zichtbaar als JS aan staat*/}
        <button onClick={() => setMode("login")} className="flex-1 py-1 relative z-10 hidden test cursor-pointer">Inloggen</button>
        <button onClick={() => setMode("register")} className="flex-1 py-1 relative z-10 hidden test cursor-pointer">Registreren</button>

        {/* Wanneer JS uit staat dan worden deze knoppen zichtbaar (de animatie van de switch is een enhancement)*/}
        <noscript className="flex-1 py-1 text-center relative z-10 cursor-pointer">
            <a className="w-[100%] block" href="?mode=login">Inloggen</a>
        </noscript>
        <noscript className="flex-1 py-1 text-center relative z-10 cursor-pointer">
            <a className="w-[100%] block" href="?mode=register">Registreren</a>
        </noscript>
      </div>
    </div>
  );
}

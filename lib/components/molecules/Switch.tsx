"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function Switch({
  param = "mode",
  options = ["left", "right"],
  labels = ["Left", "Right"],
}: {
  param?: string;
  options: [string, string]; 
  labels: [string, string]; 
}) {
  const router = useRouter();
  const params = useSearchParams();

  const current = params.get(param) === options[1] ? options[1] : options[0];

  function setMode(next: string) {
    router.push(`?${param}=${next}`, { scroll: false });
  }

  useEffect(() => {
    document.querySelectorAll(".switch-js").forEach(el => {
      el.classList.remove("hidden");
      el.classList.add("block");
    });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex bg-[#E5E7E2] p-1 rounded-full w-full">

        {/* Animated background */}
        <span
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[var(--third-bg-color)] transition-transform duration-300 ${
            current === options[1] ? "translate-x-full" : "translate-x-0"
          }`}
        />

        {/* Buttons */}
        <button onClick={() => setMode(options[0])} className="flex-1 py-1 relative z-10 hidden switch-js cursor-pointer">
          {labels[0]}
        </button>

        <button onClick={() => setMode(options[1])} className="flex-1 py-1 relative z-10 hidden switch-js cursor-pointer">
          {labels[1]}
        </button>

        {/* No-JS fallback */}
        <noscript>
          <a href={`?${param}=${options[0]}`}>{labels[0]}</a>
        </noscript>
        <noscript>
          <a href={`?${param}=${options[1]}`}>{labels[1]}</a>
        </noscript>
      </div>
    </div>
  );
}

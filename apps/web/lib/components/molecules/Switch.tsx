"use client";

import { Form } from "@/lib/components";

export function Switch() {
    return (
    
    <div className="relative flex flex-col gap-3">
        <label htmlFor="toggle" className="sr-only">Kies een optie:</label>
        <input type="checkbox" id="toggle" className="peer w-[100%] h-[2.5em] absolute appearance-none" />

        <div className="relative flex bg-[#E5E7E2] p-1 rounded-full w-full before:absolute before:top-1 before:left-1 before:h-[calc(100%-8px)] before:w-[calc(50%-4px)] before:bg-[var(--third-bg-color)] before:rounded-full before:transition-transform before:duration-300 peer-checked:before:translate-x-full">
            <span className="flex-1 text-center py-1 cursor-pointer relative z-10 text-[var(--primary-text-color)] peer-checked:text-[var(--primary-text-color)] transition">
                Inloggen
            </span>

            <span className="flex-1 text-center py-1 cursor-pointer relative z-10 text-[var(--primary-text-color)] transition">
                Registreren
            </span>
        </div>

        <div className="peer-checked:hidden">
            <Form type="login" />
        </div>

        {/* Register form */}
        <div className="hidden peer-checked:block">
            <Form type="register" />
        </div>
        </div>
    );
  }
  
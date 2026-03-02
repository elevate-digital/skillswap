"use client";

import axios from "axios";  
import { useState } from "react";
import { Button } from "@/lib/components";
import { UserPlusIcon, UserIcon } from "@phosphor-icons/react";
import { NameField } from "@/lib/components";
import { EmailField } from "@/lib/components";
import { PasswordField } from "@/lib/components";
import { useAuth } from "@/lib/components"

export function RegisterForm() {
  const { user, login, logout } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle"); 
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value}))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("loading"); 
    setError(null);
      
    try {
      const response = await axios.post("/api/register", form, { 
        headers: { "Content-Type": "application/json" } }
    );

      login(response.data.user);
      setStatus("success");

    } catch (error) {
      console.error("Register failed:", error);
      setError("Registreren mislukt. Probeer opnieuw.");  
      setStatus("error");
    }
  }

  if (status === "loading") {
    return (
      <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
        <h2 className="text-blue-600 animate-pulse !text-[20px]">Account aanmaken…</h2>
        <img className="animate-spin" src="/assets/loading-icon.svg" width={50} height={50}/>
      </section>
    ); 
  }

  if (status === "success" && user) {
    return (
      <>
        <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
          <h2 className="text-green-600 !text-[20px]">Account succesvol aangemaakt!</h2>
          <p className="text-green-600">Ingelogd als {user.email}</p>

          <a className="bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)] flex items-center justify-center gap-3 rounded-[var(--border-radius-sm)] transition-colors lg:py-[12px] lg:px-[32px]" href="/">
            <UserIcon /> Ga naar dashboard
          </a>
        </section>

        <Button type="button" variant="secondary" onClick={logout}>
          Uitloggen
        </Button>
      </>
    )
  }

  if (user && status === "idle") {
    return (
    <>
      <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
        <h2 className="text-green-600 !text-[20px]">Je bent al ingelogd</h2>
        <p className="text-green-600">{user.email}</p>

        <a
          className="bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] flex items-center justify-center gap-3 rounded-[var(--border-radius-sm)] transition-colors lg:py-[12px] lg:px-[32px]"
          href="/"
        >
          <UserIcon /> Naar dashboard
        </a>
      </section>

      <Button type="button" variant="primary" onClick={logout}>
        Uitloggen
      </Button>
    </>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 register-form">
      <NameField name="name" label="Naam"value={form.name} onChange={handleChange} placeholder="Jan Jansen" />
      <EmailField name="email" label="Email" value={form.email} onChange={handleChange} placeholder="Bijv. janjansen@gmail.com" />
      <PasswordField name="password" label="Wachtwoord" value={form.password} onChange={handleChange} placeholder="Vul wachtwoord in" />

      {error && <p className="text-red-600">{error}</p>}

      <Button type="submit" variant="secondary" icon={UserPlusIcon}>Account aanmaken</Button>
    </form>
  );
}

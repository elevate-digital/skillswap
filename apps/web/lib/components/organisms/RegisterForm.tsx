"use client";

import axios from "axios";  
import { useState } from "react";
import { Button } from "@/lib/components";
import { UserPlusIcon, UserIcon } from "@phosphor-icons/react";
import { NameField } from "@/lib/components";
import { EmailField } from "@/lib/components";
import { PasswordField } from "@/lib/components";

export function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value}))
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
      
    console.log("Form submitted:", form); 

    try {
      const response = await axios.post("/api/register", form, { 
        headers: { "Content-Type": "application/json" } }
    );
      console.log(response.data);

      // Verwacht dat backend user terugstuurt (zelfde als login)
      setUser(response.data.user);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.dispatchEvent(new Event("auth-changed"));

      setSuccess(true);

    } catch (erro: any) {
      console.error("Login failed:", error);
      setError("Registreren mislukt. Probeer opnieuw.");  
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      {loading && (
        <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
          <h2 className="text-blue-600 animate-pulse !text-[20px]">Account aanmaken…</h2>
          <img className="animate-spin" src="/assets/loading-icon.svg" width={50} height={50}/>
        </section>
      )}

      {success && user && (
        <>
          <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
            <h2 className="text-green-600 !text-[20px]">Account succesvol aangemaakt!</h2>
            <p className="text-green-600">Ingelogd als {user.email}</p>

            <a className="bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)] flex items-center justify-center gap-3 rounded-[var(--border-radius-sm)] transition-colors lg:py-[12px] lg:px-[32px]" href="/">
              <UserIcon /> Ga naar dashboard
            </a>
          </section>

          <Button type="button" variant="secondary" onClick={handleLogout}>
            Uitloggen
          </Button>
        </>
      )}

      {!user && !success && !loading && (
        <>
          <NameField name="name" label="Naam"value={form.name} onChange={handleChange} placeholder="Jan Jansen" />
          <EmailField name="email" label="Email" value={form.email} onChange={handleChange} placeholder="Bijv. janjansen@gmail.com" />
          <PasswordField name="password" label="Wachtwoord" value={form.password} onChange={handleChange} placeholder="Vul wachtwoord in" />

          {error && <p className="text-red-600">{error}</p>}

          <Button type="submit" variant="secondary" icon={UserPlusIcon}>Account aanmaken</Button>
        </>
      )}

      {/* ALREADY LOGGED IN */}
      {!success && user && (
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

          <Button type="button" variant="primary" onClick={handleLogout}>
            Uitloggen
          </Button>
        </>
      )}

    </form>
  );
}

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
  const { user, login, status, setStatus, error, setError } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value}))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("loading"); 
    setError(null);
      
    try {
      const response = await axios.post("/api/register", form, { 
        headers: { 
          "Content-Type": "application/json" 
        } 
      });

      login(response.data.user);
      setStatus("success");

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? err.message);
      } else {
        setError("Onbekende fout");
      }

      setStatus("error");
    }
  }

  if (status === "success" && user) {
    return (
      <>
        <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
          <h2 className="text-green-600 !text-[20px]">Account succesvol aangemaakt!</h2>
          <p className="text-green-600 text-center">Ingelogd als {user.email}</p>

          <a className="bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)] flex items-center justify-center gap-3 rounded-[var(--border-radius-sm)] transition-colors lg:py-[12px] lg:px-[32px]" href="/">
            <UserIcon /> Ga naar dashboard
          </a>
        </section>
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 register-form">
      <NameField name="name" label="Naam"value={form.name} onChange={handleChange} placeholder="Jan Jansen" autoComplete="name" />
      <EmailField name="email" label="Email" value={form.email} onChange={handleChange} placeholder="Bijv. janjansen@gmail.com" autoComplete="email" />
      <PasswordField name="password" label="Wachtwoord" value={form.password} onChange={handleChange} placeholder="Vul wachtwoord in" autoComplete="new-password" />

      {error && <p className="text-red-600">{error}</p>}

      <Button type="submit" variant="secondary" icon={UserPlusIcon}>Account aanmaken</Button>

      <div className="flex items-center gap-4 my-2 w-full">
        <div className="flex-1 h-px bg-gray-300" />
        <p className="text-green-600">Verder zonder account</p>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <a className="bg-[var(--primary-bg-color)] text-[var(--primary-text-color)] border-1 border-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)] flex items-center justify-center gap-3 rounded-[var(--border-radius-sm)] cursor-pointer transition-colors sm:p-[12px] lg:p-[12px] py-[7px] px-[10px] lg:py-[12px] lg:px-[32px]"href="/" >
        <UserIcon height={20} width={20} />
        Ga naar dashboard
      </a>
    </form>
  );
}

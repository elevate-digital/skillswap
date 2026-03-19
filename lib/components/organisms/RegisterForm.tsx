"use client";

import axios from "axios";  
import { useState } from "react";
import { Button } from "@/lib/components";
import { UserPlusIcon, UserIcon } from "@phosphor-icons/react";
import { NameField, useAuth, EmailField, PasswordField, LinkButton } from "@/lib/components";

export function RegisterForm() {

  // Objecten uit de useAuth ophalen 
  const { user, login, logout, authStatus, setAuthStatus, authError, setAuthError } = useAuth();

  // State voor de formuliervelden
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Update de form state zodra een inputveld verandert
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // Haal veldnaam en ingevoerde waarde op
    setForm(prev => ({ ...prev, [name]: value})) // Update alleen dat veld in de form state
  }

  // Verwerkt het formulier bij het indienen
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Voorkomt dat de pagina herlaadt
    setAuthStatus("loading"); // Zet status op loading
    setAuthError(null); // Reset eventuele eerdere foutmelding

    try {
      // Registratie gegevens opslaan
      const registerResponse = await axios.post("/api/register", form, {
        headers: { "Content-Type": "application/json", "Accept": "application/json" }
      });

      console.log("Register response:", registerResponse.data);

      // Na succesvolle registratie, automatisch inloggen met dezelfde gegevens
      const loginResponse = await axios.post("/api/login", {
        email: form.email,
        password: form.password
      }, {
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        }
      });

      login(loginResponse.data.user, loginResponse.data.token); // Sla de gebruiker en token op in LocalStorage
      setAuthStatus("authenticated");

    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setAuthError(err.response?.data?.message ?? err.message);
      } else {
        setAuthError("Onbekende fout");
      }
      setAuthStatus("error");
    }
  };

  // Als de gebruiker is ingelogd
    if (authStatus === "authenticated" && user) {
    return (
      <>
        <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
          <h2 className="text-green-600 !text-[20px]">Account succesvol aangemaakt!</h2>
          <p className="text-green-600 text-center">Ingelogd als {user.email}</p>

          <LinkButton variant="primary" icon={UserIcon} href="/">Naar dashboard</LinkButton>
        </section>
      </>
    )
  }

  return (
    // Standaard formulier voor inloggen van gebruiker
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 register-form">
      <NameField name="name" label="Naam"value={form.name} onChange={handleChange} placeholder="Bijv. Jan Jansen" autoComplete="name" />
      <EmailField name="email" label="Email" value={form.email} onChange={handleChange} placeholder="Bijv. janjansen@gmail.com" autoComplete="email" />
      <PasswordField name="password" label="Wachtwoord" value={form.password} onChange={handleChange} placeholder="Vul wachtwoord in" autoComplete="new-password" />

      {authError && <p className="!text-red-600">{authError}</p>}

      <Button type="submit" variant="primary" icon={UserPlusIcon}>Account aanmaken</Button>

      <div className="flex items-center gap-4 my-2 w-full">
        <div className="flex-1 h-px bg-gray-300" />
        <p className="text-green-600">Verder zonder account</p>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <LinkButton variant="secondary" icon={UserIcon} href="/">Naar dashboard</LinkButton>
    </form>
  );
}

"use client";

import axios from "axios";
import { useState } from "react";
import { Button, PasswordField, EmailField, LinkButton, useAuth } from "@/lib/components";
import { UserPlusIcon, UserIcon } from "@phosphor-icons/react";

export function LoginForm() {

  // Objecten uit de useAuth ophalen 
  const { user, login, logout, status, setStatus, error, setError } = useAuth();

  // State voor de formuliervelden
  const [form, setForm] = useState({ email: "", password: "" });
  
  // Update de form state zodra een inputveld verandert
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;  // Haal veldnaam en ingevoerde waarde op
    setForm(prev => ({ ...prev, [name]: value })); // Update alleen dat veld in de form state
  };

  // Verwerkt het formulier bij het indienen
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Voorkomt dat de pagina herlaadt
    setStatus("loading"); // Zet status op loading
    setError(null); // Reset eventuele eerdere foutmelding

    try {
      // Stuur de login gegevens naar de API endpoint
      const response = await axios.post("/api/login", form, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      console.log("API response:", response.data);

      login(response.data.user, response.data.token); // Gebruiker opslaan in localStorage
      setStatus("success"); // Zet status op success (success state)

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? err.message); // Specifieke foutmelding laten zien
      } else {
        setError("Onbekende fout");
      }

      setStatus("error"); // Zet status op error (error state)
    }
  };

  const handleLogout = () => {
    logout();
    setForm({ email: "", password: "" }); // reset input fields
  };

  // Als de gebruiker is ingelogd
  if (status === "success" && user) {
    return (
      <>
        <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
          <h2 className="text-green-600 !text-[20px]">Je bent ingelogd</h2>
          <p className="text-green-600 text-center">Ingelogd als: {user.email}</p>
          <LinkButton variant="primary" icon={UserIcon} href="/">Naar dashboard</LinkButton>
        </section>

        <div className="flex items-center gap-4 my-2 w-full">
          <div className="flex-1 h-px bg-gray-300" />
          <p className="text-green-600">Wissel van account</p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <Button type="button" variant="secondary" onClick={handleLogout}>
          Uitloggen
        </Button>
      </>
    );
  }

  return (
    // Standaard formulier voor inloggen van gebruiker
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 login-form">
      <EmailField name="email" label="Email" value={form.email} onChange={handleChange} placeholder="Bijv. janjansen@gmail.com" autoComplete="email" />
      <PasswordField name="password" label="Password" value={form.password} onChange={handleChange} placeholder="Hier jouw wachtwoord" autoComplete="new-password" />

      {error && <p className="!text-red-600">{error}</p>}

      <Button type="submit" variant="primary" icon={UserPlusIcon}>Inloggen</Button>

      <div className="flex items-center gap-4 my-2 w-full">
        <div className="flex-1 h-px bg-gray-300" />
        <p className="text-green-600">Verder zonder account</p>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <LinkButton variant="secondary" icon={UserIcon} href="/">Naar dashboard</LinkButton>
    </form>
  );
}

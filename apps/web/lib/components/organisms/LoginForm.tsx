"use client";

import axios from "axios";
import { useState } from "react";
import { Button, PasswordField, EmailField, LinkButton } from "@/lib/components";
import { UserPlusIcon, UserIcon } from "@phosphor-icons/react";
import { useAuth } from "@/lib/components";

export function LoginForm() {
  const { user, login, logout, status, setStatus, error, setError } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  console.log({ status, user });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const response = await axios.post("/api/login", form, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      // user opslaan via context
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
  };

  const handleLogout = () => {
    logout();
    setForm({ email: "", password: "" }); // reset input fields
  };

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

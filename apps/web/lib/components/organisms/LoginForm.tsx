"use client";

import axios from "axios";  
import { useState, useEffect } from "react";
import { Button, PasswordField } from "@/lib/components";
import { EmailField } from "@/lib/components";
import { UserPlusIcon, UserIcon } from "@phosphor-icons/react";

export function LoginForm() {
  const [form, setForm] = useState({ "email": "", "password": "" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Check ofdat de user al is ingelogd bij het laden van de component
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Wordt uitgevoerd wanneer iemand iets invult in een van de input velden
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value}))
  }

  // Wordt uitgevoerd wanneer iemand op uitloggen klikt 
  const handleLogout = () => { 
    setUser(null);
    setSuccess(false); // <-- toevoegen
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
  };

  // Wordt uitgevoerd wanneer iemand op inloggen klikt
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Form submitted:", form); 

    try {
      // Verstuur de login gegevens naar de API endpoint
      const response = await axios.post("/api/login", form, {
        headers: { 
          "Content-Type": "application/json",
           "Accept": "application/json" 
          }
      });
    
    console.log(response.data);

    // Zet de ingelogde gebruiker in de state
    setUser(response.data.user); 

    // Sla de gebruiker op in de LocalStorage
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // Zorgt ervoor dat andere compontenten weten dat de login status is veranderd
    window.dispatchEvent(new Event("auth-changed"));

    setSuccess(true);

    } catch (error) {
      console.error("Login failed:", error);
      setError("Onjuiste email of wachtwoord"); 
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 login-form">

      {loading && (
        <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
          <h2 className="text-blue-600 animate-pulse !text-[20px]">Bezig met inloggen…</h2>
          <img className="animate-spin" src="/assets/loading-icon.svg" alt="" width={50} height={50}/>
        </section>
      )}

      {success && user && (
        <>
          <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
            <h2 className="text-green-600 !text-[20px]">Succesvol ingelogd!</h2>
            <p className="text-green-600">Je bent ingelogd als {user.email}</p>
            <a className="bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)] flex items-center justify-center gap-3 rounded-[var(--border-radius-sm)] cursor-pointer transition-colors sm:p-[12px] lg:p-[12px] py-[7px] px-[10px] lg:py-[12px] lg:px-[32px]" href="/"><UserIcon />Ga naar dashboard</a>
          </section>
          
          <div className="flex items-center gap-4 my-2 w-full">
            <div className="flex-1 h-px bg-gray-300" />
              <p className="text-green-600">Wissel van account</p>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <Button type="button" variant="primary" onClick={handleLogout}>Uitloggen</Button>
        </>
      )}
      
      {!user && !success && !loading && (
        <>
          <EmailField name="email" label="Email" value={form.email} onChange={handleChange} placeholder="Bijv. janjansen@gmail.com" />
          <PasswordField name="password" label="Password" value={form.password} onChange={handleChange} placeholder="Hier jouw wachtwoord" />

          {error && <p className="text-red-600">{error}</p>}

          <Button type="submit" variant="secondary" icon={UserPlusIcon} disabled={loading}>
            Inloggen
          </Button>

          <div className="flex items-center gap-4 my-2 w-full">
            <div className="flex-1 h-px bg-gray-300" />
              <p className="text-green-600">Verder zonder account</p>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <a className="bg-[var(--primary-bg-color)] text-[var(--primary-text-color)] border-1 border-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)] flex items-center justify-center gap-3 rounded-[var(--border-radius-sm)] cursor-pointer transition-colors sm:p-[12px] lg:p-[12px] py-[7px] px-[10px] lg:py-[12px] lg:px-[32px]" href="/"><UserIcon height={20} width={20} />Ga naar dashboard</a>
        </>
      )}

      {!success && user && (
        <>
        <section className="flex flex-col gap-5 items-center bg-[#fff] px-[2em] py-[3em] rounded-[12px]">
          <h2 className="text-green-600 !text-[20px]">Je bent ingelogd</h2>
          <p className="text-green-600">Ingelogd als {user.email}</p>
          <a className="bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)] flex items-center justify-center gap-3 rounded-[var(--border-radius-sm)] cursor-pointer transition-colors sm:p-[12px] lg:p-[12px] py-[7px] px-[10px] lg:py-[12px] lg:px-[32px]" href="/"><UserIcon />Naar dashboard</a>
        </section>
        <div className="flex items-center gap-4 my-2 w-full">
          <div className="flex-1 h-px bg-gray-300" />
            <p className="text-green-600">Wissel van account</p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

          <Button type="button" variant="primary" onClick={handleLogout}>Uitloggen</Button>
        </>
      )}

    </form>
  );
}

'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// User moet altijd een naam + email hebben
type User = {
    name: string;
    email: string
};

// AuthContext heeft de volgende waardes en functies
type AuthContextType = {
    user: User | null;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
    login: (userData: User) => void;
    logout: () => void;
    setStatus: (status: "idle" | "loading" | "success" | "error") => void;
    setError: (error: string | null) => void;
}

// AuthContext aanmaken, begint als undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null); // Huidige gebruiker, begint als null (niet ingelogd)
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle"); // Status van authenticatie, begint als "idle"
    const [error, setError] = useState<string | null>(null); // Eventuele foutmelding, begint als null (geen fout)

    // Check of de gebruiker in de LocalStorage staat
    useEffect(() => { 

        // Sla gebruiker op in de LocalStorage
        const savedUser = localStorage.getItem("user"); 

        // Als een gebruiker is opgeslagen
        if (savedUser) { 
            setUser(JSON.parse(savedUser)); 
            setStatus("success");  // Succes state tonen
        } else { 
            setStatus("error"); } }, []); // Anders error state tonen

    // Login functie
    const login = (userData: User) => { 
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setStatus("success");
        setError(null);
    }

    // Logout functie
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        setStatus("idle");
        setError(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, status, error, setStatus, setError }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook om de AuthContext te gebruiken in andere componenten
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth moet gebruikt worden binnen AuthProvider");
  }
  return context;
}
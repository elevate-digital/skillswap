'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type User = {
    name: string;
    email: string
};

type AuthContextType = {
    user: User | null;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
    login: (userData: User) => void;
    logout: () => void;
    setStatus: (status: "idle" | "loading" | "success" | "error") => void;
    setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); // de contect kan AuthContextType zijn of undefined

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { 
        const savedUser = localStorage.getItem("user"); 
        if (savedUser) { 
            setUser(JSON.parse(savedUser)); 
            setStatus("success");
        } 
    }, []);

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth moet gebruikt worden binnen AuthProvider");
  }
  return context;
}
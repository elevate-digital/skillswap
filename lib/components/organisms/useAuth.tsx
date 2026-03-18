'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type User = {
    name: string;
    email: string;
    id: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;

    // Authenticatie State
    authStatus: "idle" | "loading" | "authenticated" | "error";
    authError: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    setAuthStatus: (status: "idle" | "loading" | "authenticated" | "error") => void;
    setAuthError: (error: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Authenticatie State
    const [authStatus, setAuthStatus] = useState<"idle" | "loading" | "authenticated" | "error">("idle");
    const [authError, setAuthError] = useState<string | null>(null);

    // Controleer bij het laden van de app of er al een gebruiker en token in localStorage staan
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
            setAuthStatus("authenticated");
        } else {
            setAuthStatus("idle");
        }
    }, []);

    // Functie om in te loggen: sla gebruiker en token op in state en localStorage
    const login = (userData: User, token: string) => {
        setUser(userData);
        setToken(token);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);

        setAuthStatus("authenticated");
        setAuthError(null);
    };

    // Functie om uit te loggen: verwijder gebruiker en token uit state en localStorage
    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setAuthStatus("idle");
        setAuthError(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, authStatus, authError, login, logout, setAuthStatus, setAuthError }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth moet gebruikt worden binnen AuthProvider");
    }
    return context;
}

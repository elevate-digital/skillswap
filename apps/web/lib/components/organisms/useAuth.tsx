'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type User = {
    name: string;
    email: string
};

type AuthContextType = {
    user: User | null; 
    login: (userData: User) => void
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); // de contect kan AuthContextType zijn of undefined

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => { 
        const savedUser = localStorage.getItem("user"); 
        if (savedUser) { 
            setUser(JSON.parse(savedUser)); 
        } 
    }, []);

    // Login functie
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    }

    // Logout functie
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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
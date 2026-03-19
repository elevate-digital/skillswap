'use client';

// Context providers importeren voor authenticatie en skills
import { AuthProvider, SkillsProvider } from "@/lib/components";

export function Providers({ children }: { children: React.ReactNode }) {
  return  (
  
  // Authenticatie en skills data is overal beschikbaar
  <AuthProvider>
    <SkillsProvider>
      {children}
    </SkillsProvider>
  </AuthProvider>
  );
}

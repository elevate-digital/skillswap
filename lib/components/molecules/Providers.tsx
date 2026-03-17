"use client";

import { AuthProvider, SkillsProvider } from "@/lib/components";

export function Providers({ children }: { children: React.ReactNode }) {
  return  (
  <AuthProvider>
    <SkillsProvider>
      {children}
    </SkillsProvider>
  </AuthProvider>
  );
}

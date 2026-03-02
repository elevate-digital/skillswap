"use client";

import { AuthProvider } from "@/lib/components";

export function Provider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

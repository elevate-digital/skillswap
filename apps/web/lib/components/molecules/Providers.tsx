"use client";

import { AuthProvider } from "@/lib/components";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

import type { Metadata } from "next";
import "./global.css";
import React from "react";
import { Button } from "../lib/components";
import { LogoFull } from "@/lib/assets/LogoFull";

export const metadata: Metadata = {
  title: "Skill Swap",
  description: "Het platform waar studenten en junior developers skills uitwisselen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="px-[5%] max-w-[1600px] m-auto">
        <header className="flex justify-between items-center m-auto sticky top-0 bg-[var(--primary-bg-color)] py-3 max-w-[1600px]">
          <LogoFull />

          <div className="flex gap-2 w-[100%] justify-end">
            <Button variant="primary" icon="plus">Skill aanbieden</Button>
            <Button variant="secondary" icon="plus">Hulp vragen</Button>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

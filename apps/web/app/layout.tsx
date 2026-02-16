import type { Metadata } from "next";
import "./global.css";
import React from "react";
import { Header } from "@/lib/components";
import { Container } from "@/lib/components";

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
        <link rel="icon" href="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="absolute top-[-300px] focus:top-0 ease-in-out duration-200 left-1/2 transform -translate-x-1/2 z-1000 bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)] py-[7px] px-[10px] rounded-b-lg" href="#inhoud">Ga naar inhoud</a>

        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}

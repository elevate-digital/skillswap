import type { Metadata } from "next";
import "./global.css";
import React from "react";
import { Header, Container, AddButton, Providers, SplashScreen, PageTransition } from "@/lib/components";
import Script from 'next/script';


export const metadata: Metadata = {
  title: "Skill Swap",
  description: "Het platform waar studenten en junior developers skills uitwisselen.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="no-js">
      <head>
        {/* JS detectie voor no-js / js class */}
        <Script strategy="beforeInteractive">
          {`document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');`}
        </Script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/assets/favicon-dev.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {/* Skiplink */}
          <a className="absolute top-[-300px] focus:top-0 ease-in-out duration-200 left-1/2 transform -translate-x-1/2 z-[1100] bg-[var(--secondary-bg-color)] text-[var(--primary-text-color)] hover:bg-[var(--primary-text-color)] hover:text-[var(--secondary-text-color)] py-[7px] px-[10px] rounded-b-lg" href="#inhoud" >
            Ga naar inhoud
          </a>

          {/* View Page Transition met content pagina */}
          <PageTransition>
            <Container>
              <Header />
              {children}
              <AddButton />
            </Container>
          </PageTransition>

          {/* Splash Screen */}
          <SplashScreen />
        </Providers>
      </body>
    </html>
  );
}

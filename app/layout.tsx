import type { Metadata } from "next";
import "./global.css";
import React from "react";
import { Header, Footer, Container, MobileHeader, Providers, SplashScreen, PageTransition } from "@/lib/components";
import { Kantumruy_Pro } from "next/font/google";

const kantumruy = Kantumruy_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skill Swap",
  description: "Het platform waar studenten en junior developers skills uitwisselen.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${kantumruy.className} no-js`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');",
          }}
        />
        <link rel="icon" href="/assets/favicon-dev.svg" />
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
              <MobileHeader />
              <Footer />
            </Container>
          </PageTransition>

          {/* Splash Screen */}
          <SplashScreen />
        </Providers>
      </body>
    </html>
  );
}

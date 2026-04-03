import "./globals.css";
import React from "react";

import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/supporting/theme-provider";
import { Analytics } from "@/components/supporting/analytics";
import { BackToTop } from "@/components/design-system/back-to-top";
import { SiteHeroBackground } from "@/components/design-system/site-hero-background";

import { Footer } from "@/components/design-system/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "I Code It",
  description:
    "I Code It is focusing on maintainable React code and masterful use of frontend technologies like Refactoring and Test-Driven Development.",
  keywords:
    "Software Engineering, Developer growth, Maintainable React, React, Test-Driven Development, Frontend development, coding best practices, software design patterns, I Code It",
  author: "Juntao Qiu",
  canonical: "https://icodeit.com.au",
  openGraph: {
    title: "I Code It",
    description:
      "I Code It is focusing on maintainable React code and masterful use of frontend technologies like Refactoring and Test-Driven Development.",
    url: "https://icodeit.com.au",
    // @ts-ignore
    type: "website",
    image: "/juntao.qiu.avatar.webp",
  },
  twitter: {
    // @ts-ignore
    card: "summary_large_image",
    title:
      "Juntao Qiu - I help developers write better code. Developer, Author, Creator.",
    description:
      "Discover ways to grow as a developer with Juntao Qiu. Learn about writing maintainable, efficient code at I Code It.",
    url: "https://icodeit.com.au",
    creator: "@JuntaoQiu",
    image: "/juntao.qiu.avatar.webp",
  },
  charSet: "UTF-8",
  robots: "index, follow",
  metadataBase: new URL("https://icodeit.com.au"),
};

interface RootLayoutProps {
  children: React.ReactNode;
}

import { Providers } from "@/app/providers";
import { HeaderWithMenu } from "@/components/design-system/header-with-menu";

const fontVars = `${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontVars} font-sans subpixel-antialiased min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-100 via-slate-150 to-slate-100 bg-no-repeat text-slate-900 antialiased dark:bg-none dark:bg-slate-900 dark:text-slate-50`}
      >
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SiteHeroBackground />
            <div className="relative z-10 flex min-h-screen flex-col">
              <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-1 flex-col gap-12 px-4 pb-16 pt-6 sm:gap-16 sm:px-6 sm:pt-8 md:gap-20">
                <HeaderWithMenu />
                <main className="min-w-0">{children}</main>
              </div>
              <Footer />
            </div>
            <Analytics />
            <BackToTop />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

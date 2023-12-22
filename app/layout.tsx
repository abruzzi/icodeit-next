import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/supporting/theme-provider";
import { Analytics } from "@/components/supporting/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";
import { BackToTop } from "@/components/back-to-top";
import React from "react";

import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { XIcon } from "react-share";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

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
    image: "/juntao.qiu.avatar.png", // Replace with the actual image URL
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
    image: "/juntao.qiu.avatar.png", // Replace with the actual Twitter image URL
  },
  charSet: "UTF-8",
  robots: "index, follow",
  metadataBase: new URL("https://icodeit.com.au"),
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`subpixel-antialiased min-h-screen bg-no-repeat bg-gradient-to-br from-slate-50 to-slate-150 dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-800 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-sm md:max-w-3xl lg:max-w-4xl mx-auto pt-10 pb-20 px-4">
            <Header />
            <main className={`flex flex-col md:flex-row gap-6 lg:flex-row`}>{children}</main>
            <Footer />
          </div>
          <Analytics />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}

import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/supporting/theme-provider";
import { Analytics } from "@/components/supporting/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";
import { BackToTop } from "@/components/back-to-top";

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
        className={`relative antialiased subpixel-antialiased min-h-screen bg-gradient-to-br from-slate-50 to-slate-150 dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-800 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-4xl mx-auto pt-10 pb-20 px-4">
            <header>
              <div className="flex items-center justify-between">
                <Logo />
                <nav className="ml-auto mr-4 text-lg font-medium space-x-6">
                  <Link href="/posts">Posts</Link>
                  <Link href="/books">Books</Link>
                  <Link href="/courses">Courses</Link>
                </nav>
                <ModeToggle />
              </div>
            </header>
            <main>{children}</main>
            <footer
              className={`flex flex-row my-4 items-center justify-center text-sm`}
            >
              <div className="mr-auto">&copy; 2023</div>

              <nav className="mt-12 flex justify-center space-x-10 lg:mt-0 lg:ml-12 lg:items-center lg:space-x-6">
                <a href="https://twitter.com/JuntaoQiu" target="_blank">
                  X
                </a>
                <a
                  href="https://www.linkedin.com/in/juntaoqiu/"
                  target="_blank"
                >
                  L
                </a>
                <a href="https://github.com/abruzzi/" target="_blank">
                  G
                </a>
              </nav>
            </footer>
          </div>
          <Analytics />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}

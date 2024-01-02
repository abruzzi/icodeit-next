import { Logo } from "@/components/design-system/logo";
import Link from "next/link";
import { ModeToggle } from "@/components/supporting/mode-toggle";
import React from "react";

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between">
        <Logo />
        <nav className="ml-auto mr-4 text-lg font-medium space-x-6">
          <Link
            href="/posts"
            className={`hover:text-brand transition-colors duration-200`}
          >
            Posts
          </Link>
          <Link
            href="/tutorials"
            className={`hidden md:inline hover:text-brand transition-colors duration-200`}
          >
            Tutorials
          </Link>
          <Link
            href="/books"
            className={`hover:text-brand transition-colors duration-200`}
          >
            Books
          </Link>
          <Link
            href="/courses"
            className={`hidden md:inline hover:text-brand transition-colors duration-200`}
          >
            Courses
          </Link>
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
};

export { Header };

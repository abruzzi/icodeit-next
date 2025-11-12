"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

export function Logo() {
  const { theme = "light" } = useTheme();

  return (
    <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
      <Image
        src={theme === "dark" ? "/logo-dark.png" : "/logo-brand.png"}
        alt={"Logo"}
        width={70}
        height={48}
        className="h-10 w-auto"
      />
    </Link>
  );
}

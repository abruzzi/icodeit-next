"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

export function Logo() {
  const { theme } = useTheme();

  return (
    <Link href="/">
      <Image
        src={theme === "dark" ? "/logo-dark.png" : "/logo.png"}
        alt={"Logo"}
        width={70}
        height={48}
      />
    </Link>
);
}



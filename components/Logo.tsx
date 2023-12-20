"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export function Logo() {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? "/logo-dark.png" : "/logo.png"}
      alt={"Logo"}
      width={70}
      height={48}
    />
  );
}

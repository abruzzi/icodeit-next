"use client";

import { useTheme } from "next-themes";
import { GoMoon, GoSun } from "react-icons/go";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="border-none rounded-md w-6 h-6 flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-200 transition-colors duration-200"
    >
      <span className="sr-only">Toggle mode</span>
      {theme !== "dark" ? (
        <GoMoon size={20} />
      ) : (
        <GoSun size={20} color="orange" />
      )}
    </button>
  );
}

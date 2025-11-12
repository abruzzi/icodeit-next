"use client";

import { useTheme } from "next-themes";
import { GoMoon, GoSun } from "react-icons/go";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="border-none rounded-lg w-10 h-10 flex items-center justify-center dark:hover:bg-slate-700/50 hover:bg-slate-200/50 transition-colors duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
      aria-label="Toggle theme"
    >
      {theme !== "dark" ? (
        <GoMoon size={20} />
      ) : (
        <GoSun size={20} className="text-orange-400" />
      )}
    </button>
  );
}

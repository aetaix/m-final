"use client";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      aria-label="Toggle theme"
      className="size-7 rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "Dark" : "Light"}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

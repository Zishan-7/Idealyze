"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/stores/theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = mediaQuery.matches ? "dark" : "light";

    const storedTheme = localStorage.getItem("theme-storage");
    if (!storedTheme) {
      setTheme(systemTheme);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      const storedTheme = localStorage.getItem("theme-storage");
      if (!storedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme]);

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <>{children}</>;
}

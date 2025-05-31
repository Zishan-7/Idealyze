"use client";

import { useThemeStore } from "@/stores/theme-store";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full border-2 border-primary/20 bg-card shadow-md hover:shadow-lg hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : 180,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-5 w-5 text-amber-500" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : -180,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-5 w-5 text-blue-400" />
      </motion.div>
    </Button>
  );
}

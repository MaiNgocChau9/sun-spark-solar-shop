
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Lấy theme từ localStorage hoặc hệ thống
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <Button variant="ghost" size="icon" className="relative rounded-full" onClick={toggleTheme} aria-label="Đổi theme">
      <Sun className={`h-5 w-5 rotate-0 scale-100 transition-all ${theme === "dark" ? "dark:-rotate-90 dark:scale-0" : ""}`} />
      <Moon className={`absolute h-5 w-5 rotate-90 scale-0 transition-all ${theme === "dark" ? "dark:rotate-0 dark:scale-100" : ""}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

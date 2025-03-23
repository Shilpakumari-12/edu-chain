import { Moon, Sun } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { useEffect } from "react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 hover:bg-accent/10 transition-colors"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
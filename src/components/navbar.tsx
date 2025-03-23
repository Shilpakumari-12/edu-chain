import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { ThemeToggle } from "./theme-toggle"
import { GraduationCap, Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export function Navbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 border-b glassmorphism">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-accent" />
          <span className="font-grotesk text-xl font-bold">EduChain</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/courses" className="font-inter hover:text-accent transition-colors px-4 py-2">
                  Courses
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/blog" className="font-inter hover:text-accent transition-colors px-4 py-2">
                  Blog
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/community" className="font-inter hover:text-accent transition-colors px-4 py-2">
                  Community
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ThemeToggle />
          <button
            onClick={() => navigate("/login")}
            className="bg-accent text-white px-4 py-2 rounded-lg font-inter hover:bg-accent/90 transition-colors"
          >
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-accent/10 rounded-lg"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2 bg-background/95 backdrop-blur-sm border-t">
            <Link
              to="/courses"
              className="block py-2 px-4 hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/blog"
              className="block py-2 px-4 hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/community"
              className="block py-2 px-4 hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <button
              onClick={() => {
                navigate("/login")
                setIsMenuOpen(false)
              }}
              className="w-full bg-accent text-white px-4 py-2 rounded-lg font-inter hover:bg-accent/90 transition-colors mt-2"
            >
              Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Stethoscope, Heart, Shield, Clock } from "lucide-react"

// Define the type for navigation items
interface NavItem {
  href: string;
  label: string;
  scroll?: boolean; // Make scroll optional
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/"

  // Define navigation items with proper typing
  const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About Us"},
    { href: "#services", label: "Services"},
    { href: "#doctor-search", label: "Doctor Availability"},
    { href: "#feedback", label: "Doctor Feedback"},
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact Us" },
  ]

  // Function to handle smooth scrolling
  const handleScrollToSection = (sectionId: string) => {
    if (isHomePage) {
      // If we're on the homepage, scroll to the section
      const element = document.getElementById(sectionId.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setIsMenuOpen(false) // Close mobile menu after clicking
      }
    } else {
      // If we're not on the homepage, navigate to homepage with hash
      window.location.href = `/${sectionId}`
    }
  }

  return (
    <nav className="bg-card border-b border-border fixed top-0 left-0 right-0 z-50 w-full">
      {isHomePage && (
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm px-4">
          <span className="hidden sm:inline">Your Health, Our Priority - 24/7 Smart Healthcare Solutions</span>
          <span className="sm:hidden">24/7 Smart Healthcare Solutions</span>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always visible */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="bg-primary p-2 rounded-lg">
              <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground font-sans">MediSmart</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Smart Healthcare System</p>
            </div>
          </Link>

          {isHomePage && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                {navItems.map((item) => (
                  item.scroll ? (
                    <button
                      key={item.href}
                      onClick={() => handleScrollToSection(item.href)}
                      className="text-foreground hover:text-primary transition-colors duration-200 font-medium hover:scale-105 transform"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-foreground hover:text-primary transition-colors duration-200 font-medium hover:scale-105 transform"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="outline"
                  asChild
                  className="hover:scale-105 transform transition-all duration-200 bg-transparent"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="hover:scale-105 transform transition-all duration-200">
                  <Link href="/register">Register</Link>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </>
          )}

          {!isHomePage && (
            <>
              {/* Centered Healthcare Features */}
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>24/7 Care</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Trusted</span>
                </div>
              </div>
              
              {/* Mobile view - simplified */}
              <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
                <Heart className="h-4 w-4 text-primary" />
                <span className="text-sm">MediSmart Care</span>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation - Only on homepage */}
        {isHomePage && isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                item.scroll ? (
                  <button
                    key={item.href}
                    onClick={() => handleScrollToSection(item.href)}
                    className="text-foreground hover:text-primary transition-colors py-2 font-medium text-left"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="flex flex-col space-y-2 pt-3 border-t border-border md:hidden">
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
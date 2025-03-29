"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"


export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("MyMapToken")
    setIsLoggedIn(!!token)

    // Add scroll listener for navbar background change
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const logout = () => {
    localStorage.removeItem("MyMapToken")
    setIsLoggedIn(false)
    window.location.href = "/"
  }

  const navLinks = [
    { href: "/", label: "Home" },
    ...(isLoggedIn ? [{ href: "/dashboard", label: "Dashboard" }] : [{ href: "/register", label: "Register" }]),
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b-2 border-primary/20"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <img src="/png/mymap-Logo.png" className="w-10 h-10" alt="MyMap Logo" />
          </motion.div>
          <span className="font-semibold text-xl tracking-tight">MyMap</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-6">
          <ul className="flex gap-6 mr-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {isLoggedIn && (
            <button
              onClick={logout}
              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            >
              Log Out
            </button>
          )}
        </nav>

        {/* Mobile Navigation */}
        
            {/* <button size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </button>
         
          
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b pb-4">
                <Link href="/" className="flex items-center gap-2">
                  <img src="/png/mymap-Logo.png" className="w-8 h-8" alt="MyMap Logo" />
                  <span className="font-semibold">MyMap</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-6 mt-8">
                <ul className="grid gap-5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`text-lg font-medium transition-colors hover:text-primary ${
                          pathname === link.href ? "text-primary" : "text-foreground/70"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {isLoggedIn && (
                  <button
                    onClick={logout}
                    
                    className="justify-start px-0 text-destructive hover:text-destructive/90 hover:bg-transparent"
                  >
                    Log Out
                  </button>
                )}
              </nav>
            </div> */}
      </div>
    </motion.header>
  )
}


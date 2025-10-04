"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, Globe, User, Menu, X, Wallet, Mail, DollarSign, Building2, PawPrint, Sun, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [theme, setTheme] = useState("light")

  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">VetChain</span>
          </Link>
          <nav className="hidden lg:flex gap-4">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t("home")}
            </Link>
            <Link
              href="/clinics"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
              <Building2 className="h-4 w-4" />
              {t("findClinics")}
            </Link>
            <Link
              href="/donate"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
              <DollarSign className="h-4 w-4" />
              {t("donateNow")}
            </Link>
            <Link
              href="/adopt"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
              <PawPrint className="h-4 w-4" />
              {t("adoptAnimal")}
            </Link>
            <Link href="/emergency-map" className="text-sm font-medium transition-colors hover:text-primary">
              {t("emergencyMap")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmailInput(!showEmailInput)}
            className="hidden md:flex items-center gap-1"
          >
            <Mail className="h-4 w-4" />
            {t("enterEmail")}
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">{theme === "light" ? t("darkMode") : t("lightMode")}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t("language")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("English")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("Spanish")}>Español</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("Portuguese")}>Português</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/wallet">
              <Wallet className="h-5 w-5" />
              <span className="sr-only">{t("wallet")}</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">{t("signIn")}</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{t("menu")}</span>
          </Button>
        </div>
      </div>

      {showEmailInput && (
        <div className="border-t p-4 bg-background">
          <div className="container max-w-md mx-auto">
            <div className="flex gap-2">
              <Input placeholder={t("emailPlaceholder")} type="email" />
              <Button size="sm">{t("subscribe")}</Button>
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="lg:hidden border-t p-4 space-y-4 bg-background">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t("home")}
            </Link>
            <Link
              href="/clinics"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              {t("findClinics")}
            </Link>
            <Link
              href="/donate"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4" />
              {t("donateNow")}
            </Link>
            <Link
              href="/adopt"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
            >
              <PawPrint className="h-4 w-4" />
              {t("adoptAnimal")}
            </Link>
            <Link href="/emergency-map" className="text-sm font-medium transition-colors hover:text-primary">
              {t("emergencyMap")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

"use client"

import type React from "react"
import dynamic from "next/dynamic"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await login(email, password)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Login failed")
    }

    setIsLoading(false)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="VetChain Logo"
              width={40}
              height={40}
              className="rounded-full bg-primary"
            />
          </div>
          <CardTitle className="text-2xl text-center">{t.login?.title || "Sign in to your account"}</CardTitle>
          <CardDescription className="text-center">
            {t.login?.description || "Enter your email and password to access your account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">{t.login?.email || "Email"}</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t.login?.password || "Password"}</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  {t.login?.forgotPassword || "Forgot password?"}
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">
                {t.login?.rememberMe || "Remember me"}
              </Label>
            </div>
            <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
              {isLoading ? t.login?.signingIn || "Signing in..." : t.login?.signIn || "Sign In"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t.login?.orContinue || "Or continue with"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button">
                Google
              </Button>
              <Button variant="outline" type="button">
                Facebook
              </Button>
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground">
            {t.login?.noAccount || "Don't have an account?"}{" "}
            <Link href="/register" className="text-primary hover:underline">
              {t.login?.signUp || "Sign up"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false })

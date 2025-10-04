"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("vetchain_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<{ success: boolean; error?: string }> => {
    // Validate inputs
    if (!email || !password || !firstName || !lastName) {
      return { success: false, error: "All fields are required" }
    }

    if (password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters" }
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("vetchain_users") || "[]")
    const existingUser = users.find((u: any) => u.email === email)

    if (existingUser) {
      return { success: false, error: "Email already registered" }
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
    }

    // Store password separately (in real app, this would be hashed on backend)
    const userWithPassword = { ...newUser, password }
    users.push(userWithPassword)
    localStorage.setItem("vetchain_users", JSON.stringify(users))

    // Set current user
    setUser(newUser)
    localStorage.setItem("vetchain_user", JSON.stringify(newUser))

    return { success: true }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Validate inputs
    if (!email || !password) {
      return { success: false, error: "Email and password are required" }
    }

    // Check credentials
    const users = JSON.parse(localStorage.getItem("vetchain_users") || "[]")
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user
    setUser(userWithoutPassword)
    localStorage.setItem("vetchain_user", JSON.stringify(userWithoutPassword))

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("vetchain_user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

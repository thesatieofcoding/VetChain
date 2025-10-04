"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

interface AuthResult {
  success: boolean
  error?: string
}

export function useSimulatedAuth() {
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
  ): Promise<AuthResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Validate inputs
    if (!email || !password || !firstName || !lastName) {
      return { success: false, error: "All fields are required" }
    }

    if (password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters" }
    }

    // Check if user already exists (simulate)
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

    // Store user data
    const userWithPassword = { ...newUser, password }
    users.push(userWithPassword)
    localStorage.setItem("vetchain_users", JSON.stringify(users))

    // Set current user
    setUser(newUser)
    localStorage.setItem("vetchain_user", JSON.stringify(newUser))

    return { success: true }
  }

  const login = async (email: string, password: string): Promise<AuthResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

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

  return {
    user,
    login,
    register,
    logout,
    isLoading,
  }
}

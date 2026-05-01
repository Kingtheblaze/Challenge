"use client"

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react"
import { supabase } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string) => Promise<any>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signOut: async () => {},
  signIn: async () => {},
  signUp: async () => {},
})

import { localDB } from "@/lib/db"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Safety timeout
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    const init = async () => {
      try {
        const savedUser = localDB.getCurrentUser()
        if (savedUser) {
          setUser(savedUser as any)
        } else {
          // Fallback to Supabase check if needed, but for now prioritize local
          const { data: { session } } = await supabase.auth.getSession()
          if (session) setUser(session.user)
        }
      } catch (e) {}
      setIsLoading(false)
    }

    init()
    return () => clearTimeout(timeout)
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const user = localDB.login(email, password)
      setUser(user as any)
      return { user }
    } catch (error) {
      // Fallback to Supabase
      const { data, error: sbError } = await supabase.auth.signInWithPassword({ email, password })
      if (sbError) throw error // Throw the local error if both fail
      setUser(data.user)
      return data
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const user = localDB.signUp(email, password)
      setUser(user as any)
      return { user }
    } catch (error) {
      // Fallback to Supabase
      const { data, error: sbError } = await supabase.auth.signUp({ email, password })
      if (sbError) throw error
      setUser(data.user)
      return data
    }
  }, [])

  const signOut = useCallback(async () => {
    localDB.logout()
    try {
      await supabase.auth.signOut()
    } catch (e) {}
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

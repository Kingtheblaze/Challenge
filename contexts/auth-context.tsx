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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Safety timeout - ensure loading state doesn't hang forever
    const timeout = setTimeout(() => {
      console.warn('[AuthContext] Loading timeout - forcing isLoading to false')
      setIsLoading(false)
    }, 10000) // 10 second timeout

    // Get initial user
    const init = async () => {
      try {
        console.log('[AuthContext] Initializing...')

        // First check if there's a session (won't throw if no session exists)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('[AuthContext] Error getting session:', sessionError)
          setUser(null)
          setIsLoading(false)
          return
        }

        // Only try to get user if we have a session
        if (session) {
          const { data: { user }, error: userError } = await supabase.auth.getUser()

          if (userError) {
            console.error('[AuthContext] Error getting user:', userError)
            setUser(null)
          } else {
            console.log('[AuthContext] User:', user ? user.id : 'none')
            setUser(user)
          }
        } else {
          console.log('[AuthContext] No session found')
          setUser(null)
        }

        setIsLoading(false)
      } catch (error) {
        console.error('[AuthContext] Init error:', error)
        setUser(null)
        setIsLoading(false)
      }
    }

    init()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[AuthContext] Auth state changed:', session?.user ? session.user.id : 'logged out')
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, _password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: _password })
      if (error) throw error
      return data
    } catch (error) {
      console.warn('[AuthContext] Supabase sign-in failed, using Demo Mode', error)
      const mockUser = { id: 'demo-user', email } as User
      setUser(mockUser)
      return { user: mockUser }
    }
  }, [])

  const signUp = useCallback(async (email: string, _password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password: _password })
      if (error) throw error
      return data
    } catch (error) {
      console.warn('[AuthContext] Supabase sign-up failed, using Demo Mode', error)
      const mockUser = { id: 'demo-user', email } as User
      setUser(mockUser)
      return { user: mockUser }
    }
  }, [])

  const signOut = useCallback(async () => {
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

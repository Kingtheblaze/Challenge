"use client"

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react"
import { supabase } from "@/lib/supabase/client"

export type Tier = "free" | "pro"

export type Subscription = {
  id: string
  user_id: string
  tier: Tier
  created_at: string
  updated_at: string
}

type SubscriptionContextType = {
  subscription: Subscription | null
  isLoading: boolean
  isPro: boolean
  tier: Tier
  upgradeToPro: () => Promise<void>
  downgradeToFree: () => Promise<void>
  refresh: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  subscription: null,
  isLoading: true,
  isPro: false,
  tier: "free",
  upgradeToPro: async () => {},
  downgradeToFree: async () => {},
  refresh: async () => {},
})

import { localDB } from "@/lib/db"

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchSubscription = useCallback(async () => {
    try {
      const localUser = localDB.getCurrentUser()
      
      if (localUser) {
        setSubscription({
          id: "local-sub",
          user_id: localUser.id,
          tier: localUser.isPro ? "pro" : "free",
          created_at: localUser.created_at,
          updated_at: new Date().toISOString()
        } as Subscription)
      } else {
        // Try Supabase if local fails
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single()
          if (data) setSubscription(data as Subscription)
        } else {
          setSubscription(null)
        }
      }
    } catch (error) {
      console.error("[SubscriptionContext] Fetch error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refresh = useCallback(async () => {
    setIsLoading(true)
    await fetchSubscription()
  }, [fetchSubscription])

  const upgradeToPro = useCallback(async () => {
    const localUser = localDB.getCurrentUser()
    if (localUser) {
      localDB.upgrade(localUser.id)
      await refresh()
      return
    }

    // Supabase fallback
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from("subscriptions").update({ tier: "pro" }).eq("user_id", user.id)
    await refresh()
  }, [refresh])

  const downgradeToFree = useCallback(async () => {
    const localUser = localDB.getCurrentUser()
    if (localUser) {
      localDB.downgrade(localUser.id)
      await refresh()
      return
    }

    // Supabase fallback
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from("subscriptions").update({ tier: "free" }).eq("user_id", user.id)
    await refresh()
  }, [refresh])

  useEffect(() => {
    fetchSubscription()
  }, [fetchSubscription])

  // Compute derived values
  const isPro = subscription?.tier === "pro"
  const tier = subscription?.tier ?? "free"

  return (
    <SubscriptionContext.Provider value={{ subscription, isLoading, isPro, tier, upgradeToPro, downgradeToFree, refresh }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}

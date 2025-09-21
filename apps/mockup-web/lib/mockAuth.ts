"use client"
import { useEffect, useState } from 'react'

export type MockUser = { role: 'owner' | 'staff' | 'customer'; name?: string }
const KEY = 'mockup-auth'

export function getMockUser(): MockUser | null {
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null } catch { return null }
}

export function setMockUser(user: MockUser | null) {
  try {
    if (user) localStorage.setItem(KEY, JSON.stringify(user))
    else localStorage.removeItem(KEY)
  } catch {}
}

export function useMockAuth() {
  const [user, setUser] = useState<MockUser | null>(null)
  useEffect(() => { setUser(getMockUser()) }, [])
  const signInDemoOwner = () => { const u: MockUser = { role: 'owner', name: 'Dueño Demo' }; setMockUser(u); setUser(u) }
  const signOut = () => { setMockUser(null); setUser(null) }
  return { user, isOwner: user?.role === 'owner', signInDemoOwner, signOut }
}

export function getKeycloakUrls() {
  const base = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL || ''
  const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM || ''
  const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || ''
  if (!base || !realm || !clientId || typeof window === 'undefined') return { login: '#', register: '#' }
  // Importante: usar una ruta con barra final para que coincida con patrones tipo http://localhost:3100/*
  const origin = window.location.origin.endsWith('/') ? window.location.origin : window.location.origin + '/'
  const redirect = encodeURIComponent(origin)
  const common = `client_id=${encodeURIComponent(clientId)}&response_type=code&scope=openid&redirect_uri=${redirect}`
  return {
    login: `${base}/realms/${realm}/protocol/openid-connect/auth?${common}`,
    register: `${base}/realms/${realm}/protocol/openid-connect/registrations?${common}`,
  }
}

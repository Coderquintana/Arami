"use client"
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const getInitial = () => {
    if (typeof window === 'undefined') return 'light' as const
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitial)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  if (!mounted) return null
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <button onClick={toggle} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}


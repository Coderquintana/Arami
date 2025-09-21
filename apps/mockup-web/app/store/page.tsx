"use client"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ShoppingCart, Search, Star, Trash2, X, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { PRODUCTS, type Product } from "@/lib/products"
import { ProfilePanel } from "@/components/profile/ProfilePanel"
import { AdminPanel } from "@/components/admin/AdminPanel"
import { useMockAuth } from "@/lib/mockAuth"
import { Tooltip } from "@/components/ui/tooltip"
import { Footer } from "@/components/site/Footer"

type CartItem = { id: number; name: string; price: number; qty: number }

const MOCK_PRODUCTS: Product[] = PRODUCTS

function formatGs(value: number) {
  return new Intl.NumberFormat("es-PY", { style: "currency", currency: "PYG", maximumFractionDigits: 0 }).format(value)
}

function ProductCard({ p, onAdd }: { p: Product; onAdd: (p: Product) => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/store/${p.id}`} className="aspect-square w-full bg-gray-100 overflow-hidden block">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
      </Link>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base leading-tight line-clamp-2">
          <Link href={`/store/${p.id}`} className="hover:underline">{p.name}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold">{formatGs(p.price)}</span>
          <span className="flex items-center text-sm">
            <Star className="w-4 h-4 mr-1 text-amber-500" /> {p.rating}
          </span>
        </div>
        <Button className="w-full" onClick={() => onAdd(p)}>Agregar al carrito</Button>
      </CardContent>
    </Card>
  )
}

function CartPanel({ items, onRemove, onClear }: { items: CartItem[]; onRemove: (id:number)=>void; onClear: ()=>void }) {
  const total = useMemo(() => items.reduce((acc, i) => acc + i.price * i.qty, 0), [items])
  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <div className="flex items-center justify-between">
          <SheetTitle>Carrito</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Cerrar carrito">
              <X className="w-4 h-4" />
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>
      <div className="flex-1 overflow-auto mt-4 space-y-3 pr-2">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">Tu carrito está vacío.</p>
        )}
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between border rounded-xl p-3">
            <div>
              <p className="text-sm font-medium">{i.name}</p>
              <p className="text-xs text-muted-foreground">{i.qty} × {formatGs(i.price)}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onRemove(i.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-lg font-semibold">{formatGs(total)}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClear}>Vaciar</Button>
          <Button className="flex-1">Finalizar compra</Button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [query, setQuery] = useState("")
  const [items, setItems] = useState<CartItem[]>([])
  const { isOwner } = useMockAuth()

  // Cart persistence for demo
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mockup-cart')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem('mockup-cart', JSON.stringify(items)) } catch {}
  }, [items])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MOCK_PRODUCTS
    return MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(q))
  }, [query])

  const addToCart = (p: Product) => {
    setItems(curr => {
      const found = curr.find(i => i.id === p.id)
      if (found) return curr.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...curr, { id: p.id, name: p.name, price: p.price, qty: 1 }]
    })
  }

  const removeFromCart = (id: number) => setItems(curr => curr.filter(i => i.id !== id))
  const clearCart = () => setItems([])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="font-extrabold tracking-tight text-2xl md:text-3xl bg-gradient-to-r from-primary via-highlight to-accent bg-clip-text text-transparent hover:opacity-90 transition-all duration-200 drop-shadow-sm" aria-label="Ir al inicio">
            Arami Shop
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                aria-label="Buscar productos"
                className="pl-9 w-40 sm:w-64 md:w-80"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Tooltip label="Cambiar tema" side="bottom"><span><ThemeToggle /></span></Tooltip>
            {isOwner && (
              <Sheet>
                <SheetTrigger asChild>
                  <Tooltip label="Administración" side="bottom">
                    <Button variant="secondary" size="icon" aria-label="Admin">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </Tooltip>
                </SheetTrigger>
                <SheetContent className="w-[90vw] sm:w-96 max-w-full">
                  <AdminPanel />
                </SheetContent>
              </Sheet>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Tooltip label="Perfil" side="bottom">
                  <Button variant="secondary" size="icon" aria-label="Perfil">
                    <User className="w-5 h-5" />
                  </Button>
                </Tooltip>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:w-96 max-w-full">
                <ProfilePanel />
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Tooltip label="Carrito" side="bottom">
                  <Button variant="secondary" size="icon" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {items.length > 0 && (
                      <span className="absolute -top-1 -right-1 text-[10px] bg-black text-white rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
                        {items.reduce((a, b) => a + b.qty, 0)}
                      </span>
                    )}
                  </Button>
                </Tooltip>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:w-96 max-w-full">
                <CartPanel items={items} onRemove={removeFromCart} onClear={clearCart} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl p-8 border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm relative overflow-hidden">
          <div className="absolute inset-y-0 -left-8 w-40 bg-gradient-to-b from-primary/15 via-highlight/15 to-accent/15 blur-2xl" />
          <h1 className="text-2xl md:text-3xl font-bold">Explora los mejores productos</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Prototipo en código: ideal para validar layout, grillas y flujo de compra.</p>
          <div className="mt-4 flex gap-2">
            <Button className="px-4" variant="accent">Ver promociones</Button>
            <Button className="px-4" variant="outline">Categorías</Button>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} onAdd={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

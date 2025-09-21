"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Search, Trash2, X, User, Settings } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { ProfilePanel } from '@/components/profile/ProfilePanel'
import { AdminPanel } from '@/components/admin/AdminPanel'
import { useMockAuth } from '@/lib/mockAuth'
import { Tooltip } from '@/components/ui/tooltip'
import { Footer } from '@/components/site/Footer'

export type Product = { id: number; name: string; price: number; rating: number; image: string }

function formatGs(value: number) {
  return new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', maximumFractionDigits: 0 }).format(value)
}

function CartPanel({ items, onRemove, onClear }: { items: any[]; onRemove: (id:number)=>void; onClear: ()=>void }) {
  const total = items.reduce((acc: number, i: any) => acc + i.price * i.qty, 0)
  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <div className="flex items-center justify-between">
          <SheetTitle>Carrito</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Cerrar carrito"><X className="w-4 h-4"/></Button>
          </SheetClose>
        </div>
      </SheetHeader>
      <div className="flex-1 overflow-auto mt-4 space-y-3 pr-2">
        {items.length === 0 && (<p className="text-sm text-muted-foreground">Tu carrito está vacío.</p>)}
        {items.map((i: any) => (
          <div key={i.id} className="flex items-center justify-between border rounded-xl p-3">
            <div>
              <p className="text-sm font-medium">{i.name}</p>
              <p className="text-xs text-muted-foreground">{i.qty} × {formatGs(i.price)}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onRemove(i.id)}><Trash2 className="w-4 h-4"/></Button>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 mt-4 space-y-3">
        <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Total</span><span className="text-lg font-semibold">{formatGs(total)}</span></div>
        <div className="flex gap-2"><Button variant="outline" className="flex-1" onClick={onClear}>Vaciar</Button><Button className="flex-1">Finalizar compra</Button></div>
      </div>
    </div>
  )
}

export default function ProductPageClient({ product }: { product: Product }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<any[]>([])
  const { isOwner } = useMockAuth()

  useEffect(() => {
    try { const raw = localStorage.getItem('mockup-cart'); setItems(raw ? JSON.parse(raw) : []) } catch {}
  }, [])
  useEffect(() => { try { localStorage.setItem('mockup-cart', JSON.stringify(items)) } catch {} }, [items])

  const addAndBack = () => {
    try {
      const idx = items.findIndex(i => i.id === product.id)
      const copy = [...items]
      if (idx >= 0) copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }
      else copy.push({ id: product.id, name: product.name, price: product.price, qty: 1 })
      setItems(copy)
    } catch {}
    router.push('/store')
  }
  const removeFromCart = (id:number) => setItems(prev => prev.filter(i => i.id !== id))
  const clearCart = () => setItems([])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="font-extrabold tracking-tight text-2xl md:text-3xl bg-gradient-to-r from-primary via-highlight to-accent bg-clip-text text-transparent hover:opacity-90 transition-all duration-200 drop-shadow-sm" aria-label="Ir al inicio">Arami Shop</Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input aria-label="Buscar productos" className="pl-9 w-40 sm:w-64 md:w-80" placeholder="Buscar productos..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <Tooltip label="Cambiar tema" side="bottom"><span><ThemeToggle /></span></Tooltip>
            {isOwner && (
              <Sheet>
                <SheetTrigger asChild>
                <Tooltip label="Administración" side="bottom"><Button variant="secondary" size="icon" aria-label="Admin"><Settings className="w-5 h-5"/></Button></Tooltip>
                </SheetTrigger>
                <SheetContent className="w-[90vw] sm:w-96 max-w-full"><AdminPanel /></SheetContent>
              </Sheet>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Tooltip label="Perfil" side="bottom"><Button variant="secondary" size="icon" aria-label="Perfil"><User className="w-5 h-5"/></Button></Tooltip>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:w-96 max-w-full"><ProfilePanel /></SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Tooltip label="Carrito" side="bottom"><Button variant="secondary" size="icon" className="relative"><ShoppingCart className="w-5 h-5" />{items.length>0 && (<span className="absolute -top-1 -right-1 text-[10px] bg-black text-white rounded-full h-5 min-w-5 px-1 flex items-center justify-center">{items.reduce((a,b)=>a+b.qty,0)}</span>)}</Button></Tooltip>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:w-96 max-w-full"><CartPanel items={items} onRemove={removeFromCart} onClear={clearCart} /></SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-lg">{formatGs(product.price)}</span>
              <span className="inline-flex items-center"><Star className="w-4 h-4 mr-1" /> {product.rating}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Descripción corta del producto para la demo. Detalles, materiales, talles/colores en la versión real.</p>
            <div className="flex gap-2 pt-4">
              <Button onClick={addAndBack} className="flex-1">Agregar al carrito</Button>
              <Button variant="outline" className="flex-1" onClick={() => router.push('/store')}>Volver</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

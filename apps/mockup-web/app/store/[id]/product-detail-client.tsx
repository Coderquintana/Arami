"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

export type Product = { id: number; name: string; price: number; rating: number; image: string }

function formatGs(value: number) {
  return new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', maximumFractionDigits: 0 }).format(value)
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter()
  const [adding, setAdding] = useState(false)

  const addAndBack = () => {
    try {
      setAdding(true)
      const raw = localStorage.getItem('mockup-cart')
      const items: any[] = raw ? JSON.parse(raw) : []
      const idx = items.findIndex((i) => i.id === product.id)
      if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + 1 }
      else items.push({ id: product.id, name: product.name, price: product.price, qty: 1 })
      localStorage.setItem('mockup-cart', JSON.stringify(items))
    } catch {}
    router.push('/store')
  }

  useEffect(() => () => setAdding(false), [])

  return (
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
            <Button onClick={addAndBack} disabled={adding} className="flex-1">Agregar al carrito</Button>
            <Button variant="outline" className="flex-1" onClick={() => router.push('/store')}>Volver</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


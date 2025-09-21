export type Product = { id: number; name: string; price: number; rating: number; image: string }

export const PRODUCTS: Product[] = [
  { id: 1, name: "Camisa Oxford", price: 149000, rating: 4.6, image: "https://picsum.photos/id/1060/1200/1200" },
  { id: 2, name: "Pantalón Chino", price: 199000, rating: 4.4, image: "https://picsum.photos/id/1069/1200/1200" },
  { id: 3, name: "Zapatillas Urban", price: 329000, rating: 4.8, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, name: "Campera Denim", price: 289000, rating: 4.5, image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" },
  { id: 5, name: "Gorra Classic", price: 69000, rating: 4.2, image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop" },
  { id: 6, name: "Mochila Canvas", price: 239000, rating: 4.7, image: "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1200&auto=format&fit=crop" },
]

export function getProduct(id: number): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}


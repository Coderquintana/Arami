import { getProduct } from '@/lib/products'
import ProductPageClient from './product-page-client'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const product = getProduct(id)
  if (!product) return <div className="max-w-4xl mx-auto p-6">Producto no encontrado.</div>
  return <ProductPageClient product={product} />
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <section className="rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Mockup Arami Store</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Vista preliminar para validar layout, tema y flujo de compra.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/store" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:bg-blue-700">Ver tienda</a>
          <a href="/store" className="inline-flex items-center rounded-md border px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">Abrir demo (perfil/admin)</a>
          <span className="inline-flex items-center rounded-md bg-highlight/10 text-highlight px-3 py-1 text-sm font-medium">Nuevo esquema de color</span>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
          <h3 className="font-semibold">Catálogo + filtros</h3>
          <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">Grilla responsive, búsqueda y precios en guaraní. Imágenes optimizadas.</p>
        </div>
        <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
          <h3 className="font-semibold">Carrito</h3>
          <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">Panel lateral con persistencia local y total automático.</p>
        </div>
        <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
          <h3 className="font-semibold">Perfil / Admin</h3>
          <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">Inicio demo de dueño y panel Admin (mock). Integración real con Keycloak.</p>
        </div>
      </section>
    </main>
  )
}

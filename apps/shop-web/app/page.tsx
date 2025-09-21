export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold text-primary">Arami Store</h1>
      <p className="mt-2 text-gray-600">Base del frontend real. Estructura lista para features.</p>
      <div className="mt-6 grid gap-4">
        <section className="rounded-lg border bg-white p-4">
          <h2 className="font-semibold">Siguientes pasos</h2>
          <ul className="list-disc pl-6 text-sm mt-2">
            <li>Configurar autenticación (Keycloak).</li>
            <li>Catálogo y carrito conectados a API.</li>
            <li>UI y diseño finales.</li>
          </ul>
        </section>
      </div>
    </main>
  )
}


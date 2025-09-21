# Frontend: estructura y propósito

Apps
- `apps/mockup-web`: Mock para validar UI/UX. Incluye:
  - Grilla `/store` y detalle `/store/[id]` con imágenes placeholder.
  - Carrito con persistencia localStorage y panel lateral (Sheet) con overlay.
  - Tema light/dark (toggle), tooltips, y color `highlight` (violeta) adicional.
  - Perfil y Admin de demostración (paneles), footer con links y redes.
  - Botón marca “Arami Shop” clickeable al inicio, degradado y tipografía destacada.
- `apps/shop-web`: esqueleto del front real para integrar auth y APIs.

Uso rápido
- Mockup: `pnpm --filter mockup-web dev` (puerto 3100)
- Front real: `pnpm --filter shop-web dev` (puerto 3001)

Componentes internos relevantes (mockup)
- `components/ui/sheet.tsx`: drawer simple con contexto, overlay, cierre por click fuera y Escape.
- `components/ui/tooltip.tsx`: tooltip accesible; ahora reenvía props para funcionar con `asChild`.
- `components/theme/ThemeToggle.tsx`: toggle dark/light con persistencia en localStorage.
- `components/profile/ProfilePanel.tsx`: acciones “Iniciar sesión (demo dueño)” y “Crear cuenta (Keycloak)”.
- `components/admin/AdminPanel.tsx`: accesos de admin demo y “Cerrar sesión (demo)”.
- `components/site/Footer.tsx`: redes, acerca de, ayuda y atención.

Convenciones
- TypeScript estricto.
- Tailwind (darkMode: 'class'). Tokens en `tailwind.config.ts` (primary, secondary, accent, highlight).
- Alias `@/*` resuelto por `baseUrl` en `tsconfig` de cada app.
- Mockup no integra APIs reales; todo lo que tenga side effects pasa por localStorage.

Próximos pasos sugeridos
- En `shop-web`: integrar Keycloak (next-auth), proteger rutas `(admin)` y consumir APIs de catálogo/ordenes.
- Extraer UI común a `packages/ui` y tipos a `packages/shared`.

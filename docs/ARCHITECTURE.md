# Architecture overview (Arami)

Visión general del monorepo y los módulos actuales/planeados.

Monorepo
- `apps/`
  - `mockup-web` (Next.js 14 + Tailwind): demo UI con carrito, detalle, dark/light, tooltips, perfil y admin demo.
  - `shop-web` (Next.js 14 + Tailwind): esqueleto del front real para integrar auth y APIs.
- `services/`
  - `svc-customer`: Spring Boot 3 (JPA/Flyway) — clientes (base actual).
  - Planeados: `svc-catalog` (productos/categorías/variantes), `svc-order` (órdenes/checkout).
- `packages/`: código compartido (ej. tipos TypeScript) — placeholder actual.
- `infra/`: docker-compose (Keycloak, MinIO, pgAdmin) y `.env.example`.
- `docs/`: documentación central (esta carpeta).

Frontend
- Stack: Next.js 14 (App Router), TypeScript, Tailwind.
- Diseño: tokens en `tailwind.config.ts`, modo `darkMode: 'class'` y `highlight` color.
- Componentes propios: Sheet (drawer), Tooltip, ThemeToggle, ProfilePanel, AdminPanel, Footer.
- Estado del mockup: persistencia de carrito (localStorage) y rutas `/store` y `/store/[id]`.

Auth (a integrar en `shop-web`)
- Keycloak como IdP (OIDC + PKCE), next-auth como integración recomendada.
- Roles de negocio: `owner`, `staff`, `customer`.
- Login social via Google (broker en Keycloak).

Backend
- Spring Boot 3, Postgres, Flyway, Springdoc OpenAPI.
- Módulos futuros: catálogo (MinIO para media), órdenes (pagos Stripe/Mercado Pago).

Dev Tooling
- pnpm workspaces (node_modules hoisteado en la raíz por diseño).
- Maven para Java.
- Testcontainers recomendado para integración de DB.


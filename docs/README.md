# Documentation

Fuente única de verdad para este monorepo. Lee estos archivos para entender el estado actual (mockup), cómo correrlo, y el plan a futuro.

Índice rápido
- ARCHITECTURE.md — visión general de la arquitectura y módulos
- ONBOARDING.md — cómo arrancar rápido (mockup, infra opcional)
- RUNBOOKS.md — guías de operación y troubleshooting
- AUTH.md — configuración de Keycloak (realm, clientes, Google)
- frontend-structure.md — detalles del mockup y estructura del front
- costs.md — costos y tamaños estimados (DB, logs, storage, compute)
- notion/notion_tasks_import.csv — backlog de épicas y tareas con estimaciones
- notion/NOTION_IMPORT_README.md — cómo importar en Notion

Notas
- Los documentos de la raíz fueron movidos a `docs/root/` (README.dev.md, PROJECTS_PLAN.md).
- Las dependencias de Node están hoisteadas en `node_modules` de la raíz por pnpm (intencional).

Estado actual (demo)
- Mockup listo en `apps/mockup-web`: grilla, detalle, carrito con persistencia local, tema light/dark, tooltips, perfil y admin de demostración, footer informativo.
- Front real `apps/shop-web`: esqueleto para integrar auth y APIs.
- Backend principal actual: `services/svc-customer` (Spring Boot). Próximos: `svc-catalog`, `svc-order`.

Siguientes pasos sugeridos
- Integrar auth real en `shop-web` con Keycloak (next-auth, PKCE).
- Implementar `svc-catalog` y `svc-order` con Flyway y MinIO.
- CI/CD, observabilidad (logs/métricas/Sentry) y SEO.

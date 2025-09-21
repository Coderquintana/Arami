# AramiStack Monorepo

**Apps**
- pps/mockup-web (Next.js + Tailwind) — Mock de UI para validar con cliente
- pps/shop-web (Next.js + Tailwind) — Frontend real listo para integrar APIs

**Services**
- services/svc-customer (Spring Boot 3 + PostgreSQL + Flyway + springdoc-openapi)

**Infra**
- infra/docker-compose.yml (Postgres, Keycloak, MinIO)

## Quick start
`ash
# 1) Node + pnpm
corepack enable && corepack prepare pnpm@9.0.0 --activate
pnpm i

# 2) Infra
cd infra
cp .env.example .env
docker compose up -d

# 3) Frontend
# Mockup (puerto 3100)
cd ../apps/mockup-web
pnpm i
pnpm dev

# Front real (puerto 3001)
cd ../apps/shop-web
pnpm i
pnpm dev

# 4) Backend
cd ../../services/svc-customer
./mvnw spring-boot:run
# Swagger UI: http://localhost:8080/swagger-ui/index.html
`

## Documentación
- docs/frontend-structure.md — Estructura y convenciones del frontend.

## Notas
- Keycloak es open source (Apache 2.0) y puedes usarlo sin costo.
- Variables y código en inglés. Documentación en español.

## Política de ramas sugerida
- main: protegido, siempre verde, merge vía PR
- develop: rama de integración (opcional)
- eature/*, ix/*, elease/*, hotfix/*

PR workflow & commits
- PRs con al menos una revisión y CI verde
- Conventional Commits (e.g. eat(cart): add checkout flow)

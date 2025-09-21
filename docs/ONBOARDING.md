# Onboarding

Arranque rápido para demo (mockup) y entorno completo.

Requisitos
- Node 18+ y pnpm (`corepack enable && corepack prepare pnpm@9 --activate`)
- Docker (para infra opcional)
- Java 21 (para backend)

Mockup (solo frontend)
1) Instalar dependencias en raíz: `pnpm i`
2) Variables (opcional para ver pantallas reales de Keycloak):
   - `apps/mockup-web/.env.local` ya creado con:
     - `NEXT_PUBLIC_KEYCLOAK_BASE_URL=http://localhost:8081`
     - `NEXT_PUBLIC_KEYCLOAK_REALM=arami`
     - `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=shop-web`
3) Correr: `pnpm --filter mockup-web dev` → http://localhost:3100

Infra local (opcional)
1) `cd infra && cp .env.example .env`
2) `docker compose up -d` (Keycloak en 8081, MinIO en 9000/9001, pgAdmin en 5050)

Backend (svc-customer)
1) Crear DB y usuario si aplica (ver `application.yml`)
2) `cd services/svc-customer && ./mvnw spring-boot:run`
3) Swagger UI: http://localhost:8080/swagger-ui/index.html

Frontend real (esqueleto)
- `pnpm --filter shop-web dev` (puerto 3001)

Problemas comunes
- Puerto ocupado 3000/3100: usar `Get-NetTCPConnection -LocalPort 3100` y `taskkill /F /PID <PID>`
- Next muestra error leyendo archivo en `[id]` (Windows): reiniciar `pnpm dev`
- Keycloak "invalid redirect_uri": en el cliente `shop-web` agregar `http://localhost:3100/*` en "Valid Redirect URIs" y `http://localhost:3100` en Web Origins.


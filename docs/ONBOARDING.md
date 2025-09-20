# Onboarding

Quick start for new developers:

1. Install prerequisites
   - Java 17+ (JDK)
   - Maven
   - Node 18+ and pnpm
   - Docker (for local infra)

2. Setup local infra (recommended)
   - Copy `infra/.env.example` to `infra/.env` and adjust credentials if needed
   - Start infra: `cd infra; docker compose up -d`

3. Backend (svc-customer)
   - Create local DB and role (example):
     - `psql -U postgres -c "CREATE ROLE arami WITH LOGIN PASSWORD 'aramidb'; CREATE DATABASE aramidb OWNER arami;"`
   - Run service (dev profile):
     - `cd services/svc-customer; mvn -DskipTests spring-boot:run -Dspring-boot.run.profiles=dev`

4. Frontend
   - `cd apps/arami-web; pnpm install; pnpm dev`

5. Troubleshooting
   - If Flyway complains about unsupported DB, run `DbVersionProbe` (see docs) and ensure `flyway-database-postgresql` is present in `pom.xml`.


# Runbooks

- Local dev runbook
  - Start infra: `cd infra; cp .env.example .env; docker compose up -d`
  - Mockup: `pnpm --filter mockup-web dev` (http://localhost:3100)
  - Backend: `cd services/svc-customer; ./mvnw spring-boot:run`

- Flyway troubleshooting
  - If Flyway errors with unsupported DB, run `DbVersionProbe` and check JDBC driver version
  - Ensure `org.flywaydb:flyway-database-postgresql` is added to `pom.xml` and `flyway-core` pinned to a compatible version

- Tests
  - Unit tests: `mvn test` in service modules
  - Integration tests: use Testcontainers or local Postgres

- Next.js issues (Windows)
  - If Next fails with "Failed to read source code ... [id]/file": restart `pnpm dev` (watcher hiccup with bracket folders on Windows).
  - If ports 3000/3100 are busy: `Get-NetTCPConnection -LocalPort 3100 | Select-Object -Unique OwningProcess,State`; `taskkill /F /PID <PID>`.

- Keycloak errors
  - `invalid redirect_uri`: ensure the client has `http://localhost:3100/*` in "Valid Redirect URIs" and web origin `http://localhost:3100`. The mockup uses `redirect_uri` with trailing slash.


# Runbooks

- Local dev runbook
  - Start infra: `cd infra; cp .env.example .env; docker compose up -d`
  - Ensure DB exists and credentials match `application-dev.yml` for local dev profile
  - Start backend: `cd services/svc-customer; mvn -DskipTests spring-boot:run -Dspring-boot.run.profiles=dev`

- Flyway troubleshooting
  - If Flyway errors with unsupported DB, run `DbVersionProbe` and check JDBC driver version
  - Ensure `org.flywaydb:flyway-database-postgresql` is added to `pom.xml` and `flyway-core` pinned to a compatible version

- Tests
  - Unit tests: `mvn test` in service modules
  - Integration tests: use Testcontainers or local Postgres


# Architecture overview (Arami)

This document provides a high-level overview of the Arami monorepo architecture.

- Monorepo structure
  - apps/: Frontend applications (Next.js)
  - services/: Backend services (Spring Boot)
  - packages/: Shared packages (TypeScript shared dtos)
  - infra/: Local infra (docker-compose, .env examples)
  - docs/: Documentation and runbooks

- Service: svc-customer
  - Spring Boot 3 service, Flyway migrations in `src/main/resources/db/migration`
  - Local dev profile: `application-dev.yml` (disables Flyway, uses Hibernate `ddl-auto: update`)
  - Diagnostic probe: `DbVersionProbe.java` to check JDBC metadata

- Dev tooling
  - pnpm workspace for JS packages
  - Maven for Java services
  - Recommend Testcontainers for integration tests that require Postgres


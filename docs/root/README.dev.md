Local dev notes — run without Flyway

This service normally runs with Flyway migrations enabled in production. For local development (no Docker, quick iteration) you can use the `dev` Spring profile which disables Flyway and lets Hibernate update the schema automatically.

Run instructions (PowerShell / cmd):

# Using Maven
cd services\svc-customer
mvn -Dspring-boot.run.profiles=dev -DskipTests spring-boot:run

# Or build and run
cd services\svc-customer
mvn -DskipTests package
mvn -Dspring-boot.run.profiles=dev spring-boot:run

Notes:
- This is intended for local development only. Do NOT use `dev` profile in production.
- Keep Flyway and migrations for CI/production deployments to preserve schema history and safety.


```instructions
¡Bienvenido! Este archivo ofrece instrucciones concretas y accionables para agentes AI que trabajen en el monorepo AramiStack.

Mantén la guía breve y centrada en patrones detectables en el código.

- Estructura del monorepo
  - `apps/arami-web`: Next.js (React + Tailwind). Desarrollo: `pnpm dev` (puerto 3000).
  - `services/svc-customer`: servicio Spring Boot 3 (Postgres, Flyway, springdoc). Clase principal: `com.arami.customer.CustomerApplication`.
  - `packages/shared`: paquete TypeScript pequeño usado por el frontend. Compilar con `pnpm --filter @aramistack/shared build`.
  - `infra/docker-compose.yml`: infra local para Postgres, Keycloak, MinIO y pgAdmin. Copiar `.env.example` a `.env` antes de `docker compose up`.

- Notas de compilación y ejecución (extraídas de `README.md`)
  - Habilita pnpm vía corepack e instala dependencias: `corepack enable; corepack prepare pnpm@9.0.0 --activate; pnpm i`.
  - Levanta la infra: `cd infra; cp .env.example .env; docker compose up -d`.
  - Frontend: `cd apps/arami-web; pnpm i; pnpm dev`.
  - Backend (`svc-customer`): usar el wrapper de Maven: `cd services/svc-customer; ./mvnw spring-boot:run` (en Windows usar `mvnw.cmd`).

- Arquitectura del servicio (qué esperar)
  - `svc-customer` sigue una estructura en capas típica: controladores REST en `web/`, interfaces de servicio en `service/` más implementaciones en `service/impl/`, repositorios Spring Data en `repo/`, entidades JPA en `model/`, DTOs en `dto/`.
  - Persistencia: PostgreSQL configurado en `services/svc-customer/src/main/resources/application.yml`. Las migraciones Flyway están en `src/main/resources/db/migration` (ej. `V1__init.sql`).
  - Documentación API: springdoc OpenAPI disponible en `/swagger-ui/index.html` cuando el servicio esté corriendo (puerto 8080).

- Patrones y convenciones de código (ejemplos concretos)
  - Los DTOs usan `record` de Java (ver `CreateCustomerDTO`). Validación con Jakarta (`@NotBlank`, `@Email`).
  - Entidades usan Lombok + JPA; los timestamps se gestionan con `@PrePersist` / `@PreUpdate` en la entidad `Customer`.
  - Los repositorios extienden `JpaRepository` y el mapeo entidad→DTO se hace en la capa de servicio (ver `CustomerServiceImpl#toDTO`).
  - Paginación: los endpoints de lista usan `Pageable` de Spring Data (`CustomerController#list`).

- Integración e infra esperada
  - El desarrollo local asume servicios de `infra/docker-compose.yml`: Postgres en `jdbc:postgresql://localhost:5432/aramidb` con credenciales en `.env`.
  - Keycloak está presente pero no obligatorio: no hay configuración de seguridad aplicada en `svc-customer`, así que tratarlo como opcional.

- Flujos de trabajo y advertencias para desarrolladores
  - Wrapper de Maven en Windows: ejecutar `mvnw.cmd spring-boot:run` (no `./mvnw`).
  - DDL de base de datos: `spring.jpa.hibernate.ddl-auto` está en `validate`. Cualquier cambio de esquema requiere una migración Flyway en `services/svc-customer/src/main/resources/db/migration`.
  - Al añadir endpoints o campos: actualizar los `record` DTO, las firmas del controlador, la implementación del servicio y añadir migración Flyway si hay cambios en la BD.

- Preferir cambios pequeños y localizables
  - Mantén las firmas de las interfaces de servicio estables. Actualiza `impl` y `web` en la misma PR para evitar incompatibilidades en tiempo de ejecución.
  - Para mapear DTO→entidad, sigue el patrón en `CustomerServiceImpl`: construir la entidad (Lombok builder), guardar con el repo y mapear a DTO incluyendo las marcas temporales con `toString()`.

- Archivos útiles para revisar
  - `README.md` (quickstart)
  - `infra/docker-compose.yml` (requisitos de infra local)
  - `services/svc-customer/src/main/resources/application.yml` (config DB, Flyway, server)
  - `services/svc-customer/src/main/java/com/arami/customer/*` (controllers, service, repo, model, dto)
  - `apps/arami-web/package.json` y `packages/shared/package.json` (build frontend y paquete compartido)

- Sugerencias accionables que puede proponer un agente AI
  - Al introducir una nueva columna en la BD, añade un archivo de migración Flyway en `services/svc-customer/src/main/resources/db/migration` con nombre `V<number>__descripcion.sql`.
  - Para nuevos endpoints REST: crea el método en el controlador bajo `web/`, añade la firma en la interfaz en `service/` y su implementación en `service/impl/`.
  - Si cambias credenciales o puertos, actualiza `infra/.env.example` y `infra/docker-compose.yml` para mantener consistencia en desarrollo.

Si quieres que amplíe alguna parte (más detalles del frontend, más notas de infra o instrucciones de CI), dime cuál y lo extiendo.
```

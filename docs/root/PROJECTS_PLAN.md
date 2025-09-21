Plan de trabajo para proyectos: Tienda de Ropa (Project 1) y Veterinaria (Project 2)

Resumen (en español, code/variables en inglés):

1) Objetivos generales
- Construir dos aplicaciones separadas (frontend + backend) con máxima reutilización en servicios y paquetes compartidos.
- Arquitectura: monorepo con apps/ (frontends), services/ (microservices), packages/ (shared libs).
- Priorizar: escalabilidad, testability, y código autodescriptivo.

2) Tech stack recomendado
- Frontend: Next.js + React + TypeScript + Tailwind CSS. Storybook para componentes.
- Backend: Spring Boot 3 (Java 17+), Spring Data JPA, Flyway for migrations, PostgreSQL.
- Auth: Keycloak for OAuth2/OpenID Connect (local dev optional). UI: Keycloak adaptors / Spring Security.
- Shared packages: TypeScript package for DTOs/UI tokens in packages/shared.
- Dev infra: Docker Compose for Postgres, Keycloak, MinIO (optional for local dev). Prefer host Postgres for some dev flows if needed.
- CI: GitHub Actions (build, tests, docker image push if needed).

3) Project structure (monorepo)
- apps/
  - store-web/ (Next.js)
  - vet-web/ (Next.js) [optional later]
- services/
  - svc-customer/ (Spring Boot)
  - svc-product/ (Spring Boot)
  - svc-order/ (Spring Boot)
- packages/
  - shared/ (TypeScript DTOs, design tokens)
- infra/ (docker-compose.yml, .env.example)

4) Reutilización entre proyectos
- Shared business DTOs and validation rules in `packages/shared` (TypeScript) and a Java equivalent or generated artifacts.
- Shared authentication model (Keycloak realm + roles) across services.
- Reusable microservices: customer service can be reused between store and vet (CRUD customers).

5) Features MVP (store)
- User auth (signup/login) — local dev with Keycloak or mocked auth.
- Product catalog (list, details, categories).
- Shopping cart + checkout (orders, payments mocked).
- Admin panel for product CRUD.
- Customer CRUD (shared service)

6) Features MVP (vet)
- Pet owner management (reuse customer service patterns)
- Pet records (pets per owner)
- Appointments scheduling
- Services and invoicing

7) Design system & mockups in VS Code (no Figma)
- Use Tailwind + Storybook: build components (Button, Card, Form, etc.) directly in React.
- Palette suggestion (example):
  - Primary: #0B5FFF (blue)
  - Secondary: #FF6B6B (salmon)
  - Accent: #00B894 (green)
  - Neutral: #F8FAFC (bg), #111827 (text)
- Create a `packages/ui` or `packages/shared/design-tokens` with token files.

8) Auth & security
- Keycloak for production; for local dev: ability to run a local Keycloak container or mock JWTs for quicker dev.
- Services use OAuth2 Resource Server (Spring Security) with token introspection/JWKs.

9) Developer workflow & tools
- Use GitHub (free) for repo and Issues/Projects for tracking; Notion for richer docs if desired.
- Branch strategy: main (protected), develop (optional), feature/*, hotfix/*.
- Use VS Code with Copilot/Codex; install ESLint/Prettier and Java tooling.

10) CI/CD
- GitHub Actions:
  - Build & test Java modules + lint frontends
  - Build images and push to registry (optional)
  - Deploy jobs for staging/prod (manual approvals)

11) Embedded AI & context
- Keep a repo-level `AI_CONTEXT.md` with important prompts and system instructions.
- Use Copilot for coding assistance; use a local tool or external LLM to analyze source (requires paid ChatGPT features or private LLM).

12) Documentation & artifacts
- Use Markdown in repo for docs. Export to DOCX if needed.
- Maintain CHANGELOG and migration guides.

13) Next steps (first week)
- Initialize monorepo skeleton in Git and push to GitHub.
- Scaffold `apps/store-web` (Next.js) and `services/svc-customer` (already present) to sync DTOs.
- Create shared package with design tokens and DTOs.

---

Si quieres, ahora creo el primer commit y preparo instrucciones para subir a GitHub. Dime si quieres que lo haga ahora y qué nombre de repositorio prefieres (o si quieres que cree 2 repos: `store` y `vet`, o uno monorepo `aramistack`).


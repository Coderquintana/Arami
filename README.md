# AramiStack Monorepo

**Apps**
- `apps/arami-web` (Next.js + Tailwind)
- (futuro) `apps/bachvet-web`

**Services**
- `services/svc-customer` (Spring Boot 3 + PostgreSQL + Flyway + springdoc-openapi)

**Infra**
- `infra/docker-compose.yml` (Postgres, Keycloak, MinIO)

## Quick start
```bash
# 1) Node + pnpm
corepack enable && corepack prepare pnpm@9.0.0 --activate
pnpm i

# 2) Infra
cd infra
cp .env.example .env
docker compose up -d

# 3) Frontend
cd ../apps/arami-web
pnpm i
pnpm dev

# 4) Backend
cd ../../services/svc-customer
./mvnw spring-boot:run
# Swagger UI: http://localhost:8080/swagger-ui/index.html
```

## Notes
- Keycloak es **gratis** y open source (Apache 2.0). Puedes usarlo sin costo.
- Variables y código en **inglés**. Documentación en español.

## Git & GitHub quick push (commands)

1) Create repo on GitHub (example using gh CLI):

```bash
# Replace <YOUR-ORG> and <REPO> with your values
gh repo create <YOUR-ORG>/<REPO> --public --confirm
```

2) From repository root, push all files:

```bash
git init
git add .
git commit -m "chore: initial monorepo import"
git branch -M main
git remote add origin git@github.com:<YOUR-ORG>/<REPO>.git
git push -u origin main
```

If you prefer HTTPS:

```bash
git remote add origin https://github.com/<YOUR-ORG>/<REPO>.git
git push -u origin main
```

## Suggested branch policy

- `main`: protected, always green, merged only via PR
- `develop`: integration branch (optional)
- `feature/*`: feature branches
- `fix/*`: bugfix branches
- `release/*` and `hotfix/*` as needed

PR workflow & commit style
- Open a PR from `feature/*` into `develop` (or `main` if you skip `develop`)
- Require at least one review and passing CI
- Use Conventional Commits (e.g. `feat(cart): add checkout flow`)

## Useful GitHub settings
- Enable Actions and Dependabot
- Protect `main` with required status checks and reviews
- Add `CODEOWNERS` for critical areas

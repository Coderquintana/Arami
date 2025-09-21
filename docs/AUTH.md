# Autenticación (Keycloak)

Esta guía resume cómo configurar Keycloak para el proyecto y cómo usarlo desde el mockup y el frontend real.

## 1) Puertos y entorno
- En `infra/.env.example` está `KEYCLOAK_PORT=8081` y `docker-compose.yml` mapea `${KEYCLOAK_PORT}:8080`.
- Arrancar: `cd infra && cp .env.example .env && docker compose up -d`
- Consola de Admin: `http://localhost:8081` (admin/admin en ejemplo)

## 2) Realm y clientes (JSON de importación)
Importa este JSON al crear el realm (pantalla “Add realm” → Upload JSON):

```
{
  "realm": "arami",
  "enabled": true,
  "registrationAllowed": true,
  "loginWithEmailAllowed": true,
  "sslRequired": "none",
  "roles": { "realm": [{ "name": "owner" }, { "name": "staff" }, { "name": "customer" }] },
  "clients": [
    {
      "clientId": "shop-web",
      "name": "Shop Web",
      "protocol": "openid-connect",
      "publicClient": true,
      "standardFlowEnabled": true,
      "directAccessGrantsEnabled": true,
      "attributes": { "pkce.code.challenge.method": "S256" },
      "redirectUris": [ "http://localhost:3100/*", "http://localhost:3001/*" ],
      "webOrigins": [ "http://localhost:3100", "http://localhost:3001" ],
      "rootUrl": "http://localhost:3100"
    },
    {
      "clientId": "shop-api",
      "name": "Shop API",
      "protocol": "openid-connect",
      "publicClient": false,
      "serviceAccountsEnabled": true,
      "standardFlowEnabled": false,
      "directAccessGrantsEnabled": false
    }
  ]
}
```

## 3) Mockup: abrir pantallas reales de Keycloak
- `apps/mockup-web/.env.local` contiene:
  - `NEXT_PUBLIC_KEYCLOAK_BASE_URL=http://localhost:8081`
  - `NEXT_PUBLIC_KEYCLOAK_REALM=arami`
  - `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=shop-web`
- El mockup genera `redirect_uri=http://localhost:3100/` (con barra final) para que coincida con `http://localhost:3100/*`.

## 4) Front real (shop-web)
- Integración recomendada: `next-auth` con provider OIDC de Keycloak (PKCE + state).
- Middleware para proteger rutas `(admin)` según rol en el JWT.

## 5) Google Sign‑In (opcional)
1) Google Cloud Console → OAuth Client (Web)
2) Redirect URI en Keycloak: `http://localhost:8081/realms/arami/broker/google/endpoint`
3) Keycloak → Identity Providers → Google → pegar Client ID/Secret → listo.

## 6) Backend (Spring Boot)
- Configurar como Resource Server (JWT): `spring-boot-starter-oauth2-resource-server`.
- `jwk-set-uri`: `http://localhost:8081/realms/arami/protocol/openid-connect/certs`.
- Convertir roles de `realm_access.roles` en `ROLE_*` para `hasRole`.


# Observabilidad

Objetivo: tener visibilidad de salud, performance y errores.

## Logs
- Formato JSON por servicio (Spring: logback encoder JSON, Front: consola y/o Sentry breadcrumb).
- Correlación: incluir `traceId`/`spanId` (Spring Sleuth o Micrometer Tracing).
- Retención (prod): 15 días; staging: 7; dev: 2.
- Almacenamiento: local con rotación o servicio gestionado (ELK/Logtail/Datadog).

## Métricas
- Spring Actuator: `/actuator/health`, `/actuator/metrics`.
- Dashboards mínimos: CPU/RAM, 5xx por minuto, latencia p95, tasa de errores, consumo DB.

## Errores (Frontend)
- Sentry (o similar): capturar errores JS, performance (web vitals) y trazar enlaces con backend si es posible.

## Alertas
- Reglas iniciales: 5xx elevado, latencia p95 alta, errores de pago, tasa de carrito abandonado.
- Notificaciones: email/Slack.


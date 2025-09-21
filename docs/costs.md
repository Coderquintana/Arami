# Costos, Tamaños y Capacidad (Borrador)

Este documento ayuda a presupuestar infraestructura, almacenamiento y operación por entorno.

## Supuestos
- Catálogo: 2.000 productos (4 variantes promedio por producto, 3 imágenes por variante)
- Visitas: 30k/mes, 300 usuarios concurrentes pico
- Órdenes: 1.500/mes (pico 150/día)
- Logs: JSON estructurado, nivel INFO en prod, DEBUG en dev
- Retención de logs: 15 días en prod, 7 días en staging, 2 días en dev

## Tamaño de Base de Datos (estimación)
- Producto (fila): ~1,5 KB (nombre, slug, descripciones, precios indexados)
- Variante (fila): ~0,6 KB (atributos: talla, color, SKU, stock)
- Imagen (fila): ~0,2 KB (solo metadatos + URL a MinIO)
- Orden (encabezado): ~1,2 KB; Item de orden: ~0,5 KB

Estimación total (sin índices):
- Productos: 2.000 × 1,5 KB ≈ 3 MB
- Variantes: 8.000 × 0,6 KB ≈ 4,8 MB
- Imágenes: 24.000 × 0,2 KB ≈ 4,8 MB
- Órdenes (año): 18.000 × (1,2 KB + 3×0,5 KB) ≈ 18.000 × 2,7 KB ≈ 48,6 MB
- Índices + overhead: +50% margen

Total aproximado año 1: ~90–120 MB (DB). Margen recomendado: 0,5–1 GB para crecer sin fricción.

## Almacenamiento de Imágenes (MinIO/S3)
- 3 imágenes × 300 KB promedio × 8.000 variantes ≈ 6,8 GB
- +20% thumbnails/derivados ≈ 8 GB
- Recomendación: bucket con lifecycle (archivar/expirar originales si corresponde)

## Logs (por servicio)
- Promedio 1 KB/log × 3 logs por request × 30k req/día pico ≈ 90 MB/día
- Con retención 15 días: ~1,3 GB por servicio; con 3 servicios ≈ 4 GB
- Opciones: 
  - Local + rotación (barato, simple)
  - Envío a servicio gestionado (Datadog/Logtail/ELK) con costo por GB

## Costos aproximados (mensual, referencia)
Los valores dependen del proveedor. A continuación, una guía de orden de magnitud:

- Base de datos (Postgres gestionado, 1–2 vCPU, 2–4 GB RAM, 20–50 GB SSD): USD 30–80
- Compute backend (2 instancias pequeñas): USD 20–50
- Frontend (Vercel/Netlify plan Pro básico): USD 20–40
- Storage S3/MinIO (10–20 GB + transferencia): USD 1–5
- CDN (transferencia moderada): USD 5–20
- Logs gestionados (5 GB/mes): USD 10–40
- Monitoreo/APM básico: USD 0–40

Rango sugerido para producción: USD 100–250/mes (MVP) + staging/dev (USD 20–60/mes).

## Recomendaciones
- Empezar con tamaños pequeños y auto‑escalado donde sea posible.
- Definir políticas de retención de datos y logs desde el inicio.
- Medir tráfico real las primeras 2–4 semanas y recalibrar recursos.
- Usar alertas de presupuesto y dashboards de métricas.


# SPEC 03 — Proyectos en cuadrícula de tarjetas

**Estado:** Aprobado
**Depende de:** SPEC 01, SPEC 02
**Fecha:** 2026-09-22
**Objetivo:** Reemplazar el layout de filas de `ProjectsSection` (una fila por proyecto) por una cuadrícula de tarjetas en filas y columnas, con el mismo lenguaje visual que "Todas las entradas" en `BlogView`.

## Alcance

**Dentro:**
- `ProjectsSection.vue` (Home) cambia de una lista de filas (`grid-cols-[96px_1.2fr_1fr]`) a una cuadrícula de tarjetas: `grid grid-cols-3 gap-[22px]` en escritorio, `grid-cols-2` en `max-desk` — mismos breakpoints y espaciado que la cuadrícula "Todas las entradas" de `BlogView.vue`.
- Cada tarjeta reutiliza la estructura visual de las tarjetas de blog: borde `border-line-card`, fondo `bg-card`, hover `hover:border-accent/55 hover:bg-card-hover`, bloque de imagen tipo cover arriba (mismo placeholder rayado con el texto "Captura del proyecto", ya usado hoy en la fila) y contenido debajo (`px-[26px] pt-[26px] pb-[30px]`, `flex flex-col gap-3`).
- Contenido de cada tarjeta: título del proyecto, descripción, tags (mismos pills con borde que ya existen), y — si el proyecto tiene `url` — un enlace "Ver proyecto →" al final de la tarjeta.
- El número identificador ("01", "02", "03") que hoy aparece en cada fila se elimina; no se traslada a la tarjeta nueva.
- Cuando `project.url` está definido, la tarjeta completa es clickeable: `<a :href="project.url" target="_blank" rel="noopener">` envolviendo la tarjeta (igual patrón que `RouterLink` envolviendo la tarjeta de blog), con el label "Ver proyecto →" visible al final. Cuando `project.url` es `undefined`, la tarjeta se renderiza como `<div>` (no clickeable), sin el label "Ver proyecto →" y sin estilos de hover de link (mantiene el hover visual de tarjeta pero no cursor de link).
- `v-reveal="i"` se mantiene en cada tarjeta (stagger ya definido en SPEC 02), ahora aplicado al elemento de la tarjeta en la cuadrícula en vez de a la fila.
- El slot `aside` de `SectionWrapper` ("Contenido de ejemplo — pendiente de reemplazar") se mantiene sin cambios.

**Fuera (para otro spec si se decide):**
- Cambios al tipo `Project` (`src/types/project.ts`): el campo `url?: string` ya existe en el tipo actual, no se modifica.
- Cargar valores reales de `url` en `src/data/projects.ts` para los 3 proyectos existentes: queda fuera de este spec; los 3 proyectos actuales no tienen `url` definida, así que sus tarjetas se renderizarán como no-clickeables hasta que se agregue el dato en el futuro.
- Página o ruta de detalle de proyecto (`/proyectos/:id` o similar): no se crea, los proyectos siguen sin vista propia.
- Imágenes reales de captura de proyecto: se mantiene el mismo placeholder rayado que ya existe hoy.
- Cambios a `BlogView.vue` o a la cuadrícula "Todas las entradas": solo se usa como referencia visual, no se toca.
- Cambios al layout responsive general de `HomeView` fuera de `ProjectsSection`.

## Modelo de datos

No se introduce ningún modelo de datos nuevo. El tipo `Project` (`src/types/project.ts`) ya incluye `url?: string`, campo que esta spec empieza a consumir en el template pero no modifica ni rellena con datos.

## Plan de implementación

1. Reescribir el `<template>` de `src/components/home/ProjectsSection.vue`:
   - Cambiar el contenedor de `flex flex-col gap-px border border-line-card bg-line-card` (lista) a `grid grid-cols-3 gap-[22px] max-desk:grid-cols-2` (cuadrícula), quitando el borde/gap compartido tipo lista.
   - Por cada `project`, renderizar una tarjeta: si `project.url` existe, raíz `<a>` con `href`, `target="_blank"`, `rel="noopener"` y clases de link (`text-inherit hover:text-inherit`); si no, raíz `<div>`. Ambas comparten las mismas clases de tarjeta (`flex flex-col border border-line-card bg-card hover:border-accent/55 hover:bg-card-hover`).
   - Dentro: bloque de imagen placeholder (idéntico al que ya existe: `aspect-[16/9]` o similar ajustado del `aspect-[16/10]` actual, con el fondo `repeating-linear-gradient` y el texto "Captura del proyecto"), seguido del bloque de contenido (`px-[26px] pt-[26px] pb-[30px]` con título, descripción, tags).
   - Quitar el bloque del número `{{ String(i + 1).padStart(2, '0') }}`.
   - Agregar al final del contenido de la tarjeta, solo si `project.url` existe: `<span class="mt-auto text-[13px] font-bold text-accent">Ver proyecto →</span>`, mismo patrón que "Leer artículo →" en `BlogView.vue`.
   - Mantener `v-reveal="i"` en la raíz de cada tarjeta.
2. Ajustar clases de tags (`project.tags`) si es necesario para que quepan bien en el ancho más angosto de la tarjeta (3 columnas vs. fila completa), reusando las clases de pill ya existentes.
3. Verificación manual: cargar `/`, ir a la sección "Proyectos", confirmar que los 3 proyectos se ven en cuadrícula de 3 columnas en escritorio y 2 en móvil/tablet (`max-desk`), que el placeholder de imagen y los tags se ven correctamente, y que las tarjetas no muestran "Ver proyecto →" (porque ninguno de los 3 proyectos actuales tiene `url`). Confirmar visualmente que el `v-reveal` sigue animando cada tarjeta al hacer scroll.
4. Ejecutar `npm run type-check`, `npm run test:unit` y `npm run build` para confirmar que nada se rompió (en particular el test de `App.spec.ts`, que no depende de `ProjectsSection` pero monta `App` completo).

## Criterios de aceptación

- [ ] `npm run type-check`, `npm run test:unit` y `npm run build` terminan sin errores.
- [ ] En escritorio, la sección "Proyectos" de la Home muestra los proyectos en una cuadrícula de 3 columnas (no en filas apiladas).
- [ ] En `max-desk` (móvil/tablet), la cuadrícula pasa a 2 columnas.
- [ ] Cada tarjeta tiene el mismo lenguaje visual que las tarjetas de "Todas las entradas" del blog: bloque de imagen placeholder arriba, borde `border-line-card`, fondo `bg-card`, y hover `border-accent/55` + `bg-card-hover`.
- [ ] El número identificador ("01", "02", "03") ya no aparece en ninguna tarjeta.
- [ ] Los tags de cada proyecto siguen visibles dentro de la tarjeta.
- [ ] Ninguna de las 3 tarjetas actuales es clickeable ni muestra "Ver proyecto →" (porque ninguna tiene `url` en los datos).
- [ ] Si a un proyecto se le agrega `url` en `src/data/projects.ts`, su tarjeta se vuelve clickeable, abre el link en pestaña nueva y muestra "Ver proyecto →".
- [ ] Las tarjetas siguen animando con `v-reveal` (fade + stagger) al entrar en el viewport, igual que antes del cambio.
- [ ] `BlogView.vue` y el resto de secciones de la Home quedan sin cambios de comportamiento.

## Decisiones tomadas y descartadas

- **Cuadrícula de 3 columnas, igual que "Todas las entradas" del blog:** el usuario lo pidió explícitamente como referencia visual; se reutiliza el mismo `grid-cols-3 max-desk:grid-cols-2` y `gap-[22px]` para consistencia entre secciones del sitio.
- **Se mantiene el placeholder de imagen rayado:** no se generan ni piden imágenes reales de captura en este spec; se conserva el mismo patrón visual (`repeating-linear-gradient`) ya usado tanto en proyectos como en blog.
- **Se elimina el número "01/02/03":** las tarjetas de blog no numeran sus entradas; para que el patrón sea consistente en todo el sitio, se quita el número también de proyectos.
- **`url` opcional en `Project`, sin rellenar datos reales ahora:** el campo ya existe en el tipo; en vez de inventar links falsos para los 3 proyectos actuales, la tarjeta se degrada a no-clickeable cuando `url` falta. Cargar los links reales queda fuera de este spec.
- **Enlace externo con `target="_blank"` + `rel="noopener"`, no ruta interna:** a diferencia del blog (que navega a `/blog/:slug` dentro de la misma app), los proyectos no tienen página de detalle propia, así que el link es siempre externo.
- **No se crea página de detalle de proyecto:** el usuario solo pidió cambiar el layout de presentación, no agregar navegación nueva; se deja para un spec futuro si se decide.

## Riesgos

- Con solo 3 proyectos, la última fila de la cuadrícula de 3 columnas queda incompleta (3 proyectos = exactamente 1 fila completa hoy, pero si se agrega un 4º proyecto en el futuro quedaría una fila con una sola tarjeta); esto es un efecto visual esperado de cualquier grid con conteo no múltiplo de columnas, no un bug de este spec.
- Al quitar el número "01/02/03", se pierde el acento visual que distinguía la sección de proyectos de la de blog; si en la revisión visual se ve "demasiado igual" al blog, se puede reconsiderar en una iteración futura (por ejemplo, un borde de color distinto o un ícono por tag principal).

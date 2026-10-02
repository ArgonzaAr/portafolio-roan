# SPEC 06 — Agregar proyecto Arcade Vault

> **Estado:** Implementado
> **Depende de:** SPEC 05
> **Fecha:** 2026-10-01
> **Objetivo:** Agregar "Arcade Vault" (https://arcade-vault-ebon.vercel.app/) como primer proyecto de la sección "Proyectos", con su carrusel de 6 capturas.

## Por qué existe esta spec

Arcade Vault es un portal de juegos arcade clásicos (Asteroides, Tetris, Arkanoid, Snake, Frogger) que se juegan en el navegador, con biblioteca filtrable, puntuaciones guardadas y un salón de la fama por juego. Es el proyecto más completo hasta ahora: aplicación con rutas, juegos interactivos y datos persistentes. Las capturas ya fueron generadas por `/add-project` el 2026-10-01 en `portafolio-roan/public/project_img/arcade-vault/`.

## Alcance

**Dentro:**

- **Datos:** se agrega un proyecto al **inicio** del arreglo `projects` de `src/data/projects.ts`, con `url` e `images`. Los proyectos existentes no cambian ni de contenido ni de orden relativo.
- **Imágenes:** se usan las 6 capturas `.webp` que ya existen en `public/project_img/arcade-vault/` (1440×900 máximo, calidad 80, mismo formato que SPEC 05). Se versionan junto con este cambio.
- Título, descripción y tags quedan en borrador (ver "Modelo de datos") y se confirman antes de aprobar.

**Fuera (para otro spec si se decide):**

- Cambios a `ProjectCard.vue`, `ProjectsSection.vue`, `useCarousel.ts` o al tipo `Project`.
- Capturas móviles.
- Cambios a otros proyectos o a otras secciones de la Home.
- Tests unitarios nuevos.

## Modelo de datos

Sin cambios al tipo `Project` (`src/types/project.ts`). Se agrega una entrada en `src/data/projects.ts`.

**Título, descripción y tags en borrador, redactados por Claude a partir del sitio. El usuario los confirma o corrige antes de aprobar:**

| `id` | `title` | `description` | `tags` | `url` |
| --- | --- | --- | --- | --- |
| `arcade-vault` | Arcade Vault | Portal retro de juegos arcade clásicos para jugar en el navegador, con biblioteca filtrable, puntuaciones guardadas y salón de la fama por juego. | Next.js, React, Supabase | `https://arcade-vault-ebon.vercel.app/` |

`images` (en orden, carpeta `/project_img/arcade-vault/`, todas `.webp`):

| # | Archivo | Qué muestra |
| --- | --- | --- |
| 1 | `01-hero-desktop` | Portada: "El arcade clásico está de vuelta" con tipografía pixel, neón y sprites flotantes. |
| 2 | `02-biblioteca-desktop` | Biblioteca de juegos con buscador, filtros por género y tarjetas con mejor puntuación. |
| 3 | `03-detalle-arkanoid-desktop` | Ficha de Arkanoid: vista previa, descripción, estadísticas, dificultad y mejores puntuaciones. |
| 4 | `04-partida-arkanoid-desktop` | Partida en curso de Arkanoid con marcador, vidas, nivel y selector de skin. |
| 5 | `05-fin-del-juego-desktop` | Modal "Fin del juego" con puntuación final y campo para guardar iniciales. |
| 6 | `06-salon-de-la-fama-desktop` | Salón de la Fama: podio de los tres primeros y tabla de ranking por juego. |

Entrada resultante:

```ts
{
  id: 'arcade-vault',
  title: 'Arcade Vault',
  description:
    'Portal retro de juegos arcade clásicos para jugar en el navegador, con biblioteca filtrable, puntuaciones guardadas y salón de la fama por juego.',
  tags: ['Next.js', 'React', 'Supabase'],
  url: 'https://arcade-vault-ebon.vercel.app/',
  images: images('arcade-vault', [
    '01-hero-desktop',
    '02-biblioteca-desktop',
    '03-detalle-arkanoid-desktop',
    '04-partida-arkanoid-desktop',
    '05-fin-del-juego-desktop',
    '06-salon-de-la-fama-desktop',
  ]),
},
```

## Plan de implementación

1. **Datos.** Agregar la entrada de "Modelo de datos" como primer elemento de `projects` en `src/data/projects.ts`, con los textos confirmados por el usuario. Verificar que `npm run type-check` pasa.
2. **Revisión visual.** Con `npm run dev`, revisar la Home a ~1280px: la nueva tarjeta es la primera, muestra la portada en reposo y, al pasar el mouse, se eleva y recorre las 6 capturas. Revisar a ~375px y ~768px con emulación táctil que se anima al cruzar el centro de la pantalla. Si alguna captura se ve mal en el marco 16:9, quitarla de `images` y borrar su `.webp`.
3. Ejecutar `npm run type-check`, `npm run lint`, `npm run test:unit` y `npm run build`.

## Criterios de aceptación

- [ ] `npm run type-check`, `npm run lint`, `npm run test:unit` y `npm run build` terminan sin errores.
- [ ] La sección "Proyectos" muestra "Arcade Vault" como primera tarjeta, seguida de los proyectos existentes en el mismo orden de antes.
- [ ] La tarjeta abre `https://arcade-vault-ebon.vercel.app/` en una pestaña nueva y muestra "Ver proyecto →".
- [ ] En reposo, la tarjeta muestra `01-hero-desktop` y 6 puntos indicadores, con el primero resaltado.
- [ ] Al pasar el mouse (~1280px), el carrusel recorre las 6 capturas y vuelve a la primera al salir.
- [ ] `public/project_img/arcade-vault/` contiene exactamente los `.webp` listados en `images`, ninguno mayor a 1440×900, y ningún `.png`.
- [ ] No hay errores en la consola del navegador al cargar la Home.
- [ ] No se agregó ninguna dependencia nueva a `package.json`.

## Decisiones tomadas y descartadas

- **Sí: capturas generadas con `/add-project` el 2026-10-01**, con Playwright a 1440×900 y un enfoque de marketing: portada primero y luego el recorrido de uso (biblioteca → ficha del juego → partida en curso → fin del juego → ranking), priorizando estados interactivos sobre secciones de texto.
- **Sí: Arkanoid como juego de ejemplo**, porque sus bloques de colores son los más vistosos en una miniatura.
- **Sí: tags inferidos del sitio.** Evidencia: Next.js: scripts en `/_next/static/…` (Turbopack) y `window.next`; React: `#root` con `__reactFiber$…` / `__reactProps$…`; Supabase: peticiones a `*.supabase.co` (puntuaciones y sesión). Pueden ser incorrectos y se confirman antes de aprobar.
- **No: Tailwind CSS como tag.** Hay variables `--tw-…` en las hojas de estilo, pero el DOM usa casi solo clases propias (`av-nav`, `home-hero`, `silo s1`…). Agregarlo si el usuario confirma que lo usa. Tampoco se pudo detectar TypeScript desde el bundle.
- **No: sección "Acerca de", precios ni FAQ.** Son bloques de texto que venden menos que el juego en uso.
- **Sí: el proyecto nuevo va al inicio de la lista**, para que el trabajo más reciente sea lo primero que se ve.
- **Sí: definición rápida sin preguntas.** El usuario decidió que `/add-project` redacte todo en borrador y lo revise antes de aprobar.
- **No: formularios enviados.** El modal de fin del juego se capturó sin pulsar "Guardar puntuación", así que no se registró ninguna puntuación en el sitio. No se inició sesión ni se creó cuenta.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Título, descripción o tags inferidos no describen bien el proyecto. | El usuario los revisa antes de cambiar el estado a `Aprobado`. |
| Las capturas ya están en `public/project_img/arcade-vault/` aunque esta spec no se apruebe, y se copiarían al `dist` sin usarse. | Si la spec se descarta, borrar la carpeta. |
| `03-detalle-arkanoid` y `04-partida-arkanoid` muestran el mismo juego y podrían sentirse repetitivas en el carrusel. | Revisión visual en el paso 2. Si sobra una, quitarla de `images` y borrar su `.webp`. |
| En `04-partida-arkanoid` la paleta queda cortada en el borde inferior, porque el tablero es más alto que el viewport de 900px. | Es aceptable en el marco 16:9 (`object-top`). Si se ve mal, recapturar con scroll o quitarla. |
| El salón de la fama y las puntuaciones son datos reales de Supabase (p. ej. "ROAN_ 780", "INVITADO 4080") y cambian con el tiempo. | La captura es una foto del 2026-10-01; no requiere mantenerse sincronizada. |
| La URL incluye el sufijo aleatorio de Vercel (`-ebon`). Si el proyecto se renombra o se le asigna dominio propio, la liga se rompe. | Actualizar `url` en `projects.ts` si cambia el dominio. |

## Lo que **no** está en esta spec

- Cambios a componentes, composables o al tipo `Project`.
- Capturas móviles.
- Cambios a otros proyectos.

Cada uno de estos, si se decide abordar, va en su propia spec.

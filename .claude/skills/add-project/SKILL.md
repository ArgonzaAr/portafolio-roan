---
name: add-project
description: Agrega un proyecto al portafolio a partir de su link. Toma capturas con enfoque de marketing usando Playwright, las deja como WebP en public/project_img/<id>/ y escribe una spec en Borrador para implementarla con /spec-impl.
disable-model-invocation: true
argument-hint: '<url> [contexto opcional]'
allowed-tools: Read, Glob, Grep, Write, Bash(ls:*), Bash(cat:*), Bash(date:*), Bash(mkdir:*), Bash(cwebp:*), Bash(webpinfo:*), Bash(rm:*), mcp__playwright__browser_navigate, mcp__playwright__browser_resize, mcp__playwright__browser_snapshot, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_evaluate, mcp__playwright__browser_click, mcp__playwright__browser_fill_form, mcp__playwright__browser_type, mcp__playwright__browser_hover, mcp__playwright__browser_press_key, mcp__playwright__browser_wait_for, mcp__playwright__browser_close
---

# /add-project — Capturas de marketing + spec para un proyecto nuevo

## Contexto de sesión

Fecha de hoy (úsala en el encabezado de la spec, nunca la inventes):
!`date +%F`

Specs existentes:
!`ls specs/ 2>/dev/null || echo "La carpeta specs/ no existe"`

Carpetas de capturas existentes:
!`ls portafolio-roan/public/project_img/ 2>/dev/null || echo "La carpeta public/project_img/ no existe"`

Proyectos actuales:
!`cat portafolio-roan/src/data/projects.ts 2>/dev/null || echo "No existe src/data/projects.ts"`

---

Esta skill hace tres cosas, en orden: **entra al sitio**, **toma entre 4 y 7 capturas pensadas para promocionar el proyecto** y **escribe una spec en Borrador** que agrega el proyecto a `src/data/projects.ts`. **No escribe código de la app.** La implementación la hace después el usuario con `/spec-impl`.

Responde siempre en español.

## Argumentos

`$ARGUMENTS` = `<url> [contexto opcional]`

- El **primer token** es la URL del proyecto publicado.
- **Todo lo demás** es contexto libre del usuario (p. ej. "destaca el formulario de cotización" o "es un proyecto de un curso de React"). Úsalo para decidir qué capturar y cómo redactar la descripción. Tiene prioridad sobre tu propio criterio.

## Fase 1 — Validar

1. Si `$ARGUMENTS` está vacío o el primer token no empieza con `http://` o `https://`, pide la URL y **detente**.
2. Lee `CLAUDE.md` y las specs `specs/05-proyectos-reales-con-carrusel.md` y `specs/03-proyectos-en-cuadricula.md` para tomar las convenciones (idioma, encabezados, tono, formato de las capturas).
3. Deriva el `id` en kebab-case a partir del subdominio o de la ruta de la URL:
   - Quita el dominio de hosting (`.netlify.app`, `.vercel.app`, `.github.io`, etc.) y sufijos de autor como `-roan`.
   - Separa palabras pegadas cuando sea evidente (`admingastos-roan` → `admin-gastos`).
4. **Detente sin crear nada** si ocurre cualquiera de estos casos y explica cuál:
   - El `id` ya está en `projects.ts`.
   - La URL (con o sin `/` final) ya está en `projects.ts`.
   - Ya existe `portafolio-roan/public/project_img/<id>/`.

   Actualizar un proyecto existente queda fuera de esta skill.

## Fase 2 — Explorar el sitio

1. `browser_resize` a **1440×900**. Es exactamente 16:10, el formato de SPEC 05, así que las capturas de viewport no necesitan recorte.
2. `browser_navigate` a la URL. Si no carga (error, 404, página en blanco), cierra el navegador y **detente** sin escribir nada.
3. `browser_snapshot` para entender la estructura: secciones, navegación, formularios, botones que abren modales, filtros, pestañas.
4. Detecta las tecnologías con `browser_evaluate`. Evidencias útiles:
   - React: `document.querySelector('[data-reactroot]')`, o una propiedad `__reactContainer$…` / `__reactFiber$…` en el nodo raíz (`#root`).
   - Vue: `document.querySelector('[data-v-app]')` o `__vue_app__` en el nodo raíz.
   - Angular: atributo `ng-version`. Svelte: clases `svelte-…`.
   - Tailwind CSS: muchas clases utilitarias (`flex`, `px-4`, `bg-…-500`, `md:…`) o la variable `--tw-…` en estilos computados.
   - `meta[name="generator"]` (Astro, Next.js, Hugo, etc.).
   - Sin framework detectable: HTML, CSS y JavaScript (este último solo si hay scripts propios o interactividad).

   Anota la evidencia de cada tag; va en la sección de decisiones de la spec.

## Fase 3 — Capturar con enfoque de marketing

Objetivo: que el carrusel de la tarjeta **venda** el proyecto en pocos segundos (cada imagen se ve ~1.5 s).

**Reglas de selección:**

- **01 es siempre la portada/hero**: la primera impresión, lo que se ve en reposo en la tarjeta. Captura con el scroll en 0, sin banners de cookies ni popups encima (ciérralos antes).
- Después, entre 3 y 6 capturas más de lo más vistoso o diferenciador, en un orden que cuente una historia (qué es → qué hace → cómo se ve en uso).
- **Prioriza estados interactivos** sobre bloques de texto: modal abierto, formulario lleno con datos realistas, mensajes de validación, filtro aplicado, dashboard con datos, menú desplegado.
- Para llenar formularios usa datos realistas y coherentes con el sitio (nombres, montos, fechas plausibles), nunca "test", "asdf" o lorem ipsum.
- **Nunca envíes formularios** ni hagas acciones con efectos reales (compras, registros, correos, confirmaciones de asistencia). Solo llena y captura. Si el sitio es una app local sin backend (estado en memoria o `localStorage`), sí puedes agregar registros para mostrarla con datos.
- Haz scroll hasta cada sección y captura **solo el viewport**, no página completa.
- Evita capturas casi idénticas entre sí, estados vacíos poco atractivos y secciones de puro texto legal o footer.
- Total: **mínimo 4, máximo 7**. Si el sitio no da para 4 capturas distintas, toma las que tenga sentido y explícalo en los riesgos de la spec.

**Nombres:** `NN-nombre-desktop`, con `NN` de dos dígitos y `nombre` en kebab-case y en español, describiendo lo que muestra (p. ej. `01-hero-desktop`, `03-modal-nuevo-gasto-desktop`). Es el mismo patrón que los proyectos actuales.

Guarda cada captura como PNG con `browser_take_screenshot` (`type: png`, `filename: NN-nombre-desktop.png`). Toma la ruta real del archivo del resultado de la herramienta. No la supongas.

Al terminar, `browser_close`.

## Fase 4 — Convertir a WebP

1. `mkdir -p portafolio-roan/public/project_img/<id>`
2. Por cada PNG, mismo formato que SPEC 05 (calidad 80, máximo 1440px de ancho sin escalar hacia arriba, recorte 16:10 anclado arriba):
   - Captura de 1440×900 (caso normal): `cwebp -q 80 <png> -o portafolio-roan/public/project_img/<id>/NN-nombre-desktop.webp`
   - Si es más ancha de 1440px (p. ej. por densidad de píxeles 2×): agrega `-resize 1440 0`.
   - Si es más alta que ancho × 0.625: agrega `-crop 0 0 <ancho> <ancho×0.625>` (cwebp recorta antes de redimensionar).
3. Verifica con `webpinfo` que todas miden como máximo 1440×900.
4. Borra los PNG temporales con `rm`. En `public/project_img/<id>/` solo quedan los `.webp`.

Si la conversión falla, borra la carpeta `public/project_img/<id>/` que creaste y **detente** sin escribir la spec.

## Fase 5 — Escribir la spec

No hagas preguntas: el usuario decidió que todo se redacte en borrador y lo revisa antes de aprobar.

1. Lee `template.md` (en el mismo directorio que esta skill) y llénalo completo.
2. **Número:** el mayor de `specs/` + 1, con dos dígitos. **Slug:** `agregar-proyecto-<id>`. **Ruta:** `specs/NN-agregar-proyecto-<id>.md`. Si el archivo ya existe, detente y avisa.
3. **Fecha:** la del contexto de sesión.
4. **Estado:** `Borrador`. Nunca `Aprobado`.
5. **Título y descripción:** redáctalos a partir del sitio y del contexto del usuario, con el tono y largo de los proyectos actuales (una oración, ~15–25 palabras, que diga qué es y qué destaca). **Tags:** los detectados en la Fase 2.
6. **Posición:** el proyecto nuevo va **al inicio** del arreglo `projects`.
7. La entrada usa el helper `images()` que ya existe en `src/data/projects.ts`.
8. El header depende de SPEC 05. Comprueba que `specs/05-…` existe antes de referenciarla.

## Fase 6 — Confirmar y detenerte

Dile al usuario:

- La ruta de la spec creada.
- La carpeta de capturas y la lista de `.webp` en orden, con una línea sobre qué muestra cada una.
- Que **título, descripción y tags son un borrador**. Debe revisarlos (y quitar capturas que no le gusten, borrando el `.webp` y su línea en la spec) antes de cambiar el estado a `Aprobado`.
- Siguiente paso: `/spec-impl NN-agregar-proyecto-<id>`.

**Detente aquí.** No propongas implementar la spec ni toques `src/`.

## Reglas duras

- **Nunca edites archivos de `portafolio-roan/src/`.** Solo escribes `.webp` en `public/project_img/<id>/` y la spec en `specs/`.
- Nunca sobrescribas una carpeta de capturas ni una spec existentes.
- Nunca envíes formularios ni hagas acciones con efectos reales en el sitio.
- Si algo falla a medias (sitio caído, Playwright no disponible, conversión fallida), no dejes archivos sueltos: borra lo que hayas creado en esta ejecución y explica qué pasó.
- No agregues dependencias ni scripts al repo.

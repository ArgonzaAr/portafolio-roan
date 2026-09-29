# SPEC 04 — Arquitectura responsive mobile-first

> **Estado:** Aprobado
> **Depende de:** SPEC 01, SPEC 02, SPEC 03
> **Fecha:** 2026-09-23
> **Objetivo:** Reescribir el CSS de todo el proyecto de "desktop-first con un solo salto a móvil" a una arquitectura mobile-first de tres breakpoints (móvil / tablet / escritorio), corrigiendo además los problemas de UX móvil que se detecten en el camino, empezando por el navbar.

## Por qué existe esta spec

Hoy el proyecto es desktop-first: los estilos base (sin prefijo) son de escritorio, y el prefijo `max-desk:` (`max-width: 860px`) los sobreescribe para un único estado móvil. No existe un punto intermedio para tablets o laptops pequeñas: a los 861px el layout salta de golpe al diseño completo de escritorio. Esta spec invierte esa dirección (estilos base = móvil, prefijos `tablet:`/`desk:` añaden detalle hacia arriba) y agrega el punto intermedio, tocando los 15 archivos que hoy usan `max-desk:` más el `AppHeader`, que gana un menú hamburguesa nuevo.

## Alcance

**Dentro:**

- Nuevos tokens de breakpoint en `src/assets/main.css`: `--breakpoint-tablet: 640px` y `--breakpoint-desk: 861px` (el valor de `desk` no cambia respecto a hoy, así el layout de escritorio sigue empezando en el mismo punto). Se elimina el uso de `max-desk:` en todo el proyecto.
- Reescritura mobile-first de los 15 archivos que hoy usan `max-desk:` (ver lista abajo): los estilos sin prefijo pasan a describir el layout móvil (<640px), `tablet:` añade/ajusta estilos desde 640px, y `desk:` añade/ajusta estilos desde 861px (el layout de escritorio actual, sin cambios visuales en ese breakpoint salvo lo indicado explícitamente).
- Archivos a migrar: `src/assets/main.css`, `src/components/AppHeader.vue`, `src/components/AppFooter.vue`, `src/components/SectionWrapper.vue`, `src/components/home/HeroSection.vue`, `src/components/home/AboutSection.vue`, `src/components/home/ServicesSection.vue`, `src/components/home/ProjectsSection.vue`, `src/components/home/TechStackSection.vue`, `src/components/home/BlogPreviewSection.vue`, `src/components/home/ContactSection.vue`, `src/views/BlogView.vue`, `src/views/ArticleView.vue`, `src/views/NewArticleView.vue`, `src/views/NotFoundView.vue`.
- Revisión de cualquier otro componente sin `max-desk:` hoy (`BaseButton.vue`, `ServiceIcon.vue`, `TechIcon.vue`, `AboutIcon.vue`, `LogoMark.vue`, `ArticleActions.vue`, `ArticleBlockView.vue`, `EditorBlock.vue`, `App.vue`) para confirmar que se comportan bien en los 3 breakpoints; solo se tocan si se detecta un problema visual real.
- **Navbar (`AppHeader.vue`):** reemplaza el navbar de tabs con scroll horizontal (`max-desk:overflow-x-auto`) por un botón hamburguesa (☰) visible en móvil y tablet (<861px). Al tocarlo, despliega un panel debajo del header con los links apilados verticalmente (empuja el contenido, no overlay). El panel se cierra al navegar a un link o al volver a tocar el botón. Desde `desk:` (≥861px) se mantiene el navbar horizontal completo, igual que hoy.
- Revisión de tipografía: los `text-[Npx]` fijos y los `clamp()` existentes (ej. el título del Hero) se revisan por breakpoint y se ajustan si no escalan bien en tablet.
- Correcciones adicionales de UX móvil/tablet que se detecten al migrar cada componente (espaciados, tamaños de toque, overflow), documentadas en el plan de implementación a medida que se encuentren.
- Verificación manual en 3 anchos clave por vista: ~375px (móvil), ~768px (tablet), ~1280px (escritorio).

**Fuera (para otro spec si se decide):**

- Cambios de contenido, datos o funcionalidad (`src/data/*`, lógica de `useArticleFilter`, `useBlockEditor`): no se tocan.
- Animaciones `v-reveal` (SPEC 02): el mecanismo no cambia; si una clase de layout que un `v-reveal` decora cambia de nombre, se actualiza la clase pero no el comportamiento de la directiva.
- Rediseño visual (paleta, tipografía de marca, iconografía): esta spec es de arquitectura responsive, no de rediseño.
- Nuevas rutas o páginas.
- Tests end-to-end o de regresión visual automatizada: el proyecto no tiene ese tooling hoy (solo Vitest); la verificación de este spec es manual.
- Soporte para anchos menores a ~320px o mayores a ~1920px: se diseña para el rango típico (320–1920px), sin casos extremos.

## Modelo de datos

No se introduce ningún modelo de datos nuevo. Se agrega un estado de UI local (no persistente) en `AppHeader.vue`: un `ref<boolean>` (`isMenuOpen`) que controla si el panel del menú hamburguesa está desplegado. No se guarda entre sesiones ni se comparte con otros componentes.

## Plan de implementación

1. En `src/assets/main.css`, agregar el token `--breakpoint-tablet: 640px` junto al `--breakpoint-desk: 861px` existente, y actualizar el comentario que describe el criterio de breakpoints (mobile-first: base = móvil, `tablet:` desde 640px, `desk:` desde 861px). El proyecto sigue compilando igual.
2. Migrar `SectionWrapper.vue` (usado por todas las secciones de Home) a mobile-first: estilos base = móvil, agregar `tablet:`/`desk:` donde hoy hay `max-desk:`. Verificar visualmente que Home no se rompe en los 3 anchos.
3. Migrar `AppHeader.vue`:
   - Reescribir el contenedor y el `nav` a mobile-first (base = móvil).
   - Agregar el botón hamburguesa (ícono ☰/✕ inline, sin librería nueva) y el `ref` `isMenuOpen`.
   - Envolver los links en un panel que se muestra (`v-show`/clase condicional) cuando `isMenuOpen` es `true`, visible solo por debajo de `desk:` (oculto y reemplazado por el nav horizontal desde `desk:`).
   - Cerrar el panel al hacer click en un link (watch de la ruta o handler en cada link) o al volver a tocar el botón.
   - Test unitario: montar `AppHeader`, confirmar que el panel no es visible por defecto, que se muestra al tocar el botón, y que se cierra al hacer click en un link.
4. Migrar el resto de `components/home/`: `HeroSection.vue`, `AboutSection.vue`, `ServicesSection.vue`, `ProjectsSection.vue`, `TechStackSection.vue`, `BlogPreviewSection.vue`, `ContactSection.vue`. Uno a la vez: reescribir clases a mobile-first, ajustar `clamp()`/`text-[Npx]` que no escalen bien en tablet, verificar visualmente en los 3 anchos antes de seguir con el siguiente.
   - `ServicesSection.vue`: en móvil (<640px) las tarjetas de servicios se muestran en una sola columna, un servicio por fila (antes 2 columnas); `tablet:` pasa a 3 columnas y `desk:` mantiene las 5 columnas actuales.
5. Migrar `AppFooter.vue` (mobile-first, verificación visual).
6. Migrar `views/BlogView.vue` y `views/ArticleView.vue` a mobile-first, verificación visual en los 3 anchos (incluye la cuadrícula "Todas las entradas" de SPEC 03 como referencia).
7. Migrar `views/NewArticleView.vue` (editor de bloques) a mobile-first, verificación visual en los 3 anchos; el editor debe seguir siendo usable en móvil aunque su uso principal sea de escritorio.
8. Migrar `views/NotFoundView.vue` a mobile-first, verificación visual.
9. Revisar los componentes sin `max-desk:` hoy (`BaseButton.vue`, íconos, `ArticleActions.vue`, `ArticleBlockView.vue`, `EditorBlock.vue`, `App.vue`) en los 3 anchos; ajustar solo si se detecta un problema real.
10. Confirmar con `grep -r "max-desk" src` que no queda ningún uso del prefijo antiguo.
11. Ejecutar `npm run type-check`, `npm run test:unit` y `npm run build` para confirmar que nada se rompió.

## Criterios de aceptación

- [ ] `npm run type-check`, `npm run test:unit` y `npm run build` terminan sin errores.
- [ ] `grep -r "max-desk" src` no devuelve ningún resultado; todo el proyecto usa `tablet:`/`desk:` o estilos base mobile-first.
- [ ] En ~375px de ancho, todas las vistas (Home, Blog, Article, NewArticle, 404) se ven correctamente apiladas para móvil, sin overflow horizontal no intencional.
- [ ] En ~768px de ancho, todas las vistas muestran un layout de tablet distinto al de móvil puro y al de escritorio completo (aprovechan el ancho intermedio en vez de saltar directo a uno u otro extremo).
- [ ] En ~1280px de ancho, todas las vistas se ven igual que antes de esta spec (mismo layout de escritorio).
- [ ] El navbar (`AppHeader`) muestra un botón hamburguesa en vez de tabs con scroll horizontal por debajo de 861px de ancho.
- [ ] Al tocar el botón hamburguesa, se despliega un panel debajo del header con los links apilados verticalmente.
- [ ] Al hacer click en un link del panel desplegado, el panel se cierra y navega al destino correspondiente.
- [ ] Al volver a tocar el botón hamburguesa con el panel abierto, el panel se cierra sin navegar.
- [ ] Desde 861px de ancho (`desk:`), el navbar vuelve a mostrar la fila horizontal completa de links, sin botón hamburguesa.
- [ ] El nuevo test de `AppHeader.vue` (apertura/cierre del panel) pasa.
- [ ] Las animaciones `v-reveal` (SPEC 02) siguen funcionando en los 3 breakpoints tras el cambio de clases.
- [ ] En ~375px de ancho, la sección de servicios muestra una tarjeta por fila (una sola columna); en tablet muestra 3 columnas y en escritorio 5.
- [ ] La cuadrícula de proyectos (SPEC 03) se sigue viendo en cuadrícula (ajustada a 1 columna en móvil si aplica) en los 3 breakpoints.
- [ ] No se agregó ninguna librería nueva de CSS o de íconos; el botón hamburguesa usa un ícono inline (SVG o texto), igual que `LogoMark.vue`.

## Decisiones tomadas y descartadas

- **Mobile-first con 3 breakpoints (móvil / `tablet:` 640px / `desk:` 861px), no 2:** el usuario lo pidió explícitamente para tener un punto intermedio; el corte de `desk` se mantiene en 861px (no se mueve a 1024px) para no alterar dónde hoy empieza el layout de escritorio actual.
- **Refactor arquitectónico + correcciones de UX detectadas, no solo un cambio mecánico de prefijos:** el usuario eligió explícitamente corregir problemas de UX móvil (navbar, tipografía) en vez de mantener el resultado visual pixel-idéntico; esto incluye el rediseño del navbar a menú hamburguesa.
- **Menú hamburguesa con panel desplegable debajo del header (no drawer overlay a pantalla completa):** el usuario prefirió la opción más simple, que no requiere bloquear el scroll del body ni manejar un overlay; el panel empuja el contenido, igual que otros paneles desplegables simples del sitio.
- **Hamburguesa activo hasta 861px (móvil y tablet), no solo <640px:** el usuario decidió que el navbar de tabs horizontales no debe aparecer en ningún punto por debajo del layout de escritorio completo, evitando el problema actual de overflow horizontal también en tablet.
- **Sin librería de íconos nueva:** el ícono del botón hamburguesa se implementa inline (SVG simple o caracteres ☰/✕), consistente con `LogoMark.vue`, que ya es un SVG inline sin librería externa.
- **Servicios en una sola columna en móvil (no 2 columnas):** el usuario pidió que en vista de teléfono cada servicio ocupe su propia fila en vez de la cuadrícula de 2 columnas, que dejaba las tarjetas estrechas y un hueco al final (5 servicios).
- **Verificación manual en 3 anchos fijos (375 / 768 / 1280px), sin tooling de regresión visual:** el proyecto no tiene Playwright/Percy ni similar hoy; agregar esa infraestructura queda fuera de esta spec.
- **Alcance de UX móvil abierto durante la implementación (no una lista cerrada):** además del navbar y la tipografía, cualquier otro problema de UX que se detecte al migrar un componente se corrige en el mismo paso, documentado en el plan.

## Riesgos

| Riesgo                                                                                          | Mitigación                                                                                                          |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| El punto intermedio de tablet (640–860px) puede exponer layouts que hoy nunca se probaron ahí, ya que el salto actual es directo de escritorio a móvil. | Revisión visual explícita en ~768px para cada vista (paso 4 en adelante del plan), no solo en 375px y 1280px.      |
| El menú hamburguesa es una pieza de UI nueva que no existía; puede introducir bugs de foco/accesibilidad si no se maneja bien el toggle. | Test unitario dedicado en `AppHeader.spec.ts` (paso 3) que cubre apertura, cierre por click en link y cierre manual. |
| Migrar 15+ archivos de una vez es un cambio grande; un error en un archivo puede pasar desapercibido si no se verifica cada uno antes de seguir con el siguiente. | El plan migra un archivo o grupo pequeño a la vez, con verificación visual intermedia antes de continuar (no todo junto al final). |

## Lo que **no** está en esta spec

- Rediseño visual de marca (colores, tipografía, iconografía).
- Cambios de contenido o datos (`src/data/*`).
- Nuevas rutas, páginas o funcionalidades.
- Tests de regresión visual automatizada o e2e.
- Soporte para anchos extremos fuera de 320–1920px.

Cada uno de estos, si se decide abordar, va en su propia spec.

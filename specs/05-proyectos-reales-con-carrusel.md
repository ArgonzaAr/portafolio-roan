# SPEC 05 — Proyectos reales con carrusel de capturas

> **Estado:** Aprobado
> **Depende de:** SPEC 02, SPEC 03, SPEC 04
> **Fecha:** 2026-09-29
> **Objetivo:** Reemplazar los 3 proyectos de ejemplo por los 5 proyectos reales con liga, y convertir el placeholder de cada tarjeta en un carrusel de capturas que se activa (con elevación de la tarjeta) al pasar el mouse en escritorio o al quedar la tarjeta en el centro de la pantalla en dispositivos táctiles.

## Por qué existe esta spec

SPEC 03 dejó la cuadrícula de proyectos con un placeholder rayado ("Captura del proyecto") y datos de ejemplo sin `url`. Ya existen capturas reales en `portafolio-roan/public/project_img/<slug>/` y 5 sitios publicados en Netlify. Esta spec conecta ambas cosas y añade la interacción de "enfoque" de la tarjeta. Las capturas actuales pesan 17 MB en PNG (una sola llega a 3.6 MB), así que la spec incluye su conversión a WebP.

## Alcance

**Dentro:**

- **Datos:** `src/data/projects.ts` pasa a contener exactamente 5 proyectos, en este orden, con su `url`:
  1. `cocina-chiapas` → `https://cocina-chiapas-roan.netlify.app/`
  2. `admin-pacientes` → `https://admin-pacientes-roan.netlify.app/`
  3. `coffee-blog` → `https://coffee-blog-roan.netlify.app/`
  4. `admin-gastos` → `https://admingastos-roan.netlify.app/`
  5. `invitacion-ale-angel` → `https://invitacion-ale-angel.netlify.app/`
- Los 3 proyectos de ejemplo actuales (tickets, KPIs, CV) se eliminan.
- Se elimina el slot `#aside` de `ProjectsSection.vue` ("Contenido de ejemplo — pendiente de reemplazar").
- Títulos, descripciones y tags de los 5 proyectos se redactan en borrador (ver "Modelo de datos") y quedan marcados para revisión del usuario antes de implementar.
- **Imágenes:** solo las capturas `*-desktop.png` (incluidas las de página completa `*-full-desktop.png`) entran al carrusel. Las `*-mobile.png` se excluyen.
- Conversión única de esas capturas a `.webp` en la misma carpeta (`public/project_img/<slug>/NN-nombre.webp`): ancho máximo 1440px sin escalar hacia arriba, recorte anclado arriba a proporción 16:10 cuando la imagen es más alta que eso, calidad 80, con `cwebp`.
- Se borran todos los `.png` de `public/project_img/` (incluidos los `*-mobile.png`); solo se versionan los `.webp`.
- **Tarjeta:** se extrae un componente `src/components/home/ProjectCard.vue`. El bloque de imagen sustituye el placeholder rayado por el carrusel: imágenes apiladas en el mismo marco `aspect-[16/9]`, `object-cover object-top`, cambio por fundido (crossfade) cada 1500 ms.
- **Puntos indicadores:** una fila de puntos en la parte inferior de la imagen marca la posición actual. No son clickeables (`aria-hidden="true"`), porque la tarjeta completa es el link.
- **Estado "enfocado" de la tarjeta:** eleva la tarjeta (desplazamiento hacia arriba + sombra + borde acento) y arranca el carrusel. Al perder el enfoque, el carrusel se detiene y vuelve a la primera imagen.
- **Escritorio (dispositivos con `(hover: hover)`):** el enfoque se activa con `mouseenter` y se desactiva con `mouseleave`.
- **Táctil (dispositivos con `(hover: none)`, incluidas tablets):** el enfoque lo tienen las tarjetas que cruzan la franja central del viewport, es decir, una fila de la cuadrícula a la vez (una tarjeta en móvil, las dos de la fila en tablet). Al hacer scroll a la siguiente fila, la anterior se detiene y vuelve a su primera imagen. Si ninguna tarjeta cruza la franja, ninguna está enfocada.
- **`prefers-reduced-motion: reduce`:** no hay carrusel ni elevación. Se muestra solo la primera imagen. El hover conserva el cambio de borde/fondo que ya existe hoy.
- `v-reveal="i"` (SPEC 02) se conserva por tarjeta, pero se aplica a un elemento envoltorio, no al elemento que se eleva (ver "Riesgos").
- Cuadrícula responsive de SPEC 04 sin cambios: 1 columna base, 2 en `tablet:`, 3 en `desk:`.

**Fuera (para otro spec si se decide):**

- Uso de las capturas `*-mobile.png` (por ejemplo, un marco de teléfono o `<picture>` por breakpoint).
- Controles manuales del carrusel (flechas, puntos clickeables, swipe).
- Activar el carrusel con foco de teclado (`focus-visible`) en la tarjeta.
- Página o modal de detalle de proyecto / lightbox de capturas.
- Script de conversión de imágenes versionado en el repo o pipeline automático en el build.
- Tests unitarios del carrusel o de la tarjeta: el usuario decidió verificar solo manualmente.
- Cambios a `BlogView.vue` u otras secciones de la Home.

## Modelo de datos

Se agrega un campo obligatorio a `Project` (`src/types/project.ts`):

```ts
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  url?: string
  /** Rutas públicas de las capturas, en el orden del carrusel. La primera es la portada. */
  images: string[]
}
```

`url` sigue siendo opcional en el tipo (la tarjeta conserva el comportamiento de SPEC 03 cuando falta), aunque los 5 proyectos la definen.

Contenido de `src/data/projects.ts`. **Textos y tags en borrador, redactados a partir de las capturas; el usuario los confirma o corrige antes de implementar:**

| `id` | `title` | `description` | `tags` | `images` (en orden, carpeta `/project_img/<id>/`) |
| --- | --- | --- | --- | --- |
| `cocina-chiapas` | Cocina Chiapas | Sitio para un restaurante de comida tradicional: menú de comida corrida y platillos fuertes, sección de eventos y formulario de cotización. | HTML, CSS, JavaScript | `01-hero-desktop`, `02-comida-corrida-desktop`, `03-platillos-fuertes-desktop`, `04-menu-completo-desktop`, `05-eventos-hero-desktop`, `06-cotizacion-desktop`, `07-eventos-completo-desktop` |
| `admin-pacientes` | Administrador de pacientes | Aplicación para registrar pacientes de una veterinaria, con validación de formulario y edición o eliminación de registros. | React, Tailwind CSS | `01-estado-inicial-desktop`, `02-validacion-desktop`, `03-formulario-lleno-desktop`, `04-pacientes-registrados-desktop`, `04-pacientes-registrados-full-desktop` |
| `coffee-blog` | Blog de Café | Blog con recetas y cursos de café, con secciones de inicio, nosotros, cursos y contacto. | HTML, CSS | `01-inicio-hero-desktop`, `02-inicio-completo-desktop`, `03-nosotros-desktop`, `04-cursos-desktop`, `05-contacto-desktop` |
| `admin-gastos` | Planificador de gastos | Control de presupuesto con gráfica de avance, alta y edición de gastos y filtro por categoría. | React, JavaScript | `01-presupuesto-inicial-desktop`, `02-dashboard-desktop`, `03-modal-nuevo-gasto-desktop`, `04-filtro-categoria-desktop`, `05-editar-gasto-desktop` |
| `invitacion-ale-angel` | Invitación Ale & Ángel | Invitación de boda digital con cuenta regresiva, historia, itinerario, código de vestimenta, mesa de regalos y confirmación de asistencia. | HTML, CSS, JavaScript | `01-portada-desktop`, `02-historia-desktop`, `03-horario-desktop`, `04-itinerario-desktop`, `05-vestimenta-desktop`, `06-regalos-desktop`, `07-confirmacion-desktop` |

Todas las rutas terminan en `.webp`. Ejemplo: `/project_img/cocina-chiapas/01-hero-desktop.webp`.

Estado de UI nuevo (no persistente, no compartido fuera de la sección):

- Composable `src/composables/useCarousel.ts`: recibe el número de imágenes y el intervalo (1500 ms). Expone `index` (`Ref<number>`), `start()` y `stop()`. `stop()` limpia el intervalo y regresa `index` a `0`. Limpia el intervalo en `onUnmounted`.
- `ProjectsSection.vue`: `focusedIds` (`Set<string>` reactivo), los `id` de las tarjetas enfocadas por scroll en modo táctil.
- `ProjectCard.vue`: `hovered` (`Ref<boolean>`) en modo escritorio. Prop `focused: boolean` que viene de la sección en modo táctil. `active = !reducedMotion && (hovered || focused)`.

## Plan de implementación

1. **Convertir imágenes.** Para cada `*-desktop.png` de `public/project_img/<slug>/`, generar `NN-nombre.webp` con `cwebp -q 80`: recortar desde arriba a alto = ancho × 0.625 si la imagen es más alta, y redimensionar a 1440px de ancho solo si es más ancha. Confirmar que existen 30 `.webp` (7 + 5 + 5 + 6 + 7). En la revisión visual del paso 5 se borró `admin-gastos/02-dashboard-full-desktop.webp` por ser idéntica a `02-dashboard-desktop` una vez recortada, así que el resultado final son 29 (7 + 5 + 5 + 5 + 7). Borrar todos los `.png` de `public/project_img/`. La app sigue igual, porque aún no referencia estas imágenes.
2. **Tipo y datos.** Agregar `images: string[]` a `Project` en `src/types/project.ts`. Reescribir `src/data/projects.ts` con los 5 proyectos de la tabla (textos confirmados por el usuario). Quitar el slot `#aside` de `ProjectsSection.vue`. Verificar: `npm run type-check` pasa y la Home muestra 5 tarjetas con placeholder rayado, clickeables, con "Ver proyecto →".
3. **Extraer `ProjectCard.vue`.** Mover el markup de la tarjeta de `ProjectsSection.vue` a `src/components/home/ProjectCard.vue` (prop `project: Project`), sin cambio visual. `ProjectsSection` itera sobre `ProjectCard` y pone `v-reveal="i"` en un `<div>` envoltorio de cada tarjeta. Verificar que la Home se ve igual que en el paso 2 y que el reveal sigue animando.
4. **Carrusel estático.** Reemplazar el placeholder por las imágenes de `project.images` apiladas (`absolute inset-0 size-full object-cover object-top`, `loading="lazy"`, `alt="<título> — captura N"`), visible solo la de `index` (opacidad + `transition-opacity`). Agregar los puntos indicadores. Crear `useCarousel.ts` y conectarlo. Aún sin disparadores: siempre se ve la primera imagen.
5. **Enfoque en escritorio.** En `ProjectCard`, detectar `(hover: hover)` y `(prefers-reduced-motion: reduce)` con `matchMedia` al montar. Con hover disponible, `mouseenter`/`mouseleave` cambian `hovered`. Un `watch` sobre `active` llama a `start()`/`stop()`. Aplicar las clases de elevación cuando `active` (translate hacia arriba, sombra, `border-accent/55`) con transición. Verificar a ~1280px: al pasar el mouse la tarjeta se eleva y las imágenes cambian cada 1.5 s. Al salir, baja y vuelve a la portada.
6. **Enfoque táctil.** En `ProjectsSection`, si `(hover: none)`, crear un `IntersectionObserver` con `rootMargin: '-49.5% 0px -49.5% 0px'` sobre los envoltorios (franja central del 1% del alto, más delgada que el espacio de 22px entre filas). Agregar a `focusedIds` cada tarjeta que entra en la franja central y quitarla cuando sale. Pasar `:focused="focusedIds.has(project.id)"` a cada `ProjectCard`. Desconectar el observer en `onUnmounted`. Verificar en DevTools con emulación táctil a ~375px y ~768px que solo se eleva y anima una fila a la vez al hacer scroll (una tarjeta a ~375px, las dos de la fila a ~768px).
7. **Reduced motion.** Confirmar que con `prefers-reduced-motion: reduce` emulado no hay elevación ni carrusel en ninguno de los dos modos.
8. Ejecutar `npm run type-check`, `npm run lint`, `npm run test:unit` y `npm run build`.

## Criterios de aceptación

- [ ] `npm run type-check`, `npm run lint`, `npm run test:unit` y `npm run build` terminan sin errores.
- [ ] `public/project_img/` contiene exactamente 29 archivos `.webp` y ningún `.png`.
- [ ] Ningún `.webp` de `public/project_img/` mide más de 1440px de ancho ni más de 900px de alto.
- [ ] La sección "Proyectos" muestra exactamente 5 tarjetas, en el orden Cocina Chiapas, Administrador de pacientes, Blog de Café, Planificador de gastos, Invitación Ale & Ángel.
- [ ] Ninguno de los 3 proyectos de ejemplo anteriores aparece. La etiqueta "Contenido de ejemplo — pendiente de reemplazar" ya no aparece.
- [ ] Cada tarjeta abre su URL de Netlify correspondiente en una pestaña nueva y muestra "Ver proyecto →".
- [ ] En reposo, cada tarjeta muestra su primera captura (no el placeholder rayado) y un punto por imagen, con el primero resaltado.
- [ ] En escritorio (~1280px, con mouse), al pasar el mouse sobre una tarjeta, esta se eleva y la imagen cambia con fundido cada ~1.5 s, y el punto resaltado avanza.
- [ ] Tras la última imagen, el carrusel vuelve a la primera.
- [ ] Al sacar el mouse, la tarjeta baja, el carrusel se detiene y vuelve a la primera imagen.
- [ ] Con emulación táctil (~375px y ~768px), al hacer scroll la tarjeta que pasa por el centro de la pantalla se eleva y arranca su carrusel sin tocarla.
- [ ] Con emulación táctil, nunca hay tarjetas de más de una fila elevadas o animándose a la vez. Al pasar a la siguiente fila, la anterior vuelve a su primera imagen.
- [ ] Con emulación táctil a ~768px (2 columnas), las 5 tarjetas llegan a animarse al hacer scroll, incluidas las de la columna izquierda.
- [ ] Con `prefers-reduced-motion: reduce` emulado, ninguna tarjeta se eleva ni cambia de imagen en ningún modo.
- [ ] Las tarjetas siguen apareciendo con la animación `v-reveal` al entrar en el viewport.
- [ ] La cuadrícula es de 1 columna a ~375px, 2 a ~768px y 3 a ~1280px.
- [ ] No hay errores en la consola del navegador al cargar la Home ni al interactuar con las tarjetas.
- [ ] No se agregó ninguna dependencia nueva a `package.json`.

## Decisiones tomadas y descartadas

- **Sí: reemplazar los 3 proyectos de ejemplo por los 5 reales.** Los actuales eran contenido de ejemplo. La etiqueta del aside se elimina porque deja de ser cierta.
- **Sí: textos de proyectos redactados por Claude en borrador.** El usuario lo pidió así. Los tags de tecnología se infirieron de las capturas y pueden ser incorrectos, así que deben confirmarse antes del paso 2.
- **Sí: solo capturas de escritorio, incluidas las de página completa.** En un marco horizontal 16:9, las capturas móviles verticales se verían como una franja. **No:** usar todas las capturas ni `object-contain` con bandas.
- **Sí: convertir a WebP, 1440px máximo, recorte 16:10 desde arriba y calidad 80.** Así los 17 MB de PNG bajan a una fracción. El recorte evita descargar miles de píxeles que `object-cover object-top` nunca muestra. **No:** servir los PNG tal cual.
- **Sí: borrar los PNG originales.** Hoy no están versionados. Dejarlos en `public/` los copiaría al `dist` sin usarse. **No:** moverlos a una carpeta fuente.
- **Sí: conversión con `cwebp` como paso manual único.** `cwebp` ya está instalado y es una operación de una sola vez. **No:** un plugin de Vite o `sharp`, que agregarían una dependencia para un caso puntual.
- **Sí: lista explícita `images: string[]` en los datos.** Da control total del orden y de qué capturas entran. **No:** `import.meta.glob`, que obligaría a mover las imágenes a `src/assets` y ordenar por nombre de archivo.
- **Sí: crossfade cada 1500 ms; al perder el enfoque se detiene y vuelve a la portada.** Al volver, la tarjeta siempre empieza por la captura más representativa. El intervalo se definió inicialmente en 2500 ms y el usuario lo redujo a 1500 ms a petición suya durante la implementación (paso 5). **No:** deslizamiento horizontal, ni quedarse en la imagen donde se detuvo.
- **Sí: modo táctil decidido por `(hover: none)`, no por ancho.** Una tablet ancha tampoco tiene hover. Un laptop con ventana angosta sí tiene mouse. **No:** decidirlo por el breakpoint `desk:`.
- **Sí: se enfoca la fila que cruza la franja central.** Así la animación sigue el scroll, como pidió el usuario. En móvil (1 columna) equivale a una tarjeta a la vez. La spec pedía inicialmente una sola tarjeta. Al implementar el paso 6 se vio que, a ~768px, las dos tarjetas de una fila cruzan la franja a la vez y solo ganaba la derecha, por lo que Cocina Chiapas y Blog de Café nunca se animaban. El usuario eligió enfocar la fila completa. **No:** animar toda tarjeta visible. **No:** recorrer la fila tarjeta por tarjeta, que añade lógica de secuencia y con scroll rápido dejaría sin animar la segunda. **No:** que gane siempre la izquierda, que solo traslada el problema a la columna derecha.
- **Sí: franja central del 1% del alto (`rootMargin: '-49.5%'`).** La franja inicial del 10% medía unos 80px, más que el espacio de 22px entre filas, y dejaba dos filas enfocadas al pasar de una a otra. El usuario eligió adelgazarla. **No:** mantener el 10% y desenfocar la fila anterior al entrar la nueva, que obliga a agrupar tarjetas por posición vertical. **No:** aceptar el traslape breve.
- **Sí: puntos indicadores no clickeables.** La tarjeta completa es un `<a>`. Los puntos clickeables obligarían a manejar `preventDefault` dentro del link. **No:** flechas ni puntos clickeables.
- **Sí: respetar `prefers-reduced-motion`** sin carrusel ni elevación, en línea con lo que ya hace `.reveal` en `main.css`.
- **Sí: extraer `ProjectCard.vue`.** La tarjeta gana estado propio (hover, carrusel), y mantenerlo en el `v-for` de la sección la volvería difícil de leer.
- **No: tests unitarios.** El usuario decidió verificar solo manualmente. `test:unit` debe seguir pasando.
- **Nota:** SPEC 04 figura como `Aprobado`, pero su migración mobile-first ya está en el código (`ProjectsSection.vue` usa `tablet:`/`desk:`). Esta spec asume ese estado.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| `.reveal` / `.reveal-visible` fijan `transform` y `transition` en el elemento. Si la elevación se aplica al mismo elemento, las transiciones chocan y la elevación puede anularse o saltar. | `v-reveal` va en un `<div>` envoltorio y la elevación en la tarjeta interior (paso 3). |
| Las capturas de página completa (`02-dashboard-full`, `04-pacientes-registrados-full`) recortadas a 16:10 pueden verse casi iguales a su versión normal, y parecer imágenes repetidas. | Se revisa visualmente en el paso 5. Si se ven duplicadas, se quitan de `images` en `projects.ts` y se borra su `.webp`. **Resultado:** `admin-gastos/02-dashboard-full` era idéntica y se eliminó; `admin-pacientes/04-pacientes-registrados-full` muestra el encabezado y se conserva. |
| Capturas más anchas que 16:9 (`cocina-chiapas/02` 1232×415, `invitacion-ale-angel/03` 1440×556) se amplían con `object-cover` y pueden verse pixeladas o muy recortadas. | Revisión visual en el paso 5. Mismo remedio: quitarlas de `images` si no aportan. |
| Con `loading="lazy"` las imágenes ocultas podrían no haber cargado cuando el carrusel llega a ellas, y se vería un hueco durante el fundido. | Las imágenes apiladas ocupan el mismo marco visible, así que el navegador las carga al acercarse la tarjeta. Si aun así hay huecos, se cambia a `loading="eager"` solo para las imágenes de índice > 0 cuando la tarjeta se activa. |
| Una franja central más alta que el espacio entre filas (22px) toca dos filas a la vez durante la transición y deja dos filas enfocadas. Pasó con la franja inicial del 10% (`-45%`) al implementar el paso 6. | La franja se redujo al 1% del alto (`-49.5%`), que mide menos de 22px en pantallas de hasta ~2200px de alto. Por eso nunca toca dos filas en teléfonos ni tablets. |
| Con la franja del 1%, el tramo de scroll sin tarjeta enfocada al pasar por el hueco entre filas es un poco más largo. | Es el comportamiento esperado: ninguna tarjeta animada mientras la franja cruza el hueco. |

## Lo que **no** está en esta spec

- Uso de las capturas móviles.
- Controles manuales del carrusel (flechas, puntos clickeables, swipe) o activación por teclado.
- Página de detalle, modal o lightbox de proyectos.
- Script o pipeline de optimización de imágenes versionado.
- Tests unitarios del carrusel.
- Cambios fuera de la sección de proyectos de la Home.

Cada uno de estos, si se decide abordar, va en su propia spec.

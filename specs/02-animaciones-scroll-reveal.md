# SPEC 02 — Animaciones de aparición al hacer scroll

**Estado:** Implementado
**Depende de:** SPEC 01
**Fecha:** 2026-09-22
**Objetivo:** Hacer que las secciones de `HomeView` (y sus elementos internos) aparezcan con una animación corta de fade + desplazamiento sutil conforme entran en pantalla, ya sea por scroll manual o por navegación desde el navbar/anclas.

## Alcance

**Dentro:**
- Animación de aparición (fade + `translateY` sutil, ~300–400ms) para todas las secciones de `HomeView`: `HeroSection`, `AboutSection`, `ServicesSection`, `ProjectsSection`, `TechStackSection`, `BlogPreviewSection`, `ContactSection`.
- Dentro de cada sección, los elementos hijos relevantes (tarjetas de servicios, filas de proyectos, hechos y trayectoria de "Sobre mí", tarjetas de blog, iconos de tecnología, bloques del Hero) animan con un pequeño *stagger* (retraso escalonado) entre sí, no toda la sección como bloque único.
- El `HeroSection` también anima al cargar la página (mismo mecanismo: como ya está en el viewport al montar, el `IntersectionObserver` dispara la animación de inmediato).
- La animación se repite cada vez que un elemento entra al viewport (subir y bajar el scroll vuelve a dispararla), no solo la primera vez.
- Funciona igual quede el usuario llegue a una sección por scroll manual o por click en el navbar/anclas (`/#sobre-mi`, `/#servicios`, etc.), porque ambos casos usan el mismo scroll del navegador que el `IntersectionObserver` ya observa.
- Se respeta `prefers-reduced-motion: reduce`: con esa preferencia activada, los elementos aparecen directamente sin transición ni desplazamiento.
- Mecanismo basado en `IntersectionObserver` nativo, sin librerías nuevas (mantiene el stack Vue + Tailwind del README).
- Duración y retrasos calibrados para que no se sientan lentos: transición base ~350ms, *stagger* entre hijos de ~50ms por elemento con un tope máximo (para que listas largas, como los 10 íconos de tecnología, no terminen con una cola larga de espera).

**Fuera (para otro spec si se decide):**
- `BlogView` (tarjetas de artículos), `ArticleView` (bloques del artículo) y `NewArticleView` (editor): no se tocan en este spec.
- Animaciones de transición entre rutas (`<RouterView>` transition).
- Cualquier efecto de scroll más complejo (parallax, scroll-linked animations, GSAP ScrollTrigger).
- Cambios de contenido, layout o Tailwind tokens fuera de lo necesario para la animación.

## Modelo de datos

No se introduce ningún modelo de datos ni persistencia. Se agrega un tipo interno pequeño para la directiva (el valor opcional de *binding*, un `number` usado como índice de *stagger*).

## Plan de implementación

1. Agregar en `src/assets/main.css` las clases utilitarias de la animación: estado inicial `.reveal` (`opacity: 0`, `translateY` pequeño) y estado final `.reveal-visible` (`opacity: 1`, `translateY(0)`), con `transition` de ~350ms y `ease-out`; envolver el estado inicial en un bloque `@media (prefers-reduced-motion: reduce)` que anule la transición y deje `opacity: 1` siempre. El proyecto sigue compilando igual.
2. Crear `src/directives/reveal.ts` con una directiva Vue (`vReveal`) que:
   - Usa un único `IntersectionObserver` compartido (no uno por elemento) con `threshold` y `rootMargin` fijos.
   - En `mounted`, añade la clase `reveal`, calcula un `transition-delay` a partir de `binding.value` (índice de *stagger*, opcional, con un tope máximo de delay) y observa el elemento.
   - En cada callback del observer, agrega o quita `reveal-visible` según `isIntersecting` (permite que la animación se repita al salir/entrar de nuevo).
   - En `unmounted`, deja de observar el elemento.
3. Registrar la directiva globalmente como `v-reveal` en `src/main.ts`.
4. Aplicar `v-reveal` en los componentes de `components/home/`:
   - `HeroSection.vue`: bloque de texto (eyebrow+título+párrafo+botones) y bloque de imagen/stats como elementos separados con *stagger*.
   - `AboutSection.vue`: cada `fact` y cada `job` de `timeline` con `v-reveal="i"`.
   - `ServicesSection.vue`: cada `service` con `v-reveal="i"`.
   - `ProjectsSection.vue`: cada `project` con `v-reveal="i"`.
   - `TechStackSection.vue`: cada `tech` con `v-reveal="i"` (respetando el tope de *stagger* para no alargar la cola con 10 elementos).
   - `BlogPreviewSection.vue`: cada `article` con `v-reveal="i"`.
   - `ContactSection.vue`: bloque de título y bloque de formulario como dos elementos con *stagger*.
5. Tests con Vitest: un test para la directiva `reveal.ts` que mockea `IntersectionObserver` (jsdom no lo implementa) y verifica que agrega `reveal-visible` cuando `isIntersecting` es `true` y lo quita cuando es `false`.
6. Verificación manual: cargar `/`, confirmar que el Hero anima al cargar, hacer scroll por toda la Home confirmando que cada sección/tarjeta anima al entrar y se puede repetir subiendo y bajando, y navegar desde el navbar a cada ancla confirmando el mismo comportamiento. Ejecutar `npm run type-check`, `npm run test:unit` y `npm run build`.

## Criterios de aceptación

- [ ] `npm run type-check`, `npm run test:unit` y `npm run build` terminan sin errores.
- [ ] Al cargar `/`, el `HeroSection` aparece con la animación de fade + desplazamiento (no aparece estático de golpe).
- [ ] Al hacer scroll por la Home, cada sección y sus elementos internos (tarjetas de servicios, filas de proyectos, hechos/trayectoria, tarjetas de blog, íconos de tecnología) aparecen con la animación, con un pequeño *stagger* entre elementos hermanos.
- [ ] Al hacer click en un link del navbar (`Sobre mí`, `Servicios`, `Proyectos`, `Blog`, `Trabajemos juntos`), la sección de destino anima igual que si se llegara por scroll manual.
- [ ] Subir y bajar el scroll sobre una misma sección repite la animación cada vez que vuelve a entrar en el viewport.
- [ ] Con `prefers-reduced-motion: reduce` activado en el sistema, los elementos aparecen sin transición ni desplazamiento (visibles de inmediato).
- [ ] La duración de la animación y del *stagger* se percibe rápida, no tardada (transición ~350ms, *stagger* con tope máximo aunque haya listas largas como los 10 íconos de tecnología).
- [ ] No se agregó ninguna librería nueva de animación; todo usa `IntersectionObserver` nativo y clases de Tailwind/CSS.
- [ ] `BlogView`, `ArticleView` y `NewArticleView` quedan sin cambios de comportamiento.

## Decisiones tomadas y descartadas

- **`IntersectionObserver` nativo, no librería (AOS/GSAP/VueUse):** evita agregar una dependencia nueva al stack (Vue + Tailwind, según README) y es suficiente para un fade + desplazamiento simple.
- **Directiva global `v-reveal` con observer compartido, no un composable por componente:** un solo `IntersectionObserver` para toda la página es más barato que uno por elemento y se reutiliza fácil en los `v-for` existentes con solo pasar el índice.
- **Stagger por elemento hijo, no por sección completa:** el usuario lo pidió explícitamente porque se ve más cuidado; se acota con un tope máximo de delay para que no se sienta lento en listas largas (10 tecnologías).
- **La animación se repite en cada entrada al viewport:** decisión explícita del usuario; implica no des-observar el elemento tras la primera revelación.
- **Sin manejo especial para "aparecer al cargar" en el Hero:** como el Hero ya está en el viewport al montar, el mismo `IntersectionObserver` dispara la animación de inmediato sin código adicional; se aprovecha el mismo mecanismo que el resto de las secciones.
- **Navbar y scroll manual comparten el mismo mecanismo:** el `scrollBehavior` del router ya hace scroll suave a la ancla; como las secciones ya están montadas en el DOM (no hay lazy-mount por sección), el observer las detecta igual sin importar cómo se llegó a ellas.
- **Fuera de alcance BlogView/ArticleView/editor:** se deja para un spec futuro si se decide extender, para no mezclar cambios en vistas que no mencionó el usuario.

## Riesgos

- Repetir la animación en cada entrada/salida del viewport puede sentirse repetitivo si el usuario hace scroll hacia arriba y abajo muy rápido; si en la revisión visual se siente molesto, se puede ajustar a "solo una vez" cambiando la directiva para des-observar tras la primera revelación.
- `jsdom` (usado por Vitest) no implementa `IntersectionObserver`; el test de la directiva requiere mockearlo manualmente.
- Falta calibrar el valor exacto de `rootMargin`/`threshold` y el tope de *stagger*; se ajustarán en la implementación con revisión visual manual, ya que "no tan tardado" es una preferencia cualitativa del usuario.

# SPEC 01 — Portafolio frontend en Vue

**Estado:** Implementado
**Depende de:** ninguna
**Fecha:** 2026-09-20
**Objetivo:** Portar las 4 páginas HTML de `portafolio_argonza/` (Portafolio, Blog, Artículo, Nuevo artículo) al proyecto Vue `portafolio-roan/`, con Tailwind, tema oscuro azul y datos estáticos tipados.

## Alcance

**Dentro:**
- Tema oscuro azul de las páginas (fondo `#070d18`, texto `#e6edf8`, acento `#4d90ff`/`#1f6feb`, fuente Archivo) expresado como tokens de Tailwind.
- 4 vistas con vue-router: `/`, `/blog`, `/blog/:slug`, `/blog/nuevo`, más 404.
- Componentes compartidos: header sticky con navegación, footer, botones, secciones.
- Home con secciones y anclas: home, sobre mí, servicios, proyectos, blog (preview), contacto.
- Blog con filtros por categoría; Artículo con botones de like (estado local) y compartir.
- Editor "Nuevo artículo": bloques agregar/subir/bajar/eliminar en memoria.
- Datos en `src/data/*.ts` tipados (proyectos, servicios, artículos).
- Responsive equivalente a los `@media (max-width:860px)` de los HTML.
- Imagen `assets/angel.jpg` copiada al proyecto.
- Tests Vitest: humo por vista y lógica del editor y de los filtros.

**Fuera (otros specs):**
- Backend, API, autenticación.
- Persistencia del editor: Guardar borrador y Publicar quedan como stubs sin efecto.
- Envío real de contacto y suscripción: formularios solo maquetados, sin validación ni estado.
- Design system Modernist (`_ds/`): se ignora.
- `support.js` y el runtime `x-dc`: no se portan.
- SEO/meta dinámicos, i18n, despliegue.

## Modelo de datos

Sin persistencia. Tipos en `src/types/`:

```ts
interface Project { id: string; title: string; description: string; tags: string[]; url?: string }
interface Service { id: string; title: string; description: string }
interface Article { slug: string; title: string; excerpt: string; category: string; date: string; readingMinutes: number; blocks: ArticleBlock[] }
type ArticleBlock = { id: string; type: 'heading' | 'paragraph' | 'code' | 'image' | 'quote'; content: string }
```

Los tipos exactos de `ArticleBlock` se derivan de los bloques que ofrece `Nuevo articulo.dc.html`. Contenido de datos copiado de los HTML.

## Plan de implementación

1. Instalar Tailwind (plugin `@tailwindcss/vite`), crear `src/assets/main.css` con `@theme` (colores, fuente Archivo, breakpoint 860px) y estilos base (selección, foco, scroll suave). El proyecto compila.
2. Definir tipos y `src/data/` con el contenido extraído de los HTML; copiar `angel.jpg` a `src/assets/`.
3. Crear componentes compartidos (`AppHeader`, `AppFooter`, `BaseButton`, `SectionWrapper`) y `App.vue` con `RouterView`; limpiar `counter.ts` y el test de plantilla.
4. Configurar rutas en `src/router/index.ts` (vistas con lazy loading, 404, scroll a ancla en la home).
5. Construir `HomeView` con sus secciones como componentes.
6. Construir `BlogView` con filtros (estado local) y `ArticleView` (slug inexistente → 404, like, compartir).
7. Construir `NewArticleView` con el editor de bloques (lógica en un composable `useBlockEditor`).
8. Tests: humo por vista, `useBlockEditor`, filtro del blog.
9. Ajuste responsive y comparación visual con los HTML originales; ejecutar `type-check`, `test:unit` y `build`.

## Criterios de aceptación

- [ ] `npm run type-check`, `npm run test:unit` y `npm run build` terminan sin errores.
- [ ] `/`, `/blog`, `/blog/<slug existente>` y `/blog/nuevo` renderizan sin errores en consola.
- [ ] Un slug inexistente muestra la vista 404.
- [ ] Los links del header navegan entre vistas y a las anclas de la home (`#sobre-mi`, `#servicios`, `#proyectos`, `#contacto`).
- [ ] Los colores, la fuente y los espaciados coinciden con los HTML originales en desktop (>860px) y móvil (≤860px), sin scroll horizontal.
- [ ] Los filtros del blog cambian la lista; el like alterna `aria-pressed`.
- [ ] El editor agrega, sube, baja y elimina bloques.
- [ ] No hay estilos inline ni atributos `data-r-*` en el código Vue; todo usa clases de Tailwind.
- [ ] No quedan referencias a `support.js`, `x-dc` ni `_ds/`.

## Decisiones tomadas y descartadas

- **Tema oscuro azul, no Modernist:** es lo que realmente muestran los HTML; Modernist solo estaba enlazado.
- **Tailwind, no CSS propio:** elegido por el usuario, aunque agrega dependencia; los `data-r-*` pasan a variantes responsive.
- **Datos en TS tipados:** fácil de sustituir por API después. Descartados JSON estáticos y Pinia+localStorage.
- **Editor sin persistencia:** evita definir esquema y versionado antes de tener backend.
- **Ruta dinámica `/blog/:slug`:** en lugar de una vista fija, para escalar a más artículos.
- **Formularios solo maquetados:** sin validación hasta tener backend.
- **Sin tests de estilo:** la verificación visual es manual.

## Riesgos

- Los HTML dependen de estilos inline y de `style-hover`; la conversión a Tailwind puede introducir diferencias visuales pequeñas.
- El contenido de artículos y proyectos de los HTML puede ser de relleno; conviene revisarlo antes de publicar.
- Versiones muy recientes de dependencias del proyecto (Vite 8, TypeScript 6, Vue Router 5): comprobar que Tailwind es compatible al instalarlo.

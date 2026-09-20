# Portafolio Angel Argonza

Portafolio personal de Angel Argonza: sitio con tema oscuro azul, blog y un editor de artículos. La app Vue vive en [`portafolio-roan/`](portafolio-roan/) y es el port de las páginas HTML originales de [`portafolio_argonza/`](portafolio_argonza/), descrito en [`specs/01-portafolio-frontend-vue.md`](specs/01-portafolio-frontend-vue.md).

## Estructura del repositorio

```
├── portafolio-roan/     # App Vue (código fuente, tests y build)
├── portafolio_argonza/  # HTML originales (referencia del diseño)
└── specs/               # Especificaciones del proyecto
```

## Stack

- Vue 3 (`<script setup>`, TypeScript) y Vue Router
- Vite y Tailwind CSS v4 (`@tailwindcss/vite`)
- Vitest y Vue Test Utils

## Requisitos

- Node `^22.18.0` o `>=24.12.0`

## Scripts

Ejecútalos desde `portafolio-roan/`:

```sh
cd portafolio-roan
```

| Comando              | Qué hace                                        |
| -------------------- | ----------------------------------------------- |
| `npm install`        | Instala las dependencias                        |
| `npm run dev`        | Servidor de desarrollo con recarga en caliente  |
| `npm run build`      | Comprueba tipos y genera el build en `dist/`    |
| `npm run preview`    | Sirve el build de producción                    |
| `npm run type-check` | Comprueba tipos con `vue-tsc`                   |
| `npm run test:unit`  | Ejecuta los tests con Vitest                    |
| `npm run format`     | Formatea `src/` con Prettier                    |

## Rutas

| Ruta           | Vista            | Descripción                                                                  |
| -------------- | ---------------- | ---------------------------------------------------------------------------- |
| `/`            | `HomeView`       | Portafolio con las anclas `#home`, `#sobre-mi`, `#servicios`, `#proyectos`, `#blog` y `#contacto` |
| `/blog`        | `BlogView`       | Listado de artículos con filtro por categoría                                |
| `/blog/:slug`  | `ArticleView`    | Artículo con like y compartir; un slug inexistente muestra el 404            |
| `/blog/nuevo`  | `NewArticleView` | Editor de bloques (agregar, subir, bajar y eliminar)                         |
| cualquier otra | `NotFoundView`   | Página 404                                                                   |

## Estructura de `portafolio-roan/src/`

```
src/
├── assets/         # main.css (tokens de Tailwind y estilos base) e imagen del hero
├── components/     # AppHeader, AppFooter, BaseButton, SectionWrapper
│   ├── home/       # Secciones de la home
│   ├── article/    # Bloques del artículo y acciones (like / compartir)
│   └── editor/     # Bloque editable del editor
├── composables/    # useArticleFilter, useBlockEditor
├── data/           # Proyectos, servicios, artículos y tipos de bloque (tipados)
├── router/         # Rutas con lazy loading y scroll a ancla
├── types/          # Project, Service, Article, ArticleBlock
└── views/          # Una vista por ruta
```

## Estilos

- Todo se estiliza con clases de Tailwind; no hay estilos inline.
- Los colores y la fuente (Archivo) son tokens de `@theme` en `src/assets/main.css` (`bg`, `fg`, `accent`, `muted`, `card`, etc.).
- El breakpoint móvil replica el `@media (max-width: 860px)` de los HTML originales: `max-desk:` aplica en pantallas de 860px o menos.

## Datos y alcance

- Los datos son estáticos y viven en `src/data/`; no hay backend ni persistencia.
- En el editor, "Guardar borrador" y "Publicar" no hacen nada.
- Los formularios de contacto y suscripción solo están maquetados.
- Parte del contenido (proyectos y artículos) es de ejemplo y conviene revisarlo antes de publicar.

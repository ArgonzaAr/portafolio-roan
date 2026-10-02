# SPEC {{NN}} — Agregar proyecto {{Título}}

> **Estado:** Borrador
> **Depende de:** SPEC 05
> **Fecha:** {{YYYY-MM-DD}}
> **Objetivo:** Agregar "{{Título}}" ({{url}}) como primer proyecto de la sección "Proyectos", con su carrusel de {{N}} capturas.

## Por qué existe esta spec

{{1–3 oraciones: qué es el proyecto, por qué vale la pena mostrarlo y que las capturas ya fueron generadas por `/add-project` el {{fecha}} en `portafolio-roan/public/project_img/{{id}}/`. Si el usuario dio contexto, menciónalo.}}

## Alcance

**Dentro:**

- **Datos:** se agrega un proyecto al **inicio** del arreglo `projects` de `src/data/projects.ts`, con `url` e `images`. Los proyectos existentes no cambian ni de contenido ni de orden relativo.
- **Imágenes:** se usan las {{N}} capturas `.webp` que ya existen en `public/project_img/{{id}}/` (1440×900 máximo, calidad 80, mismo formato que SPEC 05). Se versionan junto con este cambio.
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
| `{{id}}` | {{Título}} | {{Descripción}} | {{Tag1, Tag2}} | `{{url}}` |

`images` (en orden, carpeta `/project_img/{{id}}/`, todas `.webp`):

| # | Archivo | Qué muestra |
| --- | --- | --- |
| 1 | `01-{{nombre}}-desktop` | {{Portada/hero}} |
| … | … | … |

Entrada resultante:

```ts
{
  id: '{{id}}',
  title: '{{Título}}',
  description: '{{Descripción}}',
  tags: [{{'Tag1', 'Tag2'}}],
  url: '{{url}}',
  images: images('{{id}}', [
    '01-{{nombre}}-desktop',
    // …
  ]),
},
```

## Plan de implementación

1. **Datos.** Agregar la entrada de "Modelo de datos" como primer elemento de `projects` en `src/data/projects.ts`, con los textos confirmados por el usuario. Verificar que `npm run type-check` pasa.
2. **Revisión visual.** Con `npm run dev`, revisar la Home a ~1280px: la nueva tarjeta es la primera, muestra la portada en reposo y, al pasar el mouse, se eleva y recorre las {{N}} capturas. Revisar a ~375px y ~768px con emulación táctil que se anima al cruzar el centro de la pantalla. Si alguna captura se ve mal en el marco 16:9, quitarla de `images` y borrar su `.webp`.
3. Ejecutar `npm run type-check`, `npm run lint`, `npm run test:unit` y `npm run build`.

## Criterios de aceptación

- [ ] `npm run type-check`, `npm run lint`, `npm run test:unit` y `npm run build` terminan sin errores.
- [ ] La sección "Proyectos" muestra "{{Título}}" como primera tarjeta, seguida de los proyectos existentes en el mismo orden de antes.
- [ ] La tarjeta abre `{{url}}` en una pestaña nueva y muestra "Ver proyecto →".
- [ ] En reposo, la tarjeta muestra `01-{{nombre}}-desktop` y {{N}} puntos indicadores, con el primero resaltado.
- [ ] Al pasar el mouse (~1280px), el carrusel recorre las {{N}} capturas y vuelve a la primera al salir.
- [ ] `public/project_img/{{id}}/` contiene exactamente los `.webp` listados en `images`, ninguno mayor a 1440×900, y ningún `.png`.
- [ ] No hay errores en la consola del navegador al cargar la Home.
- [ ] No se agregó ninguna dependencia nueva a `package.json`.

## Decisiones tomadas y descartadas

- **Sí: capturas generadas con `/add-project` el {{fecha}}**, con Playwright a 1440×900 y un enfoque de marketing: portada primero y luego {{resumen de qué se priorizó: estados interactivos, secciones clave}}.
- {{Si hubo contexto del usuario: **Sí: se destacó {{…}}**, porque el usuario lo pidió al ejecutar el comando.}}
- **Sí: tags inferidos del sitio.** Evidencia: {{p. ej. "React: `#root` con `__reactContainer`; Tailwind CSS: clases utilitarias en todo el DOM"}}. Pueden ser incorrectos y se confirman antes de aprobar.
- **Sí: el proyecto nuevo va al inicio de la lista**, para que el trabajo más reciente sea lo primero que se ve.
- **Sí: definición rápida sin preguntas.** El usuario decidió que `/add-project` redacte todo en borrador y lo revise antes de aprobar.
- **No: formularios enviados.** Las capturas de formularios muestran datos llenados, pero nunca se envió nada al sitio.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Título, descripción o tags inferidos no describen bien el proyecto. | El usuario los revisa antes de cambiar el estado a `Aprobado`. |
| Las capturas ya están en `public/project_img/{{id}}/` aunque esta spec no se apruebe, y se copiarían al `dist` sin usarse. | Si la spec se descarta, borrar la carpeta. |
| {{Riesgos específicos del sitio, p. ej. pocas secciones distintas, animaciones que se capturaron a medias, contenido que depende de la fecha.}} | {{Mitigación.}} |

## Lo que **no** está en esta spec

- Cambios a componentes, composables o al tipo `Project`.
- Capturas móviles.
- Cambios a otros proyectos.

Cada uno de estos, si se decide abordar, va en su propia spec.

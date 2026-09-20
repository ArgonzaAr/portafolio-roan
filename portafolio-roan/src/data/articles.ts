import type { Article } from '@/types'

export const articleCategories = ['Automatización', 'Backend', 'Datos'] as const

export const articles: Article[] = [
  {
    slug: 'automatizacion-auditable',
    title: 'Cómo diseñar una automatización que sí se pueda auditar',
    excerpt:
      'Dejar que un proceso cierre casos por su cuenta exige más que reglas: registro de decisiones, reintentos controlados y una traza que cualquiera del equipo pueda revisar meses después.',
    category: 'Automatización',
    date: 'Ago 2026',
    readingMinutes: 8,
    blocks: [
      {
        id: 'b1',
        type: 'paragraph',
        content:
          'Dejar que un proceso cierre casos por su cuenta exige más que reglas: registro de decisiones, reintentos controlados y una traza que cualquiera del equipo pueda revisar meses después.',
      },
      {
        id: 'b2',
        type: 'paragraph',
        content:
          'Una automatización que decide por sí sola solo es útil si alguien puede reconstruir por qué decidió lo que decidió. En el proyecto de cierre de tickets, esa condición cambió el diseño más que cualquier requerimiento funcional: antes de escribir la primera regla, definimos qué se iba a registrar.',
      },
      { id: 'b3', type: 'heading', content: 'Registrar la decisión, no solo el resultado' },
      {
        id: 'b4',
        type: 'paragraph',
        content:
          'Guardar «ticket cerrado» no sirve para auditar. Cada ejecución escribe el caso evaluado, la regla que aplicó, los valores que leyó y el resultado. Con eso, una revisión meses después no depende de la memoria de nadie.',
      },
      {
        id: 'b5',
        type: 'code',
        content:
          "// audit.log\nticket: 'INC-48213',\nregla: 'sin_respuesta_72h',\naccion: 'cierre_automatico'",
      },
      { id: 'b6', type: 'heading', content: 'Reintentos con límite' },
      {
        id: 'b7',
        type: 'paragraph',
        content:
          'Un proceso nocturno falla por razones que nadie ve: un servicio caído, un timeout, un registro bloqueado. El reintento tiene que ser idempotente y acotado, y al agotarse debe dejar el caso en manos de una persona en lugar de insistir.',
      },
      {
        id: 'b8',
        type: 'quote',
        content:
          'Si la automatización no puede explicarse, el equipo deja de confiar en ella y vuelve al proceso manual.',
      },
      { id: 'b9', type: 'heading', content: 'Alertas que alguien lee' },
      {
        id: 'b10',
        type: 'paragraph',
        content:
          'La regla que seguimos fue simple: una alerta por cada situación que requiere acción humana, y ninguna por lo que el proceso ya resolvió. El resultado fue una carga operativa 56% menor sin perder control sobre los casos excepcionales.',
      },
    ],
  },
  {
    slug: 'microservicios-sin-sobreingenieria',
    title: 'Microservicios sin sobreingeniería en equipos pequeños',
    excerpt:
      'Cuándo conviene separar un servicio y cuándo un módulo bien delimitado resuelve lo mismo con menos costo.',
    category: 'Backend',
    date: 'Jul 2026',
    readingMinutes: 6,
    blocks: [
      {
        id: 'b1',
        type: 'paragraph',
        content:
          'Cuándo conviene separar un servicio y cuándo un módulo bien delimitado resuelve lo mismo con menos costo.',
      },
    ],
  },
  {
    slug: 'reporteria-sin-castigar-la-base-de-datos',
    title: 'Reportería que no castiga a la base de datos',
    excerpt:
      'Vistas materializadas, agregados previos y cachés para acelerar tableros de KPIs sin tumbar el servidor.',
    category: 'Datos',
    date: 'Jun 2026',
    readingMinutes: 7,
    blocks: [
      {
        id: 'b1',
        type: 'paragraph',
        content:
          'Vistas materializadas, agregados previos y cachés para acelerar tableros de KPIs sin tumbar el servidor.',
      },
    ],
  },
  {
    slug: 'web-services-heredados',
    title: 'Consumir web services heredados sin volverse loco',
    excerpt:
      'Capas de traducción, contratos explícitos y pruebas de contrato para integrar sistemas antiguos.',
    category: 'Backend',
    date: 'May 2026',
    readingMinutes: 5,
    blocks: [
      {
        id: 'b1',
        type: 'paragraph',
        content:
          'Capas de traducción, contratos explícitos y pruebas de contrato para integrar sistemas antiguos.',
      },
    ],
  },
  {
    slug: 'tareas-programadas-errores',
    title: 'Tareas programadas: errores que se pagan de madrugada',
    excerpt:
      'Idempotencia, ventanas de ejecución y alertas útiles para procesos que corren sin supervisión.',
    category: 'Automatización',
    date: 'Mar 2026',
    readingMinutes: 5,
    blocks: [
      {
        id: 'b1',
        type: 'paragraph',
        content:
          'Idempotencia, ventanas de ejecución y alertas útiles para procesos que corren sin supervisión.',
      },
    ],
  },
]

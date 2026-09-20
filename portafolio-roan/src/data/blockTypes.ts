import type { ArticleBlockType } from '@/types'

export interface BlockTypeMeta {
  type: ArticleBlockType
  short: string
  label: string
  icon: string
  rows: number
  placeholder: string
  textClass: string
}

export const blockTypes: BlockTypeMeta[] = [
  {
    type: 'heading',
    short: 'Título',
    label: 'Título de sección',
    icon: 'H2',
    rows: 1,
    placeholder: 'Registrar la decisión, no solo el resultado',
    textClass: 'text-[22px] font-extrabold text-white',
  },
  {
    type: 'subheading',
    short: 'Subtítulo',
    label: 'Subtítulo',
    icon: 'H3',
    rows: 1,
    placeholder: 'Qué se guarda en cada ejecución',
    textClass: 'text-[17px] font-bold text-fg',
  },
  {
    type: 'paragraph',
    short: 'Párrafo',
    label: 'Párrafo',
    icon: '¶',
    rows: 4,
    placeholder: 'Escribe el párrafo…',
    textClass: 'text-[15px] font-normal text-prose',
  },
  {
    type: 'code',
    short: 'Código',
    label: 'Bloque de código',
    icon: '{}',
    rows: 5,
    placeholder: "// audit.log\nticket: 'INC-48213',",
    textClass: 'font-mono text-[13px] font-normal text-code',
  },
  {
    type: 'quote',
    short: 'Cita',
    label: 'Cita destacada',
    icon: '❝',
    rows: 2,
    placeholder: 'Si la automatización no puede explicarse, el equipo deja de confiar en ella.',
    textClass: 'text-[18px] font-semibold text-white',
  },
  {
    type: 'list',
    short: 'Lista',
    label: 'Lista',
    icon: '•',
    rows: 3,
    placeholder: '— Idempotencia\n— Ventanas de ejecución',
    textClass: 'text-[15px] font-normal text-prose',
  },
  {
    type: 'image',
    short: 'Imagen',
    label: 'Imagen',
    icon: '▣',
    rows: 1,
    placeholder: 'Pie de imagen o URL del archivo',
    textClass: 'text-[13.5px] font-normal text-muted',
  },
]

export function getBlockType(type: ArticleBlockType): BlockTypeMeta {
  return blockTypes.find((meta) => meta.type === type) ?? blockTypes[2]!
}

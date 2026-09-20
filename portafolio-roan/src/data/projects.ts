import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'automatizacion-cierre-tickets',
    title: 'Automatización de cierre de tickets',
    description:
      'Servicio nocturno que analiza cada caso y decide su cierre. Redujo 56% la carga operativa del equipo.',
    tags: ['Python', 'Microservicios', 'SQL Server'],
  },
  {
    id: 'portal-reporteria-kpis',
    title: 'Portal de reportería y KPIs',
    description:
      'Estadísticas e indicadores generados de forma automática. Redujo más de 70% el tiempo de obtención de reportes.',
    tags: ['Vue.js', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'administracion-cv',
    title: 'Sistema de administración de CV',
    description:
      'Gestión de currículums con generación de documentos en PDF y Word y control de usuarios.',
    tags: ['PHP', 'MySQL', 'DGTIC — UNAM'],
  },
]

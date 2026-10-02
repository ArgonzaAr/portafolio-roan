import type { Project } from '@/types'

/** Construye las rutas públicas de las capturas de `public/project_img/<id>/`. */
function images(id: string, names: string[]): string[] {
  return names.map((name) => `/project_img/${id}/${name}.webp`)
}

export const projects: Project[] = [
  {
    id: 'arcade-vault',
    title: 'Arcade Vault',
    description:
      'Portal retro de juegos arcade clásicos para jugar en el navegador, con biblioteca filtrable, puntuaciones guardadas y salón de la fama por juego.',
    tags: ['Next.js', 'React', 'Supabase'],
    url: 'https://arcade-vault-ebon.vercel.app/',
    images: images('arcade-vault', [
      '01-hero-desktop',
      '02-biblioteca-desktop',
      '03-detalle-arkanoid-desktop',
      '04-partida-arkanoid-desktop',
      '05-fin-del-juego-desktop',
      '06-salon-de-la-fama-desktop',
    ]),
  },
  {
    id: 'cocina-chiapas',
    title: 'Cocina Chiapas',
    description:
      'Sitio para un restaurante de comida tradicional: menú de comida corrida y platillos fuertes, sección de eventos y formulario de cotización.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://cocina-chiapas-roan.netlify.app/',
    images: images('cocina-chiapas', [
      '01-hero-desktop',
      '02-comida-corrida-desktop',
      '03-platillos-fuertes-desktop',
      '04-menu-completo-desktop',
      '05-eventos-hero-desktop',
      '06-cotizacion-desktop',
      '07-eventos-completo-desktop',
    ]),
  },
  {
    id: 'admin-pacientes',
    title: 'Administrador de pacientes',
    description:
      'Aplicación para registrar pacientes de una veterinaria, con validación de formulario y edición o eliminación de registros.',
    tags: ['React', 'Tailwind CSS'],
    url: 'https://admin-pacientes-roan.netlify.app/',
    images: images('admin-pacientes', [
      '01-estado-inicial-desktop',
      '02-validacion-desktop',
      '03-formulario-lleno-desktop',
      '04-pacientes-registrados-desktop',
      '04-pacientes-registrados-full-desktop',
    ]),
  },
  {
    id: 'coffee-blog',
    title: 'Blog de Café',
    description:
      'Blog con recetas y cursos de café, con secciones de inicio, nosotros, cursos y contacto.',
    tags: ['HTML', 'CSS'],
    url: 'https://coffee-blog-roan.netlify.app/',
    images: images('coffee-blog', [
      '01-inicio-hero-desktop',
      '02-inicio-completo-desktop',
      '03-nosotros-desktop',
      '04-cursos-desktop',
      '05-contacto-desktop',
    ]),
  },
  {
    id: 'admin-gastos',
    title: 'Planificador de gastos',
    description:
      'Control de presupuesto con gráfica de avance, alta y edición de gastos y filtro por categoría.',
    tags: ['React', 'JavaScript'],
    url: 'https://admingastos-roan.netlify.app/',
    images: images('admin-gastos', [
      '01-presupuesto-inicial-desktop',
      '02-dashboard-desktop',
      '03-modal-nuevo-gasto-desktop',
      '04-filtro-categoria-desktop',
      '05-editar-gasto-desktop',
    ]),
  },
  {
    id: 'invitacion-ale-angel',
    title: 'Invitación Ale & Ángel',
    description:
      'Invitación de boda digital con cuenta regresiva, historia, itinerario, código de vestimenta, mesa de regalos y confirmación de asistencia.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://invitacion-ale-angel.netlify.app/',
    images: images('invitacion-ale-angel', [
      '01-portada-desktop',
      '02-historia-desktop',
      '03-horario-desktop',
      '04-itinerario-desktop',
      '05-vestimenta-desktop',
      '06-regalos-desktop',
      '07-confirmacion-desktop',
    ]),
  },
]

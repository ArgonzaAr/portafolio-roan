export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  url?: string
  /** Rutas públicas de las capturas, en el orden del carrusel. La primera es la portada. */
  images: string[]
}

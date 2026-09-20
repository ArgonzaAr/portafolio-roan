export type ArticleBlockType =
  'heading' | 'subheading' | 'paragraph' | 'code' | 'quote' | 'list' | 'image'

export interface ArticleBlock {
  id: string
  type: ArticleBlockType
  content: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readingMinutes: number
  blocks: ArticleBlock[]
}

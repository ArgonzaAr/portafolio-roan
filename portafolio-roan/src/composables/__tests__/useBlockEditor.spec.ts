import { describe, it, expect } from 'vitest'
import { useBlockEditor } from '../useBlockEditor'
import type { ArticleBlock } from '@/types'

const seed = (): ArticleBlock[] => [
  { id: 'a', type: 'paragraph', content: 'uno dos tres' },
  { id: 'b', type: 'heading', content: 'cuatro' },
  { id: 'c', type: 'code', content: '' },
]

const ids = (editor: ReturnType<typeof useBlockEditor>) => editor.blocks.value.map((b) => b.id)

describe('useBlockEditor', () => {
  it('agrega bloques al final con id único y contenido vacío', () => {
    const editor = useBlockEditor(seed())
    editor.add('quote')
    editor.add('list')
    const [quote, list] = editor.blocks.value.slice(-2)
    expect(quote).toMatchObject({ type: 'quote', content: '' })
    expect(list).toMatchObject({ type: 'list', content: '' })
    expect(new Set(ids(editor)).size).toBe(5)
  })

  it('sube y baja bloques', () => {
    const editor = useBlockEditor(seed())
    editor.move(1, -1)
    expect(ids(editor)).toEqual(['b', 'a', 'c'])
    editor.move(1, 1)
    expect(ids(editor)).toEqual(['b', 'c', 'a'])
  })

  it('ignora movimientos fuera de rango', () => {
    const editor = useBlockEditor(seed())
    editor.move(0, -1)
    editor.move(2, 1)
    editor.move(9, 1)
    expect(ids(editor)).toEqual(['a', 'b', 'c'])
  })

  it('elimina bloques por id', () => {
    const editor = useBlockEditor(seed())
    editor.remove('b')
    expect(ids(editor)).toEqual(['a', 'c'])
    editor.remove('no-existe')
    expect(ids(editor)).toEqual(['a', 'c'])
  })

  it('actualiza el contenido de un bloque', () => {
    const editor = useBlockEditor(seed())
    editor.update('c', 'const x = 1')
    expect(editor.blocks.value[2]!.content).toBe('const x = 1')
  })

  it('cuenta palabras y estima la lectura (mínimo 1 min)', () => {
    const editor = useBlockEditor(seed())
    expect(editor.wordCount.value).toBe(4)
    expect(editor.readingMinutes.value).toBe(1)
    editor.update('c', Array(400).fill('palabra').join(' '))
    expect(editor.wordCount.value).toBe(404)
    expect(editor.readingMinutes.value).toBe(2)
  })

  it('no muta el arreglo inicial recibido', () => {
    const initial = seed()
    const editor = useBlockEditor(initial)
    editor.update('a', 'otro')
    editor.remove('b')
    expect(initial).toEqual(seed())
  })
})

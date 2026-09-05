import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'

describe('Page Le club (dist/le-club/index.html)', () => {
  let dom: JSDOM

  beforeAll(async () => {
    dom = new JSDOM(await readFile('dist/le-club/index.html', 'utf-8'))
  })

  it('should_display_projet_lieu_and_partenaires_names', () => {
    const texte = dom.window.document.body.textContent ?? ''
    expect(texte).toContain('Stade Joseph Ferrero')
    expect(texte).toContain('1955 avenue de la République')
    expect(texte).toContain('AS Monaco')
    expect(texte).toContain('Ünseme')
    const positionFormer = texte.indexOf('Former des joueurs')
    const positionGrandir = texte.indexOf('Faire grandir des personnes')
    const positionFamille = texte.indexOf('Construire une famille')
    expect(positionFormer).toBeLessThan(positionGrandir)
    expect(positionGrandir).toBeLessThan(positionFamille)
  })

  it('should_display_unseme_name_only_without_any_logo_image', () => {
    const texte = dom.window.document.body.textContent ?? ''
    expect(texte).toContain('Ünseme')
    expect(dom.window.document.querySelector('img[alt*="Ünseme"]')).toBeNull()
  })
})

import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'

// Décision utilisateur (J5) : les visuels passent par le pipeline Astro (URL hachée) —
// le test cible un <img> SVG distinct du logo, pas un chemin.
const SELECTEUR_VISUEL = 'img[src$=".svg"], img[src^="data:image/svg+xml"]'

describe('Page Accueil (dist/index.html)', () => {
  let dom: JSDOM

  beforeAll(async () => {
    const html = await readFile('dist/index.html', 'utf-8')
    dom = new JSDOM(html)
  })

  it('should_display_club_name_logo_visuel_piliers_and_link_to_rejoindre', () => {
    const texte = dom.window.document.body.textContent ?? ''
    expect(texte).toContain('Sporting Club Roquettan')
    expect(texte).toContain('Former des joueurs')
    expect(texte).toContain('Faire grandir des personnes')
    expect(texte).toContain('Construire une famille')
    expect(dom.window.document.querySelector('img[src="/assets/logo-scr-720.jpg"]')).not.toBeNull()
    expect(dom.window.document.querySelector(SELECTEUR_VISUEL)).not.toBeNull()
    expect(dom.window.document.querySelector('a[href*="rejoindre"]')).not.toBeNull()
  })

  it('should_have_a_non_empty_alt_text_on_the_accueil_visuel', () => {
    const visuel = dom.window.document.querySelector(SELECTEUR_VISUEL)
    expect(visuel?.getAttribute('alt')?.trim().length ?? 0).toBeGreaterThan(0)
  })
})

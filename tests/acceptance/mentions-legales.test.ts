import { describe, it, expect } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'

describe('Page Mentions légales (dist/mentions-legales/index.html)', () => {
  it('should_display_editeur_president_adresse_telephone_and_hebergeur', async () => {
    const html = await readFile('dist/mentions-legales/index.html', 'utf-8')
    const texte = new JSDOM(html).window.document.body.textContent ?? ''
    expect(texte).toContain('Sporting Club Roquettan')
    expect(texte).toContain('Nicolas Votano')
    expect(texte).toContain('1955 avenue de la République, 06550 La Roquette-sur-Siagne')
    expect(texte).toContain('06 71 58 95 18')
    expect(texte).toContain('Vercel Inc.')
  })
})

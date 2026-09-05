import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

// Décision utilisateur 2026-09-05 : numéro de téléphone retiré du site en attente d'accord.
const NUMERO_RETIRE = '06 71 58 95 18'

function trouverTousLesIndexHtml(racine: string): string[] {
  const resultats: string[] = []
  for (const entree of readdirSync(racine)) {
    const chemin = path.join(racine, entree)
    if (statSync(chemin).isDirectory()) resultats.push(...trouverTousLesIndexHtml(chemin))
    else if (entree === 'index.html') resultats.push(chemin)
  }
  return resultats
}

describe('Page Rejoindre / Contact (dist/rejoindre/index.html)', () => {
  let dom: JSDOM

  beforeAll(async () => {
    dom = new JSDOM(await readFile('dist/rejoindre/index.html', 'utf-8'))
  })

  it('should_display_instagram_and_lieu_without_any_phone_number', () => {
    const texte = dom.window.document.body.textContent ?? ''
    expect(texte).toContain('@sporting.club.roquettan')
    expect(texte).toContain('Stade Joseph Ferrero')
    expect(texte).not.toContain(NUMERO_RETIRE)
    expect(dom.window.document.querySelector('a[href^="tel:"]')).toBeNull()
  })

  it('should_offer_the_club_email_as_a_mailto_link', () => {
    const lien = dom.window.document.querySelector('a[href="mailto:sporting.club.roquettan@gmail.com"]')
    expect(lien).not.toBeNull()
  })

  it('should_offer_a_maps_link_to_the_stade_address', () => {
    const lien = dom.window.document.querySelector('a[href^="https://www.google.com/maps/search/?api=1&query="]')
    expect(lien).not.toBeNull()
    expect(decodeURIComponent(lien?.getAttribute('href') ?? '')).toContain('1955 avenue de la République')
  })

  it('should_link_instagram_to_the_official_account', () => {
    const lien = dom.window.document.querySelector('a[href*="instagram.com/sporting.club.roquettan"]')
    expect(lien).not.toBeNull()
  })

  it('should_not_expose_the_phone_number_nor_a_call_link_on_any_page', () => {
    for (const fichier of trouverTousLesIndexHtml('dist')) {
      const page = new JSDOM(readFileSync(fichier, 'utf-8'))
      expect(page.window.document.body.textContent, fichier).not.toContain(NUMERO_RETIRE)
      expect(page.window.document.querySelector('a[href^="tel:"]'), fichier).toBeNull()
    }
  })
})

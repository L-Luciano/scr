import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

// Une page de redirection (meta refresh générée par Astro) n'est pas une page servie aux familles.
const estUneRedirection = (chemin: string) => /http-equiv="refresh"/i.test(readFileSync(chemin, 'utf-8'))

function trouverTousLesIndexHtml(racine: string): string[] {
  const resultats: string[] = []
  for (const entree of readdirSync(racine)) {
    const chemin = path.join(racine, entree)
    if (statSync(chemin).isDirectory()) resultats.push(...trouverTousLesIndexHtml(chemin))
    else if (entree === 'index.html' && !estUneRedirection(chemin)) resultats.push(chemin)
  }
  return resultats
}

describe('Découvrabilité web — scan de dist/', () => {
  let parPage: { chemin: string; titre: string; description: string }[]

  // ISSUE-022 : lecture de dist/ dans un beforeAll, jamais à la collecte.
  beforeAll(() => {
    parPage = trouverTousLesIndexHtml('dist').map(f => {
      const dom = new JSDOM(readFileSync(f, 'utf-8'))
      return {
        chemin: f,
        titre: dom.window.document.querySelector('title')?.textContent ?? '',
        description: dom.window.document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      }
    })
    expect(parPage.length).toBeGreaterThanOrEqual(6)
  })

  it('should_have_a_non_empty_title_and_description_mentioning_the_club_and_the_commune_on_every_page', () => {
    parPage.forEach(({ titre, description }) => {
      expect(titre).toContain('Sporting Club Roquettan')
      expect(titre).toContain('La Roquette-sur-Siagne')
      expect(description).toContain('Sporting Club Roquettan')
      expect(description).toContain('La Roquette-sur-Siagne')
    })
  })

  it('should_suffix_the_actualite_detail_title_with_the_club_name', () => {
    // La route de détail est l'ActualiteId dérivé du nom de fichier (domain-model), pas du titre.
    const detail = parPage.find(p => p.chemin.includes('/actualites/2026-09-03-100-inscrits/'))
    expect(detail?.titre).toBe('Premier objectif dépassé : plus de 100 inscrits — Sporting Club Roquettan, La Roquette-sur-Siagne')
  })

  it('should_never_have_two_pages_sharing_the_exact_same_title', () => {
    const titres = parPage.map(p => p.titre)
    expect(new Set(titres).size).toBe(titres.length)
  })
})

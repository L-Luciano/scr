import { describe, it, expect } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

function trouverTousLesIndexHtml(racine: string): string[] {
  const resultats: string[] = []
  for (const entree of readdirSync(racine)) {
    const chemin = path.join(racine, entree)
    if (statSync(chemin).isDirectory()) resultats.push(...trouverTousLesIndexHtml(chemin))
    else if (entree === 'index.html') resultats.push(chemin)
  }
  return resultats
}

// Décision utilisateur 2026-09-05 : mesure d'audience Vercel Web Analytics (sans cookie) sur toutes les pages.
describe('Mesure d’audience Vercel Web Analytics', () => {
  it('should_embed_the_vercel_insights_script_on_every_page', () => {
    const pages = trouverTousLesIndexHtml('dist')
    expect(pages.length).toBeGreaterThan(0)
    for (const fichier of pages) {
      const dom = new JSDOM(readFileSync(fichier, 'utf-8'))
      const scripts = [...dom.window.document.querySelectorAll('script')].map(s => (s.getAttribute('src') ?? '') + (s.textContent ?? ''))
      expect(scripts.some(s => s.includes('/_vercel/insights')), fichier).toBe(true)
    }
  })

  it('should_embed_the_vercel_speed_insights_script_on_every_page', () => {
    for (const fichier of trouverTousLesIndexHtml('dist')) {
      const dom = new JSDOM(readFileSync(fichier, 'utf-8'))
      const scripts = [...dom.window.document.querySelectorAll('script')].map(s => (s.getAttribute('src') ?? '') + (s.textContent ?? ''))
      expect(scripts.some(s => s.includes('/_vercel/speed-insights')), fichier).toBe(true)
    }
  })
})

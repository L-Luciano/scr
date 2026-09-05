import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'
import { execa } from 'execa'

const SELECTEUR_VISUEL = 'img[src$=".svg"], img[src^="data:image/svg+xml"]'
const DELAI_BUILD_MS = 120_000

describe('Page Actualités (dist/actualites/index.html)', () => {
  let liste: JSDOM
  let detail: JSDOM

  beforeAll(async () => {
    liste = new JSDOM(await readFile('dist/actualites/index.html', 'utf-8'))
    detail = new JSDOM(await readFile('dist/actualites/2026-09-03-100-inscrits/index.html', 'utf-8'))
  })

  it('should_display_the_published_actualite_with_title_date_extrait_and_open_full_text_on_click', () => {
    const texte = liste.window.document.body.textContent ?? ''
    expect(texte).toContain('Premier objectif dépassé : plus de 100 inscrits')
    expect(texte).toContain('2026-09-03')
    expect(texte).toContain('Le premier jour de la rentrée a suffi : le SCR a passé la barre des cent licenciés.')
    expect(liste.window.document.querySelector('a[href*="/actualites/2026-09-03-100-inscrits"]')).not.toBeNull()
  })

  it('should_have_a_non_empty_alt_text_on_the_actualites_list_page', () => {
    const visuel = liste.window.document.querySelector(SELECTEUR_VISUEL)
    expect(visuel?.getAttribute('alt')?.trim().length ?? 0).toBeGreaterThan(0)
  })

  it('should_have_a_non_empty_alt_text_on_the_actualite_detail_page', () => {
    const visuel = detail.window.document.querySelector(SELECTEUR_VISUEL)
    expect(visuel?.getAttribute('alt')?.trim().length ?? 0).toBeGreaterThan(0)
  })
})

describe('Page Actualités sans aucune actualité (fixture aucune-actualite)', () => {
  it('should_display_the_exact_empty_state_message_when_no_actualite_is_published', async () => {
    const build = await execa('npx', ['astro', 'build'], { cwd: 'tests/acceptance/fixtures/aucune-actualite', reject: false })
    expect(build.exitCode).toBe(0)
    const html = await readFile('tests/acceptance/fixtures/aucune-actualite/dist/actualites/index.html', 'utf-8')
    const texte = new JSDOM(html).window.document.body.textContent ?? ''
    expect(texte).toContain("Aucune actualité n'est disponible pour le moment.")
    expect(new JSDOM(html).window.document.querySelector('ul.cartes')).toBeNull()
  }, DELAI_BUILD_MS)
})

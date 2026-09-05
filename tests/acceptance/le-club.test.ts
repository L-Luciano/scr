import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'

describe('Page Le club (dist/le-club/index.html) et Partenaires', () => {
  let club: JSDOM
  let partenaires: JSDOM

  beforeAll(async () => {
    club = new JSDOM(await readFile('dist/le-club/index.html', 'utf-8'))
    partenaires = new JSDOM(await readFile('dist/partenaires/index.html', 'utf-8'))
  })

  it('should_display_lieu_on_le_club_and_partenaires_names_on_partenaires', () => {
    const texteClub = club.window.document.body.textContent ?? ''
    expect(texteClub).toContain('Stade Joseph Ferrero')
    expect(texteClub).toContain('1955 avenue de la République')
    const textePartenaires = partenaires.window.document.body.textContent ?? ''
    expect(textePartenaires).toContain('Super U Pégomas')
    expect(textePartenaires).toContain('SODDY')
  })

  it('should_display_partner_names_only_without_any_logo_image', () => {
    expect(partenaires.window.document.querySelector('ul.partenaires img')).toBeNull()
  })

  it('should_mention_club_satellite_literally_on_the_project_page_without_interpretation', async () => {
    const projet = new JSDOM(await readFile('dist/le-club/projet/index.html', 'utf-8'))
    const t = projet.window.document.body.textContent ?? ''
    expect(t.toLowerCase()).toContain('club satellite')
    expect(t).toContain('AS Monaco')
    expect(t).toContain('Ünseme')
    expect(t).not.toMatch(/centre de formation|détection|académie/i)
  })
})

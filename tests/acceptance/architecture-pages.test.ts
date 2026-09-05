import { describe, it, expect } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'

const lire = async (chemin: string) => new JSDOM(await readFile(chemin, 'utf-8'))
const texteDe = (dom: JSDOM) => dom.window.document.body.textContent ?? ''

describe('Architecture du site — pages issues de la restructuration', () => {
  it('should_present_the_club_story_on_le_club_without_partners_or_values_sections', async () => {
    const t = texteDe(await lire('dist/le-club/index.html'))
    expect(t).toContain('Un club né en 2026')
    expect(t).toContain('Stade Joseph Ferrero')
    expect(t).not.toContain('Super U Pégomas')
    expect(t).not.toContain('Carnet des Valeurs')
  })

  it('should_present_the_project_with_pillars_rugby_mentality_and_unseme_programme', async () => {
    const dom = await lire('dist/le-club/projet/index.html')
    const t = texteDe(dom)
    expect(t.indexOf('Former des joueurs')).toBeLessThan(t.indexOf('Faire grandir des personnes'))
    expect(t).toContain('valeurs du rugby')
    expect(dom.window.document.querySelector('.programme-sportif')?.textContent).toContain('Programme Ünseme')
  })

  it('should_present_seven_value_cards_four_revealed_and_three_a_venir', async () => {
    const dom = await lire('dist/le-club/valeurs/index.html')
    const cartes = [...dom.window.document.querySelectorAll('.valeur')]
    expect(cartes.length).toBe(7)
    expect(cartes.filter(c => c.classList.contains('revelee')).length).toBe(4)
    expect(cartes.filter(c => !c.classList.contains('revelee')).length).toBe(3)
    expect(texteDe(dom)).toContain("L'éthique")
    expect(texteDe(dom)).toContain("L'abnégation")
    expect(texteDe(dom)).toContain('à découvrir prochainement')
  })

  it('should_present_categories_with_formats_educateurs_and_a_completer_mentions', async () => {
    const dom = await lire('dist/categories/index.html')
    const t = texteDe(dom)
    expect(t).toContain('Baby foot')
    expect(t).toContain('U17')
    expect(t).toContain('Senior')
    expect(t).toContain('2022 et 2023')
    expect(t).toContain('à compléter par le club')
    const u8 = [...dom.window.document.querySelectorAll('.categorie')].find(c => c.textContent?.includes('U8'))
    expect(u8?.textContent).toContain('Franck Moreau')
    expect(t).not.toContain('06 71 58 95 18')
  })

  it('should_list_coordinateur_and_responsable_foot_reduit_on_equipe', async () => {
    const t = texteDe(await lire('dist/le-club/bureau/index.html'))
    expect(t).toContain('Franck Moreau')
    expect(t).toContain('Coordinateur sportif')
    expect(t).toContain('Benjamin Guibal')
  })

  it('should_list_financial_partners_and_a_devenir_partenaire_call_on_partenaires_page', async () => {
    const dom = await lire('dist/partenaires/index.html')
    const noms = [...dom.window.document.querySelectorAll('ul.partenaires li')].map(li => li.textContent?.trim())
    expect(noms).toEqual(expect.arrayContaining(['Super U Pégomas', 'E.Leclerc Cannes', 'Construction Giagnoni', 'SODDY']))
    expect(noms).not.toContain('AS Monaco')
    expect(dom.window.document.querySelector('a[href="mailto:sporting.club.roquettan@gmail.com"]')).not.toBeNull()
    expect(texteDe(dom)).toContain('Devenir partenaire')
  })

  it('should_merge_the_staff_into_le_bureau_page', async () => {
    const t = texteDe(await lire('dist/le-club/bureau/index.html'))
    expect(t).toContain('Nicolas Longo')
    expect(t).toContain('Directeur sportif')
  })

  it('should_offer_a_two_level_navigation_with_le_club_group_and_six_top_entries', async () => {
    const dom = await lire('dist/index.html')
    const sousLiens = [...dom.window.document.querySelectorAll('header .nav-bureau .sous-menu a')].map(a => a.getAttribute('href'))
    expect(sousLiens).toEqual(['/le-club', '/le-club/projet', '/le-club/valeurs', '/le-club/bureau'])
    const principaux = [...dom.window.document.querySelectorAll('header .nav-bureau > a, header .nav-bureau > .groupe > a')].map(a => a.getAttribute('href'))
    expect(principaux).toEqual(['/', '/le-club', '/categories', '/actualites', '/partenaires'])
    expect(dom.window.document.querySelector('header > a.cta[href="/rejoindre"]')).not.toBeNull()
  })
})

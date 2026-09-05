import { describe, it, expect } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'

const lienActif = (dom: JSDOM) =>
  [...dom.window.document.querySelectorAll('header .nav-bureau a[aria-current="page"]')].map(a => a.getAttribute('href'))

describe('Navigation — indication de la page courante', () => {
  it('should_mark_only_the_current_page_link_as_current_on_le_club', async () => {
    const dom = new JSDOM(await readFile('dist/le-club/index.html', 'utf-8'))
    expect(lienActif(dom)).toEqual(['/le-club'])
  })

  it('should_mark_actualites_as_current_on_an_actualite_detail_page', async () => {
    const dom = new JSDOM(await readFile('dist/actualites/2026-09-03-100-inscrits/index.html', 'utf-8'))
    expect(lienActif(dom)).toEqual(['/actualites'])
  })

  it('should_mark_only_accueil_as_current_on_the_home_page', async () => {
    const dom = new JSDOM(await readFile('dist/index.html', 'utf-8'))
    expect(lienActif(dom)).toEqual(['/'])
  })

  it('should_mark_the_current_link_in_the_mobile_menu_too', async () => {
    const dom = new JSDOM(await readFile('dist/le-club/bureau/index.html', 'utf-8'))
    const actifs = [...dom.window.document.querySelectorAll('header details.menu nav a[aria-current="page"]')].map(a => a.getAttribute('href'))
    expect(actifs).toEqual(['/le-club', '/le-club/bureau'])
  })

  it('should_mark_le_club_group_and_the_sub_page_as_current_on_le_projet', async () => {
    const dom = new JSDOM(await readFile('dist/le-club/projet/index.html', 'utf-8'))
    expect(lienActif(dom)).toEqual(['/le-club', '/le-club/projet'])
  })
})

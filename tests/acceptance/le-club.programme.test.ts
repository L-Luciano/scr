import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'

describe('Page Le club — programme sportif distinct des partenaires', () => {
  let dom: JSDOM

  beforeAll(async () => {
    dom = new JSDOM(await readFile('dist/le-club/projet/index.html', 'utf-8'))
  })

  it('should_present_unseme_as_a_programme_and_not_as_a_partenaire', () => {
    const programme = dom.window.document.querySelector('.programme-sportif')?.textContent ?? ''
    expect(programme).toContain('Programme Ünseme')
    expect(programme).toContain('AS Monaco')
    expect(programme).toContain('Club satellite')
    expect(dom.window.document.querySelector('ul.partenaires')).toBeNull()
  })
})

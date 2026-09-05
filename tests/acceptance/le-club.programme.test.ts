import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'

describe('Page Le club — programme sportif distinct des partenaires', () => {
  let dom: JSDOM

  beforeAll(async () => {
    dom = new JSDOM(await readFile('dist/le-club/index.html', 'utf-8'))
  })

  it('should_present_unseme_as_a_programme_and_not_as_a_partenaire', () => {
    const programme = dom.window.document.querySelector('.programme-sportif')?.textContent ?? ''
    expect(programme).toContain('Programme Ünseme')
    expect(programme).toContain('AS Monaco')
    expect(programme).toContain('Club satellite')
    const partenaires = [...dom.window.document.querySelectorAll('ul.partenaires li')].map(li => li.textContent?.trim())
    expect(partenaires).not.toContain('AS Monaco')
    expect(partenaires).not.toContain('Ünseme')
    expect(partenaires).toContain('Super U Pégomas')
  })
})

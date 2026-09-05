import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'

describe("Page L'équipe (dist/equipe/index.html)", () => {
  let dom: JSDOM

  beforeAll(async () => {
    dom = new JSDOM(await readFile('dist/equipe/index.html', 'utf-8'))
  })

  it('should_present_president_and_vice_president_with_their_role_and_message', () => {
    const texte = dom.window.document.body.textContent ?? ''
    expect(texte).toContain('Nicolas Votano')
    expect(texte).toContain('Président')
    expect(texte).toContain('Yann Le Caharec')
    expect(texte).toContain('Vice-président')
    expect(texte).toContain('la mentalité et les valeurs du rugby')
    expect(dom.window.document.querySelectorAll('blockquote').length).toBeGreaterThanOrEqual(2)
  })

  it('should_not_display_any_photo_of_a_real_person', () => {
    const images = [...dom.window.document.querySelectorAll('img')].filter(i => !i.getAttribute('src')?.includes('logo-scr-720.jpg'))
    expect(images.length).toBe(0)
  })
})

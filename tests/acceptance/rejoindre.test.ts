import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFile } from 'node:fs/promises'

describe('Page Rejoindre / Contact (dist/rejoindre/index.html)', () => {
  let dom: JSDOM

  beforeAll(async () => {
    dom = new JSDOM(await readFile('dist/rejoindre/index.html', 'utf-8'))
  })

  it('should_display_telephone_instagram_lieu_and_a_call_button', () => {
    const texte = dom.window.document.body.textContent ?? ''
    expect(texte).toContain('06 71 58 95 18')
    expect(texte).toContain('@sporting.club.roquettan')
    expect(texte).toContain('Stade Joseph Ferrero')
    expect(dom.window.document.querySelector('a[href^="tel:"]')).not.toBeNull()
  })

  it('should_link_the_call_button_to_the_exact_tel_uri', () => {
    const boutonAppel = dom.window.document.querySelector('a[href^="tel:"]')
    expect(boutonAppel?.getAttribute('href')).toBe('tel:0671589518')
  })

  it('should_display_the_exact_same_phone_number_on_accueil_and_rejoindre', async () => {
    const accueil = new JSDOM(await readFile('dist/index.html', 'utf-8'))
    const numeroAccueil = accueil.window.document.querySelector('a[href^="tel:"]')?.getAttribute('href')
    const numeroRejoindre = dom.window.document.querySelector('a[href^="tel:"]')?.getAttribute('href')
    expect(numeroAccueil).toBe('tel:0671589518')
    expect(numeroAccueil).toBe(numeroRejoindre)
    expect(accueil.window.document.body.textContent).toContain('06 71 58 95 18')
  })
})

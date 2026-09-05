import { describe, it, expect } from 'vitest'
import { genererVisuel } from './generer-visuel'
import { TOKENS_CHARTE } from '../src/domain/brand-system/charte-graphique'

describe('Génération du visuel par défaut', () => {
  it('should_use_only_charte_colors_when_generating_svg_from_any_title', () => {
    const titre = 'Tournoi inter-quartiers du 14 septembre'
    const couleursAutorisees = Object.values(TOKENS_CHARTE).map(hex => hex.toLowerCase())

    const svg = genererVisuel(titre)

    const couleursTrouvees = [...svg.matchAll(/#[0-9a-fA-F]{6}/g)].map(m => m[0].toLowerCase())
    expect(couleursTrouvees.length).toBeGreaterThan(0)
    couleursTrouvees.forEach(couleur => {
      expect(couleursAutorisees).toContain(couleur)
    })
  })
})

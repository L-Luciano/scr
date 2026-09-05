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

  it('should_never_start_a_text_line_with_french_punctuation_when_wrapping_the_title', () => {
    const svg = genererVisuel('Premier objectif dépassé : plus de 100 inscrits')
    const lignes = [...svg.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map(m => m[1])
    lignes.forEach(ligne => expect(ligne).not.toMatch(/^\s*[:;!?]/))
  })

  it('should_keep_every_title_line_within_the_safe_text_width_when_the_title_is_long', () => {
    const svg = genererVisuel('Le SCR rejoint le programme Ünseme de l’AS Monaco pour la saison 2026-2027')
    const tailles = [...svg.matchAll(/font-size="(\d+)"[^>]*letter-spacing="(\d+)"[^>]*>([^<]*)<\/text>/g)]
    expect(tailles.length).toBeGreaterThan(0)
    tailles.forEach(([, taille, espacement, texte]) => {
      const largeurEstimee = texte.length * (Number(taille) * 0.62 + Number(espacement))
      expect(largeurEstimee).toBeLessThanOrEqual(760)
    })
  })
})

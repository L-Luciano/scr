import { describe, it, expect } from 'vitest'
import { VisuelSchema } from './visuel.schema'

const MESSAGE_NON_CONFORMITE =
  'Le visuel doit être conforme à la charte graphique (palette Noir/Anthracite, Rose, Blanc ; aucune personne réelle identifiable).'

describe('VisuelSchema — conformité à la charte graphique', () => {
  it('should_accept_visuel_when_couleurs_appartiennent_a_la_palette_fermee_et_alt_est_present', () => {
    // Arrange — données parlantes : visuel réel de l'actualité "100 inscrits"
    const visuel = {
      asset: 'assets/visuels-generes/100-inscrits.svg',
      couleursUtilisees: ['rose', 'noir-anthracite'],
      personneReelle: false,
      alt: "Cent joueurs et joueuses souriants autour d'un ballon rose sur fond anthracite",
    }

    // Act
    const result = VisuelSchema.safeParse(visuel)

    // Assert — comportement observable : acceptation
    expect(result.success).toBe(true)
  })

  it('should_reject_visuel_when_couleur_est_hors_de_la_palette_fermee', () => {
    const visuelAvecBleu = {
      asset: 'assets/visuels-generes/100-inscrits.svg',
      couleursUtilisees: ['bleu'],
      personneReelle: false,
      alt: 'Texte alternatif quelconque',
    }
    const result = VisuelSchema.safeParse(visuelAvecBleu)
    expect(result.success).toBe(false)
    expect(
      result.error?.issues.some(
        i => i.message === MESSAGE_NON_CONFORMITE,
      ),
    ).toBe(true)
  })

  it('should_reject_visuel_when_personne_reelle_est_declaree_true', () => {
    const visuelAvecPersonneReelle = {
      asset: 'assets/photo-equipe.jpg',
      couleursUtilisees: ['rose'],
      personneReelle: true,
      alt: 'Texte alternatif quelconque',
    }
    const result = VisuelSchema.safeParse(visuelAvecPersonneReelle)
    expect(result.success).toBe(false)
    expect(
      result.error?.issues.some(
        i => i.message === MESSAGE_NON_CONFORMITE,
      ),
    ).toBe(true)
  })

  it('should_reject_visuel_when_alt_est_absent', () => {
    const visuelSansAlt = {
      asset: 'assets/visuels-generes/100-inscrits.svg',
      couleursUtilisees: ['rose', 'noir-anthracite'],
      personneReelle: false,
    }
    const result = VisuelSchema.safeParse(visuelSansAlt)
    expect(result.success).toBe(false)
    expect(
      result.error?.issues.some(
        i => i.message === 'Le champ « alt » (texte alternatif du visuel) est obligatoire.',
      ),
    ).toBe(true)
  })
})

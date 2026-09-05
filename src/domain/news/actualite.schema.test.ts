import { describe, it, expect } from 'vitest'
import { ActualiteSchema } from './actualite.schema'

describe('ActualiteSchema — invariants obligatoires', () => {
  const visuelConforme = {
    asset: 'assets/visuels-generes/100-inscrits.svg',
    couleursUtilisees: ['rose', 'noir-anthracite'],
    personneReelle: false,
    alt: "Cent joueurs et joueuses souriants autour d'un ballon rose sur fond anthracite",
  }

  it('should_reject_actualite_when_titre_est_absent', () => {
    const actualiteSansTitre = {
      datePublication: '2026-09-03',
      extrait: 'Le club franchit le cap symbolique de 100 licenciés.',
      visuel: visuelConforme,
    }
    const result = ActualiteSchema.safeParse(actualiteSansTitre)
    expect(result.success).toBe(false)
    expect(result.error?.issues.some(i => i.message === 'Le champ « titre » est obligatoire.')).toBe(true)
  })

  it('should_reject_actualite_when_date_publication_est_absente', () => {
    const actualiteSansDate = {
      titre: 'Premier objectif dépassé : plus de 100 inscrits',
      extrait: 'Le club franchit le cap symbolique de 100 licenciés.',
      visuel: visuelConforme,
    }
    const result = ActualiteSchema.safeParse(actualiteSansDate)
    expect(result.success).toBe(false)
    expect(result.error?.issues.some(i => i.message === 'Le champ « datePublication » est obligatoire (format ISO AAAA-MM-JJ).')).toBe(true)
  })

  it('should_reject_actualite_when_extrait_est_absent', () => {
    const actualiteSansExtrait = {
      titre: 'Premier objectif dépassé : plus de 100 inscrits',
      datePublication: '2026-09-03',
      visuel: visuelConforme,
    }
    const result = ActualiteSchema.safeParse(actualiteSansExtrait)
    expect(result.success).toBe(false)
    expect(result.error?.issues.some(i => i.message === 'Le champ « extrait » est obligatoire (1 à 200 caractères).')).toBe(true)
  })

  it('should_reject_actualite_when_visuel_utilise_une_couleur_hors_palette', () => {
    const actualiteVisuelBleu = {
      titre: 'Premier objectif dépassé : plus de 100 inscrits',
      datePublication: '2026-09-03',
      extrait: 'Le club franchit le cap symbolique de 100 licenciés.',
      visuel: { ...visuelConforme, couleursUtilisees: ['bleu'] },
    }
    const result = ActualiteSchema.safeParse(actualiteVisuelBleu)
    expect(result.success).toBe(false)
    expect(
      result.error?.issues.some(
        i => i.message === 'Le visuel doit être conforme à la charte graphique (palette Noir/Anthracite, Rose, Blanc ; aucune personne réelle identifiable).',
      ),
    ).toBe(true)
  })
})

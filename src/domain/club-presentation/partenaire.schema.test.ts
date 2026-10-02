import { describe, it, expect } from 'vitest'
import { PartenaireSchema, affichageLogo, libelleNiveau } from './partenaire.schema'

describe('PartenaireSchema — droits d’usage du logo', () => {
  it('should_reject_partenaire_when_logo_est_fourni_sans_droits_confirmes', () => {
    const partenaireSansDroits = { nom: 'Ünseme', droitsLogoConfirmes: false, logo: 'unseme.svg' }
    const result = PartenaireSchema.safeParse(partenaireSansDroits)
    expect(result.success).toBe(false)
  })

  it('should_return_no_displayable_logo_when_partenaire_has_no_confirmed_rights', () => {
    const unseme = { nom: 'Ünseme', droitsLogoConfirmes: false }
    expect(affichageLogo(unseme)).toBeNull()
  })
})

describe('PartenaireSchema — niveau de partenariat', () => {
  it('should_default_niveau_to_officiel_when_not_specified', () => {
    expect(PartenaireSchema.parse({ nom: 'SODDY' }).niveau).toBe('Officiel')
  })

  it('should_reject_an_unknown_niveau', () => {
    expect(PartenaireSchema.safeParse({ nom: 'X', niveau: 'Diamant' }).success).toBe(false)
  })

  it('should_label_niveaux_in_french_singular_and_plural', () => {
    expect(libelleNiveau('Platine', false)).toBe('Partenaire Platine')
    expect(libelleNiveau('Or', false)).toBe('Partenaire Or')
    expect(libelleNiveau('Officiel', true)).toBe('Partenaires officiels')
    expect(libelleNiveau('Officiel', false)).toBe('Partenaire officiel')
  })
})

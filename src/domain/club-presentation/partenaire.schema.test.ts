import { describe, it, expect } from 'vitest'
import { PartenaireSchema, affichageLogo } from './partenaire.schema'

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

import { describe, it, expect } from 'vitest'
import { NumeroTelephoneSchema, pourLienAppel, CoordonneesSchema } from './coordonnees.schema'

describe('NumeroTelephoneSchema', () => {
  it('should_accept_numero_when_il_respecte_le_format_telephone_francais', () => {
    const numero = '06 71 58 95 18'
    const result = NumeroTelephoneSchema.safeParse(numero)
    expect(result.success).toBe(true)
  })

  it('should_reject_numero_when_le_0_initial_est_absent', () => {
    const numeroSansIndicatif = '6 71 58 95 18'
    const result = NumeroTelephoneSchema.safeParse(numeroSansIndicatif)
    expect(result.success).toBe(false)
  })

  it('should_produce_tel_link_when_given_the_club_phone_number', () => {
    const lien = pourLienAppel('06 71 58 95 18')
    expect(lien).toBe('tel:0671589518')
  })

  it('should_accept_coordonnees_when_telephone_instagram_et_lieu_sont_presents', () => {
    const coordonnees = {
      telephone: '06 71 58 95 18',
      instagram: '@sporting.club.roquettan',
      lieu: { nom: 'Stade Joseph Ferrero', adresse: '1955 avenue de la République, 06550 La Roquette-sur-Siagne' },
    }
    expect(CoordonneesSchema.safeParse(coordonnees).success).toBe(true)
  })
})

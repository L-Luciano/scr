import { describe, it, expect } from 'vitest'
import { MembreSchema } from './membre.schema'

describe('MembreSchema — membres du bureau présentés sur le site', () => {
  it('should_accept_membre_when_nom_role_ordre_et_message_sont_presents', () => {
    const president = {
      nom: 'Nicolas Votano',
      role: 'Président',
      ordre: 1,
      message: "Je veux construire un club humain et sans limite dans l'ambition. Un club de football avec la mentalité et les valeurs du rugby.",
    }
    expect(MembreSchema.safeParse(president).success).toBe(true)
  })

  it('should_reject_membre_when_role_est_absent', () => {
    const sansRole = { nom: 'Yann Le Caharec', ordre: 2 }
    const result = MembreSchema.safeParse(sansRole)
    expect(result.success).toBe(false)
    expect(result.error?.issues.some(i => i.message === 'Le champ « role » est obligatoire pour un membre.')).toBe(true)
  })

  it('should_default_groupe_to_bureau_and_accept_staff', () => {
    const president = MembreSchema.safeParse({ nom: 'Nicolas Votano', role: 'Président', ordre: 1 })
    expect(president.success && president.data.groupe).toBe('bureau')
    const staff = MembreSchema.safeParse({ nom: 'Nicolas Longo', role: 'Directeur sportif', ordre: 3, groupe: 'staff' })
    expect(staff.success && staff.data.groupe).toBe('staff')
    expect(MembreSchema.safeParse({ nom: 'X', role: 'Y', ordre: 1, groupe: 'autre' }).success).toBe(false)
  })
})

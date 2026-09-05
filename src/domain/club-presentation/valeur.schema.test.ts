import { describe, it, expect } from 'vitest'
import { ValeurSchema, NOMBRE_DE_VALEURS } from './valeur.schema'

describe('ValeurSchema — Carnet des Valeurs (7 valeurs numérotées)', () => {
  it('should_accept_valeur_when_numero_nom_et_devise_sont_presents', () => {
    const abnegation = { numero: 4, nom: "L'abnégation", devise: "Se dépasser pour l'équipe, sans compter." }
    expect(ValeurSchema.safeParse(abnegation).success).toBe(true)
  })

  it('should_reject_valeur_when_numero_est_hors_du_carnet', () => {
    expect(ValeurSchema.safeParse({ numero: 8, nom: 'Inventée', devise: '…' }).success).toBe(false)
    expect(ValeurSchema.safeParse({ numero: 0, nom: 'Inventée', devise: '…' }).success).toBe(false)
    expect(NOMBRE_DE_VALEURS).toBe(7)
  })
})

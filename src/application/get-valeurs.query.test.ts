import { describe, it, expect } from 'vitest'
import { getValeurs } from './get-valeurs.query'

describe('Query Les valeurs', () => {
  it('should_return_seven_slots_in_order_with_unrevealed_values_marked_a_venir', () => {
    const publiees = [
      { numero: 4, nom: "L'abnégation", devise: "Se dépasser pour l'équipe, sans compter." },
      { numero: 1, nom: 'La transparence', devise: 'La confiance se construit par le dialogue.' },
    ]
    const result = getValeurs(publiees)
    expect(result.cartes.map(c => c.numero)).toEqual([1, 2, 3, 4, 5, 6, 7])
    expect(result.cartes[0]).toMatchObject({ numero: 1, revelee: true, nom: 'La transparence' })
    expect(result.cartes[1]).toMatchObject({ numero: 2, revelee: false })
    expect(result.cartes[3]).toMatchObject({ numero: 4, revelee: true })
    expect(result.meta.titre).toContain('Sporting Club Roquettan')
  })
})

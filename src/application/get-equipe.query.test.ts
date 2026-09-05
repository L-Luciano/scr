import { describe, it, expect } from 'vitest'
import { getEquipe } from './get-equipe.query'

describe("Query L'équipe", () => {
  it('should_sort_membres_by_ordre_ascending_whatever_the_input_order', () => {
    const membres = [
      { nom: 'Yann Le Caharec', role: 'Vice-président', ordre: 2 },
      { nom: 'Nicolas Votano', role: 'Président', ordre: 1, message: 'Un club humain et sans limite dans l’ambition.' },
    ]
    const result = getEquipe(membres)
    expect(result.membres.map(m => m.nom)).toEqual(['Nicolas Votano', 'Yann Le Caharec'])
    expect(result.meta.titre).toContain('Sporting Club Roquettan')
  })
})

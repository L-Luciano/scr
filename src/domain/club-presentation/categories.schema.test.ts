import { describe, it, expect } from 'vitest'
import { CategoriesSchema } from './categories.schema'

describe('CategoriesSchema — formats de jeu, catégories et éducateurs', () => {
  it('should_accept_groupes_de_categories_with_their_educateurs', () => {
    const categories = {
      introduction: 'Du baby-foot aux seniors.',
      groupes: [
        { format: 'Foot à 8', categories: [{ nom: 'U12', educateurs: ['Franck Moreau', 'Bérangère Inghels'] }] },
      ],
    }
    expect(CategoriesSchema.safeParse(categories).success).toBe(true)
  })

  it('should_reject_categorie_without_any_educateur', () => {
    const sansEducateur = { introduction: '…', groupes: [{ format: 'Foot à 11', categories: [{ nom: 'U17', educateurs: [] }] }] }
    expect(CategoriesSchema.safeParse(sansEducateur).success).toBe(false)
  })
})

import { describe, it, expect } from 'vitest'
import { CategoriesSchema } from './categories.schema'

describe('CategoriesSchema — formats de jeu, catégories, créneaux et éducateurs', () => {
  it('should_accept_groupes_de_categories_with_their_annees_seances_and_educateurs', () => {
    const categories = {
      introduction: 'Du baby-foot aux seniors.',
      groupes: [
        { format: 'Foot à 8', categories: [{ nom: 'U12', annees: '2015', seances: ['Mercredi 16h00-17h30', 'Vendredi 17h45-19h00'], educateurs: ['Franck Moreau', 'Bérangère Inghels'] }] },
      ],
    }
    expect(CategoriesSchema.safeParse(categories).success).toBe(true)
  })

  it('should_accept_categorie_without_educateur_yet_and_default_to_empty_lists', () => {
    const veterans = { introduction: '…', groupes: [{ format: 'Foot à 11', categories: [{ nom: 'Vétérans' }] }] }
    const result = CategoriesSchema.safeParse(veterans)
    expect(result.success).toBe(true)
    expect(result.data?.groupes[0].categories[0]).toEqual({ nom: 'Vétérans', seances: [], educateurs: [] })
  })

  it('should_reject_categorie_without_name_or_with_empty_seance', () => {
    const sansNom = { introduction: '…', groupes: [{ format: 'Foot à 11', categories: [{ nom: '', educateurs: ['X'] }] }] }
    const seanceVide = { introduction: '…', groupes: [{ format: 'Foot à 11', categories: [{ nom: 'U17', seances: [''] }] }] }
    expect(CategoriesSchema.safeParse(sansNom).success).toBe(false)
    expect(CategoriesSchema.safeParse(seanceVide).success).toBe(false)
  })
})

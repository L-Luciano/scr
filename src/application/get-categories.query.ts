import type { Categories } from '../domain/club-presentation/categories.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'

export interface GetCategoriesResult extends Categories {
  meta: MetaPage
}

/** Query page « Catégories » (pass-through, couvert en Acceptance). */
export function getCategories(categories: Categories): GetCategoriesResult {
  return {
    ...categories,
    meta: MetaPageSchema.parse({
      titre: `Catégories — ${NOM_CLUB}, ${COMMUNE}`,
      description: `Les catégories du ${NOM_CLUB} à ${COMMUNE}, du baby-foot aux vétérans : années de naissance, horaires d'entraînement 2026-2027 et éducateurs au Stade Joseph Ferrero.`,
    }),
  }
}

import type { IdentiteClub } from '../domain/club-presentation/identite-club.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'

export interface GetPartenairesResult {
  partenaires: IdentiteClub['partenaires']
  meta: MetaPage
}

/** Query page « Partenaires » : partenaires financiers (pass-through, couvert en Acceptance). */
export function getPartenaires(identiteClub: IdentiteClub): GetPartenairesResult {
  return {
    partenaires: identiteClub.partenaires,
    meta: MetaPageSchema.parse({
      titre: `Partenaires — ${NOM_CLUB}, ${COMMUNE}`,
      description: `Les partenaires du ${NOM_CLUB}, club de football de ${COMMUNE}, et comment devenir partenaire d'un projet tourné vers la jeunesse.`,
    }),
  }
}

import type { IdentiteClub } from '../domain/club-presentation/identite-club.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'

export interface GetLeClubResult {
  projetClub: IdentiteClub['projetClub']
  lieuClub: IdentiteClub['lieuClub']
  partenaires: IdentiteClub['partenaires']
  meta: MetaPage
}

/**
 * Query page « Le club ». Pass-through sans décision métier : pas de test unitaire (ISSUE-009),
 * couverture en Acceptance (Jalon 5). Le composant PartenaireBadge applique affichageLogo().
 */
export function getLeClub(identiteClub: IdentiteClub): GetLeClubResult {
  return {
    projetClub: identiteClub.projetClub,
    lieuClub: identiteClub.lieuClub,
    partenaires: identiteClub.partenaires,
    meta: MetaPageSchema.parse({
      titre: `Le club — ${NOM_CLUB}, ${COMMUNE}`,
      description: `Le projet, le stade et les partenaires du ${NOM_CLUB}, club de football fondé en 2026 à ${COMMUNE}. Venez nous rencontrer.`,
    }),
  }
}

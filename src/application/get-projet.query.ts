import type { IdentiteClub } from '../domain/club-presentation/identite-club.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'

export interface GetProjetResult {
  projetClub: IdentiteClub['projetClub']
  programmeSportif: IdentiteClub['programmeSportif']
  meta: MetaPage
}

/** Query page « Le projet » : piliers et programme sportif (pass-through, couvert en Acceptance). */
export function getProjet(identiteClub: IdentiteClub): GetProjetResult {
  return {
    projetClub: identiteClub.projetClub,
    programmeSportif: identiteClub.programmeSportif,
    meta: MetaPageSchema.parse({
      titre: `Le projet — ${NOM_CLUB}, ${COMMUNE}`,
      description: `Le projet du ${NOM_CLUB} à ${COMMUNE} : former des joueurs, faire grandir des personnes, construire une famille, avec la mentalité du rugby.`,
    }),
  }
}

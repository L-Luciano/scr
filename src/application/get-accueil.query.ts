import type { IdentiteClub } from '../domain/club-presentation/identite-club.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'

export interface GetAccueilResult {
  nom: IdentiteClub['nom']
  visuel: IdentiteClub['visuel']
  projetClub: IdentiteClub['projetClub']
  lienRejoindre: string
  meta: MetaPage
}

/** Query page Accueil. Paramètre injecté (ADR-003) ; câblage sur le contenu réel au Jalon 4. */
export function getAccueil(identiteClub: IdentiteClub): GetAccueilResult {
  return {
    nom: identiteClub.nom,
    visuel: identiteClub.visuel,
    projetClub: identiteClub.projetClub,
    lienRejoindre: '/rejoindre',
    meta: MetaPageSchema.parse({
      titre: `Accueil — ${NOM_CLUB}, ${COMMUNE}`,
      description: `${NOM_CLUB}, club de football fondé en 2026 à ${COMMUNE} : former des joueurs, faire grandir des personnes, construire une famille.`,
    }),
  }
}

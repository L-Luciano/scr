import type { Coordonnees } from '../domain/join-contact/coordonnees.schema'
import { pourLienAppel } from '../domain/join-contact/coordonnees.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'

export interface GetCoordonneesResult extends Coordonnees {
  lienAppel: string
  meta: MetaPage
}

/**
 * Query page « Rejoindre / Contact ». SOURCE UNIQUE des coordonnées (SC-012) :
 * seul point de lecture, réutilisé par l'Accueil et les Mentions légales.
 * Paramètre injecté (ADR-003) ; câblage sur le contenu réel au Jalon 4.
 */
export function getCoordonnees(coordonnees: Coordonnees): GetCoordonneesResult {
  return {
    ...coordonnees,
    lienAppel: pourLienAppel(coordonnees.telephone),
    meta: MetaPageSchema.parse({
      titre: `Rejoindre / Contact — ${NOM_CLUB}, ${COMMUNE}`,
      description: `Contacter le ${NOM_CLUB} à ${COMMUNE} : téléphone, Instagram et adresse du Stade Joseph Ferrero.`,
    }),
  }
}

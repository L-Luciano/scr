import type { MentionsLegales } from '../domain/club-presentation/mentions-legales.schema'
import { afficherOuACompleter } from '../domain/club-presentation/mentions-legales.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'

/** Tranche de l'identité du club nécessaire aux mentions légales (président = représentant légal). */
export interface EditeurSource {
  nom: string
  president: string
}

/** Tranche des coordonnées nécessaire aux mentions légales. */
export interface CoordonneesSource {
  adresse: string
  telephone?: string
  email?: string
}

export interface GetMentionsLegalesResult {
  editeur: string
  president: string
  adresse: string
  telephone: string
  hebergeur: string
  numeroRna: string
  siret: string
  directeurPublication: string
  email: string
  meta: MetaPage
}

/**
 * Query page « Mentions légales » : orchestre trois sources déjà validées (SC-021) ;
 * toute information absente est rendue par « à compléter par le club », jamais inventée (SC-022).
 */
export function getMentionsLegales(
  mentionsLegales: MentionsLegales,
  identiteClub: EditeurSource,
  coordonnees: CoordonneesSource,
): GetMentionsLegalesResult {
  return {
    editeur: mentionsLegales.editeur,
    president: identiteClub.president,
    adresse: coordonnees.adresse,
    telephone: afficherOuACompleter(coordonnees.telephone),
    hebergeur: mentionsLegales.hebergeur,
    numeroRna: afficherOuACompleter(mentionsLegales.numeroRna),
    siret: afficherOuACompleter(mentionsLegales.siret),
    directeurPublication: afficherOuACompleter(mentionsLegales.directeurPublication),
    email: afficherOuACompleter(mentionsLegales.email ?? coordonnees.email),
    meta: MetaPageSchema.parse({
      titre: `Mentions légales — ${NOM_CLUB}, ${COMMUNE}`,
      description: `Mentions légales du site du ${NOM_CLUB}, club de football de ${COMMUNE} : éditeur, responsable de publication et hébergeur.`,
    }),
  }
}

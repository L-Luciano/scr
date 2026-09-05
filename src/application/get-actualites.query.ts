import type { Actualite } from '../domain/news/actualite.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'

export interface ActualiteAvecMeta extends Actualite {
  meta: MetaPage
}

const metaDeDetail = (actualite: Actualite): MetaPage =>
  MetaPageSchema.parse({
    titre: `${actualite.titre} — ${NOM_CLUB}, ${COMMUNE}`,
    description: `${actualite.extrait} Actualité du ${NOM_CLUB}, ${COMMUNE}.`,
  })

/**
 * Query page « Actualités » : liste triée de la plus récente à la plus ancienne (SC-007),
 * chaque Actualité portant le MetaPage de sa page de détail (SC-025).
 * Paramètre injecté (ADR-003) ; câblage sur le contenu réel au Jalon 4.
 */
export function getActualites(actualites: Actualite[]): ActualiteAvecMeta[] {
  return [...actualites]
    .sort((a, b) => b.datePublication.localeCompare(a.datePublication))
    .map(actualite => ({ ...actualite, meta: metaDeDetail(actualite) }))
}

/** MetaPage de la page liste « Actualités » (SC-024) — pass-through, couvert en Acceptance (Jalon 5). */
export const getMetaListeActualites = (): MetaPage =>
  MetaPageSchema.parse({
    titre: `Actualités — ${NOM_CLUB}, ${COMMUNE}`,
    description: `Toutes les actualités du ${NOM_CLUB}, club de football de ${COMMUNE} : vie du club, rentrée, partenaires et rendez-vous à venir.`,
  })

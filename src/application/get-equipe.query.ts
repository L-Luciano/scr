import type { Membre } from '../domain/club-presentation/membre.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'

export interface GetEquipeResult {
  membres: Membre[]
  meta: MetaPage
}

/** Query page « L'équipe » : membres du bureau triés par ordre d'affichage. Paramètre injecté (ADR-003). */
export function getEquipe(membres: Membre[]): GetEquipeResult {
  return {
    membres: [...membres].sort((a, b) => a.ordre - b.ordre),
    meta: MetaPageSchema.parse({
      titre: `Le bureau — ${NOM_CLUB}, ${COMMUNE}`,
      description: `Le bureau et le staff technique du ${NOM_CLUB}, club de football de ${COMMUNE} : président, vice-président, directeur sportif et éducateurs.`,
    }),
  }
}

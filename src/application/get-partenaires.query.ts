import type { IdentiteClub } from '../domain/club-presentation/identite-club.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'
import { NIVEAUX_PARTENARIAT, libelleNiveau, type NiveauPartenariat, type Partenaire } from '../domain/club-presentation/partenaire.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'

export interface GroupePartenaires {
  niveau: NiveauPartenariat
  libelle: string
  partenaires: Partenaire[]
}

export interface GetPartenairesResult {
  partenaires: IdentiteClub['partenaires']
  groupes: GroupePartenaires[]
  meta: MetaPage
}

/** Query page « Partenaires » : partenaires financiers groupés par niveau (Platine, Or, officiels), niveaux vides omis. */
export function getPartenaires(identiteClub: IdentiteClub): GetPartenairesResult {
  const groupes = NIVEAUX_PARTENARIAT.map(niveau => {
    const partenaires = identiteClub.partenaires.filter(p => p.niveau === niveau)
    return { niveau, libelle: libelleNiveau(niveau, partenaires.length > 1), partenaires }
  }).filter(g => g.partenaires.length > 0)
  return {
    partenaires: identiteClub.partenaires,
    groupes,
    meta: MetaPageSchema.parse({
      titre: `Partenaires — ${NOM_CLUB}, ${COMMUNE}`,
      description: `Les partenaires Platine, Or et officiels du ${NOM_CLUB}, club de football de ${COMMUNE}, et comment devenir partenaire d'un projet tourné vers la jeunesse.`,
    }),
  }
}

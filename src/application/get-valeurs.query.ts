import { NOMBRE_DE_VALEURS, type Valeur } from '../domain/club-presentation/valeur.schema'
import { NOM_CLUB } from '../domain/club-presentation/identite-club.schema'
import { MetaPageSchema, COMMUNE, type MetaPage } from '../domain/club-presentation/meta-page.schema'

export type CarteValeur = ({ revelee: true } & Valeur) | { revelee: false; numero: number }

export interface GetValeursResult {
  cartes: CarteValeur[]
  meta: MetaPage
}

/** Query page « Les valeurs » : sept emplacements ordonnés, les valeurs non publiées restent « à venir ». */
export function getValeurs(publiees: Valeur[]): GetValeursResult {
  const cartes: CarteValeur[] = Array.from({ length: NOMBRE_DE_VALEURS }, (_, i) => {
    const numero = i + 1
    const valeur = publiees.find(v => v.numero === numero)
    return valeur ? { revelee: true, ...valeur } : { revelee: false, numero }
  })
  return {
    cartes,
    meta: MetaPageSchema.parse({
      titre: `Les valeurs — ${NOM_CLUB}, ${COMMUNE}`,
      description: `Le Carnet des Valeurs du ${NOM_CLUB}, club de football de ${COMMUNE} : sept principes signés par les joueurs, les parents, les éducateurs et les dirigeants.`,
    }),
  }
}

import { z } from 'zod'
import { NOM_CLUB } from './identite-club.schema'

/** Commune du club — connaissance unique, réutilisée par les méta-données de chaque page. */
export const COMMUNE = 'La Roquette-sur-Siagne'

const mentionneLeClubEtLaCommune = (texte: string) => texte.includes(NOM_CLUB) && texte.includes(COMMUNE)
const MESSAGE = `Le texte doit mentionner « ${NOM_CLUB} » et « ${COMMUNE} ».`

/** Méta-données de page : titre et description pour les moteurs de recherche. */
export const MetaPageSchema = z.object({
  titre: z.string().refine(mentionneLeClubEtLaCommune, { message: MESSAGE }),
  description: z.string().refine(mentionneLeClubEtLaCommune, { message: MESSAGE }),
})

export type MetaPage = z.infer<typeof MetaPageSchema>

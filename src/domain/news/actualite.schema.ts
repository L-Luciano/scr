import { z } from 'zod'
import { VisuelSchema } from '../brand-system/visuel.schema'

const MESSAGE_TITRE = 'Le champ « titre » est obligatoire.'
const MESSAGE_DATE = 'Le champ « datePublication » est obligatoire (format ISO AAAA-MM-JJ).'
const MESSAGE_EXTRAIT = 'Le champ « extrait » est obligatoire (1 à 200 caractères).'

/**
 * Actualité : publication datée du club, stockée en Markdown, validée à la publication.
 * Invariant : titre, datePublication, extrait et visuel conforme à la Charte sont tous obligatoires.
 */
export const ActualiteSchema = z.object({
  titre: z.string({ error: MESSAGE_TITRE }).min(1, { error: MESSAGE_TITRE }),
  datePublication: z.iso.date({ error: MESSAGE_DATE }),
  extrait: z.string({ error: MESSAGE_EXTRAIT }).min(1, { error: MESSAGE_EXTRAIT }).max(200, { error: MESSAGE_EXTRAIT }),
  visuel: VisuelSchema,
})

export type Actualite = z.infer<typeof ActualiteSchema>

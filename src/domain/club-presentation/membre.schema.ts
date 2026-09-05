import { z } from 'zod'

const MESSAGE_ROLE = 'Le champ « role » est obligatoire pour un membre.'

/**
 * Membre du bureau présenté sur la page L'équipe : nom, rôle, ordre d'affichage,
 * message (citation publiée par le club). Aucune photo : pas de personne réelle sur le site.
 */
export const MembreSchema = z.object({
  nom: z.string().min(1),
  role: z.string({ error: MESSAGE_ROLE }).min(1, { error: MESSAGE_ROLE }),
  ordre: z.number().int().positive(),
  message: z.string().min(1).optional(),
})

export type Membre = z.infer<typeof MembreSchema>

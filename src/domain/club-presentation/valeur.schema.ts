import { z } from 'zod'

/** Le Carnet des Valeurs compte sept valeurs, dévoilées une à une par le club. */
export const NOMBRE_DE_VALEURS = 7

/** Valeur du Carnet : numéro (1 à 7), nom, devise (formule courte publiée par le club). Le corps Markdown développe. */
export const ValeurSchema = z.object({
  numero: z.number().int().min(1).max(NOMBRE_DE_VALEURS),
  nom: z.string().min(1),
  devise: z.string().min(1),
})

export type Valeur = z.infer<typeof ValeurSchema>

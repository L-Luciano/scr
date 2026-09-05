import { z } from 'zod'

/** Page Catégories : une introduction obligatoire ; le détail (tranches d'âge, horaires, tarifs) vit dans le corps Markdown. */
export const CategoriesSchema = z.object({
  introduction: z.string().min(1),
})

export type Categories = z.infer<typeof CategoriesSchema>

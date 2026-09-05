import { z } from 'zod'

/** Une catégorie (ex. U12) et ses éducateurs (au moins un), tels que publiés par le club. */
export const CategorieSchema = z.object({
  nom: z.string().min(1),
  educateurs: z.array(z.string().min(1)).min(1),
  precision: z.string().optional(),
})

/** Groupe de catégories partageant un format de jeu (foot à 4/5, foot à 8, foot à 11). */
export const GroupeCategoriesSchema = z.object({
  format: z.string().min(1),
  categories: z.array(CategorieSchema).min(1),
})

/** Page Catégories : introduction, groupes de catégories ; horaires et tarifs restent dans le corps Markdown. */
export const CategoriesSchema = z.object({
  introduction: z.string().min(1),
  groupes: z.array(GroupeCategoriesSchema).min(1),
})

export type Categories = z.infer<typeof CategoriesSchema>

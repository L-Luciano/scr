import { z } from 'zod'

/**
 * Une catégorie (ex. U12) telle que publiée par le club : années de naissance, créneaux
 * d'entraînement (planning 2026-2027) et éducateurs. Une catégorie peut exister sans éducateur
 * encore annoncé (ex. vétérans) : la liste est alors vide et la page affiche « à compléter ».
 */
export const CategorieSchema = z.object({
  nom: z.string().min(1),
  annees: z.string().min(1).optional(),
  seances: z.array(z.string().min(1)).default([]),
  educateurs: z.array(z.string().min(1)).default([]),
  precision: z.string().optional(),
})

/** Groupe de catégories partageant un format de jeu (foot à 4/5, foot à 8, foot à 11). */
export const GroupeCategoriesSchema = z.object({
  format: z.string().min(1),
  categories: z.array(CategorieSchema).min(1),
})

/** Page Catégories : introduction, groupes de catégories ; tarifs et documents restent dans le corps Markdown. */
export const CategoriesSchema = z.object({
  introduction: z.string().min(1),
  groupes: z.array(GroupeCategoriesSchema).min(1),
})

export type Categories = z.infer<typeof CategoriesSchema>

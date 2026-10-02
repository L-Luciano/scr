import { z } from 'zod'

/** Niveaux de partenariat publiés par le club, du plus engagé au niveau d'entrée. */
export const NIVEAUX_PARTENARIAT = ['Platine', 'Or', 'Officiel'] as const
export const NiveauPartenariatSchema = z.enum(NIVEAUX_PARTENARIAT)
export type NiveauPartenariat = z.infer<typeof NiveauPartenariatSchema>

/**
 * Partenaire : organisation associée au club, affichée par son nom et son niveau.
 * Invariant : aucun logo tiers publié sans droits d'usage confirmés.
 */
export const PartenaireSchema = z
  .object({
    nom: z.string().min(1),
    niveau: NiveauPartenariatSchema.default('Officiel'),
    droitsLogoConfirmes: z.boolean().default(false),
    logo: z.string().optional(),
  })
  .refine(p => !p.logo || p.droitsLogoConfirmes, {
    message: 'Un logo Partenaire ne peut être publié sans droitsLogoConfirmes = true.',
  })

export type Partenaire = z.infer<typeof PartenaireSchema>

/** TDA : le composant demande au Partenaire son logo affichable au lieu de tester deux champs. */
export const affichageLogo = (p: Pick<Partenaire, 'droitsLogoConfirmes' | 'logo'>): string | null =>
  p.droitsLogoConfirmes && p.logo ? p.logo : null

/** Libellé affiché pour un niveau (« Partenaire Platine », « Partenaires officiels »…). */
export const libelleNiveau = (niveau: NiveauPartenariat, pluriel: boolean): string => {
  const base = niveau === 'Officiel' ? 'officiel' : niveau
  return pluriel ? `Partenaires ${base}${niveau === 'Officiel' ? 's' : ''}` : `Partenaire ${base}`
}

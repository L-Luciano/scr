import { z } from 'zod'

/**
 * Partenaire : organisation associée au club, affichée par son nom.
 * Invariant : aucun logo tiers publié sans droits d'usage confirmés.
 */
export const PartenaireSchema = z
  .object({
    nom: z.string().min(1),
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

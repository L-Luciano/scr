import { z } from 'zod'
import { LieuClubSchema } from '../club-presentation/identite-club.schema'

/** Numéro de téléphone français (10 chiffres, indicatif national 0, espaces facultatifs). */
export const NumeroTelephoneSchema = z.string().regex(/^0[1-9](\s?\d{2}){4}$/)

/** TDA : le numéro sait produire son propre lien d'appel (`tel:` sans espaces). */
export const pourLienAppel = (numero: string): string => `tel:${numero.replace(/\s/g, '')}`

/** Identifiant Instagram du compte officiel, préfixé par « @ ». */
const IdentifiantInstagramSchema = z.string().regex(/^@[\w.]+$/)

/**
 * Coordonnées du club (agrégat singleton) : téléphone, Instagram, lieu.
 * Source unique : un seul fichier de contenu, lu par toutes les pages qui affichent un contact.
 */
export const CoordonneesSchema = z.object({
  /** Optionnel : retiré du site en attente de l'accord du club (décision 2026-09-05). */
  telephone: NumeroTelephoneSchema.optional(),
  instagram: IdentifiantInstagramSchema,
  lieu: LieuClubSchema,
})

export type Coordonnees = z.infer<typeof CoordonneesSchema>

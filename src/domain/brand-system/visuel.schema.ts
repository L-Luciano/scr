import { z } from 'zod'
import { TOKENS_CHARTE, type NomCouleurCharte } from './charte-graphique'

/** Libellé unique de non-conformité (figé au caractère près), partagé par toutes les règles de la Charte. */
export const MESSAGE_VISUEL_NON_CONFORME =
  'Le visuel doit être conforme à la charte graphique (palette Noir/Anthracite, Rose, Blanc ; aucune personne réelle identifiable).'

/** Libellé figé : texte alternatif obligatoire (accessibilité). */
export const MESSAGE_ALT_OBLIGATOIRE = 'Le champ « alt » (texte alternatif du visuel) est obligatoire.'

/** Palette fermée : les noms de couleurs autorisés sont exactement ceux de TOKENS_CHARTE. */
export const CouleurCharte = z.enum(Object.keys(TOKENS_CHARTE) as [NomCouleurCharte, ...NomCouleurCharte[]], {
  error: MESSAGE_VISUEL_NON_CONFORME,
})

/**
 * Visuel : toute image du site autre que le logo — recréée, conforme à la Charte,
 * sans personne réelle identifiable, avec texte alternatif.
 */
export const VisuelSchema = z.object({
  asset: z.string(),
  couleursUtilisees: z.array(CouleurCharte).min(1),
  personneReelle: z.literal(false, { error: MESSAGE_VISUEL_NON_CONFORME }),
  alt: z.string({ error: MESSAGE_ALT_OBLIGATOIRE }).min(1, { error: MESSAGE_ALT_OBLIGATOIRE }),
})

export type Visuel = z.infer<typeof VisuelSchema>

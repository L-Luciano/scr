import { z } from 'zod'

/** Mention littérale de repli pour toute information légale absente des sources (jamais inventée). */
export const MENTION_A_COMPLETER = 'à compléter par le club'

/** TDA : la donnée légale sait elle-même comment s'afficher quand elle manque. */
export const afficherOuACompleter = (valeur: string | undefined): string => valeur ?? MENTION_A_COMPLETER

const MESSAGE_EDITEUR = 'Le champ « editeur » est obligatoire dans les mentions légales.'
const MESSAGE_HEBERGEUR = 'Le champ « hebergeur » est obligatoire dans les mentions légales.'

/**
 * Mentions légales (LCEN) : éditeur et hébergeur obligatoires ; les informations non sourcées
 * (RNA/SIRET, directeur de publication, e-mail) sont optionnelles et rendues par afficherOuACompleter().
 */
export const MentionsLegalesSchema = z.object({
  editeur: z.string({ error: MESSAGE_EDITEUR }).min(1, { error: MESSAGE_EDITEUR }),
  hebergeur: z.string({ error: MESSAGE_HEBERGEUR }).min(1, { error: MESSAGE_HEBERGEUR }),
  numeroRna: z.string().optional(),
  siret: z.string().optional(),
  directeurPublication: z.string().optional(),
  email: z.string().optional(),
})

export type MentionsLegales = z.infer<typeof MentionsLegalesSchema>

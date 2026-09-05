import { z } from 'zod'
import { VisuelSchema } from '../brand-system/visuel.schema'
import { PartenaireSchema } from './partenaire.schema'

/** Nom officiel du club — connaissance unique, réutilisée par l'identité et les méta-données de page. */
export const NOM_CLUB = 'Sporting Club Roquettan'

/** Lieu du club : nom du stade et adresse exacte (source : fiche mairie). Partagé avec Join & Contact. */
export const LieuClubSchema = z.object({
  nom: z.string().min(1),
  adresse: z.string().min(1),
})

/** Projet du club : exactement trois piliers, dans un ordre fixe. */
const ProjetClubSchema = z.object({
  piliers: z.tuple([z.string().min(1), z.string().min(1), z.string().min(1)]),
})

/**
 * Identité du club (agrégat singleton, lecture seule) : nom fixe, Visuel d'Accueil
 * conforme à la Charte, Projet du club, Lieu, Partenaires.
 */
export const IdentiteClubSchema = z.object({
  nom: z.literal(NOM_CLUB),
  /** Président du club (représentant légal, affiché dans les Mentions légales — SC-021). */
  president: z.string().min(1),
  visuel: VisuelSchema,
  projetClub: ProjetClubSchema,
  lieuClub: LieuClubSchema,
  partenaires: z.array(PartenaireSchema),
})

export type LieuClub = z.infer<typeof LieuClubSchema>
export type ProjetClub = z.infer<typeof ProjetClubSchema>
export type IdentiteClub = z.infer<typeof IdentiteClubSchema>

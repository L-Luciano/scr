import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { ActualiteSchema } from './domain/news/actualite.schema'
import { IdentiteClubSchema } from './domain/club-presentation/identite-club.schema'
import { CoordonneesSchema } from './domain/join-contact/coordonnees.schema'
import { MentionsLegalesSchema } from './domain/club-presentation/mentions-legales.schema'
import { MembreSchema } from './domain/club-presentation/membre.schema'
import { ValeurSchema } from './domain/club-presentation/valeur.schema'
import { CategoriesSchema } from './domain/club-presentation/categories.schema'

/**
 * Câblage des schémas Zod du domaine sur les content collections Astro (ADR-002) :
 * un fichier Markdown invalide fait échouer `astro build` avec le libellé exact du schéma.
 * Le contenu = fichiers Markdown versionnés dans src/content (HS2).
 */
const actualites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/actualites' }),
  schema: ActualiteSchema,
})

const identiteClub = defineCollection({
  loader: glob({ pattern: 'identite-club.md', base: './src/content' }),
  schema: IdentiteClubSchema,
})

const coordonnees = defineCollection({
  loader: glob({ pattern: 'coordonnees.md', base: './src/content' }),
  schema: CoordonneesSchema,
})

const mentionsLegales = defineCollection({
  loader: glob({ pattern: 'mentions-legales.md', base: './src/content' }),
  schema: MentionsLegalesSchema,
})

const membres = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/membres' }),
  schema: MembreSchema,
})

const valeurs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/valeurs' }),
  schema: ValeurSchema,
})

const categories = defineCollection({
  loader: glob({ pattern: 'categories.md', base: './src/content' }),
  schema: CategoriesSchema,
})

export const collections = { actualites, identiteClub, coordonnees, mentionsLegales, membres, valeurs, categories }

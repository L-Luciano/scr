import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { ActualiteSchema } from '../../../../../src/domain/news/actualite.schema'
import { MentionsLegalesSchema } from '../../../../../src/domain/club-presentation/mentions-legales.schema'
import { IdentiteClubSchema } from '../../../../../src/domain/club-presentation/identite-club.schema'
import { CoordonneesSchema } from '../../../../../src/domain/join-contact/coordonnees.schema'

const actualites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/actualites' }),
  schema: ActualiteSchema,
})
const mentionsLegales = defineCollection({
  loader: glob({ pattern: 'mentions-legales.md', base: './src/content' }),
  schema: MentionsLegalesSchema,
})
// Collections requises par Seo.astro (données structurées de l'organisation sur chaque page).
const identiteClub = defineCollection({
  loader: glob({ pattern: 'identite-club.md', base: './src/content' }),
  schema: IdentiteClubSchema,
})
const coordonnees = defineCollection({
  loader: glob({ pattern: 'coordonnees.md', base: './src/content' }),
  schema: CoordonneesSchema,
})
export const collections = { actualites, mentionsLegales, identiteClub, coordonnees }

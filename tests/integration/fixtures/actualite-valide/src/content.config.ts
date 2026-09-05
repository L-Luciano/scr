import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { ActualiteSchema } from '../../../../../src/domain/news/actualite.schema'
import { MentionsLegalesSchema } from '../../../../../src/domain/club-presentation/mentions-legales.schema'

const actualites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/actualites' }),
  schema: ActualiteSchema,
})
const mentionsLegales = defineCollection({
  loader: glob({ pattern: 'mentions-legales.md', base: './src/content' }),
  schema: MentionsLegalesSchema,
})
export const collections = { actualites, mentionsLegales }

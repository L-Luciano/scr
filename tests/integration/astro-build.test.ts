import { describe, it, expect, beforeAll } from 'vitest'
import { execa } from 'execa'
import { readFile } from 'node:fs/promises'

// Un `astro build` réel dure plusieurs secondes : délai étendu pour les hooks et tests de ce fichier.
const DELAI_BUILD_MS = 120_000

describe('astro build — Actualité valide', () => {
  let resultatBuild: { exitCode?: number }

  beforeAll(async () => {
    resultatBuild = await execa('npx', ['astro', 'build'], {
      cwd: 'tests/integration/fixtures/actualite-valide',
      reject: false,
    })
  }, DELAI_BUILD_MS)

  it('should_succeed_when_actualite_has_all_required_fields', () => {
    expect(resultatBuild.exitCode).toBe(0)
  })

  it('AND_the_actualite_appears_in_the_built_output', async () => {
    const html = await readFile('tests/integration/fixtures/actualite-valide/dist/actualites/index.html', 'utf-8')
    expect(html).toContain('Premier objectif dépassé')
  })
})

describe('astro build — Actualité incomplète', () => {
  it('should_fail_with_the_exact_zod_message_when_extrait_is_missing', async () => {
    const resultatBuild = await execa('npx', ['astro', 'build'], {
      cwd: 'tests/integration/fixtures/actualite-incomplete',
      reject: false,
    })
    expect(resultatBuild.exitCode).not.toBe(0)
    expect(resultatBuild.stderr + resultatBuild.stdout).toContain(
      'Le champ « extrait » est obligatoire (1 à 200 caractères).',
    )
  }, DELAI_BUILD_MS)
})

describe('astro build — Mentions légales incomplètes', () => {
  it('should_fail_with_the_exact_zod_message_when_hebergeur_is_missing', async () => {
    const resultatBuild = await execa('npx', ['astro', 'build'], {
      cwd: 'tests/integration/fixtures/mentions-legales-sans-hebergeur',
      reject: false,
    })
    expect(resultatBuild.exitCode).not.toBe(0)
    expect(resultatBuild.stderr + resultatBuild.stdout).toContain(
      'Le champ « hebergeur » est obligatoire dans les mentions légales.',
    )
  }, DELAI_BUILD_MS)
})

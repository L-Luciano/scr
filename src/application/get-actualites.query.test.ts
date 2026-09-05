import { describe, it, expect } from 'vitest'
import { getActualites } from './get-actualites.query'
import type { Actualite } from '../domain/news/actualite.schema'

describe('Query Actualités', () => {
  it('should_sort_actualites_from_most_recent_to_oldest', () => {
    const visuel = {
      asset: 'assets/visuels-generes/x.svg',
      couleursUtilisees: ['blanc'],
      personneReelle: false,
      alt: 'Illustration',
    } satisfies Actualite['visuel']
    const actualitesNonTriees = [
      { titre: 'Actualité plus ancienne', datePublication: '2026-08-01', extrait: '...', visuel },
      { titre: 'Premier objectif dépassé : plus de 100 inscrits', datePublication: '2026-09-03', extrait: 'Le club franchit le cap symbolique de 100 licenciés.', visuel },
    ]

    const result = getActualites(actualitesNonTriees)

    expect(result.map(a => a.titre)).toEqual([
      'Premier objectif dépassé : plus de 100 inscrits', 'Actualité plus ancienne',
    ])
  })

  it('should_build_a_detail_title_suffixed_with_the_club_name', () => {
    const actualite = {
      titre: 'Premier objectif dépassé : plus de 100 inscrits',
      datePublication: '2026-09-03',
      extrait: 'Le club franchit le cap symbolique de 100 licenciés.',
      visuel: { asset: 'assets/visuels-generes/100-inscrits.svg', couleursUtilisees: ['rose'], personneReelle: false, alt: 'Illustration' },
    } satisfies Actualite
    const [resultat] = getActualites([actualite])
    expect(resultat.meta.titre).toBe('Premier objectif dépassé : plus de 100 inscrits — Sporting Club Roquettan, La Roquette-sur-Siagne')
  })
})

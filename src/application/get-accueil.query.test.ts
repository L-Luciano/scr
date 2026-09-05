import { describe, it, expect } from 'vitest'
import { getAccueil } from './get-accueil.query'
import type { IdentiteClub } from '../domain/club-presentation/identite-club.schema'

describe('Query Accueil', () => {
  it('should_return_piliers_in_fixed_order_when_given_the_parsed_identite_club_content', () => {
    const identiteClub = {
      nom: 'Sporting Club Roquettan',
      visuel: {
        asset: 'assets/visuels-generes/accueil.svg',
        couleursUtilisees: ['rose', 'noir-anthracite'],
        personneReelle: false,
        alt: 'Illustration du Sporting Club Roquettan',
      },
      projetClub: { piliers: ['Former des joueurs', 'Faire grandir des personnes', 'Construire une famille'] },
      lieuClub: { nom: 'Stade Joseph Ferrero', adresse: '1955 avenue de la République, 06550 La Roquette-sur-Siagne' },
      partenaires: [],
    } satisfies IdentiteClub

    const result = getAccueil(identiteClub)

    expect(result.projetClub.piliers).toEqual([
      'Former des joueurs', 'Faire grandir des personnes', 'Construire une famille',
    ])
  })
})

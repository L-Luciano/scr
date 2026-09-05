import { describe, it, expect } from 'vitest'
import { IdentiteClubSchema } from './identite-club.schema'

const visuelAccueilConforme = {
  asset: 'assets/visuels-generes/accueil.svg',
  couleursUtilisees: ['rose', 'noir-anthracite'],
  personneReelle: false,
  alt: 'Illustration du Sporting Club Roquettan aux couleurs rose et anthracite',
}

describe('IdentiteClubSchema', () => {
  it('should_accept_identite_club_when_nom_visuel_piliers_ordonnes_et_lieu_sont_presents', () => {
    const identiteClub = {
      nom: 'Sporting Club Roquettan',
      president: 'Nicolas Votano',
      visuel: visuelAccueilConforme,
      projetClub: { piliers: ['Former des joueurs', 'Faire grandir des personnes', 'Construire une famille'] },
      lieuClub: { nom: 'Stade Joseph Ferrero', adresse: '1955 avenue de la République, 06550 La Roquette-sur-Siagne' },
      partenaires: [],
    }
    const result = IdentiteClubSchema.safeParse(identiteClub)
    expect(result.success).toBe(true)
    expect(result.data?.projetClub.piliers).toEqual([
      'Former des joueurs', 'Faire grandir des personnes', 'Construire une famille',
    ])
  })

  it('should_reject_identite_club_when_visuel_utilise_une_couleur_hors_palette', () => {
    const identiteVisuelBleu = {
      nom: 'Sporting Club Roquettan',
      president: 'Nicolas Votano',
      visuel: { ...visuelAccueilConforme, couleursUtilisees: ['bleu'] },
      projetClub: { piliers: ['Former des joueurs', 'Faire grandir des personnes', 'Construire une famille'] },
      lieuClub: { nom: 'Stade Joseph Ferrero', adresse: '1955 avenue de la République, 06550 La Roquette-sur-Siagne' },
      partenaires: [],
    }
    const result = IdentiteClubSchema.safeParse(identiteVisuelBleu)
    expect(result.success).toBe(false)
    expect(
      result.error?.issues.some(
        i => i.message === 'Le visuel doit être conforme à la charte graphique (palette Noir/Anthracite, Rose, Blanc ; aucune personne réelle identifiable).',
      ),
    ).toBe(true)
  })

  it('should_reject_identite_club_when_president_est_absent', () => {
    const identiteSansPresident = {
      nom: 'Sporting Club Roquettan',
      visuel: visuelAccueilConforme,
      projetClub: { piliers: ['Former des joueurs', 'Faire grandir des personnes', 'Construire une famille'] },
      lieuClub: { nom: 'Stade Joseph Ferrero', adresse: '1955 avenue de la République, 06550 La Roquette-sur-Siagne' },
      partenaires: [],
    }
    expect(IdentiteClubSchema.safeParse(identiteSansPresident).success).toBe(false)
  })

  it('should_accept_identite_club_when_programme_sportif_est_declare', () => {
    const identiteAvecProgramme = {
      nom: 'Sporting Club Roquettan',
      president: 'Nicolas Votano',
      visuel: visuelAccueilConforme,
      projetClub: { piliers: ['Former des joueurs', 'Faire grandir des personnes', 'Construire une famille'] },
      lieuClub: { nom: 'Stade Joseph Ferrero', adresse: '1955 avenue de la République, 06550 La Roquette-sur-Siagne' },
      partenaires: [],
      programmeSportif: { nom: 'Programme Ünseme', organisme: 'AS Monaco', statut: 'Club satellite' },
    }
    const result = IdentiteClubSchema.safeParse(identiteAvecProgramme)
    expect(result.success).toBe(true)
    expect(result.data?.programmeSportif?.statut).toBe('Club satellite')
  })
})

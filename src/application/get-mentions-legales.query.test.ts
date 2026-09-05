import { describe, it, expect } from 'vitest'
import { getMentionsLegales } from './get-mentions-legales.query'

describe('Query Mentions légales', () => {
  it('should_combine_editeur_president_adresse_telephone_and_hebergeur_when_given_the_parsed_content', () => {
    const mentionsLegales = { editeur: 'Sporting Club Roquettan', hebergeur: 'Vercel Inc.' }
    const identiteClub = { nom: 'Sporting Club Roquettan', president: 'Nicolas Votano' }
    const coordonnees = { adresse: '1955 avenue de la République, 06550 La Roquette-sur-Siagne', telephone: '06 71 58 95 18' }

    const result = getMentionsLegales(mentionsLegales, identiteClub, coordonnees)

    expect(result.editeur).toBe('Sporting Club Roquettan')
    expect(result.president).toBe('Nicolas Votano')
    expect(result.adresse).toBe('1955 avenue de la République, 06550 La Roquette-sur-Siagne')
    expect(result.telephone).toBe('06 71 58 95 18')
    expect(result.hebergeur).toBe('Vercel Inc.')
    expect(result.numeroRna).toBe('à compléter par le club')
  })

  it('should_fall_back_to_a_completer_mention_when_telephone_is_absent', () => {
    const result = getMentionsLegales(
      { editeur: 'Sporting Club Roquettan', hebergeur: 'Vercel Inc.' },
      { nom: 'Sporting Club Roquettan', president: 'Nicolas Votano' },
      { adresse: '1955 avenue de la République, 06550 La Roquette-sur-Siagne' },
    )
    expect(result.telephone).toBe('à compléter par le club')
  })

  it('should_use_the_club_email_from_coordonnees_when_present', () => {
    const result = getMentionsLegales(
      { editeur: 'Sporting Club Roquettan', hebergeur: 'Vercel Inc.' },
      { nom: 'Sporting Club Roquettan', president: 'Nicolas Votano' },
      { adresse: '1955 avenue de la République, 06550 La Roquette-sur-Siagne', email: 'sporting.club.roquettan@gmail.com' },
    )
    expect(result.email).toBe('sporting.club.roquettan@gmail.com')
  })
})

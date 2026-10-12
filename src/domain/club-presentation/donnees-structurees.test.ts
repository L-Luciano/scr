import { describe, it, expect } from 'vitest'
import { articleJsonLd, decomposerAdresse, organisationJsonLd, urlInstagram } from './donnees-structurees'

const source = {
  lieu: { nom: 'Stade Joseph Ferrero', adresse: '1955 avenue de la République, 06550 La Roquette-sur-Siagne' },
  email: 'sporting.club.roquettan@gmail.com',
  instagram: '@sporting.club.roquettan',
  siteUrl: 'https://exemple.test',
  logoUrl: 'https://exemple.test/logo.jpg',
}

describe('Données structurées — organisation sportive locale', () => {
  it('should_describe_the_club_as_a_football_organisation_located_in_the_commune', () => {
    const json = organisationJsonLd(source)
    expect(json['@type']).toBe('SportsOrganization')
    expect(json.name).toBe('Sporting Club Roquettan')
    expect(json.sport).toBe('Football')
    expect(json.address).toEqual({ '@type': 'PostalAddress', streetAddress: '1955 avenue de la République', postalCode: '06550', addressLocality: 'La Roquette-sur-Siagne', addressCountry: 'FR' })
    expect(json.sameAs).toEqual(['https://www.instagram.com/sporting.club.roquettan/'])
    expect(json.email).toBe('sporting.club.roquettan@gmail.com')
  })

  it('should_omit_email_when_the_club_has_not_published_one', () => {
    expect(organisationJsonLd({ ...source, email: undefined })).not.toHaveProperty('email')
  })

  it('should_reject_an_address_that_cannot_be_split_into_street_postcode_and_commune', () => {
    expect(() => decomposerAdresse('Stade municipal')).toThrow('Adresse non décomposable')
  })

  it('should_build_the_instagram_url_from_the_handle_with_or_without_at', () => {
    expect(urlInstagram('@scr')).toBe('https://www.instagram.com/scr/')
    expect(urlInstagram('scr')).toBe('https://www.instagram.com/scr/')
  })
})

describe('Données structurées — article d’actualité', () => {
  it('should_describe_an_actualite_as_a_dated_news_article_published_by_the_club', () => {
    const json = articleJsonLd({ titre: 'Titre', extrait: 'Extrait', datePublication: '2026-10-11', url: 'https://exemple.test/actualites/x/', imageUrl: 'https://exemple.test/logo.jpg' }, { siteUrl: 'https://exemple.test' })
    expect(json['@type']).toBe('NewsArticle')
    expect(json.datePublished).toBe('2026-10-11')
    expect(json.publisher).toEqual({ '@id': 'https://exemple.test/#organisation' })
    expect(json.inLanguage).toBe('fr')
  })
})

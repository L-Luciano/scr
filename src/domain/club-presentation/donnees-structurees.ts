/**
 * Données structurées schema.org (JSON-LD) : fonctions pures, sans Astro ni Node.
 * Elles décrivent le club comme organisation sportive locale et chaque actualité comme article,
 * pour que les moteurs de recherche associent le site à La Roquette-sur-Siagne et datent les articles.
 */
import { NOM_CLUB, type LieuClub } from './identite-club.schema'

export interface SourceOrganisation {
  lieu: LieuClub
  email?: string
  instagram: string
  siteUrl: string
  logoUrl: string
}

export interface SourceArticle {
  titre: string
  extrait: string
  datePublication: string
  url: string
  imageUrl: string
}

/** « 1955 avenue de la République, 06550 La Roquette-sur-Siagne » → rue, code postal, commune. */
export function decomposerAdresse(adresse: string): { streetAddress: string; postalCode: string; addressLocality: string } {
  const correspondance = adresse.match(/^(.*),\s*(\d{5})\s+(.+)$/)
  if (!correspondance) throw new Error(`Adresse non décomposable : « ${adresse} » (attendu : « rue, code postal commune »).`)
  return { streetAddress: correspondance[1].trim(), postalCode: correspondance[2], addressLocality: correspondance[3].trim() }
}

export const urlInstagram = (identifiant: string): string => `https://www.instagram.com/${identifiant.replace(/^@/, '')}/`

export function organisationJsonLd(source: SourceOrganisation): Record<string, unknown> {
  const adresse = decomposerAdresse(source.lieu.adresse)
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    '@id': `${source.siteUrl}/#organisation`,
    name: NOM_CLUB,
    alternateName: 'SCR',
    sport: 'Football',
    foundingDate: '2026',
    url: `${source.siteUrl}/`,
    logo: source.logoUrl,
    ...(source.email ? { email: source.email } : {}),
    sameAs: [urlInstagram(source.instagram)],
    location: {
      '@type': 'SportsActivityLocation',
      name: source.lieu.nom,
      address: { '@type': 'PostalAddress', ...adresse, addressCountry: 'FR' },
    },
    address: { '@type': 'PostalAddress', ...adresse, addressCountry: 'FR' },
    areaServed: adresse.addressLocality,
  }
}

export function articleJsonLd(source: SourceArticle, organisation: { siteUrl: string }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: source.titre,
    description: source.extrait,
    datePublished: source.datePublication,
    dateModified: source.datePublication,
    mainEntityOfPage: source.url,
    image: [source.imageUrl],
    inLanguage: 'fr',
    author: { '@id': `${organisation.siteUrl}/#organisation` },
    publisher: { '@id': `${organisation.siteUrl}/#organisation` },
  }
}

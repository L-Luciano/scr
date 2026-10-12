import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

// Une page de redirection (meta refresh générée par Astro) n'est pas une page servie aux familles.
const estUneRedirection = (chemin: string) => /http-equiv="refresh"/i.test(readFileSync(chemin, 'utf-8'))

function trouverTousLesIndexHtml(racine: string): string[] {
  const resultats: string[] = []
  for (const entree of readdirSync(racine)) {
    const chemin = path.join(racine, entree)
    if (statSync(chemin).isDirectory()) resultats.push(...trouverTousLesIndexHtml(chemin))
    else if (entree === 'index.html' && !estUneRedirection(chemin)) resultats.push(chemin)
  }
  return resultats
}

describe('Découvrabilité web — scan de dist/', () => {
  let parPage: { chemin: string; titre: string; description: string }[]

  // ISSUE-022 : lecture de dist/ dans un beforeAll, jamais à la collecte.
  beforeAll(() => {
    parPage = trouverTousLesIndexHtml('dist').map(f => {
      const dom = new JSDOM(readFileSync(f, 'utf-8'))
      return {
        chemin: f,
        titre: dom.window.document.querySelector('title')?.textContent ?? '',
        description: dom.window.document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      }
    })
    expect(parPage.length).toBeGreaterThanOrEqual(6)
  })

  it('should_have_a_non_empty_title_and_description_mentioning_the_club_and_the_commune_on_every_page', () => {
    parPage.forEach(({ titre, description }) => {
      expect(titre).toContain('Sporting Club Roquettan')
      expect(titre).toContain('La Roquette-sur-Siagne')
      expect(description).toContain('Sporting Club Roquettan')
      expect(description).toContain('La Roquette-sur-Siagne')
    })
  })

  it('should_suffix_the_actualite_detail_title_with_the_club_name', () => {
    // La route de détail est l'ActualiteId dérivé du nom de fichier (domain-model), pas du titre.
    const detail = parPage.find(p => p.chemin.includes('/actualites/2026-09-03-100-inscrits/'))
    expect(detail?.titre).toBe('Premier objectif dépassé : plus de 100 inscrits — Sporting Club Roquettan, La Roquette-sur-Siagne')
  })

  it('should_never_have_two_pages_sharing_the_exact_same_title', () => {
    const titres = parPage.map(p => p.titre)
    expect(new Set(titres).size).toBe(titres.length)
  })
})

const SITE = 'https://sporting-club-roquettan.vercel.app'
const cheminVersUrl = (chemin: string) => `${SITE}/${path.relative('dist', path.dirname(chemin)).split(path.sep).filter(Boolean).join('/')}`.replace(/\/?$/, '/')

describe('Référencement — canonical, Open Graph, données structurées, sitemap et robots', () => {
  let pages: { chemin: string; dom: JSDOM }[]

  beforeAll(() => {
    pages = trouverTousLesIndexHtml('dist').map(chemin => ({ chemin, dom: new JSDOM(readFileSync(chemin, 'utf-8')) }))
  })

  it('should_declare_a_canonical_url_with_trailing_slash_matching_the_page_path_on_every_page', () => {
    pages.forEach(({ chemin, dom }) => {
      expect(dom.window.document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(cheminVersUrl(chemin))
    })
  })

  it('should_provide_open_graph_title_description_url_and_an_absolute_image_on_every_page', () => {
    pages.forEach(({ chemin, dom }) => {
      const og = (p: string) => dom.window.document.querySelector(`meta[property="og:${p}"]`)?.getAttribute('content')
      expect(og('title')).toBe(dom.window.document.querySelector('title')?.textContent)
      expect(og('description')).toBe(dom.window.document.querySelector('meta[name="description"]')?.getAttribute('content'))
      expect(og('url')).toBe(cheminVersUrl(chemin))
      expect(og('image')).toBe(`${SITE}/assets/logo-scr-720.jpg`)
      expect(og('type')).toBe(chemin.includes('/actualites/2026-') ? 'article' : 'website')
    })
  })

  it('should_embed_the_club_as_a_sports_organisation_located_in_the_commune_on_every_page', () => {
    pages.forEach(({ dom }) => {
      const blocs = [...dom.window.document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent ?? '{}'))
      const organisation = blocs.find(b => b['@type'] === 'SportsOrganization')
      expect(organisation?.name).toBe('Sporting Club Roquettan')
      expect(organisation?.address?.addressLocality).toBe('La Roquette-sur-Siagne')
      expect(organisation?.address?.postalCode).toBe('06550')
      expect(organisation?.sameAs).toContain('https://www.instagram.com/sporting.club.roquettan/')
    })
  })

  it('should_embed_a_dated_news_article_on_each_actualite_detail_page_only', () => {
    pages.forEach(({ chemin, dom }) => {
      const blocs = [...dom.window.document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent ?? '{}'))
      const article = blocs.find(b => b['@type'] === 'NewsArticle')
      if (chemin.includes('/actualites/2026-')) {
        expect(article?.datePublished).toMatch(/^2026-\d{2}-\d{2}$/)
        expect(article?.mainEntityOfPage).toBe(cheminVersUrl(chemin))
        expect(dom.window.document.querySelector('meta[property="article:published_time"]')?.getAttribute('content')).toBe(article?.datePublished)
      } else {
        expect(article).toBeUndefined()
      }
    })
  })

  it('should_list_every_served_page_and_no_redirect_in_the_sitemap', () => {
    const index = readFileSync('dist/sitemap-index.xml', 'utf-8')
    expect(index).toContain(`${SITE}/sitemap-0.xml`)
    const sitemap = readFileSync('dist/sitemap-0.xml', 'utf-8')
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
    const attendues = pages.map(p => cheminVersUrl(p.chemin)).sort()
    expect([...urls].sort()).toEqual(attendues)
    expect(urls).not.toContain(`${SITE}/equipe/`)
  })

  it('should_serve_a_robots_txt_that_allows_crawling_and_points_to_the_sitemap', () => {
    const robots = readFileSync('dist/robots.txt', 'utf-8')
    expect(robots).toMatch(/User-agent: \*\s+Allow: \//)
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap-index.xml`)
  })
})

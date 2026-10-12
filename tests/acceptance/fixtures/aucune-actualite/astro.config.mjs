import { defineConfig } from 'astro/config'
// Option `site` requise par Seo.astro (canonical, Open Graph) ; aucun sitemap dans les fixtures.
export default defineConfig({ site: 'https://sporting-club-roquettan.vercel.app', output: 'static' })

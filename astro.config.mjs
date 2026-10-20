import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

/** Adresse publique du site : canonical, Open Graph, sitemap et données structurées en dépendent. */
export const SITE_URL = 'https://sporting-club-roquettan.vercel.app'

// Site 100 % statique (ADR-001) : output 'static' (défaut), aucun adapter Vercel.
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  // Ancienne adresse de la page des dirigeants (renommée « Le bureau » le 2026-09-05).
  redirects: {
    '/equipe': '/le-club/bureau',
    // Article du stage redaté (publication Facebook du 10 oct., d'abord enregistrée au 11).
    '/actualites/2026-10-11-stage-toussaint-nouvelle-formule': '/actualites/2026-10-10-stage-toussaint-nouvelle-formule',
  },
  // Sitemap généré au build (sitemap-index.xml) ; la page de redirection /equipe n'y figure pas.
  integrations: [sitemap({ filter: page => !page.endsWith('/equipe/') && !page.includes('/2026-10-11-stage-toussaint') })],
})

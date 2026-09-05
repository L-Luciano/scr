import { defineConfig } from 'astro/config'

// Site 100 % statique (ADR-001) : output 'static' (défaut), aucun adapter Vercel.
export default defineConfig({
  output: 'static',
  // Ancienne adresse de la page des dirigeants (renommée « Le bureau » le 2026-09-05).
  redirects: { '/equipe': '/le-club/bureau' },
})

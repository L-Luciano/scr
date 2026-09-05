import { defineConfig } from 'astro/config'

// Site 100 % statique (ADR-001) : output 'static' (défaut), aucun adapter Vercel.
export default defineConfig({
  output: 'static',
})

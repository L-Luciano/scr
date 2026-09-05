import { defineConfig } from '@playwright/test'

// Playwright réservé strictement à SC-002 / SC-017 (décision de gate 7).
// Exécuté contre le build réel : `astro preview` sert dist/ (jamais un mock de page).
export default defineConfig({
  testDir: 'tests/acceptance',
  testMatch: /mobile-375\.spec\.ts/,
  fullyParallel: false,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
  },
  webServer: {
    command: 'npx astro preview --port 4321',
    // Astro 7 daemonise le preview quand il détecte un agent IA : cette variable force le premier plan
    // (voir node_modules/astro/dist/cli/preview/index.js) — Playwright a besoin d'un processus qui reste vivant.
    env: { ASTRO_PREVIEW_BACKGROUND: '0' },
    url: 'http://localhost:4321',
    reuseExistingServer: false,
    timeout: 60_000,
  },
})

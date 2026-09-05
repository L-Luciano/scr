import { defineConfig } from 'vitest/config'

// Configuration minimale (Jalon 1 · INFRA-MIN) : tests unitaires Node, sans environnement DOM.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
})

import { test, expect } from '@playwright/test'

// Viewport de référence 375 px (architecture § c) — seul viewport exigé par un scénario.
const VIEWPORT_MOBILE = { width: 375, height: 812 }

test.describe('Accueil — mobile 375px', () => {
  test.use({ viewport: VIEWPORT_MOBILE })

  test('should_not_require_horizontal_scroll_to_reach_rejoindre_link', async ({ page }) => {
    await page.goto('/')

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth)

    const lienRejoindre = page.locator('main a[href*="rejoindre"]')
    await expect(lienRejoindre).toBeVisible()
  })
})

test.describe('Chargement mobile des 4 pages', () => {
  test.use({ viewport: VIEWPORT_MOBILE })

  for (const route of ['/', '/le-club', '/actualites', '/rejoindre']) {
    test(`should_load_without_error_when_visiting_${route}_on_mobile`, async ({ page }) => {
      const response = await page.goto(route)
      expect(response?.status()).toBeLessThan(400)
    })
  }
})

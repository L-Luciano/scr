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

  for (const route of ['/', '/le-club', '/le-club/projet', '/le-club/valeurs', '/categories', '/equipe', '/actualites', '/partenaires', '/rejoindre']) {
    test(`should_load_without_error_when_visiting_${route}_on_mobile`, async ({ page }) => {
      const response = await page.goto(route)
      expect(response?.status()).toBeLessThan(400)
    })
  }
})

test.describe('Menu mobile 375px', () => {
  test.use({ viewport: VIEWPORT_MOBILE })

  test('should_open_the_mobile_menu_and_reveal_the_navigation_links', async ({ page }) => {
    await page.goto('/')
    const boutonMenu = page.locator('header summary')
    await expect(boutonMenu).toBeVisible()
    const lienEquipe = page.locator('header details.menu nav a[href="/equipe"]')
    await expect(lienEquipe).toBeHidden()
    await boutonMenu.click()
    await expect(lienEquipe).toBeVisible()
    await expect(page.locator('header details.menu nav a[href="/rejoindre"]')).toBeVisible()
    await expect(page.locator('header details.menu nav a[href="/le-club/valeurs"]')).toBeVisible()
  })

  test('should_not_require_horizontal_scroll_on_rejoindre_page', async ({ page }) => {
    await page.goto('/rejoindre/')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
  })
})

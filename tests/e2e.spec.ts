import { test, expect } from '@playwright/test';

test('homepage has title and hero', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Elektro-Tel/);

    // Check Hero Text
    await expect(page.getByText('WINTERTHUR | TÄGERWILEN | SCHAFFHAUSEN').first()).toBeVisible();
});

test('navigation works', async ({ page }) => {
    await page.goto('/');

    // Click Team link
    await page.getByRole('link', { name: 'Team', exact: true }).first().click();

    // URL should contain team
    await expect(page).toHaveURL(/.*team/);

    // Should see Team content
    await expect(page.getByText('GESCHÄFTSLEITUNG')).toBeVisible();
});

test('contact bar links', async ({ page }) => {
    await page.goto('/');
    // Check if the phone link is present with correct href
    // Note: Interacting with tel: links might fail in some browsers/contexts if not handled, 
    // simply checking attribute is safer for basic verification.
    const phoneLink = page.locator('a[href="tel:0800800813"]');
    await expect(phoneLink).toBeVisible();
});

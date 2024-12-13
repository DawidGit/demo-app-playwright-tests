import { test, expect, chromium } from '@playwright/test';
import LoginPage from '../pages/loginPage';

test('logging test', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login();

    const h1Locator = page.locator('h1.text-xl.font-semibold.text-gray-900');
    const h1Text = await h1Locator.textContent();


    expect(h1Text).toBe('Web Application');
});


import { test, expect, chromium } from '@playwright/test';
import LoginPage from '../pages/loginPage';


test('logging test', async ({ browser }) => {


    const loginPage = new LoginPage(browser);

    await loginPage.navigate();
    await loginPage.login();


    const myPage = await loginPage.getPage();
    const headerText = await myPage.locator('header h1').textContent();

    expect(headerText).toBe('Web Application');

});


const { chromium, firefox, webkit } = require('playwright');

class LoginPage {
    url;
    usernameField;
    passwordField;
    loginButton;
    browser;
    context;

    constructor(browser) {
        this.browser = browser;
        this.url = "https://animated-gingersnap-8cf7f2.netlify.app"
    }

    async navigate() {
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();

        this.usernameField = this.page.locator('#username');
        this.passwordField = this.page.locator('#password');
        this.loginButton = this.page.locator('button[type="submit"]');

        await this.page.goto(this.url);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async login() {
        await this.loginButton.waitFor({ state: 'visible' });
        await this.usernameField.fill('admin');
        await this.passwordField.fill('password123');
        await this.loginButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.context.storageState({ path: 'fixtures/auth-state.json' });
    }

    async getPage() {
        if (!this.page) {
            throw new Error("Page is not initialized. Please call navigate() first.");
        }
        return this.page;
    }
}

export default LoginPage;
import { error } from "console";


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

        if (!this.page) {
            this.context = await this.browser.newContext();
            this.page = await this.context.newPage();
        }


        this.usernameField = this.page.locator('#username');
        this.passwordField = this.page.locator('#password');
        this.loginButton = this.page.locator('button[type="submit"]');

        await this.page.goto(this.url);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async login(login, password) {

        try {
            await this.loginButton.waitFor({ state: 'visible' });
            await this.usernameField.fill(login);
            await this.passwordField.fill(password);
            await this.loginButton.click();
            await this.page.waitForLoadState('domcontentloaded');

            const headerText = await this.page.locator('header h1').textContent();
            if (headerText !== 'Web Application') {
                throw new Error('Logging failed!');
            }
        } catch (error) {
            console.error(`Logging failed`, error);
            throw error
        }

    }

    async getPage() {
        if (!this.page) {
            throw new Error("Page is not initialized. Please call navigate() first.");
        }
        return this.page;
    }

    async getContext() {
        if (!this.context) {
            throw new Error("Context is not initialized. Please call navigate() first.");
        }
        return this.context;
    }

    async close(){
        await this.page?.close();
    }
}

export default LoginPage;
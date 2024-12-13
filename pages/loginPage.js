import path from "path";

class LoginPage {
    #url;
    #usernameField;
    #passwordField;
    #loginButton;

    constructor(page) {
        this.page = page;
        this.#url = "https://animated-gingersnap-8cf7f2.netlify.app/"
        this.#usernameField = this.page.locator('#username');
        this.#passwordField = this.page.locator('#password');
        this.#loginButton = this.page.locator('button[type="submit"]');
    }

    async navigate() {
        await this.page.goto(this.#url);
    }

    async login() {
        const context = this.page.context();

        await this.#usernameField.fill('admin');
        await this.#passwordField.fill('password123');
        await this.#loginButton.click();


        await context.storageState({ path: '../fixtures/auth-state.json' });
    }
}

export default LoginPage;
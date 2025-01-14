import { chromium, firefox, webkit } from '@playwright/test';
import LoginPage from '../pages/loginPage';

async function globalSetup(config) {

    const browser = await chromium.launch();
    const loginPage = new LoginPage(browser)
    
    
      // Logging
      await loginPage.navigate();
      await loginPage.login();
      
      //Create context for logged user
      const storageStatePath = `fixtures/auth-state.json`;
      const context = await loginPage.getContext();
      await context.storageState({ path: storageStatePath });
  }

export default globalSetup;

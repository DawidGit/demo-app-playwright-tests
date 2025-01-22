import { chromium, firefox, webkit, test } from '@playwright/test';
import LoginPage from '../pages/loginPage';
const path = require('path');
const fs = require('fs');

async function globalSetup(config) {

  const browser = await chromium.launch();
  const loginPage = new LoginPage(browser);
  console.log('loginPage for user context initialized');
  const login = 'admin';
  const password = 'password123';


  // Logging
  await loginPage.navigate();
  await loginPage.login(login,password);

  //Create context for logged user
 const storageStatePath = `fixtures/auth-state.json`;
  const context = await loginPage.getContext();

  if (fs.existsSync(storageStatePath)) {
    fs.unlinkSync(storageStatePath);
    console.log("old file with context removed");
  }
  await context.storageState({ path: storageStatePath }); 
  console.log("new file with context created");
  
  loginPage.close();
  console.log('loginPage for user context closed');

}


export default globalSetup;
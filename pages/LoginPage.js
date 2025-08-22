import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      email: 'input[name="email"]',
      password: 'input[name="password"]',
      loginButton: 'input[value="Login"]',
      successMessage: 'My Account',
    };
  }

  async navigate() {
    await this.page.goto('/index.php?route=account/login');
  }

  async login(email, password) {
    await this.page.fill(this.selectors.email, email);
    await this.page.fill(this.selectors.password, password);
    await this.page.click(this.selectors.loginButton);
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/route=account\/account/);
    await expect(this.page.locator('#content h2').nth(0)).toHaveText('My Account');
  }
}

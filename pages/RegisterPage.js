import { expect } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      firstName: 'input[name="firstname"]',
      lastName: 'input[name="lastname"]',
      email: 'input[name="email"]',
      telephone: 'input[name="telephone"]',
      password: 'input[name="password"]',
      confirmPassword: 'input[name="confirm"]',
      agreeCheckbox: 'input[name="agree"]',
      submitButton: 'input[value="Continue"]',
      successMessage: 'Congratulations! Your new account has been successfully created!',
    };
  }

  async navigate() {
    await this.page.goto('/index.php?route=account/register');
  }

  async fillForm({ firstName, lastName, email, telephone, password }) {
    const { firstName: fn, lastName: ln, email: em, telephone: tel, password: pw, confirmPassword: cpw, agreeCheckbox } = this.selectors;
    await this.page.fill(fn, firstName);
    await this.page.fill(ln, lastName);
    await this.page.fill(em, email);
    await this.page.fill(tel, telephone);
    await this.page.fill(pw, password);
    await this.page.fill(cpw, password);
    await this.page.check(agreeCheckbox);
  }

  async submit() {
    await this.page.click(this.selectors.submitButton);
  }

  async verifySuccess() {
    await expect(this.page).toHaveURL(/route=account\/success/);
    await expect(this.page.getByText(this.selectors.successMessage)).toBeVisible();
  }
}
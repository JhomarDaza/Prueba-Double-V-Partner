export class ForgotPasswordPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#input-email');
    this.submitButton = page.locator('input[type="submit"]');
    this.successMessage = page.locator('#content');
  }

  async navigate() {
    await this.page.goto('/index.php?route=account/forgotten');
  }

  async recoverPassword(email) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }
}
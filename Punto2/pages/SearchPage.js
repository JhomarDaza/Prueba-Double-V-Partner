export class SearchPage {
  constructor(page) {
    this.page = page;
  }

  async addProductToCartFromList(productName) {
    await this.page.locator('.product-thumb', { hasText: productName })
      .locator('button:has-text("Add to Cart")')
      .click();
  }
}
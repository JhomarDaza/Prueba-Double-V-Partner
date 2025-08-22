export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator('#button-cart');
    this.listingAddToCartButton = (productName) =>
      page.locator('.product-thumb', { hasText: productName })
          .locator('button:has-text("Add to Cart")');
  }

  async addToCartFromProductPage() {
    await this.addToCartButton.click();
  }

  async addToCartFromListing(productName) {
    await this.listingAddToCartButton(productName).click();
  }
}

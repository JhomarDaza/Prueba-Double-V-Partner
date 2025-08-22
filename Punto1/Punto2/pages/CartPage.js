export class CartPage {
  constructor(page) {
    this.page = page;
  }

  async openCart() {
    await this.page.click('text=Shopping Cart');
  }

  async removeProduct(productName) {
    const productRow = this.page.locator(`tr:has-text("${productName}")`);
    const removeButton = productRow.locator('button[data-original-title="Remove"]');

    await removeButton.click();
    await this.page.waitForLoadState('networkidle'); // Espera a que se actualice el carrito
    console.log(`Producto eliminado: ${productName}`);
  }

  async modifyCartItemQuantityAndGetSummary({ productName, newQuantity }) {
    const productRow = this.page.locator(`tr:has-text("${productName}")`);
    const quantityInput = productRow.locator('input[name*="quantity"]');
    const updateButton = productRow.locator('button[data-original-title="Update"]');
  }

  async proceedToCheckout() {
    await this.page.click('text=Checkout');
  }
}
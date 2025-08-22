export class CategoryPage {
  constructor(page) {
    this.page = page;
  }

  // Agrega el producto directamente desde el listado
  async addProductToCartFromList(productName) {
    const productCard = this.page.locator('.product-thumb').filter({
      hasText: productName
    });

    const addToCartButton = productCard.locator('button[onclick^="cart.add"]');
    await addToCartButton.click();
  }
}

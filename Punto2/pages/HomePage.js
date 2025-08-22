// pages/HomePage.js

export class HomePage {
  constructor(page) {
    this.page = page;
    this.menu = page.locator('nav#menu'); // Menú principal
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.locator('div#search button'); // Selector más específico
  }

  // Navega a una categoría principal y hace clic en "Show All"
  async goToCategory(categoryName) {
    const categoryItem = this.menu.locator('li.dropdown').filter({
      hasText: categoryName
    });

    await categoryItem.hover();

    const showAllLink = categoryItem.locator('a').filter({
      hasText: `Show All ${categoryName}`
    });

    await showAllLink.click();
  }

  // Realiza una búsqueda desde la barra superior
  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}
export class ConfirmationPage {
  constructor(page) {
    this.page = page;
  }

  async verifyOrderSuccess() {
  const successHeader = this.page.locator('#common-success h1');
  await successHeader.waitFor({ state: 'visible', timeout: 10000 });

  const text = await successHeader.textContent();
  if (!text.includes('Your order has been placed!')) {
    throw new Error('La confirmación de la orden no se encontró.');
  }

  console.log('Orden confirmada exitosamente.');
}
}
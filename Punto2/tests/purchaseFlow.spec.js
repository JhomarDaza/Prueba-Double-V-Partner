import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { obtenerEmail } from '../utils/emailStore';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { ProductPage } from '../pages/ProductPage';
import { SearchPage } from '../pages/SearchPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const email = obtenerEmail(); // Recuperamos el email generado en el registro
  const password = 'Prueba123!';
  await loginPage.navigate();
  await loginPage.login(email, password);
});

test.describe('Flujo completo de compra', () => {
  test('Debe realizar una compra modificando el carrito', async ({ page }) => {
    // Instanciar Page Objects
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    const productPage = new ProductPage(page);
    const searchPage = new SearchPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    // 1 Ir a Laptops & Notebooks > Show All
    await page.goto('https://opencart.abstracta.us/');
    await homePage.goToCategory('Laptops & Notebooks');

    // 2 Seleccionar MacBook Pro y agregar al carrito
    await categoryPage.addProductToCartFromList('MacBook Pro');


    // 3 Buscar Samsung Galaxy Tab y agregar al carrito
    await homePage.searchProduct('Samsung Galaxy Tab');
    await searchPage.addProductToCartFromList('Samsung Galaxy Tab 10.1');


    // 4 Ir al carrito y eliminar MacBook Pro
    await cartPage.openCart();
    await cartPage.removeProduct('MacBook Pro');

    // 5 Aumentar cantidad de Samsung Galaxy Tab a 2
    const cartValues = await cartPage.modifyCartItemQuantityAndGetSummary({
      productName: 'Samsung Galaxy Tab 10.1',
      newQuantity: 2
    });


    // 6 Proceder al checkout
    await cartPage.proceedToCheckout();

    // 7 Llenar datos de facturación
    await checkoutPage.handleBillingDetails({
      useExisting: true,
      addressLabel: 'Alfred Pérez, Calle 123, Medellín, Antioquia, Colombia',
      firstName: 'Alfred',
      lastName: 'Pérez',
      company: 'TechNova',
      address: 'Calle 123',
      address2: 'Apto 4B',
      city: 'Medellín',
      postcode: '050023',
      country: 'Colombia',
      zone: 'Antioquia'
    });


    // Seleccionar dirección de envío existente
    await checkoutPage.selectExistingShippingAddress('Alfred Pérez, Calle 123, Medellín, Antioquia, Colombia');
    // Método de envío
    await checkoutPage.selectShippingMethod('flat.flat', 'Por favor entregar entre 9am y 12pm');
    // Método de pago
    await checkoutPage.selectPaymentMethod('bank_transfer', 'Pago por transferencia bancaria');

    // 8 Continuar por los pasos del checkout
    //await checkoutPage.continueThroughSteps();

    // 9 Confirmar la orden
    await checkoutPage.confirmOrder();

    // 10 Verificar éxito
    await confirmationPage.verifyOrderSuccess();
  });
});

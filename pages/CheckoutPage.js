
export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      billingFirstName: '#input-payment-firstname',
      billingLastName: '#input-payment-lastname',
      billingCompany: '#input-payment-company',
      billingAddress1: '#input-payment-address-1',
      billingAddress2: '#input-payment-address-2',
      billingCity: '#input-payment-city',
      billingPostcode: '#input-payment-postcode',
      billingCountry: '#input-payment-country',
      billingZone: '#input-payment-zone',
      paymentAddressExisting: 'input[name="payment_address"][value="existing"]',
      paymentAddressNew: 'input[name="payment_address"][value="new"]',
      paymentAddressDropdown: 'select[name="address_id"]',
      confirmButton: '#button-confirm',
      shippingAddressExisting: 'input[name="shipping_address"][value="existing"]',
      shippingAddressDropdown: 'select[name="address_id"]',
      shippingMethodComment: 'textarea[name="comment"]',
      paymentMethodComment: 'textarea[name="comment"]',
      agreeTerms: 'input[name="agree"]',
      buttonShippingAddress: '#button-shipping-address',
      buttonShippingMethod: '#button-shipping-method',
      buttonPaymentMethod: '#button-payment-method'
    };
  }

  async fillBillingDetails({ firstName, lastName, company, address, address2, city, postcode, country, zone }) {
    await this.page.fill(this.selectors.billingFirstName, firstName);
    await this.page.fill(this.selectors.billingLastName, lastName);
    if (company) await this.page.fill(this.selectors.billingCompany, company);
    await this.page.fill(this.selectors.billingAddress1, address);
    if (address2) await this.page.fill(this.selectors.billingAddress2, address2);
    await this.page.fill(this.selectors.billingCity, city);
    await this.page.fill(this.selectors.billingPostcode, postcode);
    await this.page.selectOption(this.selectors.billingCountry, { label: country });

    await this.page.waitForFunction(() => {
      const zoneSelect = document.querySelector('#input-payment-zone');
      return zoneSelect && zoneSelect.options.length > 1;
    }, { timeout: 10000 });

    await this.page.selectOption(this.selectors.billingZone, { label: zone });
  }

  async handleBillingDetails({ useExisting = true, addressLabel = null, addressValue = null, ...billingData }) {
    const isExistingVisible = await this.page.isVisible('#payment-existing');
    const isNewVisible = await this.page.isVisible('#payment-new');

    if (useExisting && isExistingVisible) {
      await this.page.check(this.selectors.paymentAddressExisting);
      await this.page.waitForSelector(this.selectors.paymentAddressDropdown);

      if (addressValue) {
        await this.page.selectOption(this.selectors.paymentAddressDropdown, addressValue);
      } else if (addressLabel) {
        await this.page.selectOption(this.selectors.paymentAddressDropdown, { label: addressLabel });
      }

    } else if (isNewVisible) {
      await this.page.check(this.selectors.paymentAddressNew);
      await this.page.waitForSelector('#payment-new', { state: 'visible' });

      await this.fillBillingDetails(billingData);
    }

    console.log('Dirección de facturación completada');
    await this.page.click('#button-payment-address');
  }

  async selectExistingShippingAddress(addressLabel = null, addressValue = null) {
    await this.page.check(this.selectors.shippingAddressExisting);
    await this.page.waitForSelector('#shipping-existing', { state: 'visible' });

    if (addressValue) {
      await this.page.selectOption(this.selectors.shippingAddressDropdown, addressValue);
    } else if (addressLabel) {
      await this.page.selectOption(this.selectors.shippingAddressDropdown, { label: addressLabel });
    }

    console.log('Dirección de envío seleccionada');
    await this.page.click(this.selectors.buttonShippingAddress);
  }

  async selectShippingMethod(methodValue = 'flat.flat', comment = '') {
    const methodSelector = `input[name="shipping_method"][value="${methodValue}"]`;

    await this.page.waitForSelector(methodSelector, { state: 'visible', timeout: 10000 });
    const isEnabled = await this.page.isEnabled(methodSelector);
    if (!isEnabled) {
      throw new Error(`El método de envío "${methodValue}" está presente pero no habilitado.`);
    }

    await this.page.check(methodSelector);
    if (comment) {
      await this.page.fill(this.selectors.shippingMethodComment, comment);
    }

    console.log('Método de envío seleccionado');
    await this.page.click(this.selectors.buttonShippingMethod);
  }

  async selectPaymentMethod(methodValue = 'bank_transfer', comment = '') {
    await this.page.check(`input[name="payment_method"][value="${methodValue}"]`);
    if (comment) {
      await this.page.fill(this.selectors.paymentMethodComment, comment);
    }
    await this.page.check(this.selectors.agreeTerms);

    console.log('Método de pago seleccionado');
    await this.page.click(this.selectors.buttonPaymentMethod);
  }
  
  async confirmOrder() {
    await this.page.waitForSelector(this.selectors.confirmButton, { state: 'visible', timeout: 10000 });

    const isEnabled = await this.page.isEnabled(this.selectors.confirmButton);
    if (!isEnabled) {
      throw new Error('El botón "Confirm Order" está visible pero no habilitado.');
    }

    console.log('Confirmando orden...');
    await this.page.click(this.selectors.confirmButton);
  }

}
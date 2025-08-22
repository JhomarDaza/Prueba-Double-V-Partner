import { test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { guardarEmail } from '../utils/emailStore';


test.describe('Registro de usuario', () => {
  test('Registrar exitosamente', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const uid = Math.floor(Math.random() * 100000);
    const email = `alfred${uid}@yopmail.com`;

    await registerPage.navigate();
    await registerPage.fillForm({
      firstName: 'Alfred',
      lastName: 'Pérez',
      email,
      telephone: '3001234567',
      password: 'Prueba123!',
    });
    await registerPage.submit();
    await registerPage.verifySuccess();

    guardarEmail(email);
  });
});

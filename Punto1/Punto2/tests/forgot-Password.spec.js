import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { obtenerEmail } from '../utils/emailStore';


test.describe('Recuperación de contraseña', () => {
  test('Debe enviar el formulario con un correo válido', async ({ page }) => {
    const forgotPassword = new ForgotPasswordPage(page);
    const email = obtenerEmail();

    await forgotPassword.navigate();
    await forgotPassword.recoverPassword(email);

    await page.waitForURL('**/login'); // Esperamos la redirección
    const message = await page.textContent('.alert-success'); // Capturamos el mensaje en login
    expect(message).toContain('An email with a confirmation link has been sent your email address.');
  });
});


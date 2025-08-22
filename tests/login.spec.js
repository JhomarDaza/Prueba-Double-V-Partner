import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { obtenerEmail } from '../utils/emailStore';

test.describe('Inicio de sesión', () => {
  test('Debe iniciar sesión exitosamente', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Credenciales válidas
    const email = obtenerEmail(); // Recuperamos el email generado en el registro
    const password = 'Prueba123!';

    await loginPage.navigate();
    await loginPage.login(email, password);
    await loginPage.verifyLoginSuccess();
  });
});

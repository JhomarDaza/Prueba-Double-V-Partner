# 🧪 Automatización de Flujos de Usuario - OpenCart

Este proyecto automatiza los principales flujos de interacción de un usuario en una tienda OpenCart utilizando Playwright y el patrón Page Object Model.

---

## 🚀 Cómo ejecutar los tests

```bash
npx playwright test
Ejecutar un test especifico
npx playwright test tests/login.spec.js

Estructura
.
├── tests/                  # Archivos de prueba
│   ├── register.spec.js
│   ├── login.spec.js
│   ├── forgot-password.spec.js
│   └── purchaseFlow.spec.js
├── pages/                  # Page Objects para cada sección del sitio
│   ├── CartPage.js
│   ├── CategoryPage.js
│   ├── ConfirmationPage.js
│   ├── ForgotPasswordPage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── ProductPage.js
│   ├── RegisterPage.js
│   └── SearchPage.js
├── utils/                  # Funciones auxiliares
│   └── emailStore.js       # Gestión de correos electrónicos para pruebas
├── README.md               # Documentación del proyecto

🛠 Requisitos
- Node.js (v16+ recomendado)
- Playwright
Instalación:
npm install
npx playwright install

🧠 Flujos cubiertos
- ✅ Registro de usuario
- ✅ Inicio de sesión
- ✅ Recuperación de contraseña
- ✅ Búsqueda y navegación por categorías
- ✅ Visualización y selección de productos
- ✅ Modificación del carrito
- ✅ Proceso de compra completo
- ✅ Confirmación de orden

📌 Buenas prácticas aplicadas
- Page Object Model para mantener el código modular y reutilizable.
- Separación clara entre lógica de test y lógica de interacción con la UI.
- Uso de selectores robustos y esperas inteligentes para evitar flakiness.
- Validaciones de éxito en cada flujo.
- Gestión dinámica de correos con emailStore.js.

🧭 Próximos pasos sugeridos
- Agregar reportes visuales (HTML Reporter, Allure).
- Ejecutar en múltiples navegadores y dispositivos.
- Automatizar en CI/CD (GitHub Actions, GitLab CI).
- Agregar pruebas negativas y de borde (datos inválidos, campos vacíos, etc.).
- Documentar cada Page Object con ejemplos de uso.

🤝 Créditos
Este proyecto fue desarrollado como parte de una prueba técnica para automatizar los flujos clave de usuario en OpenCart.

---

Ya está listo para pegarlo en tu archivo `.md`. Si quieres que te ayude a agregar una sección de descripción para cada página (`CartPage`, `LoginPage`, etc.), también puedo hacerlo. ¿Te gustaría incluir eso?



import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 150,           // 150 usuarios virtuales
  duration: '2m',     // durante 2 minutos
};

export default function () {
  // Solicitud GET: listar productos
  let res1 = http.get('https://fakestoreapi.com/products');
  check(res1, {
    'GET productos: status 200': (r) => r.status === 200,
  });

  // Solicitud POST: crear producto
  let res2 = http.post('https://fakestoreapi.com/products', JSON.stringify({
    title: 'Producto de prueba',
    price: 99.99,
    description: 'Simulación de carga',
    image: 'https://i.pravatar.cc',
    category: 'electronics'
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res2, {
    'POST producto: status 201': (r) => r.status === 201,
  });
}
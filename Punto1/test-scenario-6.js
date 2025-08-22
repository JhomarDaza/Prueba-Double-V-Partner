import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '1m', target: 250 },
    { duration: '1m', target: 400 },
    { duration: '1m', target: 550 },
    { duration: '1m', target: 700 },
    { duration: '1m', target: 850 },
    { duration: '1m', target: 1000 },
    { duration: '2m', target: 0 }, // enfriamiento
  ],
};

export default function () {
  http.get('https://fakestoreapi.com/products');
}
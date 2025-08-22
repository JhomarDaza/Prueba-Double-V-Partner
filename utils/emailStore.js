import fs from 'fs';
import path from 'path';

const filePath = path.resolve('temp/email.json');

export function guardarEmail(email) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify({ email }));
}

export function obtenerEmail() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data).email;
}

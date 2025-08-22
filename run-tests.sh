#!/bin/bash

echo "Ejecutando pruebas con Newman..."
newman run YourStore_API_Test.postman_collection.json \
  -r html --reporter-html-export newman-run-report.html

echo "Pruebas completadas. Abriendo el reporte..."

# Abrir el reporte en el navegador (compatible con Windows Git Bash)
start newman-run-report.html
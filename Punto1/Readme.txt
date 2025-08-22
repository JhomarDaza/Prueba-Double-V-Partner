# API Test Automation Suite

Automatización de pruebas funcionales y de rendimiento de API utilizando **Postman**, **Newman** y **k6**.

---

## Tabla de contenidos

- [Descripción](#descripción)  
- [Requisitos](#requisitos)  
- [Flujo del proyecto](#flujo-del-proyecto)  
- [Instalación](#instalación)  
- [Uso](#uso)  
  - [1. Ejecución funcional con Newman](#1-ejecución-funcional-con-newman)  
  - [2. Pruebas de rendimiento con k6](#2-pruebas-de-rendimiento-con-k6)  
- [Tecnologías utilizadas](#tecnologías-utilizadas)  
- [Estructura del repositorio](#estructura-del-repositorio)  
- [Contribuciones](#contribuciones)  
- [Licencia](#licencia)

---

## Descripción

Este proyecto permite:

1. Diseñar colecciones de pruebas en **Postman** (guardadas como archivos JSON).  
2. Ejecutar esas pruebas en entorno automatizado usando **Newman**, generando reportes funcionales.  
3. Realizar escenarios de **pruebas de rendimiento** (load/performance) con **k6**, incluyendo generación de métricas y análisis.  
   
Se facilita el pipeline completo: definición → ejecución funcional → ejecución de rendimiento.

---

## Requisitos

- **Node.js**
- **Newman** (`npm install -g newman`)
- **k6** instalado en tu sistema ([Wikipedia sobre k6](https://en.wikipedia.org/wiki/K6_%28software%29) :contentReference[oaicite:0]{index=0})

Opcionalmente:

- `postman-to-k6` si conviertes colecciones de Postman a scripts k6 ([tutorial de k6 y Postman](https://medium.com/kpmg-uk-engineering/load-testing-with-postman-and-grafana-k6-48afb4872a6b) :contentReference[oaicite:1]{index=1}).

---

## Flujo del proyecto

```text
Postman → Newman → Reporte funcional
           ↓
       k6 load test → Métricas performance

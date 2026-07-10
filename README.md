# Plegar Pro Ultra Beta · Cámara + IA

Demo autocontenida y funcional para GitHub Pages. Todo está dentro de `index.html`; no necesita instalación ni dependencias.

## Funciones incluidas

- Captura de plano mediante cámara trasera del móvil o selección de fotografía.
- Flujo de interpretación asistida por IA local demostrativa.
- Detección simulada de cotas, ángulos, alas y líneas de plegado, con aplicación editable al proyecto.
- Plegados ilimitados, interiores o exteriores, hacia arriba o abajo.
- Optimización de la secuencia.
- Desarrollo plano acotado.
- Simulación visual paso a paso.
- Base local editable de materiales, punzones Mecos y matrices Mecos de 30°/88°.
- Punzón recto Mecos 30° H100 y pata de cabra.
- Bystronic Xpert 3100/100 t, año 2006.
- Recomendación automática de útiles y cálculo aproximado de fuerza.
- Generación de programa de trabajo.
- Guardado de procesos en LocalStorage e importación/exportación JSON.

## Publicación en GitHub Pages

1. Crea un repositorio.
2. Sube `index.html` y `README.md` a la raíz.
3. En **Settings → Pages**, selecciona **Deploy from a branch**, `main` y `/root`.

## Importante sobre la cámara e IA

La captura con cámara es real y funciona en navegadores móviles compatibles. La interpretación de planos de esta beta es una demostración local con datos detectados simulados y revisión manual. Para una versión de producción con lectura fiable de cotas, símbolos y geometría se deberá conectar un backend de visión/OCR industrial y validar siempre el resultado antes de fabricar.

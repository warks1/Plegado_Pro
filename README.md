# Plegar Pro Demo

Demo funcional, ligera y sin dependencias para presentar el concepto de **Plegar Pro** en GitHub Pages.

## Qué incluye

- Panel general con KPIs técnicos.
- Editor de pieza: material, espesor, longitud, radio, matriz y pliegues.
- Visualizador 2D/3D simulado con canvas.
- Cálculos demo de desarrollo, fuerza, recuperación elástica y riesgo.
- Secuencia de plegado recomendada.
- Validaciones automáticas básicas.
- Generador de CNC demo.
- Plan de calidad y estimación de costes.
- Biblioteca de materiales y herramientas.
- Exportación de proyecto en JSON.

## Cómo probarlo en local

Abre el archivo `index.html` directamente en el navegador.

También puedes usar un servidor local:

```bash
python3 -m http.server 8080
```

Después abre:

```text
http://localhost:8080
```

## Cómo subirlo a GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube estos archivos a la raíz del repositorio:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. En GitHub entra en **Settings > Pages**.
4. En **Build and deployment**, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Guarda y espera a que GitHub genere la web.

## Aviso

Esta demo usa cálculos simplificados para presentación visual. No sustituye cálculos industriales certificados ni validaciones reales de máquina.

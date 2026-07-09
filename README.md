# Plegar Pro · Demo Industrial para GitHub Pages

Demo funcional, visual y sin dependencias externas de una plataforma tipo **Plegar Pro** para cálculo y simulación básica de plegado de chapa.

## Funciones incluidas

- Dashboard visual con métricas de fuerza, desarrollo plano, riesgo y tiempo de ciclo.
- Simulador 2D en Canvas con pieza, punzón, matriz y ángulo.
- Cálculos orientativos de:
  - Bend Allowance
  - Bend Deduction
  - Desarrollo plano
  - Recuperación elástica
  - Fuerza aproximada de plegado
- Biblioteca de materiales y utillaje.
- Secuencia de fabricación recomendada.
- Informe técnico automático.
- Exportación de cálculo en JSON.
- Diseño responsive compatible con GitHub Pages.

## Cómo publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos de esta carpeta.
3. Entra en **Settings > Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama `main` y la carpeta `/root`.
6. Guarda y abre la URL que GitHub te indique.

## Aviso técnico

Esta demo utiliza fórmulas simplificadas y sirve como prototipo visual/funcional. Para uso industrial real deben calibrarse los cálculos con tablas de fabricante, herramientas reales, material, máquina, ensayos y validación técnica.

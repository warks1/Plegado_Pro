# Plegar Pro · Beta Mecos + Bystronic + Importación + IA

Demo funcional para GitHub Pages.

## Novedades de esta versión

- Matrices Mecos de 30° ampliadas: V6, V8, V12, V16, V20, V24 y V32.
- Punzón recto Mecos de 30° y 100 mm de altura.
- Punzones de pata de cabra Mecos para plegados interiores.
- Plegado interior/exterior por cada operación.
- Recomendación automática de útiles por plegado.
- Mejor orden de plegado calculado por la demo.
- Plegadora Bystronic Xpert 3100 mm / 100 toneladas / año 2006.
- Importador de planos/cotas desde JSON, CSV o DXF simplificado.
- Panel de IA local simulada para analizar pieza, útiles y secuencia.
- Desarrollo plano y simulación visual paso a paso.

## Cómo usar

Abre `index.html` o sube el contenido a GitHub Pages.

## Formato CSV de ejemplo

```csv
PROYECTO;Soporte importado
MATERIAL;S235
ESPESOR;1.5
ANCHO;780
ALA;35
PLEGADO;90;1.5;up;interior
ALA;80
PLEGADO;30;1;up;interior
ALA;120
```

## Nota importante

La base Mecos y la ficha Bystronic son demostrativas para la beta. Antes de fabricar piezas reales deben validarse contra catálogo, manual de máquina y utillaje disponible en taller.

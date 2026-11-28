# Residual Web

Dashboard académico para explorar el monitoreo de cloro residual en instituciones educativas de Apurímac, Perú. Presenta indicadores del conjunto de datos y diez gráficos con filtros, ampliación y descarga en PNG.

## Funcionalidades

- Tema claro y oscuro, con preferencia guardada en el navegador.
- Diseño adaptable a escritorio y teléfonos móviles.
- Indicadores de monitoreo y galería de gráficos agrupados por tema.
- Vista ampliada de cada gráfico y descarga de su imagen PNG.
- Sección de predicción con formulario de demostración. La conexión con el modelo y su API todavía no está implementada.

## Tecnologías

- React 19 y Vite.
- Python 3, Pandas y Matplotlib para preparar los datos y generar gráficos.
- Barlow Condensed y DM Sans, incluidas en `public/fonts/` con sus licencias.

## Desarrollo local

Se requiere Node.js y npm. Desde la raíz del proyecto:

```bash
npm ci
npm run dev
```

Comprobaciones disponibles:

```bash
npm run lint
npm run build
npm run preview
```

La compilación de producción se genera en `dist/`. Para desplegar el sitio estático, publica ese directorio en un servidor compatible con aplicaciones Vite.

## Datos y gráficos

Para regenerar los datos se requiere Python 3 con Pandas y Matplotlib. Usa el CSV fuente, separado por punto y coma y con los encabezados originales:

```bash
python scripts/monitoreo.py ruta/al/archivo.csv
python scripts/graficos.py ruta/al/archivo.csv
```

El primer comando actualiza `src/data/monitoreo.json`; el segundo crea los diez PNG en `public/graficos/`. Ejecuta ambos comandos cuando actualices el CSV.

Las fichas, títulos, descripciones accesibles y grupos de la galería se mantienen en `src/data/graficos.js`. Si los nuevos datos cambian la interpretación, actualiza también sus textos.

Cada fila del CSV representa un registro de monitoreo. El indicador `cumple_nor` determina el cumplimiento registrado. Los gráficos distinguen los estados con una paleta semántica: rojo para crítico, amarillo para deficiente, verde para óptimo y violeta para alto; otras visualizaciones usan tonos variados para facilitar su lectura.

## Estructura principal

```text
src/
  components/   Componentes de contexto, galería, gráficos y predicción
  data/         Resumen JSON y fichas de gráficos
  App.jsx       Navegación, tema y vistas principales
  App.css       Estilos de componentes y adaptación móvil
  index.css     Estilos globales y variables de tema
scripts/
  monitoreo.py  Lectura y resumen del CSV
  graficos.py   Generación de gráficos PNG
public/
  graficos/     Gráficos servidos por el sitio
```

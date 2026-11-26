# Residual Web

Dashboard académico para explorar el monitoreo de cloro residual en las instituciones educativas de Apurímac. Incluye diez gráficos de Matplotlib, filtros por tema y una vista ampliada con descarga de PNG.

## Desarrollo local

```bash
npm ci
npm run dev
npm run lint
npm run build
```

Para un despliegue Vite, se usa `npm run build` y el directorio de salida `dist`.

## Actualizar datos y gráficos

Se requiere Python 3 con Pandas y Matplotlib. Los comandos reciben el CSV del proyecto, con punto y coma como separador y encabezados originales.

```bash
python scripts/monitoreo.py ruta/al/cloro_residual_mi_cole_0.csv
python scripts/graficos.py ruta/al/cloro_residual_mi_cole_0.csv
```

El primer comando actualiza el resumen en `src/data/monitoreo.json`. El segundo escribe los diez PNG en `public/graficos/`. Las fichas que acompañan cada gráfico están en `src/data/graficos.js`. Si cambia el periodo o la distribución, revisar también los textos interpretativos.

Cada fila corresponde a un registro de monitoreo. El cumplimiento usa el indicador `cumple_nor` del CSV. La pestaña de predicción conserva el formulario de la plantilla para la integración posterior del modelo.

Barlow Condensed y DM Sans se incluyen con sus licencias en `public/fonts/`. La ilustración editorial de portada se generó para este proyecto.

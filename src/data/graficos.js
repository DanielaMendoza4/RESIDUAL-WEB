export const grupos = ['Todos', 'Estados', 'Territorio', 'Evolución']

export const graficos = [
  {
    id: 'estados', grupo: 'Estados', title: 'Estado de las mediciones',
    alt: 'Anillo con la proporción de registros críticos, deficientes, óptimos y altos.',
    description: 'El estado crítico reúne más de la mitad de los registros.',
  },
  {
    id: 'cloro-mensual', grupo: 'Evolución', title: 'Cloro residual por mes',
    alt: 'Serie mensual del promedio de cloro residual entre marzo de 2025 y octubre de 2026.',
    description: 'La línea resume las mediciones disponibles en cada mes del monitoreo.',
  },
  {
    id: 'cloro-provincia', grupo: 'Territorio', title: 'Cloro residual por provincia',
    alt: 'Barras verticales con el promedio de cloro residual de siete provincias.',
    description: 'Cada barra es un promedio por registro. Las provincias tienen distintos tamaños de muestra.',
  },
  {
    id: 'cumplimiento-prestador', grupo: 'Estados', title: 'Cumplimiento por prestador',
    alt: 'Barras con el porcentaje de cumplimiento de los siete prestadores con más registros.',
    description: 'El gráfico muestra a los siete prestadores con más registros e indica cuántas mediciones aporta cada uno.',
  },
  {
    id: 'registros-provincia', grupo: 'Territorio', title: 'Registros por provincia',
    alt: 'Barras horizontales con el conteo de registros de monitoreo de siete provincias.',
    description: 'Cotabambas tiene el mayor número de registros del archivo.',
  },
  {
    id: 'puntos-monitoreados', grupo: 'Territorio', title: 'Puntos monitoreados',
    alt: 'Dispersión de coordenadas, coloreadas por el promedio de cloro residual de cada punto.',
    description: 'Cada punto agrupa las mediciones que comparten latitud y longitud.',
  },
  {
    id: 'distribucion-cloro', grupo: 'Estados', title: 'Distribución del cloro residual',
    alt: 'Histograma de las mediciones de cloro residual, agrupadas por intervalos.',
    description: 'Las mediciones se concentran en los intervalos inferiores del histograma.',
  },
  {
    id: 'estados-provincia', grupo: 'Territorio', title: 'Estados por provincia',
    alt: 'Barras apiladas con el número de registros de cada estado en las siete provincias.',
    description: 'La altura total refleja cuántas observaciones se registraron en cada provincia.',
  },
  {
    id: 'cumplimiento-mensual', grupo: 'Evolución', title: 'Cumplimiento por mes',
    alt: 'Serie mensual del porcentaje de registros con el indicador de cumplimiento igual a uno.',
    description: 'Cada porcentaje usa como denominador el total de registros de ese mes.',
  },
  {
    id: 'criticos-distrito', grupo: 'Territorio', title: 'Registros críticos por distrito',
    alt: 'Barras horizontales de los diez distritos con más mediciones clasificadas como críticas.',
    description: 'Es un ranking por cantidad de registros críticos. La frecuencia de monitoreo varía entre distritos.',
  },
]

export function rutaGrafico(id) {
  return `${import.meta.env.BASE_URL}graficos/${id}.png`
}

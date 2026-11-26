import { rutaGrafico } from '../data/graficos.js'

export default function Grafico({ grafico, onExpand }) {
  return (
    <figure className="chart-card">
      <figcaption className="chart-caption">
        <div>
          <p className="chart-group">{grafico.grupo}</p>
          <h3>{grafico.title}</h3>
        </div>
        {onExpand && (
          <button className="chart-expand" type="button" onClick={() => onExpand(grafico)}
            aria-label={`Ampliar gráfico: ${grafico.title}`}>
            <span aria-hidden="true">↗</span>
          </button>
        )}
      </figcaption>
      <img alt={grafico.alt} src={rutaGrafico(grafico.id)} width="1260" height="720"
        decoding="async" loading="lazy" className="chart-image" />
      <p className="chart-interpretation">{grafico.description}</p>
    </figure>
  )
}

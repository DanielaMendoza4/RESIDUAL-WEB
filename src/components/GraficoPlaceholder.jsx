function GraficoPlaceholder({ member, number, title }) {
  return (
    <article className="chart-card">
      <div className="chart-card-heading">
        <div className="chart-title-group">
          <span className="chart-number">{String(number).padStart(2, '0')}</span>
          <div>
            <h3>{number}. {title}</h3>
            <span className="chart-member">{member}</span>
          </div>
        </div>
        <span aria-hidden="true" className="chart-type">PNG</span>
      </div>

      <div className="chart-placeholder">
        <div aria-hidden="true" className="chart-placeholder-icon">
          <span />
          <span />
          <span />
        </div>
        <strong>Aquí se insertará el gráfico de Matplotlib (Colab)</strong>
        <p>Reemplaza este bloque por una imagen exportada desde Google Colab.</p>
        <code>&lt;img src="/graficos/grafico-{number}.png" alt="{title}" /&gt;</code>
      </div>

      <p className="chart-interpretation">
        <strong>Interpretación:</strong> [Espacio reservado para el análisis breve del gráfico]
      </p>
    </article>
  )
}

export default GraficoPlaceholder

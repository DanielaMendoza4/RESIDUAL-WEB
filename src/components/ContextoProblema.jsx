const datasetDetails = [
  {
    label: 'Departamento',
    value: 'Apurímac',
    detail: '7 provincias',
    mark: '01',
  },
  {
    label: 'Variable objetivo',
    value: 'Estado',
    detail: 'Óptimo / Deficiente / Crítico',
    mark: '02',
  },
  {
    label: 'Prestadores',
    value: 'JASS',
    detail: 'UGM Municipal · EPS',
    mark: '03',
  },
]

function ContextoProblema() {
  return (
    <section aria-labelledby="problem-heading" className="context-section" id="dashboard">
      <div className="context-card">
        <div className="context-copy">
          <span className="context-eyebrow"><span /> CALIDAD DEL AGUA ESCOLAR</span>
          <h2 id="problem-heading">
            El agua segura también se mide.
          </h2>
          <p>
            En los colegios de Apurímac, monitorear el cloro residual ayuda a verificar
            la desinfección del agua. Según el criterio de este proyecto, niveles menores
            a <strong>0.5 mg/L</strong> pueden representar un riesgo sanitario. Con el
            dataset <strong>Mi Cole</strong>, el modelo de Machine Learning estudiará
            las mediciones de cloro residual (<code>clo_resid</code>) para estimar el
            estado de cumplimiento.
          </p>
          <div aria-label="Categorías de estado" className="status-legend">
            <span><i className="status-dot status-dot--optimal" /> Óptimo</span>
            <span><i className="status-dot status-dot--deficient" /> Deficiente</span>
            <span><i className="status-dot status-dot--critical" /> Crítico</span>
          </div>
        </div>

        <div className="context-aside">
          <div className="context-aside-top">
            <span>VARIABLE DE ESTUDIO</span>
            <span className="context-aside-tag">Mi Cole</span>
          </div>
          <div className="chlorine-value">clo_resid</div>
          <div className="chlorine-rule">
            <span>Umbral de referencia</span>
            <strong>&lt; 0.5 mg/L</strong>
          </div>
          <p>Concentración de cloro residual en el agua.</p>
        </div>
      </div>

      <div aria-label="Alcance del dataset" className="dataset-grid">
        {datasetDetails.map(({ label, value, detail, mark }) => (
          <article className="dataset-card" key={label}>
            <span aria-hidden="true" className="dataset-mark">{mark}</span>
            <div className="dataset-label">{label}</div>
            <div className="dataset-value">{value}</div>
            <div className="dataset-detail">{detail}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ContextoProblema

import { useState } from 'react'

const provinces = [
  'ABANCAY',
  'ANDAHUAYLAS',
  'ANTABAMBA',
  'AYMARAES',
  'CHINCHEROS',
  'COTABAMBAS',
  'GRAU',
]

function PrediccionPlaceholder() {
  const [showNotice, setShowNotice] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setShowNotice(true)
  }

  return (
    <section aria-labelledby="prediction-heading" className="prediction-view">
      <div className="prediction-intro">
        <span className="section-kicker">MODELO DE MACHINE LEARNING</span>
        <h2 id="prediction-heading">Predicción de cloro residual</h2>
        <p>
          Prepara una consulta con las características del registro. La conexión con el
          modelo todavía está pendiente.
        </p>
      </div>

      <form className="prediction-card" onSubmit={handleSubmit}>
        <div className="prediction-card-heading">
          <div>
            <span className="section-kicker">DATOS DE ENTRADA</span>
            <h3>Características del registro</h3>
          </div>
          <span className="pending-badge"><span /> API pendiente</span>
        </div>

        <div className="prediction-fields">
          <label className="form-field">
            <span>Provincia</span>
            <select defaultValue="">
              <option disabled value="">Selecciona una provincia</option>
              {provinces.map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Prestador</span>
            <select defaultValue="">
              <option disabled value="">Selecciona un prestador</option>
              <option value="JASS">JASS</option>
              <option value="UGM MUNICIPAL">UGM Municipal</option>
              <option value="EPS">EPS</option>
            </select>
          </label>

          <label className="form-field">
            <span>Periodo</span>
            <input
              placeholder="Periodo disponible en Mi Cole"
              type="text"
            />
          </label>

          <label className="form-field">
            <span>Nivel de cloro residual <small>mg/L</small></span>
            <input min="0" placeholder="Ingresar valor de clo_resid" step="any" type="number" />
          </label>
        </div>

        <button className="prediction-submit" type="submit">
          Ejecutar Predicción (Pendiente API Express)
          <span aria-hidden="true">→</span>
        </button>

        <div aria-live="polite" className="prediction-result">
          {showNotice
            ? 'Espacio reservado: Aquí se conectará el endpoint de Express con el modelo entrenado'
            : 'El resultado del modelo aparecerá en este espacio.'}
        </div>
      </form>
    </section>
  )
}

export default PrediccionPlaceholder

import { useEffect, useRef, useState } from 'react'
import { graficos, grupos, rutaGrafico } from '../data/graficos.js'
import Grafico from './Grafico.jsx'

export default function GaleriaGraficos() {
  const [grupo, setGrupo] = useState('Todos')
  const [ampliado, setAmpliado] = useState(null)
  const dialogo = useRef(null)
  const botonOrigen = useRef(null)
  const visibles = grupo === 'Todos' ? graficos : graficos.filter((grafico) => grafico.grupo === grupo)

  useEffect(() => {
    if (ampliado && !dialogo.current.open) dialogo.current.showModal()
  }, [ampliado])

  function abrir(grafico, boton) {
    botonOrigen.current = boton
    setAmpliado(grafico)
  }

  function cerrar() {
    setAmpliado(null)
    botonOrigen.current?.focus()
  }

  return (
    <section className="shell gallery" id="analisis" aria-labelledby="charts-heading" data-ui>
      <div className="section-heading">
        <div>
          <h2 id="charts-heading">El monitoreo en gráficos</h2>
          <p>Explora cómo cambian las mediciones según el territorio, el periodo y el prestador.</p>
        </div>
        <p className="chart-count" role="status">{visibles.length} de {graficos.length} gráficos</p>
      </div>
      <div className="chart-filters" role="group" aria-label="Filtrar gráficos">
        {grupos.map((nombre) => (
          <button key={nombre} type="button" aria-pressed={grupo === nombre} onClick={() => setGrupo(nombre)}>
            {nombre}
          </button>
        ))}
      </div>
      <div className="charts-grid">
        {visibles.map((grafico) => <Grafico key={grafico.id} grafico={grafico} onExpand={abrir} />)}
      </div>

      <dialog ref={dialogo} className="chart-dialog" onClose={cerrar} aria-labelledby="dialogo-grafico">
        {ampliado && (
          <>
            <div className="dialog-heading">
              <h3 id="dialogo-grafico">{ampliado.title}</h3>
              <form method="dialog"><button className="chart-expand" aria-label="Cerrar gráfico" type="submit">×</button></form>
            </div>
            <img src={rutaGrafico(ampliado.id)} alt={ampliado.alt} width="1260" height="720" />
            <p>{ampliado.description}</p>
            <a className="text-link" href={rutaGrafico(ampliado.id)} download>Descargar PNG <span aria-hidden="true">↓</span></a>
          </>
        )}
      </dialog>
    </section>
  )
}

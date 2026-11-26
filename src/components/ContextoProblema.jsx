import hero from '../assets/muestra-editorial.webp'
import datos from '../data/monitoreo.json'

const entero = new Intl.NumberFormat('es-PE')
const porcentaje = new Intl.NumberFormat('es-PE', { style: 'percent', maximumFractionDigits: 1 })
const periodos = new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric', timeZone: 'UTC' })

function mes(periodo) {
  return periodos.format(new Date(`${periodo}-01T00:00:00Z`))
}

export default function ContextoProblema() {
  const criticos = porcentaje.format(datos.estados.CRITICO / datos.registros)
  const indicadores = [
    ['Registros de monitoreo', entero.format(datos.registros)],
    ['Provincias', entero.format(datos.provincias)],
    ['Distritos', entero.format(datos.distritos)],
    ['Cumplimiento registrado', porcentaje.format(datos.cumplen / datos.registros)],
  ]

  return (
    <>
      <section className="shell hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title"><span>Agua en</span><span>mi cole.</span></h1>
          <p>Monitoreo de cloro residual en las instituciones educativas de Apurímac.</p>
          <a className="primary-link" href="#analisis">Explorar los gráficos <span className="arrow arrow--diagonal" aria-hidden="true" /></a>
        </div>
        <div className="hero-art">
          <img src={hero} width="1280" height="853" alt="Ilustración de un frasco de muestreo sobre agua en movimiento"
            fetchPriority="high" />
        </div>
      </section>

      <div className="metrics-band">
        <dl className="shell metrics">
          {indicadores.map(([label, value]) => (
            <div className="metric" key={label}>
              <dt>{label}</dt><dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="shell context-section" aria-labelledby="problem-heading">
        <div>
          <h2 id="problem-heading">Lo que muestran<br />las mediciones</h2>
          <p className="coverage">{mes(datos.desde)} a {mes(datos.hasta)}</p>
        </div>
        <div className="context-copy">
          <p className="context-lead"><strong>{criticos}</strong> de los registros del archivo están clasificados como críticos.</p>
          <p>El cloro residual ayuda a seguir la desinfección del agua. Los datos de Mi Cole permiten comparar los monitoreos por zona, prestador y periodo. Cada fila corresponde a un registro de monitoreo.</p>
          <p>El cumplimiento se presenta según el indicador del archivo. El cloro residual es un componente de la evaluación de la calidad del agua.</p>
        </div>
      </section>
    </>
  )
}

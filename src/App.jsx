import { useEffect, useState } from 'react'
import './App.css'
import ContextoProblema from './components/ContextoProblema.jsx'
import GaleriaGraficos from './components/GaleriaGraficos.jsx'
import PrediccionPlaceholder from './components/PrediccionPlaceholder.jsx'
import datos from './data/monitoreo.json'

function leerVista() {
  return window.location.hash === '#prediccion' ? 'prediccion' : 'contexto'
}

function leerTema() {
  const guardado = window.localStorage.getItem('residual-theme')
  if (guardado === 'claro' || guardado === 'oscuro') return guardado
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'claro' : 'oscuro'
}

function App() {
  const [vista, setVista] = useState(leerVista)
  const [tema, setTema] = useState(leerTema)

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    document.documentElement.style.colorScheme = tema
    window.localStorage.setItem('residual-theme', tema)
  }, [tema])

  useEffect(() => {
    const actualizarVista = () => setVista(leerVista())
    window.addEventListener('hashchange', actualizarVista)
    return () => window.removeEventListener('hashchange', actualizarVista)
  }, [])

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [vista])

  return (
    <>
      <a className="skip-link" href="#contenido" onClick={(event) => {
        event.preventDefault()
        document.getElementById('contenido').focus()
      }}>Saltar al contenido</a>
      <header className="site-header">
        <div className="shell header-content">
          <a className="wordmark" href="#inicio" aria-label="Residual Web, inicio">
            <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
            Residual<span>Web</span>
          </a>
          <nav aria-label="Navegación principal">
            <a href="#inicio">Contexto</a>
            <a href="#analisis">Gráficos</a>
            <a href="#prediccion" aria-current={vista === 'prediccion' ? 'page' : undefined}>Predicción IA</a>
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Cambiar a tema ${tema === 'oscuro' ? 'claro' : 'oscuro'}`}
              aria-pressed={tema === 'claro'}
              onClick={() => setTema((actual) => actual === 'oscuro' ? 'claro' : 'oscuro')}
            >
              <span aria-hidden="true">{tema === 'oscuro' ? '☀' : '☾'}</span>
              {tema === 'oscuro' ? 'Claro' : 'Oscuro'}
            </button>
          </nav>
        </div>
      </header>

      <main id="contenido" tabIndex={-1}>
        {vista === 'contexto' ? (
          <>
            <ContextoProblema />
            <GaleriaGraficos />
          </>
        ) : (
          <div className="shell prediction-shell" id="prediccion">
            <a className="text-link" href="#analisis"><span className="arrow arrow--left" aria-hidden="true" /> Volver a los gráficos</a>
            <PrediccionPlaceholder />
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div className="shell footer-content">
          <div><strong>Residual Web</strong><p>Calidad del agua escolar en Apurímac, Perú.</p></div>
          <div><strong>Fuente de datos</strong><p>Monitoreo Mi Cole · Corte {datos.corte.split('-').reverse().join('/')}</p></div>
          <a href="#inicio">Volver al inicio <span className="arrow arrow--up" aria-hidden="true" /></a>
        </div>
      </footer>
    </>
  )
}

export default App

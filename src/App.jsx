import { useEffect, useState } from 'react'
import './App.css'
import ContextoProblema from './components/ContextoProblema.jsx'
import GaleriaGraficos from './components/GaleriaGraficos.jsx'
import PrediccionPlaceholder from './components/PrediccionPlaceholder.jsx'
import datos from './data/monitoreo.json'

function leerVista() {
  return window.location.hash === '#prediccion' ? 'prediccion' : 'contexto'
}

function App() {
  const [vista, setVista] = useState(leerVista)
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
            <a className="text-link" href="#analisis"><span aria-hidden="true">←</span> Volver a los gráficos</a>
            <PrediccionPlaceholder />
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div className="shell footer-content">
          <div><strong>Residual Web</strong><p>Calidad del agua escolar en Apurímac, Perú.</p></div>
          <div><strong>Fuente de datos</strong><p>Monitoreo Mi Cole · Corte {datos.corte.split('-').reverse().join('/')}</p></div>
          <a href="#inicio">Volver al inicio <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  )
}

export default App

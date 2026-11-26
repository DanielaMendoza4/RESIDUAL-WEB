import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import ContextoProblema from './components/ContextoProblema.jsx'
import GraficoPlaceholder from './components/GraficoPlaceholder.jsx'
import PrediccionPlaceholder from './components/PrediccionPlaceholder.jsx'

const charts = [
  {
    title: 'Distribución de Estados de Cloro',
    member: 'Espacio Integrante 1',
  },
  {
    title: 'Cloro Residual Promedio por Provincia',
    member: 'Espacio Integrante 2',
  },
  {
    title: 'Cumplimiento por Tipo de Prestador',
    member: 'Espacio Integrante 3',
  },
  {
    title: 'Evolución Temporal por Periodo',
    member: 'Espacio Integrante 4',
  },
]

function App() {
  const [activeView, setActiveView] = useState('contexto')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavigate = (view) => {
    setActiveView(view)
    setSidebarOpen(false)
  }

  const viewTitle = activeView === 'contexto'
    ? 'Dashboard de Contexto'
    : 'Predicción IA'

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          aria-label="Cerrar menú de navegación"
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          type="button"
        />
      )}

      <Sidebar
        activeView={activeView}
        isOpen={sidebarOpen}
        onNavigate={handleNavigate}
      />

      <main className="dashboard">
        <Header
          activeView={activeView}
          onMenuClick={() => setSidebarOpen(true)}
          title={viewTitle}
        />

        <div className="dashboard-content">
          {activeView === 'contexto' ? (
            <section aria-labelledby="charts-heading" className="view-panel">
              <ContextoProblema />

              <div className="section-heading">
                <div>
                  <span className="section-kicker">Análisis del dataset Mi Cole</span>
                  <h2 id="charts-heading">Espacios para gráficos</h2>
                </div>
                <span className="section-count">4 GRÁFICOS · COLAB</span>
              </div>

              <div className="charts-grid">
                {charts.map((chart, index) => (
                  <GraficoPlaceholder
                    key={chart.member}
                    number={index + 1}
                    {...chart}
                  />
                ))}
              </div>
            </section>
          ) : (
            <PrediccionPlaceholder />
          )}

          <footer className="dashboard-footer">
            <span>RESIDUAL-WEB <span className="footer-divider">/</span> APURÍMAC, PERÚ</span>
            <span>Proyecto universitario · Machine Learning</span>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App

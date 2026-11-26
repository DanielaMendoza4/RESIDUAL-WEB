import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import ContextoProblema from './components/ContextoProblema.jsx'
import Grafico from './components/Grafico.jsx'
import { graficos } from './data/graficos.js'
import PrediccionPlaceholder from './components/PrediccionPlaceholder.jsx'

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
                  <h2 id="charts-heading">Gráficos del monitoreo</h2>
                </div>
                <span className="section-count">{graficos.length} GRÁFICOS</span>
              </div>

              <div className="charts-grid">
                {graficos.map((grafico) => (
                  <Grafico key={grafico.id} grafico={grafico} />
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

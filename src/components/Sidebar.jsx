function DashboardIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <rect height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" width="7" x="2.25" y="2.25" />
      <rect height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" width="7" x="10.75" y="7.25" />
      <rect height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" width="7" x="2.25" y="10.25" />
      <rect height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" width="7" x="10.75" y="2.25" />
    </svg>
  )
}

function PredictionIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <path d="M10 2.25v2.1M10 15.65v2.1M2.25 10h2.1m11.3 0h2.1M4.52 4.52 6 6m8 8 1.48 1.48m0-10.96L14 6m-8 8-1.48 1.48" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="3.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

const navigation = [
  { id: 'contexto', label: 'Dashboard de Contexto', Icon: DashboardIcon },
  { id: 'prediccion', label: 'Predicción IA', Icon: PredictionIcon },
]

function Sidebar({ activeView, isOpen, onNavigate }) {
  return (
    <aside
      aria-label="Navegación principal"
      className={`sidebar${isOpen ? ' sidebar--open' : ''}`}
    >
      <div className="sidebar-brand">
        <a
          aria-label="RESIDUAL-WEB, ir al Dashboard de Contexto"
          className="brand-link"
          href="#dashboard"
          onClick={() => onNavigate('contexto')}
        >
          <span aria-hidden="true" className="brand-mark">R</span>
          <span className="brand-name">RESIDUAL<span>-WEB</span></span>
        </a>
        <p className="brand-subtitle">Apurímac <span>•</span> ML Water Quality</p>
        <button
          aria-label="Cerrar menú"
          className="sidebar-close"
          onClick={() => onNavigate(activeView)}
          type="button"
        >
          ×
        </button>
      </div>

      <div className="sidebar-label">VISTAS DEL PROYECTO</div>
      <nav aria-label="Vistas" className="sidebar-nav">
        {navigation.map(({ id, label, Icon }) => (
          <button
            aria-current={activeView === id ? 'page' : undefined}
            className={`nav-link${activeView === id ? ' nav-link--active' : ''}`}
            key={id}
            onClick={() => onNavigate(id)}
            type="button"
          >
            <Icon />
            <span>{label}</span>
            {activeView === id && <span aria-hidden="true" className="nav-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="team-status">
          <span aria-hidden="true" className="team-status-mark">4</span>
          <div>
            <strong>Proyecto Colaborativo</strong>
            <span>4 Ramas Git</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

function Header({ activeView, onMenuClick, title }) {
  const subtitle = activeView === 'contexto'
    ? 'Calidad del agua en instituciones educativas'
    : 'Espacio de prueba para el modelo de cloro residual'

  return (
    <header className="topbar">
      <button
        aria-label="Abrir menú de navegación"
        className="menu-toggle"
        onClick={onMenuClick}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <div className="topbar-context">
        <span className="topbar-label">RESIDUAL-WEB <span>/</span> APURÍMAC</span>
        <div>
          <h1 className="topbar-title">{title}</h1>
          <p className="topbar-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="phase-badge">
        <span aria-hidden="true" />
        Fase 2: Integración Frontend
      </div>
    </header>
  )
}

export default Header

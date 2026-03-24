import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="brand">
          <span className="brand-badge">📚</span>
          <div>
            <p className="brand-name">Ma Bibliothèque</p>
            <p className="brand-subtitle">Gestion de livres en React</p>
          </div>
        </Link>

        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Accueil
          </NavLink>

          <NavLink to="/ajouter" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Ajouter un livre
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
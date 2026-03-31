import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-content header-content-tp">
        <Link to="/" className="brand">
          Bibliothèque
        </Link>

        <nav className="nav nav-tp">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-tp active' : 'nav-link nav-link-tp'
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/ajouter"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-tp active' : 'nav-link nav-link-tp'
            }
          >
            Ajouter un livre
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "../styles/headerBar.css";

const HeaderBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="header-bar">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <img className="header-logo-icon" src="/logo.png"></img>
          <h1>Ricettario</h1>
        </Link>

        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/inventory">Inventario</Link>
              <Link to="/profile">Profilo</Link>
            </>
          ) : (
            <>
              
              <Link to="/register" className="nav-link">Registrati</Link>
              <Link to="/login" className="nav-link">Accedi</Link>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default HeaderBar;

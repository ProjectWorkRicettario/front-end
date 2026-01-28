import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../styles/headerBar.css";

const HeaderBar = () => {
  return (
    <header className="header-bar">
      <div className="header-content">
        <Link to="/inventory" className="header-logo">
          <img className="header-logo-icon" src="/logo.png"></img>
          <h1>Ricettario</h1>
        </Link>

        <nav className="header-nav">
          <Link to="/inventory">Inventario</Link>
          <Link to="/profile">Profilo</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default HeaderBar;

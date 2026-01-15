import { Link } from "react-router-dom";
import "../styles/headerBar.css";

const HeaderBar = () => {
  return (
    <header className="header-bar">
      <div className="header-content">
        <Link to="/inventory" className="header-logo">
          <img className="header-logo-icon" src="/logo.png"></img>
          <h1>Ricette dal Frigo</h1>
        </Link>

        <nav className="header-nav">
          <Link to="/inventory">Le mie Ricette</Link>
          <Link to="/profile">Profilo</Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderBar;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          Ricette dal Frigo
        </div>
        
        <nav className="footer-links">
          <Link to="/inventory">Le mie Ricette</Link>
          <Link to="/profile">Profilo</Link>
          <a href="#">Termini di Servizio</a>
          <a href="#">Privacy Policy</a>
        </nav>

        <div className="footer-copyright">
          <p>&copy; {currentYear} Ricette dal Frigo. Tutti i diritti riservati.</p>
          <p>Sviluppato con ❤️ per il Project Work.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
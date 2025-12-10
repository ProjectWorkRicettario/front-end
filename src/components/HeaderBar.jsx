import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser } from '../services/authService';
import '../styles/headerBar.css';

const HeaderBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Chiama l'API per distruggere la sessione nel backend
      await logoutUser();
      
      // 2. Aggiorna lo stato nel frontend (rimuove il flag isLoggedIn da localStorage/Context)
      logout(); 
      
      // 3. Reindirizza l'utente alla pagina di login
      navigate('/login'); 

    } catch (error) {
      console.error('Errore nel Logout:', error);
      alert('Impossibile effettuare il logout. Riprova.');
      
      // Se l'API fallisce ma l'utente deve comunque uscire:
      logout(); // Forziamo il logout lato client
      navigate('/login');
    }
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo">
          <Link to="/inventory">
            <h1>Ricette dal Frigo</h1>
          </Link>
        </div>
        
        <nav className="header-nav">
          <Link to="/inventory" className="nav-link">
            Le mie Ricette
          </Link>
          <Link to="/profile" className="nav-link">
            Profilo
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HeaderBar;
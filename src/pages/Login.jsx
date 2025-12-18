import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import "../styles/login.css";

const Login = () => {
  const { login } = useAuth();
  // Stati per i campi del form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Stati per feedback utente
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hook per la navigazione
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita il refresh della pagina
    setError(""); // Resetta errori precedenti
    setLoading(true); // Attiva lo stato di caricamento

    try {
      const data = await loginUser(email, password);

      login();

      console.log("Login riuscito:", data);

      // La navigazione a /inventory ora è gestita automaticamente da AuthRedirect
      navigate("/inventory");
    } catch (err) {
      // Gestione errori (es. "Credenziali non valide")
      setError(err.message || "Qualcosa è andato storto.");
    } finally {
      setLoading(false); // Disattiva il caricamento a prescindere dall'esito
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Benvenuto</h2>
        <p>Inserisci le tue credenziali per accedere</p>

        {/* Mostra errore se presente */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@esempio.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Accesso in corso..." : "Accedi"}
          </button>
        </form>
        <p className="link-login-register">
          Non hai già un account? <Link to="/register">Registrati qui</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

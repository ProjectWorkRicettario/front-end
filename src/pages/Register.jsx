import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import "../styles/login.css";

const Register = () => {
  const { login } = useAuth();
  // Stati per i campi del form e la conferma
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Stati per feedback utente
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Controllo lato client per la corrispondenza delle password
    if (password !== confirmPassword) {
      setError("Le password non corrispondono.");
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser(email, password);

      // Se il backend restituisce un token, effettua il login automatico
      if (data.token) {
        login(data.token, data.user);
        navigate('/inventory');
        return;
      }

      login();
      setSuccess(data.message || "Registrazione riuscita!");

      navigate("/login");
    } catch (err) {
      setError(err.message || "Errore durante la registrazione.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderBar />
      <div className="register-container">
      <div className="login-box">
        {" "}
        {/* Riutilizziamo la classe CSS del login */}
        <h2>Crea un Account</h2>
        <p>Inserisci i tuoi dati per registrarti.</p>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Conferma Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registrazione in corso..." : "Registrati"}
          </button>
        </form>
        <p className="link-login-register">
          Hai già un account? <Link to="/login">Accedi qui</Link>
        </p>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default Register;

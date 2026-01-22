import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../services/authService";
import * as dataService from "../services/dataService";
import HeaderBar from "../components/HeaderBar";
import "../styles/profilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await dataService.getProfileData();
        setProfile(data);
      } catch (error) {
        console.error("Errore nel recupero profilo:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecipes = async () => {
      try {
        const data = await dataService.getRecipes();
        const parsed = (Array.isArray(data) ? data : []).map((r) => ({
          ...r,
          ingredients:
            typeof r.ingredients === "string"
              ? JSON.parse(r.ingredients)
              : r.ingredients,
          steps: typeof r.steps === "string" ? JSON.parse(r.steps) : r.steps,
        }));
        setRecipes(parsed);
      } catch (error) {
        console.error("Errore nel recupero ricette:", error);
      } finally {
        setRecipesLoading(false);
      }
    };

    fetchProfile();
    fetchRecipes();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (error) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="profile-container">
      <HeaderBar />
      <main className="profile-content">
        {!profile && !loading && (
          <div className="error-msg">Errore: Dati utente non disponibili.</div>
        )}
        {loading ? (
          <div className="loader">Caricamento Profilo...</div>
        ) : (
          <>
            <h2>Profilo Personale</h2>
            <div className="profile-details">
              <p>
                <strong>ID Utente:</strong> {profile.id}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Registrato Dal:</strong>{" "}
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
              <button onClick={handleLogout} className="logout-button">
                Esci dal profilo
              </button>
            </div>

            <section className="profile-recipes-section">
              <h3>📜 Le tue ricette salvate</h3>
              {recipesLoading ? (
                <div className="loader">Caricamento ricette...</div>
              ) : recipes.length === 0 ? (
                <div className="empty-state">
                  Nessuna ricetta salvata nel tuo archivio.
                </div>
              ) : (
                <div className="recipes-grid">
                  {recipes.map((r) => (
                    <article key={r.id} className="recipe-card">
                      <header className="recipe-card-header">
                        <h4>{r.title}</h4>
                        <span className="time-badge">
                          ⏱️ {r.estimated_time}
                        </span>
                      </header>

                      <div className="recipe-body">
                        <ul className="recipe-ingredients">
                          {(r.ingredients || []).map((ing, idx) => (
                            <li key={idx}>
                              <span>{ing.name}</span>
                              <span className="ing-qty">{ing.quantity}</span>
                            </li>
                          ))}
                        </ul>

                        <details className="recipe-steps">
                          <summary>Istruzioni preparazione</summary>
                          <ol>
                            {(r.steps || []).map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ol>
                        </details>
                      </div>
                      <footer className="recipe-footer">
                        Creato il: {new Date(r.created_at).toLocaleDateString()}
                      </footer>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../services/authService";
import * as dataService from "../services/dataService";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import "../styles/profilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [sharedRecipes, setSharedRecipes] = useState([]);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("my-recipes");

  const navigate = useNavigate();
  const { logout } = useAuth();

  // Funzione helper per formattare i dati JSON provenienti dal DB
  const formatRecipes = (list) => {
    if (!Array.isArray(list)) return [];
    return list.map((r) => ({
      ...r,
      ingredients:
        typeof r.ingredients === "string"
          ? JSON.parse(r.ingredients)
          : r.ingredients || [],
      steps: typeof r.steps === "string" ? JSON.parse(r.steps) : r.steps || [],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setRecipesLoading(true);

        // Chiamate parallele al backend
        const [profData, recData, sharedData] = await Promise.all([
          dataService.getProfileData(),
          dataService.getRecipes(),
          dataService.getSharedRecipes(),
        ]);

        setProfile(profData);
        setRecipes(formatRecipes(recData));
        setSharedRecipes(formatRecipes(sharedData));
      } catch (error) {
        console.error("Errore nel caricamento dati profilo:", error);
      } finally {
        setLoading(false);
        setRecipesLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteRecipe = async (id) => {
    if (!window.confirm("Vuoi davvero eliminare questa ricetta?")) return;

    try {
      // 1. Chiamata al backend per eliminazione fisica
      await dataService.deleteRecipe(id);

      // 2. Aggiornamento UI
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      alert("Ricetta eliminata con successo.");
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
      alert("Impossibile eliminare la ricetta.");
    }
  };

  const handleShare = async (recipeId) => {
    const email = window.prompt(
      "Inserisci l'email dell'amico con cui vuoi condividere la ricetta:",
    );
    if (!email) return;

    try {
      await dataService.shareRecipe(recipeId, email);
      alert("Ricetta condivisa correttamente!");
    } catch (error) {
      console.error("Errore condivisione:", error);
      alert("Errore: assicurati che l'email sia corretta e l'utente esista.");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    logout();
    navigate("/login");
  };

  // Determina quali ricette mostrare in base al Tab attivo
  const currentRecipes = activeTab === "my-recipes" ? recipes : sharedRecipes;

  return (
    <div className="profile-container">
      <HeaderBar />
      <main className="profile-content">
        {loading ? (
          <div className="loader">Caricamento profilo...</div>
        ) : (
          <>
            <h2>Profilo Personale</h2>
            <div className="profile-details">
              <p>
                <strong>ID Utente:</strong> {profile?.id}
              </p>
              <p>
                <strong>Email:</strong> {profile?.email}
              </p>
              <p>
                <strong>Registrato Dal:</strong>{" "}
                {new Date(profile?.created_at).toLocaleDateString()}
              </p>
              <button onClick={handleLogout} className="logout-button">
                Esci dal profilo
              </button>
            </div>

            <div className="profile-tabs-selector">
              <button
                className={activeTab === "my-recipes" ? "tab-active" : ""}
                onClick={() => setActiveTab("my-recipes")}
              >
                Le mie ricette
              </button>
              <button
                className={activeTab === "shared" ? "tab-active" : ""}
                onClick={() => setActiveTab("shared")}
              >
                Condivise con me
              </button>
            </div>

            <section className="profile-recipes-section">
              {recipesLoading ? (
                <div className="loader">Caricamento ricette...</div>
              ) : (
                <div className="recipes-grid">
                  {currentRecipes.length > 0 ? (
                    currentRecipes.map((r) => (
                      <article key={r.id} className="recipe-card">
                        <header className="recipe-card-header">
                          <h4>{r.title}</h4>
                          <span className="time-badge">
                             {r.estimated_time}
                          </span>
                        </header>

                        <div className="recipe-body">
                          <ul className="recipe-ingredients">
                            {r.ingredients.map((ing, i) => (
                              <li key={i}>
                                <span>{ing.name}</span>
                                <span className="ing-qty">{ing.quantity}</span>
                              </li>
                            ))}
                          </ul>
                          <details className="recipe-steps">
                            <summary>Preparazione</summary>
                            <ol>
                              {r.steps.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ol>
                          </details>
                        </div>

                        <footer className="recipe-footer">
                          {r.shared_by ? (
                            <span className="shared-tag">
                              Inviata da: {r.shared_by}
                            </span>
                          ) : (
                            <div className="recipe-actions">
                              <button
                                className="share-btn"
                                onClick={() => handleShare(r.id)}
                              >
                                 Condividi
                              </button>

                              {activeTab === "my-recipes" && (
                                <button
                                  className="delete-btn-modern"
                                  onClick={() => handleDeleteRecipe(r.id)}
                                  title="Elimina ricetta"
                                >
                                   Elimina
                                </button>
                              )}
                            </div>
                          )}
                        </footer>
                      </article>
                    ))
                  ) : (
                    <div className="empty-state">
                      Nessuna ricetta trovata in questa sezione.
                    </div>
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;

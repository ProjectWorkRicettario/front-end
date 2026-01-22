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
  const [activeTab, setActiveTab] = useState("my-recipes");
  const navigate = useNavigate();
  const { logout } = useAuth();

  // ricetta fake temporanea placeholder
  const sharedRecipesMock = [
    {
      id: "sh-1",
      title: "Lasagna della Nonna",
      estimated_time: "90 min",
      created_at: new Date().toISOString(),
      ingredients: [
        { name: "Sfoglia", quantity: "500g" },
        { name: "Ragù", quantity: "1L" },
      ],
      steps: ["Prepara la besciamella", "Inforna a 180°C"],
      shared_by: "Mamma",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, recData] = await Promise.all([
          dataService.getProfileData(),
          dataService.getRecipes(),
        ]);
        setProfile(profData);
        setRecipes(
          (Array.isArray(recData) ? recData : []).map((r) => ({
            ...r,
            ingredients:
              typeof r.ingredients === "string"
                ? JSON.parse(r.ingredients)
                : r.ingredients,
            steps: typeof r.steps === "string" ? JSON.parse(r.steps) : r.steps,
          }))
        );
      } catch (error) {
        console.error("Errore:", error);
      } finally {
        setLoading(false);
        setRecipesLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    logout();
    navigate("/login");
  };

  const currentRecipes =
    activeTab === "my-recipes" ? recipes : sharedRecipesMock;

  return (
    <div className="profile-container">
      <HeaderBar />
      <main className="profile-content">
        {loading ? (
          <div className="loader">Caricamento...</div>
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
                            ⏱️ {r.estimated_time}
                          </span>
                        </header>
                        <div className="recipe-body">
                          <ul className="recipe-ingredients">
                            {(r.ingredients || []).map((ing, i) => (
                              <li key={i}>
                                <span>{ing.name}</span>
                                <span className="ing-qty">{ing.quantity}</span>
                              </li>
                            ))}
                          </ul>
                          <details className="recipe-steps">
                            <summary>Preparazione</summary>
                            <ol>
                              {(r.steps || []).map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ol>
                          </details>
                        </div>
                        <footer className="recipe-footer">
                          {r.shared_by ? `Condivisa da: ${r.shared_by}` : null}
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
    </div>
  );
};

export default ProfilePage;

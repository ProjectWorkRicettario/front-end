import { useState, useEffect } from "react";
import * as dataService from "../services/dataService";
import HeaderBar from "../components/HeaderBar";
import GenerateRecipesButton from "../components/GenerateRecipesButton";
import Footer from "../components/Footer";
import "../styles/inventoryPage.css";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);



  const handleDeleteRecipe = async (id) => {
  if (!window.confirm("Vuoi davvero eliminare questa ricetta?")) return;
  // Qui chiamerai il tuo dataService.deleteRecipe(id)
  setRecipes(recipes.filter(r => r.id !== id));
  };
  
  const fetchInventory = async () => {
    try {
      const items = await dataService.getInventory();
      setInventory(items);
    } catch (error) {
      console.error("Errore nel caricamento inventario:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!name || !quantity) return;
    try {
      await dataService.addItemToInventory(name, quantity);
      setName("");
      setQuantity("");
      fetchInventory();
    } catch (error) {
      console.error("Errore aggiunta:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await dataService.deleteItemFromInventory(itemId);
      fetchInventory();
    } catch (error) {
      console.error("Errore eliminazione:", error);
    }
  };

  const handleRecipesGenerated = (newRecipes) => {
    setRecipes(newRecipes || []);
  };

  return (
    <div className="main-layout">
      
      <HeaderBar />

      <div className="content-area">
        {loading ? (
          <div className="loader">Caricamento Inventario...</div>
        ) : (
          <>
            <aside className="left-panel">
              <h2>Trova il tuo prossimo pasto.</h2>
              <p>Inserisci gli ingredienti che hai a disposizione:</p>

              <form onSubmit={handleAddItem} className="add-ingredient-form">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="es. Pomodori..."
                  required
                />
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantità"
                  required
                />
                <button
                  type="submit"
                  className="add-btn"
                  title="Aggiungi ingrediente"
                >
                  +
                </button>
              </form>

              <div className="inventory-list-container">
                <div className="inventory-header">
                  <span className="col-1">INGREDIENTE</span>
                  <span className="col-2">QUANTITÀ</span>
                </div>
                {inventory.map((item) => (
                  <div key={item.id} className="inventory-item">
                    <span className="col-1">{item.name}</span>
                    <span className="col-2">{item.quantity}</span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteItem(item.id)}
                      aria-label="Elimina"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              <GenerateRecipesButton onGenerated={handleRecipesGenerated} />
            </aside>

            <main className="right-panel">
              <h3>💡 Ricette Suggerite</h3>

              {recipes.length === 0 ? (
                <div className="empty-recipes">
                  <p>
                    Non hai ancora generato nessuna ricetta. Clicca sul pulsante
                    a sinistra per iniziare!
                  </p>
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

                      <div className="recipe-content">
                        <section>
                          <h5>Ingredienti:</h5>
                          <ul className="recipe-ingredients">
                            {r.ingredients.map((ing, idx) => (
                              <li key={idx}>
                                <span className="ing-name">{ing.name}</span>
                                <span className="ing-qty">{ing.quantity}</span>
                              </li>
                            ))}
                          </ul>
                        </section>

                        <details className="recipe-steps">
                          <summary>Guarda Preparazione</summary>
                          <ol>
                            {r.steps.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ol>
                        </details>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </main>
          </>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default InventoryPage;

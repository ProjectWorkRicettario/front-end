import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as dataService from "../services/dataService";
import HeaderBar from "../components/HeaderBar";
import "../styles/inventoryPage.css";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const items = await dataService.getInventory();
      setInventory(items);
    } catch (error) {
      console.error("Errore:", error);
      // Gestione del reindirizzamento se non loggato (401)
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
      fetchInventory(); // Ricarica l'inventario
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

  if (loading) return <div>Caricamento Inventario...</div>;

  return (
    <div className="main-layout">
      <HeaderBar />
      <div className="content-area">
        <div className="left-panel">
          <h2>Trova il tuo prossimo pasto.</h2>
          <p>Dici quali ingredienti hai...</p>

          {/* Form per aggiungere ingrediente (come da immagine) */}
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
              placeholder="Quantità (es. 3, 200g)"
              required
            />
            <button type="submit" className="add-btn">
              +
            </button>
          </form>

          {/* Lista Ingredienti (Tabella come da immagine) */}
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
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <button className="generate-btn">Genera Ricette</button>
        </div>

        {/* Pannello Destro: Suggerimenti Ricette (Segnaposto) */}
        <div className="right-panel">
          <h3>Le tue ricette suggerite</h3>
          {/* Qui andrebbero i componenti per le ricette suggerite (omessi per semplicità) */}
          <div className="recipe-card">...</div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;

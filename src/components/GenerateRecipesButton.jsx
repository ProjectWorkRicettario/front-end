import { useState } from "react";
import { generateRecipes } from "../services/dataService";
import "../styles/inventoryPage.css";

export default function GenerateRecipesButton({ onGenerated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handle = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateRecipes();
      onGenerated && onGenerated(data.recipes);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handle} disabled={loading} className="generate-btn">
        {loading ? "Generazione in corso..." : "Genera 3 ricette"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

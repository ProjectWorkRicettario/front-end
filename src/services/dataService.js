const API_URL = "https://back-end-k1s7.onrender.com/api";

const getAuthHeaders = (extra = {}) => {
  const token = localStorage.getItem('token');
  const auth = token ? { Authorization: `Bearer ${token}` } : {};
  return { ...auth, ...extra };
};

// Inventario
export const getInventory = async () => {
  const response = await fetch(`${API_URL}/inventory`, { headers: getAuthHeaders() });
  if (!response.ok) {
    const text = await response.text();
    console.error("getInventory failed", response.status, text);
    throw new Error(
      `Errore ${response.status}: ${text || "Errore nel recupero inventario."}`
    );
  }
  return response.json();
};

export const addItemToInventory = async (name, quantity) => {
  const response = await fetch(`${API_URL}/inventory`, {
    method: "POST",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ name, quantity }),
  });
  if (!response.ok) {
    const text = await response.text();
    console.error("addItemToInventory failed", response.status, text);
    throw new Error(
      `Errore ${response.status}: ${
        text || "Errore nell'aggiunta ingrediente."
      }`
    );
  }
  return response.json();
};

export const deleteItemFromInventory = async (itemId) => {
  const response = await fetch(`${API_URL}/inventory/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const text = await response.text();
    console.error("deleteItemFromInventory failed", response.status, text);
    throw new Error(
      `Errore ${response.status}: ${
        text || "Errore nella rimozione ingrediente."
      }`
    );
  }
  return response.json();
};

// Profilo
export const getProfileData = async () => {
  const response = await fetch(`${API_URL}/user/profile`, { headers: getAuthHeaders() });
  if (!response.ok) {
    const text = await response.text();
    console.error("getProfileData failed", response.status, text);
    throw new Error(
      `Errore ${response.status}: ${
        text || "Errore nel recupero dati profilo."
      }`
    );
  }
  return response.json();
};

// Genera 3 ricette con tutti gli elementi dell'inventario
export const generateRecipes = async () => {
  // Uniamo le tue OPTIONS globali con il metodo POST specifico per questa chiamata
  const response = await fetch(`${API_URL}/recipes/generate`, {
    headers: getAuthHeaders(),
    method: "POST", // <--- FONDAMENTALE: Forza il metodo POST
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("generateRecipes failed", response.status, text);
    throw new Error(
      `Errore ${response.status}: ${
        text || "Errore nella generazione delle ricette"
      }`
    );
  }
  return response.json();
};

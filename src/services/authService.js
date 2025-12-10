// frontend/src/services/authService.js
const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),

      // *** CRUCIALE per i cookie di sessione ***
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login fallito");
    }

    // La risposta includerà un cookie di sessione che il browser gestirà automaticamente
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      // Anche qui è meglio includere credentials se dovessimo in futuro usare sessioni dopo la reg.
      credentials: "include",
    });

    // Controlla il codice di stato (201 è standard per una creazione riuscita)
    if (!response.ok) {
      const errorData = await response.json();
      // Lancia l'errore che verrà catturato nel componente Register.jsx
      throw new Error(errorData.message || "Registrazione fallita");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include", // Essenziale per inviare il cookie prima di distruggerlo
    });

    if (!response.ok) {
      throw new Error("Logout fallito lato server.");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

const API_URL = "https://back-end-k1s7.onrender.com/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('loginUser failed', response.status, text);
      let message;
      try {
        message = JSON.parse(text).message;
      } catch (e) {
        message = text;
      }
      throw new Error(message || "Login fallito");
    }

    const data = await response.json();
    return data; // { user, token }
  } catch (error) {
    console.error('loginUser error', error);
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registrazione fallita");
    }

    const data = await response.json();
    return data; // may include token
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout fallito lato server.");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

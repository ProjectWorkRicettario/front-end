const API_URL = 'https://back-end-k1s7.onrender.com/api'; 
const OPTIONS = { credentials: 'include' };

// Inventario
export const getInventory = async () => {
    const response = await fetch(`${API_URL}/inventory`, OPTIONS);
    if (!response.ok) {
        const text = await response.text();
        console.error('getInventory failed', response.status, text);
        throw new Error(`Errore ${response.status}: ${text || 'Errore nel recupero inventario.'}`);
    }
    return response.json();
};

export const addItemToInventory = async (name, quantity) => {
    const response = await fetch(`${API_URL}/inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quantity }),
        ...OPTIONS 
    });
    if (!response.ok) {
        const text = await response.text();
        console.error('addItemToInventory failed', response.status, text);
        throw new Error(`Errore ${response.status}: ${text || "Errore nell'aggiunta ingrediente."}`);
    }
    return response.json();
};

export const deleteItemFromInventory = async (itemId) => {
    const response = await fetch(`${API_URL}/inventory/${itemId}`, {
        method: 'DELETE',
        ...OPTIONS 
    });
    if (!response.ok) {
        const text = await response.text();
        console.error('deleteItemFromInventory failed', response.status, text);
        throw new Error(`Errore ${response.status}: ${text || 'Errore nella rimozione ingrediente.'}`);
    }
    return response.json();
};

// Profilo
export const getProfileData = async () => {
    const response = await fetch(`${API_URL}/user/profile`, OPTIONS);
    if (!response.ok) {
        const text = await response.text();
        console.error('getProfileData failed', response.status, text);
        throw new Error(`Errore ${response.status}: ${text || 'Errore nel recupero dati profilo.'}`);
    }
    return response.json();
};
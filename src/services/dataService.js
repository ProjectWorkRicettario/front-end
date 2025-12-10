// frontend/src/services/dataService.js
const API_URL = 'http://localhost:5000/api'; 
const OPTIONS = { credentials: 'include' };

// Inventario
export const getInventory = async () => {
    const response = await fetch(`${API_URL}/inventory`, OPTIONS);
    if (!response.ok) throw new Error('Errore nel recupero inventario.');
    return response.json();
};

export const addItemToInventory = async (name, quantity) => {
    const response = await fetch(`${API_URL}/inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quantity }),
        ...OPTIONS 
    });
    if (!response.ok) throw new Error('Errore nell\'aggiunta ingrediente.');
    return response.json();
};

export const deleteItemFromInventory = async (itemId) => {
    const response = await fetch(`${API_URL}/inventory/${itemId}`, {
        method: 'DELETE',
        ...OPTIONS 
    });
    if (!response.ok) throw new Error('Errore nella rimozione ingrediente.');
    return response.json();
};

// Profilo
export const getProfileData = async () => {
    const response = await fetch(`${API_URL}/user/profile`, OPTIONS);
    if (!response.ok) throw new Error('Errore nel recupero dati profilo.');
    return response.json();
};
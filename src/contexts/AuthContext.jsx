import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Legge lo stato salvato in localStorage
const getInitialLoginState = () => {
    return localStorage.getItem('isLoggedIn') === 'true'; 
};

export const AuthProvider = ({ children }) => {
  // Imposta lo stato iniziale leggendo da localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoginState);
  
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persistenza
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Persistenza
    // Qui andrebbe la chiamata DELETE al backend
  };
  
  const value = {
    isLoggedIn, // QUESTA VARIABILE È REATTIVA
    login,
    logout,
  };

  // Tutte le modifiche a isLoggedIn in questo provider forzeranno il re-render
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
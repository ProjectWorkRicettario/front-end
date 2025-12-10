import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // 1. Se l'utente NON è loggato (isLoggedIn è false)
  if (!isLoggedIn) {
    // Reindirizza l'utente alla pagina di login.
    // L'utilizzo di 'replace' evita che la pagina protetta rimanga nello storico.
    return <Navigate to="/login" replace />;
  }

  // 2. Se l'utente è loggato (isLoggedIn è true)
  // Mostra il componente richiesto (InventoryPage o ProfilePage)
  return children;
};

export default ProtectedRoute;
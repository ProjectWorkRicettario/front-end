import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Componente per le rotte accessibili SOLO se l'utente NON è loggato
const AuthOnlyRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // Se loggato, reindirizza a /inventory (via dalla pagina di login/register)
  if (isLoggedIn) {
    return <Navigate to="/inventory" replace />;
  } 
  
  // Se NON loggato, mostra la pagina (Login o Register)
  return children;
};

export default AuthOnlyRoute;
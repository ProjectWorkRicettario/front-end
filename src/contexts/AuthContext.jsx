import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const getInitialAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return { isLoggedIn: !!token, token: token || null, user: user ? JSON.parse(user) : null };
};

export const AuthProvider = ({ children }) => {
  const initial = getInitialAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(initial.isLoggedIn);
  const [token, setToken] = useState(initial.token);
  const [user, setUser] = useState(initial.user);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData || null);
    setIsLoggedIn(true);
    localStorage.setItem('token', newToken);
    if (userData) localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  
  const value = {
    isLoggedIn, // QUESTA VARIABILE È REATTIVA
    token,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
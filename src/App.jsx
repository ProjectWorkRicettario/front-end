import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InventoryPage from "./pages/InventoryPage";
import ProfilePage from "./pages/ProfilePage";

// Importa le due guardie
import AuthOnlyRoute from "./components/AuthOnlyRoute"; // Per /login, /register
import ProtectedRoute from "./components/ProtectedRoute"; // Per /inventory, /profile

function App() {
  return (
    <Router>
      <Routes>
        {/* ROTTE DI AUTENTICAZIONE (Accesso solo se NON loggato) */}
        <Route
          path="/register"
          element={
            <AuthOnlyRoute>
              <Register />
            </AuthOnlyRoute>
          }
        />

        <Route
          path="/login"
          element={
            <AuthOnlyRoute>
              <Login />
            </AuthOnlyRoute>
          }
        />

        {/* ROTTE PROTETTE (Accesso solo se loggato) */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Rotta principale che reindirizza a /inventory (protetta) */}
        <Route path="/" element={<Navigate to="/inventory" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

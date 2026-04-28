import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../../auth/pages/login.page";
import { Dashboard } from "../../auth/pages/dashboard.page";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "../../auth/components/protected-route";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
//http://localhost:5173/login

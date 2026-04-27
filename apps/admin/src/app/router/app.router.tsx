import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../../auth/pages/login.page";
import { Dashboard } from "../../auth/pages/layout.page";
import { ProtectedRoute } from "../../auth/components/protected-route";
import { AnalyticsPage } from "../../auth/pages/analytics.page";
import { UsersPage } from "../../auth/pages/users.page";
import { ListingsPage } from "../../auth/pages/listings.page";
import { ReportsPage } from "../../auth/pages/reports.page";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="analytics" replace />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="users"     element={<UsersPage />} />
          <Route path="listings"  element={<ListingsPage />} />
          <Route path="reports"   element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
//http://localhost:5173/login

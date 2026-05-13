import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/pages/login.page";
import { LandingPage } from "@/pages/landing.page";
import { CustomerHomePage } from "@/pages/home.page";
import { Dashboard } from "@/pages/layout.page";
import { ProtectedRoute } from "@/router/protected.route";
import { AppInit } from "@/providers/app-init.provider";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppInit>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<CustomerHomePage />} />
          </Route>
        </Routes>
      </AppInit>
    </BrowserRouter>
  );
};
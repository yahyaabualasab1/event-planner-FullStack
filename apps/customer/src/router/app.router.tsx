import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/pages/login.page";
import { LandingPage } from "@/pages/landing.page";
import { CustomerHomePage } from "@/pages/home.page";
import { BookingsPage } from "@/pages/bookings.page";
import { MessagesPage } from "@/pages/messages.page";
import { Dashboard } from "@/pages/layout.page";
import { RegisterPage } from "../pages/registar.page";
import { ProtectedRoute } from "@/router/protected.route";
import { AppInit } from "@/providers/app-init.provider";
import { Navigate } from "react-router-dom";
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
  return (
    <BrowserRouter>
      <AppInit>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<CustomerHomePage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="messages" element={<MessagesPage />} />
          </Route>
        </Routes>
      </AppInit>
    </BrowserRouter>
  );
};

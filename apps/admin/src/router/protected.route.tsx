import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { JSX } from "react/jsx-dev-runtime";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// إذا user مش logged in : روح login
// إذا logged in : اسمح له يدخل

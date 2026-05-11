import { DashboardLayout } from "@/pages/layout.page";
import { BookingsPage } from "@/pages/bookings.page";
import { HomePage } from "@/pages/home.page";
import { LoginPage } from "@/pages/login.page";
import { ManageVenuesPage } from "@/pages/manage-venues/manage-venues.page";
import { RegisterPage } from "@/pages/register.page";
import { ProtectedRoute } from "@/router/protected.route";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Navigate to="/dashboard" replace />
						</ProtectedRoute>
					}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<DashboardLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<HomePage />} />
					<Route path="venues" element={<ManageVenuesPage />} />
					<Route path="bookings" element={<BookingsPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

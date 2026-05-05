import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/login.page";
import { Dashboard } from "@/pages/layout.page";
import { ProtectedRoute } from "@/router/protected.route";
import { AnalyticsPage } from "@/pages/analytics.page";
import { UsersPage } from "@/pages/users.page";
import { VenuesPage } from "@/pages/venues.page";
import { ReportsPage } from "@/pages/reports.page";
import { BookingsPage } from "@/pages/bookings.page";

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/dashboard" replace />}
				/>

				<Route path="/login" element={<LoginPage />} />

				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				>
					<Route
						index
						element={<Navigate to="analytics" replace />}
					/>
					<Route path="analytics" element={<AnalyticsPage />} />
					<Route path="users" element={<UsersPage />} />
					<Route path="venues" element={<VenuesPage />} />
					<Route path="bookings" element={<BookingsPage />} />
					<Route path="reports" element={<ReportsPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

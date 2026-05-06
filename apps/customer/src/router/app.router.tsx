import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/login.page";
import { CustomerHomePage } from "@/pages/home.page";
import { ProtectedRoute } from "@/router/protected.route";
import { AppInit } from "@/providers/app-init.provider";

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<AppInit>
				<Routes>
					<Route
						path="/"
						element={<Navigate to="/login" replace />}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<CustomerHomePage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AppInit>
		</BrowserRouter>
	);
};

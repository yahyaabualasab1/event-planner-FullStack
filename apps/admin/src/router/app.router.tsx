import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/login.page";
import { Dashboard } from "@/pages/layout.page";
import { ProtectedRoute } from "@/router/protected.route";
import { AnalyticsPage } from "@/pages/analytics.page";
import { UsersPage } from "@/pages/users.page";
import { ClientsPage } from "@/pages/clients.page";
import { CustomersPage } from "@/pages/customers.page";
import { ListingsPage } from "@/pages/listings.page";
import { ReportsPage } from "@/pages/reports.page";
import { MessagesPage } from "@/pages/messages.page";

export const AppRouter = () => {
<<<<<<< EP-24-thread-messages-admin
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
          <Route path="users" element={<UsersPage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
=======
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
					<Route path="clients" element={<ClientsPage />} />
					<Route path="customers" element={<CustomersPage />} />
					<Route path="listings" element={<ListingsPage />} />
					<Route path="reports" element={<ReportsPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
>>>>>>> dev

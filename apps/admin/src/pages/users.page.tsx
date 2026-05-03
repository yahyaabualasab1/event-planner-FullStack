import { useMemo, useState } from "react";
import { useClients } from "@/hooks/use-clients";
import { useCustomers } from "@/hooks/use-customers";

interface PlatformUser {
	_id: string;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
	role: "Client" | "Customer";
	status?: string;
	createdAt?: string;
}

const mockUsers: PlatformUser[] = [
	{
		_id: "u-1",
		fullName: "Sarah Johnson",
		email: "sarah.j@example.com",
		phoneNumber: "+1 555 0190",
		role: "Customer",
		createdAt: "2026-01-15T00:00:00.000Z",
	},
	{
		_id: "u-2",
		fullName: "Mike Chen",
		email: "mike.c@example.com",
		phoneNumber: "+1 555 0102",
		role: "Client",
		status: "approved",
		createdAt: "2026-02-03T00:00:00.000Z",
	},
	{
		_id: "u-3",
		fullName: "Emily Davis",
		email: "emily.d@example.com",
		phoneNumber: "+1 555 0264",
		role: "Customer",
		createdAt: "2026-03-12T00:00:00.000Z",
	},
	{
		_id: "u-4",
		fullName: "Robert Wilson",
		email: "robert.w@example.com",
		phoneNumber: "+1 555 0411",
		role: "Client",
		status: "banded",
		createdAt: "2026-01-28T00:00:00.000Z",
	},
	{
		_id: "u-5",
		fullName: "Lisa Anderson",
		email: "lisa.a@example.com",
		phoneNumber: "+1 555 0357",
		role: "Customer",
		createdAt: "2026-04-05T00:00:00.000Z",
	},
];

const formatDate = (value?: string) => {
	if (!value) return "-";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "-";
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

const getInitials = (name?: string) => {
	if (!name) return "?";
	const parts = name.trim().split(/\s+/);
	const first = parts[0]?.[0] ?? "";
	const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
	return (first + last).toUpperCase();
};

const StatusBadge = ({
	role,
	status,
}: {
	role: PlatformUser["role"];
	status?: string;
}) => {
	if (role === "Customer") {
		return (
			<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500">
				—
			</span>
		);
	}

	const value = (status ?? "waiting-approve").toLowerCase();
	let styles = "bg-gray-100 text-gray-600";
	let label = value;

	if (value === "approved") {
		styles = "bg-green-50 text-green-600";
		label = "Approved";
	} else if (value === "waiting-approve") {
		styles = "bg-yellow-50 text-yellow-700";
		label = "Waiting approval";
	} else if (value === "banded" || value === "banned") {
		styles = "bg-red-50 text-red-600";
		label = "Banned";
	}

	return (
		<span
			className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles}`}
		>
			{label}
		</span>
	);
};

const RoleBadge = ({ role }: { role: PlatformUser["role"] }) => {
	const styles =
		role === "Client"
			? "border-indigo-100 bg-indigo-50 text-indigo-600"
			: "border-purple-100 bg-purple-50 text-purple-600";
	return (
		<span
			className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles}`}
		>
			{role}
		</span>
	);
};

export const UsersPage = () => {
	const clientsQuery = useClients();
	const customersQuery = useCustomers();

	const [search, setSearch] = useState("");
	const [roleFilter, setRoleFilter] = useState<"all" | "Client" | "Customer">(
		"all"
	);
	const [statusFilter, setStatusFilter] = useState<
		"all" | "waiting-approve" | "approved" | "banded"
	>("all");

	const users = useMemo<PlatformUser[]>(() => {
		const clients: PlatformUser[] = (clientsQuery.data ?? []).map(
			(c: any) => ({
				_id: c._id ?? c.id,
				fullName: c.fullName ?? c.name,
				email: c.email,
				phoneNumber: c.phoneNumber,
				role: "Client",
				status: c.status,
				createdAt: c.createdAt,
			})
		);
		const customers: PlatformUser[] = (customersQuery.data ?? []).map(
			(c: any) => ({
				_id: c._id ?? c.id,
				fullName: c.fullName ?? c.name,
				email: c.email,
				phoneNumber: c.phoneNumber,
				role: "Customer",
				createdAt: c.createdAt,
			})
		);
		const combined = [...clients, ...customers];
		return combined.length ? combined : mockUsers;
	}, [clientsQuery.data, customersQuery.data]);

	const filtered = users.filter((u) => {
		const matchesSearch = search
			? `${u.fullName ?? ""} ${u.email ?? ""}`
					.toLowerCase()
					.includes(search.toLowerCase())
			: true;
		const matchesRole =
			roleFilter === "all" ? true : u.role === roleFilter;
		const matchesStatus =
			statusFilter === "all"
				? true
				: u.role === "Client" &&
				  (u.status ?? "").toLowerCase() === statusFilter;
		return matchesSearch && matchesRole && matchesStatus;
	});

	const isLoading = clientsQuery.isLoading || customersQuery.isLoading;
	const isError = clientsQuery.isError && customersQuery.isError;

	return (
		<div className="space-y-6">
			<header>
				<h2 className="text-2xl font-bold text-gray-900">
					Admin Management
				</h2>
				<p className="text-sm text-gray-500">
					Monitor and manage platform users
				</p>
			</header>

			<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
				<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
					<div className="flex-1">
						<div className="relative">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								width="18"
								height="18"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={1.8}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
								/>
							</svg>
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search users by name or email..."
								className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
							/>
						</div>
					</div>
					<select
						value={roleFilter}
						onChange={(e) =>
							setRoleFilter(e.target.value as typeof roleFilter)
						}
						className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white"
					>
						<option value="all">All Roles</option>
						<option value="Client">Client</option>
						<option value="Customer">Customer</option>
					</select>
					<select
						value={statusFilter}
						onChange={(e) =>
							setStatusFilter(
								e.target.value as typeof statusFilter
							)
						}
						className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white"
					>
						<option value="all">All Status</option>
						<option value="approved">Approved</option>
						<option value="waiting-approve">
							Waiting approval
						</option>
						<option value="banded">Banned</option>
					</select>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="text-left text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
								<th className="py-3 pr-4 font-medium">User</th>
								<th className="py-3 pr-4 font-medium">Role</th>
								<th className="py-3 pr-4 font-medium">
									Status
								</th>
								<th className="py-3 pr-4 font-medium">Phone</th>
								<th className="py-3 pr-4 font-medium">
									Join Date
								</th>
								<th className="py-3 pr-4 font-medium">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{isLoading && (
								<tr>
									<td
										colSpan={6}
										className="py-6 text-center text-gray-500"
									>
										Loading users...
									</td>
								</tr>
							)}
							{isError && !isLoading && (
								<tr>
									<td
										colSpan={6}
										className="py-6 text-center text-red-500"
									>
										Failed to load users.
									</td>
								</tr>
							)}
							{!isLoading &&
								filtered.map((user) => (
									<tr
										key={`${user.role}-${user._id}`}
										className="border-b border-gray-50 last:border-0"
									>
										<td className="py-4 pr-4">
											<div className="flex items-center gap-3">
												<div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
													{getInitials(user.fullName)}
												</div>
												<div>
													<p className="font-semibold text-gray-900">
														{user.fullName ??
															"Unknown"}
													</p>
													<p className="text-xs text-gray-500">
														{user.email ?? "-"}
													</p>
												</div>
											</div>
										</td>
										<td className="py-4 pr-4">
											<RoleBadge role={user.role} />
										</td>
										<td className="py-4 pr-4">
											<StatusBadge
												role={user.role}
												status={user.status}
											/>
										</td>
										<td className="py-4 pr-4 text-gray-700">
											{user.phoneNumber ?? "-"}
										</td>
										<td className="py-4 pr-4 text-gray-700">
											{formatDate(user.createdAt)}
										</td>
										<td className="py-4 pr-4">
											<div className="flex items-center gap-3 text-gray-500">
												<button
													type="button"
													className="hover:text-indigo-600"
													aria-label="View"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="18"
														height="18"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth={1.8}
													>
														<circle
															cx="12"
															cy="12"
															r="3"
														/>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
														/>
													</svg>
												</button>
												<button
													type="button"
													className="hover:text-indigo-600"
													aria-label="Edit"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="18"
														height="18"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth={1.8}
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
														/>
													</svg>
												</button>
											</div>
										</td>
									</tr>
								))}
							{!isLoading && filtered.length === 0 && (
								<tr>
									<td
										colSpan={6}
										className="py-6 text-center text-gray-500"
									>
										No users match the current filters.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

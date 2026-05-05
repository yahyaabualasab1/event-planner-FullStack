import { useMemo, useState } from "react";
import { useClients } from "@/hooks/use-clients";

type ClientStatus = "waiting-approve" | "approved" | "banded";

interface Client {
	_id: string;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
	status?: ClientStatus | string;
	createdAt?: string;
}

const mockClients: Client[] = [
	{
		_id: "client-mock-1",
		fullName: "Mike Chen",
		email: "mike.c@example.com",
		phoneNumber: "+1 555 0102",
		status: "approved",
		createdAt: "2026-02-03T00:00:00.000Z",
	},
	{
		_id: "client-mock-2",
		fullName: "Robert Wilson",
		email: "robert.w@example.com",
		phoneNumber: "+1 555 0411",
		status: "banded",
		createdAt: "2026-01-28T00:00:00.000Z",
	},
	{
		_id: "client-mock-3",
		fullName: "Sophia Reed",
		email: "sophia.r@example.com",
		phoneNumber: "+1 555 0822",
		status: "waiting-approve",
		createdAt: "2026-03-21T00:00:00.000Z",
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

const ClientStatusBadge = ({ status }: { status?: string }) => {
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

export const ClientsPage = () => {
	const { data, isLoading, isError } = useClients();
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<
		"all" | "waiting-approve" | "approved" | "banded"
	>("all");

	const clients = useMemo<Client[]>(() => {
		const list = (data ?? []).map((c: any) => ({
			_id: c._id ?? c.id,
			fullName: c.fullName ?? c.name,
			email: c.email,
			phoneNumber: c.phoneNumber,
			status: c.status,
			createdAt: c.createdAt,
		}));
		return list.length ? list : mockClients;
	}, [data]);

	const filtered = clients.filter((c) => {
		const matchesSearch = search
			? `${c.fullName ?? ""} ${c.email ?? ""}`
					.toLowerCase()
					.includes(search.toLowerCase())
			: true;
		const matchesStatus =
			statusFilter === "all"
				? true
				: (c.status ?? "").toLowerCase() === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="space-y-6">
			<header>
				<h2 className="text-2xl font-bold text-gray-900">Clients</h2>
				<p className="text-sm text-gray-500">
					Manage venue owners and clients on the platform
				</p>
			</header>

			<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
				<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
					<div className="flex-1">
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search clients by name or email..."
							className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
						/>
					</div>
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
						<option value="waiting-approve">Waiting approval</option>
						<option value="banded">Banned</option>
					</select>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="text-left text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
								<th className="py-3 pr-4 font-medium">
									Client
								</th>
								<th className="py-3 pr-4 font-medium">Phone</th>
								<th className="py-3 pr-4 font-medium">
									Status
								</th>
								<th className="py-3 pr-4 font-medium">
									Join Date
								</th>
							</tr>
						</thead>
						<tbody>
							{isLoading && (
								<tr>
									<td
										colSpan={4}
										className="py-6 text-center text-gray-500"
									>
										Loading clients...
									</td>
								</tr>
							)}
							{isError && !isLoading && (
								<tr>
									<td
										colSpan={4}
										className="py-6 text-center text-red-500"
									>
										Failed to load clients.
									</td>
								</tr>
							)}
							{!isLoading &&
								filtered.map((client) => (
									<tr
										key={client._id}
										className="border-b border-gray-50 last:border-0"
									>
										<td className="py-4 pr-4">
											<div className="flex items-center gap-3">
												<div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
													{getInitials(
														client.fullName
													)}
												</div>
												<div>
													<p className="font-semibold text-gray-900">
														{client.fullName ??
															"Unknown"}
													</p>
													<p className="text-xs text-gray-500">
														{client.email ?? "-"}
													</p>
												</div>
											</div>
										</td>
										<td className="py-4 pr-4 text-gray-700">
											{client.phoneNumber ?? "-"}
										</td>
										<td className="py-4 pr-4">
											<ClientStatusBadge
												status={client.status}
											/>
										</td>
										<td className="py-4 pr-4 text-gray-700">
											{formatDate(client.createdAt)}
										</td>
									</tr>
								))}
							{!isLoading && filtered.length === 0 && (
								<tr>
									<td
										colSpan={4}
										className="py-6 text-center text-gray-500"
									>
										No clients match the current filters.
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

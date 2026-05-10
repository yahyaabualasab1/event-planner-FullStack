import { useMemo, useState } from "react";
import type { ClientStatusValue } from "@/api/clients.api";
import { useClients } from "@/hooks/use-clients";
import { useUpdateClientStatus } from "@/hooks/use-update-client-status";
import {
	ClientStatusModal,
	type ClientRow,
} from "@/widget/client-status-modal";
import { ClientStatusTrigger } from "@/widget/client-status-trigger";

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

export const ClientsPage = () => {
	const { data, isLoading, isError } = useClients();
	const {
		mutate: updateStatus,
		isPending: isUpdatingStatus,
		isError: statusUpdateError,
		variables: statusUpdateVars,
		reset: resetStatusMutation,
	} = useUpdateClientStatus();
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<
		"all" | ClientStatusValue
	>("all");
	const [statusModalClient, setStatusModalClient] = useState<ClientRow | null>(
		null,
	);

	const clients = useMemo<ClientRow[]>(() => {
		return (data ?? []).map((c: Record<string, unknown>) => ({
			_id: String(c._id ?? c.id ?? ""),
			fullName: (c.fullName ?? c.name) as string | undefined,
			email: c.email as string | undefined,
			phoneNumber: c.phoneNumber as string | undefined,
			status: c.status as string | undefined,
			createdAt: c.createdAt as string | undefined,
		}));
	}, [data]);

	const filtered = clients.filter((c) => {
		const matchesSearch = search
			? `${c.fullName ?? ""} ${c.email ?? ""}`
					.toLowerCase()
					.includes(search.toLowerCase())
			: true;
		const raw = (c.status ?? "waiting-approve").toLowerCase();
		const normalized =
			raw === "banned" || raw === "banded" ? "banned" : raw;
		const matchesStatus =
			statusFilter === "all"
				? true
				: normalized === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const handleApplyClientStatus = (status: ClientStatusValue) => {
		if (!statusModalClient) return;
		resetStatusMutation();
		updateStatus(
			{ id: statusModalClient._id, status },
			{
				onSuccess: () => setStatusModalClient(null),
			},
		);
	};

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
						<option value="banned">Banned</option>
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
								!isError &&
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
											<ClientStatusTrigger
												client={client}
												onOpen={() =>
													setStatusModalClient(client)
												}
												isUpdating={
													isUpdatingStatus &&
													statusUpdateVars?.id ===
														client._id
												}
												updateFailed={
													statusUpdateError &&
													statusUpdateVars?.id ===
														client._id
												}
											/>
										</td>
										<td className="py-4 pr-4 text-gray-700">
											{formatDate(client.createdAt)}
										</td>
									</tr>
								))}
							{!isLoading &&
								!isError &&
								filtered.length === 0 && (
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

			<ClientStatusModal
				client={statusModalClient}
				open={!!statusModalClient}
				onClose={() => setStatusModalClient(null)}
				onApply={handleApplyClientStatus}
				isUpdating={
					isUpdatingStatus &&
					statusUpdateVars?.id === statusModalClient?._id
				}
				updateFailed={
					statusUpdateError &&
					statusUpdateVars?.id === statusModalClient?._id
				}
			/>
		</div>
	);
};

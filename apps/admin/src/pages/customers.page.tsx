import { useMemo, useState } from "react";
import { useCustomers } from "@/hooks/use-customers";

interface Customer {
	_id: string;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
	gender?: "male" | "female" | string;
	dob?: string;
	city?: string;
	createdAt?: string;
}

const mockCustomers: Customer[] = [
	{
		_id: "customer-mock-1",
		fullName: "Sarah Johnson",
		email: "sarah.j@example.com",
		phoneNumber: "+1 555 0190",
		gender: "female",
		dob: "1995-04-12",
		city: "Manhattan",
		createdAt: "2026-01-15T00:00:00.000Z",
	},
	{
		_id: "customer-mock-2",
		fullName: "Emily Davis",
		email: "emily.d@example.com",
		phoneNumber: "+1 555 0264",
		gender: "female",
		dob: "1992-09-30",
		city: "Brooklyn",
		createdAt: "2026-03-12T00:00:00.000Z",
	},
	{
		_id: "customer-mock-3",
		fullName: "Lisa Anderson",
		email: "lisa.a@example.com",
		phoneNumber: "+1 555 0357",
		gender: "female",
		dob: "1988-12-05",
		city: "Queens",
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

const formatGender = (gender?: string) => {
	if (!gender) return "-";
	return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
};

export const CustomersPage = () => {
	const { data, isLoading, isError } = useCustomers();
	const [search, setSearch] = useState("");
	const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">(
		"all"
	);

	const customers = useMemo<Customer[]>(() => {
		const list = (data ?? []).map((c: any) => ({
			_id: c._id ?? c.id,
			fullName: c.fullName ?? c.name,
			email: c.email,
			phoneNumber: c.phoneNumber,
			gender: c.gender,
			dob: c.dob,
			city: c.city,
			createdAt: c.createdAt,
		}));
		return list.length ? list : mockCustomers;
	}, [data]);

	const filtered = customers.filter((c) => {
		const matchesSearch = search
			? `${c.fullName ?? ""} ${c.email ?? ""}`
					.toLowerCase()
					.includes(search.toLowerCase())
			: true;
		const matchesGender =
			genderFilter === "all"
				? true
				: (c.gender ?? "").toLowerCase() === genderFilter;
		return matchesSearch && matchesGender;
	});

	return (
		<div className="space-y-6">
			<header>
				<h2 className="text-2xl font-bold text-gray-900">Customers</h2>
				<p className="text-sm text-gray-500">
					Manage end-users that book venues on the platform
				</p>
			</header>

			<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
				<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
					<div className="flex-1">
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search customers by name or email..."
							className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
						/>
					</div>
					<select
						value={genderFilter}
						onChange={(e) =>
							setGenderFilter(
								e.target.value as typeof genderFilter
							)
						}
						className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white"
					>
						<option value="all">All Genders</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="text-left text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
								<th className="py-3 pr-4 font-medium">
									Customer
								</th>
								<th className="py-3 pr-4 font-medium">Phone</th>
								<th className="py-3 pr-4 font-medium">
									Gender
								</th>
								<th className="py-3 pr-4 font-medium">DOB</th>
								<th className="py-3 pr-4 font-medium">City</th>
								<th className="py-3 pr-4 font-medium">
									Join Date
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
										Loading customers...
									</td>
								</tr>
							)}
							{isError && !isLoading && (
								<tr>
									<td
										colSpan={6}
										className="py-6 text-center text-red-500"
									>
										Failed to load customers.
									</td>
								</tr>
							)}
							{!isLoading &&
								filtered.map((customer) => (
									<tr
										key={customer._id}
										className="border-b border-gray-50 last:border-0"
									>
										<td className="py-4 pr-4">
											<div className="flex items-center gap-3">
												<div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
													{getInitials(
														customer.fullName
													)}
												</div>
												<div>
													<p className="font-semibold text-gray-900">
														{customer.fullName ??
															"Unknown"}
													</p>
													<p className="text-xs text-gray-500">
														{customer.email ?? "-"}
													</p>
												</div>
											</div>
										</td>
										<td className="py-4 pr-4 text-gray-700">
											{customer.phoneNumber ?? "-"}
										</td>
										<td className="py-4 pr-4 text-gray-700">
											{formatGender(customer.gender)}
										</td>
										<td className="py-4 pr-4 text-gray-700">
											{formatDate(customer.dob)}
										</td>
										<td className="py-4 pr-4 text-gray-700">
											{customer.city ?? "-"}
										</td>
										<td className="py-4 pr-4 text-gray-700">
											{formatDate(customer.createdAt)}
										</td>
									</tr>
								))}
							{!isLoading && filtered.length === 0 && (
								<tr>
									<td
										colSpan={6}
										className="py-6 text-center text-gray-500"
									>
										No customers match the current filters.
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

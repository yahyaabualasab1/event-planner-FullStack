import { useAuthStore } from "@/store/auth.store";

export const CustomerHomePage = () => {
	const customer = useAuthStore((s) => s.customer);
	const logout = useAuthStore((s) => s.logout);

	return (
		<div className="min-h-dvh bg-[#f5f3ff] px-6 py-12">
			<div className="mx-auto max-w-3xl rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-white/70 backdrop-blur">
				<h1 className="text-2xl font-semibold text-slate-900">
					Welcome
				</h1>
				<p className="mt-2 text-slate-500">
					{customer?.email ?? "Customer dashboard"}
				</p>
				<button
					onClick={logout}
					className="mt-6 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:border-slate-300 hover:text-slate-800"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

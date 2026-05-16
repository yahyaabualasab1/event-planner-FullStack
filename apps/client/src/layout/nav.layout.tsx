import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const NavLayout = ({
	onSelect,
}: {
	onSelect: (label: string) => void;
}) => {
	const { t } = useTranslation();

	return (
		<aside className="flex flex-col w-64 min-h-screen bg-white px-4 py-6 border-r border-gray-100">
			<div className="mb-6 px-2">
				<h1 className="text-2xl font-bold text-indigo-600">Eventat</h1>
				<p className="text-sm text-gray-400 mt-0.5">{t("layout.portalSubtitle")}</p>
			</div>

			<hr className="border-gray-200 mb-6" />

			<nav className="flex flex-col gap-1">
				<NavLink to="/dashboard" end onClick={() => onSelect(t("layout.dashboard"))}>
					{({ isActive }) => (
						<div
							className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
								isActive
									? "bg-indigo-50 text-indigo-600"
									: "text-gray-700 hover:bg-gray-100"
							}`}
						>
							<span className={isActive ? "text-indigo-600" : "text-gray-500"}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="22"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={1.8}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 13h4v8H3v-8zm6-5h4v13H9V8zm6-4h4v17h-4V4z"
									/>
								</svg>
							</span>
							{t("layout.dashboard")}
						</div>
					)}
				</NavLink>

				<NavLink
					to="/dashboard/bookings"
					onClick={() => onSelect(t("layout.bookings"))}
				>
					{({ isActive }) => (
						<div
							className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
								isActive
									? "bg-indigo-50 text-indigo-600"
									: "text-gray-700 hover:bg-gray-100"
							}`}
						>
							<span className={isActive ? "text-indigo-600" : "text-gray-500"}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="22"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={1.8}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
									/>
								</svg>
							</span>
							{t("layout.bookings")}
						</div>
					)}
				</NavLink>
			</nav>
		</aside>
	);
};

import { NavLink } from "react-router-dom";

const navItems = [
	{
		label: "Dashboard",
		to: "/dashboard",
		icon: (
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
		),
	},
];

export const NavLayout = ({
	onSelect,
}: {
	onSelect: (label: string) => void;
}) => {
	return (
		<aside className="flex flex-col w-64 min-h-screen bg-white px-4 py-6">
			<div className="mb-6 px-2">
				<h1 className="text-2xl font-bold text-indigo-600">Eventat</h1>
				<p className="text-sm text-gray-400 mt-0.5">Customer Portal</p>
			</div>

			<hr className="border-gray-200 mb-6" />

			<nav className="flex flex-col gap-1">
				{navItems.map(({ label, to, icon }) => (
					<NavLink key={to} to={to} onClick={() => onSelect(label)}>
						{({ isActive }) => (
							<div
								className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
									isActive
										? "bg-indigo-50 text-indigo-600"
										: "text-gray-700 hover:bg-gray-100"
								}`}
							>
								<span
									className={
										isActive
											? "text-indigo-600"
											: "text-gray-500"
									}
								>
									{icon}
								</span>
								{label}
							</div>
						)}
					</NavLink>
				))}
			</nav>
		</aside>
	);
};

import type { ManageThread } from "@/api/manage-messages.api";
import { useTranslation } from "react-i18next";

type ThreadListProps = {
	threads: ManageThread[];
	selectedThreadId: string | null;
	onSelect: (thread: ManageThread) => void;
};

const getInitials = (name: string) => {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
};

const formatDate = (dateStr?: string) => {
	if (!dateStr) return "";
	const date = new Date(dateStr);
	const now = new Date();
	const diffDays = Math.floor(
		(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
	);
	if (diffDays === 0)
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	if (diffDays === 1) return "1d ago";
	return `${diffDays}d ago`;
};

export const ThreadList = ({
	threads,
	selectedThreadId,
	onSelect,
}: ThreadListProps) => {
	const { t } = useTranslation();

	if (threads.length === 0) {
		return (
			<div className="flex h-full items-center justify-center p-6 text-center text-sm text-gray-500">
				<p>{t("manageMessages.emptyThreads")}</p>
			</div>
		);
	}

	return (
		<ul className="divide-y divide-gray-100">
			{threads.map((thread) => {
				const isSelected = thread._id === selectedThreadId;
				const name =
					thread.senderId?.fullName ?? t("manageMessages.unknownCustomer");
				const initials = getInitials(name);

				return (
					<li key={thread._id}>
						<button
							type="button"
							onClick={() => onSelect(thread)}
							className={`flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-200 ${
								isSelected ? "bg-indigo-50" : ""
							}`}
						>
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
								{initials}
							</div>
							<div className="min-w-0 flex-1">
								<div className="flex items-center justify-between">
									<p
										className={`truncate text-sm font-semibold ${
											isSelected ? "text-indigo-700" : "text-gray-900"
										}`}
									>
										{name}
									</p>
									<span className="ml-2 shrink-0 text-xs text-gray-400">
										{formatDate(thread.updatedAt ?? thread.createdAt)}
									</span>
								</div>
								<p className="mt-0.5 truncate text-xs text-gray-500">
									{thread.senderId?.email ?? ""}
								</p>
							</div>
						</button>
					</li>
				);
			})}
		</ul>
	);
};

import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export const BookingsPage = () => {
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const venueId = searchParams.get("venueId");

	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
			<h2 className="text-2xl font-bold text-gray-950">
				{t("bookings.title")}
			</h2>
			<p className="mt-3 text-gray-600">
				{venueId
					? t("bookings.showingForVenue", { venueId })
					: t("bookings.selectVenue")}
			</p>
		</div>
	);
};

import { useTranslation } from "react-i18next";

export const ReportsPage = () => {
	const { t } = useTranslation();

	return (
		<div className="space-y-2">
			<h2 className="text-2xl font-bold text-gray-900">{t("reportsPage.title")}</h2>
			<p className="text-sm text-gray-500">{t("reportsPage.subtitle")}</p>
		</div>
	);
};

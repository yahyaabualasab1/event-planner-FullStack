import React from "react";
import { useTranslation } from "react-i18next";
import { ReportStatsCard } from "@/widget/reports/ReportStatsCard";
import { ReportsList } from "@/widget/reports/ReportsList";

export const ReportsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{t("pages.reportsPage.title")}</h1>
      <h6 className="text-gray-600">{t("pages.reportsPage.subtitle")}</h6>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <ReportStatsCard title={t("widgets.reportStatsCard.pending")} value="12" icon="🕐" />
        <ReportStatsCard title={t("widgets.reportStatsCard.reviewing")} value="5" icon="💬" />
        <ReportStatsCard title={t("widgets.reportStatsCard.resolved")} value="142" icon="✅" />
        <ReportStatsCard title={t("widgets.reportStatsCard.highPriority")} value="3" icon="🚩" />
      </div>

      {/* Reports */}
      <ReportsList />
    </div>
  );
};

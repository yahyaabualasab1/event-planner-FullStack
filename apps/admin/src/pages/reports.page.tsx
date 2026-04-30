import { ReportStatsCard } from "@/widget/reports/ReportStatsCard";
import { ReportsList } from "@/widget/reports/ReportsList";

export const ReportsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>
      <h6 className="text-gray-600">Monitor and resolve platform issues</h6>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <ReportStatsCard title="Pending" value="12" icon="🕐" />
        <ReportStatsCard title="Reviewing" value="5" icon="💬" />
        <ReportStatsCard title="Resolved" value="142" icon="✅" />
        <ReportStatsCard title="High Priority" value="3" icon="🚩" />
      </div>

      {/* Reports */}
      <ReportsList />
    </div>
  );
};

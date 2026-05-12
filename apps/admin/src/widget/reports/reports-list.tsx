import { ReportItem } from "./ReportItem";

export const ReportsList = () => {
  const mockReports = [
    {
      id: "1",
      title: "Payment Gateway Error",
      description: "Users unable to complete payments due to timeout",
      status: "Pending",
      priority: "High",
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      title: "Venue Images Not Loading",
      description: "Some venue images are broken on mobile devices",
      status: "Reviewing",
      priority: "Medium",
      createdAt: "5 hours ago",
    },
    {
      id: "3",
      title: "Email Notifications Delay",
      description: "Booking confirmation emails delayed by 10-15 minutes",
      status: "Resolved",
      priority: "Low",
      createdAt: "1 day ago",
    },
  ];

  return (
    <div className="space-y-4">
      {mockReports.map((report) => (
        <ReportItem key={report.id} {...report} />
      ))}
    </div>
  );
};

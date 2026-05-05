import { useTranslation } from "react-i18next";
import BookingTrendsChart from "@/widget/analytics/booking-Trends-Chart";
import{ StatsCard } from "../widget/analytics/stats-Card";
import { RevenueGrowthChart } from "@/widget/analytics/revenue-Growth-Chart";
import { VenueDistributionChart } from "@/widget/analytics/venue-Distribution-Chart";
import { UserRegistrationChart } from "@/widget/analytics/user-Registration-Chart";
 
export const AnalyticsPage = () => {
  const { t } = useTranslation();

 return ( 
     <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">{t("pages.analytics.title")}</h1>
      <h6 className="text-gray-600">{t("pages.analytics.subtitle")}</h6>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard  title={t("pages.analytics.stats.totalUsers")} value="1,247" growth="+12.5%" />
        <StatsCard title={t("pages.analytics.stats.activeVenues")} value="342" growth="+8.2%" />
        <StatsCard title={t("pages.analytics.stats.totalBookings")} value="5,689" growth="+23.1%" />
        <StatsCard title={t("pages.analytics.stats.revenue")} value="$284K" growth="+18.7%" />
      </div> 
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BookingTrendsChart/>
      {/* RevenueGrowthChart */}
      <RevenueGrowthChart/>
      {/* VenueDistributionChart */}
        <VenueDistributionChart/>
      {/* UserRegistrationChart */}
        <UserRegistrationChart/>
      </div>
      </div>
  );
}

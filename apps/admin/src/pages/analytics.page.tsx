import BookingTrendsChart from "@/widget/analytics/bookingTrendsChart";
import{ StatsCard } from "../widget/analytics/StatsCard";
import { RevenueGrowthChart } from "@/widget/analytics/revenueGrowthChart";
import { VenueDistributionChart } from "@/widget/analytics/venueDistributionChart";
import { UserRegistrationChart } from "@/widget/analytics/userRegistrationChart";
export const AnalyticsPage = () => {
 return ( 
     <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      <h6 className="text-gray-600">Platform-wide metrics and insights</h6>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard  title="Total Users" value="1,247" growth="+12.5%" />
        <StatsCard title="Active Venues" value="342" growth="+8.2%" />
        <StatsCard title="Total Bookings" value="5,689" growth="+23.1%" />
        <StatsCard title="Revenue" value="$284K" growth="+18.7%" />
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

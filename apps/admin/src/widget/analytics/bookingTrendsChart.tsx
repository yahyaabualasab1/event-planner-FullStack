import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 500 },
  { name: "Mar", value: 470 },
  { name: "Apr", value: 620 },
  { name: "May", value: 580 },
  { name: "Jun", value: 700 },
];

const BookingTrendsChart = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">Booking Trends</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingTrendsChart;
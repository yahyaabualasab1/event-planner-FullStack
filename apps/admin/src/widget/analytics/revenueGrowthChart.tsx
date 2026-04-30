import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", value: 45000 },
  { name: "Feb", value: 52000 },
  { name: "Mar", value: 48000 },
  { name: "Apr", value: 67000 },
  { name: "May", value: 61000 },
  { name: "Jun", value: 78000 },
];

const RevenueGrowthChart = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">Revenue Growth</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { RevenueGrowthChart };
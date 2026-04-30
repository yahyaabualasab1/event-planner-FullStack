import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
const data = [
  { name: "New York", value: 42 },
  { name: "Los Angeles", value: 29 },
  { name: "Chicago", value: 15 },
  { name: "Miami", value: 14 },
];

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"];

// 🔥 function لتحديد مكان النص خارج الدائرة
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
  fill,
}: any) => {
  const RADIAN = Math.PI / 180;

  const radius = outerRadius + 25; // تتحكم ببعد النص
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
    fill={fill} 
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "12px" }}
    >
      {name} {(percent * 100).toFixed(0)}%
    </text>
  );
};

const VenueDistributionChart = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">
        Venue Distribution by Location
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export { VenueDistributionChart };
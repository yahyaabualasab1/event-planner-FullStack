import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Week 1", users: 40, venues: 18 },
  { name: "Week 2", users: 58, venues: 22 },
  { name: "Week 3", users: 46, venues: 15 },
  { name: "Week 4", users: 66, venues: 28 },
];

const UserRegistrationChart = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">User Registration Trends</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" />
          <Line type="monotone" dataKey="venues" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { UserRegistrationChart };
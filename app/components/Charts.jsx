"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const trendData = [
  { day: "Sep 8", value: 200 },
  { day: "Sep 9", value: 450 },
  { day: "Sep 10", value: 320 },
  { day: "Sep 11", value: 480 },
  { day: "Sep 12", value: 300 },
  { day: "Sep 13", value: 280 },
  { day: "Sep 14", value: 520 },
];

export default function Charts({ title, secondTitle }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inventory Trend */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-4">{title}</h3>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Circle Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col">
        <h3 className="font-semibold mb-4 text-left">
          {secondTitle}
        </h3>

        <div className="flex justify-center items-center">
          <div className="w-40 h-40 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
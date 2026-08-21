import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import mockDataRaw from "../data/mockData.json";
import type { MockData } from "../types/Analytics";

const data = mockDataRaw as MockData;

export const RevenueLineChart: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 h-80 transition-colors duration-200">
      <h3 className="text-base sm:text-lg font-bold mb-4 text-black dark:text-gray-100">
        Revenue Performance
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data.revenue}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#f3f4f6" fontSize={12} />
          <YAxis stroke="#f3f4f6" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#374151",
              color: "#f3f4f6",
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CategoryBarChart: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 h-80 transition-colors duration-200">
      <h3 className="text-base sm:text-lg font-bold mb-4 text-black dark:text-gray-100">
        Sales by Category
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data.salesByCategory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="category" stroke="#f3f4f6" fontSize={12} />
          <YAxis stroke="#f3f4f6" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#374151",
              color: "#f3f4f6",
            }}
          />
          <Bar dataKey="sales" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

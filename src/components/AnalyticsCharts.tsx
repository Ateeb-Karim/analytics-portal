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
import { useTheme } from "../context/themeContext";
import mockDataRaw from "../data/mockData.json";
import type { MockData } from "../types/Analytics";

const data = mockDataRaw as MockData;

export const RevenueLineChart: React.FC = () => {
  const { isDarkMode } = useTheme();

  // Light: Black text & light grid | Dark: Light text & dark gray grid
  const textColor = isDarkMode ? "#f3f4f6" : "#000000";
  const gridColor = isDarkMode ? "#374151" : "#e2e8f0";
  const lineColor = isDarkMode ? "#2563eb" : "#38bdf8"; // Bold blue for dark, light blue for light

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 h-80 transition-colors duration-200">
      <h3 className="text-base sm:text-lg font-bold mb-4 text-black dark:text-gray-100">
        Revenue Performance
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data.revenue}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="date" stroke={textColor} fontSize={12} />
          <YAxis stroke={textColor} fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              borderColor: isDarkMode ? "#374151" : "#cbd5e1",
              color: isDarkMode ? "#f3f4f6" : "#000000",
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CategoryBarChart: React.FC = () => {
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? "#f3f4f6" : "#000000";
  const gridColor = isDarkMode ? "#374151" : "#e2e8f0";
  const barColor = isDarkMode ? "#1d4ed8" : "#0ea5e9"; // Bold blue for dark, light blue for light

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 h-80 transition-colors duration-200">
      <h3 className="text-base sm:text-lg font-bold mb-4 text-black dark:text-gray-100">
        Sales by Category
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data.salesByCategory}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="category" stroke={textColor} fontSize={12} />
          <YAxis stroke={textColor} fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              borderColor: isDarkMode ? "#374151" : "#cbd5e1",
              color: isDarkMode ? "#f3f4f6" : "#000000",
            }}
          />
          <Bar dataKey="sales" fill={barColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

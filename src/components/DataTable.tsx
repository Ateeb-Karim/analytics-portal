import React, { useState, useMemo, type ChangeEvent } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import mockDataRaw from "../data/mockData.json";
import type {
  MockData,
  Transaction,
  SortKey,
  SortConfig,
  SortDirection,
} from "../types/Analytics";

const data = mockDataRaw as MockData;
const TABLE_COLUMNS: SortKey[] = [
  "customer",
  "status",
  "region",
  "revenue",
  "date",
];

export const DataTable: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    const result = data.transactions.filter(
      (item: Transaction) =>
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.region.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase()),
    );

    if (sortConfig.key) {
      const key = sortConfig.key;
      result.sort((a: Transaction, b: Transaction) => {
        if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [search, sortConfig]);

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-base sm:text-lg font-bold text-black dark:text-gray-100">
          Recent Transactions
        </h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-sky-500 dark:text-blue-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 dark:border-gray-600 rounded-lg bg-sky-50 dark:bg-gray-700 text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-blue-600 transition-colors placeholder:text-slate-500 dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full text-left text-sm text-black dark:text-gray-200">
            <thead className="bg-sky-100 dark:bg-gray-700 text-black dark:text-gray-100 uppercase text-xs">
              <tr>
                {TABLE_COLUMNS.map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="p-3 sm:p-4 cursor-pointer hover:bg-sky-200 dark:hover:bg-gray-650 transition-colors"
                  >
                    <div className="flex items-center gap-1 font-bold">
                      {col}{" "}
                      <ArrowUpDown className="h-3 w-3 text-sky-600 dark:text-blue-400" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
              {filteredAndSortedData.map((row: Transaction) => (
                <tr
                  key={row.id}
                  className="hover:bg-sky-50/50 dark:hover:bg-gray-750 transition-colors"
                >
                  <td className="p-3 sm:p-4 font-semibold text-black dark:text-gray-100 whitespace-nowrap">
                    {row.customer}
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        row.status === "Completed"
                          ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-400"
                          : row.status === "Pending"
                            ? "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-400"
                            : "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-400"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap font-medium text-black dark:text-gray-200">
                    {row.region}
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap font-bold text-black dark:text-gray-100">
                    ${row.revenue.toFixed(2)}
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap font-medium text-black dark:text-gray-200">
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

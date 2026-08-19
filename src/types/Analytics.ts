export interface RevenueMetric {
  date: string;
  amount: number;
}

export interface CategorySalesMetric {
  category: string;
  sales: number;
}

export interface Transaction {
  id: number;
  customer: string;
  status: "Completed" | "Pending" | "Failed";
  region: string;
  revenue: number;
  date: string;
}

export interface MockData {
  revenue: RevenueMetric[];
  salesByCategory: CategorySalesMetric[];
  transactions: Transaction[];
}

export type SortKey = keyof Transaction;
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  key: SortKey | null;
  direction: SortDirection;
}

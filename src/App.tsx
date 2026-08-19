import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Sun, Moon, LayoutDashboard, BarChart2, Menu, X } from "lucide-react";
import { ThemeProvider, useTheme } from "./context/themeContext";
import {
  RevenueLineChart,
  CategoryBarChart,
} from "./components/AnalyticsCharts";
import { DataTable } from "./components/DataTable";

interface NavigationProps {
  onClick?: () => void;
}

const NavigationLinks: React.FC<NavigationProps> = ({ onClick }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="space-y-2">
      <Link
        to="/"
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
          isActive("/")
            ? "bg-sky-200 text-black dark:bg-blue-600 dark:text-white" // Light blue button vs Bold blue button
            : "text-black hover:bg-sky-100 dark:text-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        <LayoutDashboard className="h-4 w-4" /> Overview
      </Link>
      <Link
        to="/metrics"
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
          isActive("/metrics")
            ? "bg-sky-200 text-black dark:bg-blue-600 dark:text-white" // Light blue button vs Bold blue button
            : "text-black hover:bg-sky-100 dark:text-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        <BarChart2 className="h-4 w-4" /> Detailed Metrics
      </Link>
    </nav>
  );
};

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 flex justify-between items-center px-4 sm:px-6 py-4 bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-black dark:text-gray-200 bg-sky-100 dark:bg-blue-600 hover:bg-sky-200 dark:hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-black dark:text-white">
          Analytics Portal
        </h1>
      </div>

      {/* Action Button: Light Blue in light mode, Bold Blue in dark mode */}
      <button
        onClick={toggleTheme}
        className="p-2.5 rounded-lg font-bold bg-sky-200 hover:bg-sky-300 text-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white transition-colors flex items-center gap-2"
        aria-label="Toggle Theme"
      >
        {isDarkMode ? (
          <>
            <Sun className="h-5 w-5 text-amber-300" />
            <span className="hidden sm:inline text-sm">Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-5 w-5 text-black" />
            <span className="hidden sm:inline text-sm">Dark Mode</span>
          </>
        )}
      </button>
    </header>
  );
};

const OverviewPage: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RevenueLineChart />
      <CategoryBarChart />
    </div>
    <DataTable />
  </div>
);

const MetricsPage: React.FC = () => (
  <div className="space-y-6">
    <CategoryBarChart />
  </div>
);

export default function App(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex text-black dark:text-gray-100 transition-colors duration-200">
          <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 p-4 shrink-0 transition-colors duration-200">
            <div className="mb-6 px-3">
              <span className="text-xs font-bold text-sky-700 dark:text-blue-400 uppercase tracking-wider">
                Enterprise Admin
              </span>
            </div>
            <NavigationLinks />
          </aside>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-black/60"
                onClick={() => setMobileMenuOpen(false)}
              />
              <aside className="relative w-64 bg-white dark:bg-gray-800 p-4 flex flex-col z-10 transition-colors duration-200">
                <div className="flex justify-between items-center mb-6 px-3">
                  <span className="text-xs font-bold text-sky-700 dark:text-blue-400 uppercase tracking-wider">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-black dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <NavigationLinks onClick={() => setMobileMenuOpen(false)} />
              </aside>
            </div>
          )}
          <div className="flex-1 flex flex-col min-w-0">
            <Header onMenuClick={() => setMobileMenuOpen(true)} />
            <main className="p-4 sm:p-6 lg:p-8 flex-1">
              <Routes>
                <Route path="/" element={<OverviewPage />} />
                <Route path="/metrics" element={<MetricsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

"use client";
import DashboardCharts from "../Components/DashbaordChart";
import DashboardCards from "../Components/DashboardCard";
import DashboardTable from "../Components/DashboardTable";
export default function Dashboard() {
  return (
    <div className="p-4 mt-4 sm:p-3 md:p-4 max-w-screen-2xl mx-auto">
      <h1 className="text-sm sm:text-xl font-bold mb-2">WELCOME</h1>    
      <DashboardCards />
      <div className="mt-6">
        <DashboardCharts />
      </div>
        <div className="mt-6">
        <DashboardTable />
      </div>
    </div>
  );
}

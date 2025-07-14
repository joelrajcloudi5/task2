"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  ArcElement,
} from "chart.js";
import { FiChevronDown } from "react-icons/fi";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  ArcElement
);

export default function DashboardCharts() {
  const [progress, setProgress] = useState(0);
  const targetPercentage = 75;


  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      if (start < targetPercentage) {
        setProgress((prev) => (prev + 1 > targetPercentage ? targetPercentage : prev + 1));
        start++;
      } else {
        clearInterval(interval);
      }
    }, 15); 
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Revenue",
        data: [80, 120, 60, 100, 90, 140, 70, 130, 60, 150, 110, 80],
        fill: true,
        borderColor: "#6B21A8",
        backgroundColor: "rgba(107, 33, 168, 0.1)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}K`,
        },
        grid: { color: "#eee" },
      },
      x: {
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-4 p-2">
      
      <div className="bg-white rounded-md shadow p-4 col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-semibold">Revenue Analytics</h2>
          <div className="flex space-x-2 text-sm font-medium">
            <button className="px-3 py-1 rounded-full bg-gray-100">Weekly</button>
            <button className="px-3 py-1 rounded-full bg-purple-700 text-white">Monthly</button>
          </div>
        </div>
        <Line data={data} options={options} height={160} />
      </div>

     
      <div className="bg-white rounded-md shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-md font-semibold">Monthly Target</h2>
            <p className="text-xs text-gray-500">From All Courses</p>
          </div>
          <button className="flex items-center text-sm px-2 py-1 rounded bg-gray-100">
            Monthly <FiChevronDown className="ml-1" />
          </button>
        </div>

    
        <div className="relative flex items-center justify-center my-6">
          <svg width="140" height="140">
            <circle
              cx="70"
              cy="70"
              r="60"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="70"
              cy="70"
              r="60"
              stroke="#22C55E"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${progress * 3.77}, 999`}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{ transition: "stroke-dasharray 0.3s ease" }}
            />
          </svg>
          <div className="absolute text-center">
            <h3 className="text-2xl font-bold">{progress}%</h3>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <div>
            <p>Target Amount</p>
            <p className="text-orange-500 font-bold">₹80,000</p>
          </div>
          <div>
            <p>Total Income</p>
            <p className="text-green-600 font-bold">₹50,000</p>
          </div>
        </div>

        <p className="text-green-600 text-xs mt-4 text-center">
          Profit <span className="font-semibold">32%</span> more than last month
        </p>
      </div>
    </div>
  );
}

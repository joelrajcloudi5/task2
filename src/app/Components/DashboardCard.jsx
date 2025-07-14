"use client";
import { FiCreditCard, FiUser, FiBookOpen, FiFileText, FiArrowRight } from "react-icons/fi";
import CountUp from "react-countup";

export default function DashboardCards() {
  const cards = [
    {
      title: "Total Incomes",
      value: 10000, 
      prefix: "₹",
      suffix: "",
      change: "+35% vs All Month",
      icon: <FiCreditCard size={24} />,
      bg: "bg-green-500",
    },
    {
      title: "Active Students",
      value: 22,
      prefix: "",
      suffix: "",
      change: "+35% vs Last Month",
      icon: <FiUser size={24} />,
      bg: "bg-orange-500",
    },
    {
      title: "Total Leads",
      value: 22,
      prefix: "",
      suffix: "",
      change: "+35% vs Last Month",
      icon: <FiFileText size={24} />,
      bg: "bg-blue-500",
    },
    {
      title: "No Of Courses",
      value: 5,
      prefix: "",
      suffix: "",
      change: "+35% vs Last Month",
      icon: <FiBookOpen size={24} />,
      bg: "bg-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-xl ${card.bg} text-white p-4 flex flex-col justify-between h-32 pl-12 relative`}
        >
          {/* Top */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">{card.title}</p>
              <h2 className="text-xl font-bold mt-1">
                <CountUp
                  end={card.value}
                  duration={1.5}
                  prefix={card.prefix}
                  suffix={card.suffix}
                  separator=","
                />
              </h2>
            </div>
            <div>{card.icon}</div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-auto text-xs font-light">
            <span>{card.change}</span>
            <FiArrowRight size={14} />
          </div>
        </div>
      ))}
    </div>
  );
}

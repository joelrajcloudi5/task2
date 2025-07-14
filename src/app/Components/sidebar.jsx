"use client";
import { useState } from "react";
import { FiHome, FiUser, FiBook, FiMenu } from "react-icons/fi";
import Image from "next/image";
export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Create-Trainer", icon: <FiUser />, path: "/dashboard/create-trainer" },
    { name: "view trainer", icon: <FiBook />, path: "/dashboard/TrainerTable" },
  ];

  return (
    <div className={`h-[1200px] fixed ${open ? "w-52" : "w-16"} bg-[#4A154B] text-white transition-all duration-300 flex flex-col`}>
     
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <Image src="/logo.png" alt="alt" width={100} height={100} href="/login" className={`text-xl  ml-8 font-bold ${!open && "hidden"}`}/>
        <button onClick={() => setOpen(!open)} className="text-xl">
          <FiMenu />
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item, index) => (
          <a
            href={item.path}
            key={index}
            className="flex items-center space-x-3 hover:bg-gray-700 px-3 py-2 rounded-md transition"
          >
            <span className="text-lg">{item.icon}</span>
            <span className={`${!open && "hidden"} text-sm`}>{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

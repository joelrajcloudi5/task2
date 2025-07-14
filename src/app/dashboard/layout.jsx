"use client";
import Sidebar from "@/app/Components/sidebar";
import NavBar from "@/app/Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RootLayout({ children }) {
   return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen ml-48">
        <NavBar />
        <main className="p-2 sm:p-2 md:p-2 max-w-screen-xl mx-auto w-full">
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </main>
      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function TrainerTable() {
  const [trainers, setTrainers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get("/api/create-trainer");
        console.log("Fetched trainers:", res.data); // 👈 Debug
        const data = res.data?.trainers || [];
        setTrainers(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to fetch trainers");
      }
    };

    fetchTrainers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this trainer?")) return;
    try {
      await axios.delete(`/api/create-trainer/${id}`);
      setTrainers((prev) => prev.filter((t) => t._id !== id));
      toast.success("Trainer deleted successfully!");
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Failed to delete trainer.");
    }
  };

  const handleEdit = (id) => {
    router.push(`/create-trainer?id=${id}`);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-14">
      <h2 className="text-lg font-semibold mb-4 text-purple-800">Trainer List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-purple-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3">Trainer Name</th>
              <th className="px-4 py-3">Designation</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No trainers found.
                </td>
              </tr>
            ) : (
              trainers.map((trainer) => (
                <tr key={trainer._id} className="border-b">
                  <td className="px-4 py-2">
                    {trainer.basicInfo?.firstName} {trainer.basicInfo?.lastName}
                  </td>
                  <td className="px-4 py-2">
                    {trainer.professionalDetails?.designation || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {trainer.professionalDetails?.course || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {trainer.professionalDetails?.experience || "N/A"}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(trainer._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trainer._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

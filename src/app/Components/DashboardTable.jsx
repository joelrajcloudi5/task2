"use client";
import { FiMoreVertical } from "react-icons/fi";

export default function PaymentCollectionTable() {
  const students = [
    {
      name: "Parthiban",
      number: "9234567898",
      course: "UI/UX Design",
      hours: "80 / 120",
      amount: "6,000 / 12,000",
    },
    {
      name: "Parthiban",
      number: "9234567898",
      course: "UI/UX Design",
      hours: "80 / 120",
      amount: "6,000 / 12,000",
    },
    {
      name: "Parthiban",
      number: "9234567898",
      course: "UI/UX Design",
      hours: "80 / 120",
      amount: "6,000 / 12,000",
    },
    {
      name: "Parthiban",
      number: "9234567898",
      course: "UI/UX Design",
      hours: "80 / 120",
      amount: "6,000 / 12,000",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
      <div className="flex justify-between items-center px-4 py-3 bg-gray-100 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Payment Collection</h2>
        <a href="#" className="text-sm text-gray-600 hover:underline">
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-[#F6F3F6] text-black text-sm uppercase">
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Number</th>
              <th className="p-3">Course</th>
              <th className="p-3">Hrs Completion</th>
              <th className="p-3">Amount Due</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-800">
            {students.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 font-medium text-gray-800">{student.name}</td>
                <td className="p-3">{student.number}</td>
                <td className="p-3">{student.course}</td>
                <td className="p-3 text-purple-700 font-semibold">{student.hours}</td>
                <td className="p-3 text-purple-700 font-semibold">{student.amount}</td>
                <td className="p-3 text-right">
                  <FiMoreVertical className="text-gray-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

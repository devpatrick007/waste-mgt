"use client";

import { useState } from 'react';
import { X } from "lucide-react";


const inputs = [
  {
    name: "Kwame",
    type: "PET",
    weight: 420,
    date: "2025-09-11",
    status: "Outstanding",
  },
  {
    name: "Ama",
    type: "Sachet",
    weight: 120,
    date: "2025-09-11",
    status: "Paid",
  },
  {
    name: "Yaw",
    type: "HDPE",
    weight: 80,
    date: "2025-09-11",
    status: "Paid",
  },
  {
    name: "Akosua",
    type: "PET",
    weight: 220,
    date: "2025-09-11",
    status: "Paid",
  },
  {
    name: "Kojo",
    type: "Sachet",
    weight: 65,
    date: "2025-09-11",
    status: "Rejected",
  },
];

const others = [
  {
    name: "Kwame",
    type: "PET",
    weight: 420,
    date: "2025-09-11",
    status: "Outstanding",
  },
  {
    name: "Ama",
    type: "Sachet",
    weight: 120,
    date: "2025-09-11",
    status: "Paid",
  },
  {
    name: "Yaw",
    type: "HDPE",
    weight: 80,
    date: "2025-09-11",
    status: "Paid",
  },
  {
    name: "Peter",
    type: "PET",
    weight: 420,
    date: "2025-09-11",
    status: "Outstanding",
  },

];

const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Outstanding: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function BigTable() {
  const [isNewRecordOpen, setNewRecordIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
        <div className="bg-white rounded-2xl shadow p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Latest Inputs
            </h2>

            <button onClick={() => setNewRecordIsOpen(true)} className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition">
              + Record Input
            </button>

            {/* Modal */}
            {isNewRecordOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setNewRecordIsOpen(false)}
                ></div>

                {/* Modal Content */}
                <div className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-xl p-6 z-50 animate-fadeIn">

                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Record New Input
                    </h2>
                    <button
                      onClick={() => setNewRecordIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ×
                    </button>
                  </div>

                  {/* Body */}
                  <div className="text-gray-600 mb-6">
                    <NewRecordModalContent />
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setNewRecordIsOpen(false)}
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setNewRecordIsOpen(false)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Record Input
                    </button>
                  </div>

                </div>
              </div>
            )}





          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Collector</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Weight (kg)</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {inputs.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-4">{item.name}</td>
                    <td className="py-4">{item.type}</td>
                    <td className="py-4">{item.weight}</td>
                    <td className="py-4">{item.date}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View (Cards) */}
          <div className="md:hidden space-y-4">
            {inputs.map((item, index) => (
              <div key={index} className="border rounded-xl p-4 shadow-sm">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{item.name}</span>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Type:</span> {item.type}
                  </p>
                  <p>
                    <span className="font-medium">Weight:</span> {item.weight}{" "}
                    kg
                  </p>
                  <p>
                    <span className="font-medium">Date:</span> {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Link */}
          <div className="mt-6 text-right">
            <button className="text-green-600 cursor-pointer hover:underline text-sm font-medium">
              View all inputs →
            </button>
          </div>
        </div>
      </div>

      {/* Second Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Latest Payments
          </h2>

          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition w-full sm:w-auto">
            Make Payment
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-sm text-left">
            {/* <thead className="bg-gray-50">
              <tr className="text-gray-500 uppercase text-xs tracking-wider">
                <th className="px-6 py-3 font-medium">Collector</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr> 
            </thead> */}

            <tbody className="divide-y divide-gray-100">
              {others.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    <strong> {item.name}</strong>
                    <br />
                    {item.date}
                  </td>

                  <td className="px-6 py-4">
                    <strong>{`GHC 230.00 `}</strong><br />
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {others.map((item, index) => (
            <div key={index} className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Collector</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[item.status]}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="font-semibold text-gray-800">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <button className="text-green-600 cursor-pointer hover:underline text-sm font-medium">
            View all payments →
          </button>
        </div>

      </div>

    </div>

    // </div>
  );
}


function NewRecordModalContent() {
  return (
    <div>
      {/* Collector Details */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          Collector Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Collector Name
            </label>
            <input
              type="text"
              defaultValue="Kwame Boateng"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Collector ID
            </label>
            <input
              type="text"
              defaultValue="Auto-filled"
              disabled
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Waste Details */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          Waste Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Waste type
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Plastic</option>
              <option>Metal</option>
              <option>Paper</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Weight
            </label>
            <input
              type="number"
              placeholder="Type weight here"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Notes / Reference
          </label>
          <textarea
            rows={3}
            defaultValue="Mixed plastic, needs sorting"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>


    </div>
  )
}
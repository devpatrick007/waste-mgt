"use client";

import { useEffect, useState } from 'react';
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

export default function BigTable({ data }) {
  const [isNewRecordOpen, setNewRecordIsOpen] = useState(false);
  const [wasteTypes, setWasteTypes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWasteTypes = async () => {
      try {
        const res = await fetch(
          "https://pellakes-backend.prospafin.com/api/waste-types?includeDisabled=false"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setWasteTypes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWasteTypes();
  }, []);



  const [formData, setFormData] = useState({
    collectorName: "",   // start empty
    collectorId: "",     // start empty or auto-fill if needed
    wasteType: "",
    weight: "",
    date: "",
    notes: ""
  });

  formData.collectorPhoneNumber = "0244000000"; // default or auto-fill if needed
  formData.collectionPhoto = "https://via.placeholder.com/150"; // default image URL



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const recordInput = async (e) => {
    e.preventDefault();
    setNewRecordIsOpen(false);
    console.log("Form Data:", formData);
    // send to API
    try {
      // Convert numeric fields before sending
      const payload = {
        collectorName: "ABCDEF",
        collectorId: formData.collectorId,
        wasteTypeId: Number(formData.wasteType), // convert string to number
        weight: parseFloat(formData.weight),     // convert string to number
        date: formData.date,
        note: formData.notes,
      };

      const response = await fetch(
        "https://pellakes-backend.prospafin.com/api/inventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${YOUR_TOKEN}` // if needed
          },
          body: JSON.stringify(payload), // send the converted payload
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Reset form
      setFormData({
        collectorName: "",
        collectorId: "",
        wasteType: "",
        weight: "",
        date: "",
        notes: "",
      });

      alert("Record submitted successfully!");
    } catch (err) {
      console.error("Error sending data:", err);
      alert("Failed to submit record");
    }
  };





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
                    <NewRecordModalContent formData={formData}
                      wasteTypes={wasteTypes} onChange={handleChange}
                    />
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
                      onClick={(e) => recordInput(e)}
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
                {data?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-4">{item.collectorName}</td>
                    <td className="py-4">{item.wasteTypeName}</td>
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
            {data?.map((item, index) => (
              <div key={index} className="border rounded-xl p-4 shadow-sm">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{item.collectorName}</span>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Type:</span> {item.wasteTypeName}
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


function NewRecordModalContent({ wasteTypes, formData = {}, onChange }) {
  return (
    <div>
      {/* Collector Details */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Collector Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Collector Name</label>
            <input
              type="text"
              name="collectorName"
              value={formData.collectorName}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Collector ID</label>
            <input
              type="text"
              name="collectorId"
              value={formData.collectorId}
              onChange={onChange}
              disabled
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Waste Details */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Waste Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="wasteType">Waste type</label>
            <select
              id="wasteType"
              name="wasteType"
              value={formData.wasteType}
              onChange={onChange}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a waste type</option>
              {wasteTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Weight</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Notes / Reference</label>
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
}


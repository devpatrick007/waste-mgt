'use client'
import {
    Menu,
    Bell,
    Search,
    Upload,
    Download,
    ChevronDown,
} from "lucide-react";

import StatCard from "../../components/StatCard";
import BigTable from "../../components/BigTable";
import Charts from "../../components/Charts";
import { useEffect, useState } from "react";

const data = [
    {
        collector: "Kwame",
        type: "PET",
        weight: 420,
        date: "2025-09-11",
        status: "Checked",
    },
    {
        collector: "Ama",
        type: "Sachet",
        weight: 120,
        date: "2025-09-11",
        status: "Pending",
    },
    {
        collector: "Yaw",
        type: "HDPE",
        weight: 80,
        date: "2025-09-11",
        status: "Checked",
    },
    {
        collector: "Akosua",
        type: "PET Flakes",
        weight: 220,
        date: "2025-09-11",
        status: "Checked",
    },
    {
        collector: "Millie",
        type: "Sachet",
        weight: 150,
        date: "2025-09-11",
        status: "Checked",
    },
];
export default function Home() {
    const [inventory, setInventory] = useState([])
    const [totalTonnes, setTotalTonnes] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // useEffect(() => {
    //     const controller = new AbortController();
    //     const signal = controller.signal;

    //     const fetchInventory = async () => {
    //         try {
    //             const res = await fetch(
    //                 "https://pellakes-backend.prospafin.com/api/inventory",
    //                 { signal }
    //             );

    //             if (!res.ok) {
    //                 throw new Error(`HTTP error! status: ${res.status}`);
    //             }
    //             const data = await res.json();
    //             // const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    //             const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); setInventory(sortedData);

    //             const result = calculateTotalTonnes(sortedData);

    //             console.log("weight in kg", result.totalKg);
    //             console.log("weight in tonnes", result.totalTonnes);

    //             setTotalTonnes(result.totalTonnes);
    //         } catch (err) {
    //             if (err.name !== "AbortError") {
    //                 setError(err.message);
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchInventory();

    //     // Cleanup if component unmounts
    //     return () => controller.abort();
    // }, []);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchInventory = async () => {
            try {
                const res = await fetch(
                    "https://pellakes-backend.prospafin.com/api/inventory",
                    { signal }
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                console.log("Raw data from API:", data);

                const sortedData = [...data].sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                console.log("Sorted data:", sortedData);

                setInventory(sortedData);

                const result = calculateTotalTonnes(sortedData);

                console.log("weight in kg", result.totalKg);
                console.log("weight in tonnes", result.totalTonnes);

                setTotalTonnes(result.totalTonnes);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                    console.error("Error fetching inventory:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();

        // Cleanup if component unmounts
        return () => controller.abort();
    }, []);

    function calculateTotalTonnes(data) {
        const totalKg = data.reduce((sum, item) => sum + item.weight, 0);
        const totalTonnes = totalKg / 1000;

        return {
            totalKg,
            totalTonnes
        };
    }

    useEffect(() => {
        if (inventory.length > 0) {
            const result = calculateTotalTonnes(inventory);

            console.log("weight in kg", result.totalKg);
            console.log("weight in tonnes", result.totalTonnes);
        }
    }, [inventory]);


    return (
        <div>
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 mb-6">
                    <div className="hidden sm:block text-sm text-gray-600">
                        <h6 className="font-normal text-[#363636]">
                            Track plastics received, manage stock, and generate reports.
                        </h6>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                            <Upload size={16} />
                            Add New Input
                        </button>

                        <button className="flex items-center justify-center gap-2 bg-white border px-4 py-2 rounded-lg text-sm">
                            <Download size={16} />
                            Export Report
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    title="Total Stock"
                    value={totalTonnes.toFixed(2) + " tonnes"}
                    sub="This month"
                />
                <StatCard
                    title="Last Input"
                    value={inventory[0] ? (inventory[0].weight / 1000).toFixed(2) + " tonnes" : "0 tonnes"} sub={inventory[0]?.wasteTypeName}
                />
                <StatCard title="Pending QC" value="1" sub="All time" />
            </div>

            {/* <div className="min-h-screen bg-gray-100 p-6"> */}
            <div className="w-full mx-auto bg-white rounded-lg shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Inventory Log
                    </h2>

                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm border rounded-md bg-white hover:bg-gray-50">
                            This Week
                        </button>
                        <button className="px-4 py-2 text-sm border rounded-md bg-white hover:bg-gray-50">
                            This Month
                        </button>
                        <button className="px-4 py-2 text-sm border rounded-md bg-white hover:bg-gray-50">
                            Custom
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-gray-700 border-b">
                            <tr>
                                <th className="py-3 font-medium">Collector</th>
                                <th className="py-3 font-medium">Type</th>
                                <th className="py-3 font-medium">Weight (kg)</th>
                                <th className="py-3 font-medium">Date</th>
                                <th className="py-3 font-medium text-right">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {inventory.map((item, index) => (
                                <tr key={index} className="border-b last:border-none">
                                    <td className="py-3">{item.collectorName}</td>
                                    <td className="py-3">{item.wasteTypeName}</td>
                                    <td className="py-3">{item.weight}</td>
                                    <td className="py-3">{item.date}</td>
                                    <td className="py-3 text-right">
                                        <span
                                            className={`px-4 py-1 text-xs font-medium rounded-full ${item.status === "Checked"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* </div> */}

            <Charts title={`Stock Trend`} secondTitle={`By Type`} />

        </div>
    );
}

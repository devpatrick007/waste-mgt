'use client'
import { Upload, Download } from "lucide-react";
import StatCard from "../../components/StatCard";
import Charts from "../../components/Charts";
import { useEffect, useState } from "react";

function calculateTotalTonnes(data) {
    const totalKg = data.reduce((sum, item) => sum + item.weight, 0);
    return { totalKg, totalTonnes: totalKg / 1000 };
}

export default function Home() {
    const [inventory, setInventory] = useState([]);
    const [totalTonnes, setTotalTonnes] = useState(0);
    const [totalKg, setTotalKg] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchInventory = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    "https://pellakes-backend.prospafin.com/api/inventory",
                    { signal: controller.signal }
                );

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();

                const sortedData = [...data].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setInventory(sortedData);

                const { totalKg, totalTonnes } = calculateTotalTonnes(sortedData);
                console.log("weight in kg", totalKg);
                console.log("weight in tonnes", totalTonnes);
                setTotalKg(totalKg);
                setTotalTonnes(totalTonnes);
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
        return () => controller.abort();
    }, []);

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

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    title="Total Stock"
                    value={totalTonnes.toFixed(2) + " t"}
                    valueNote={totalKg.toLocaleString() + " kg"}
                    sub="Total collected"
                />
                <StatCard
                    title="Last Input"
                    value={
                        inventory[0]
                            ? (inventory[0].weight / 1000).toFixed(2) + " t"
                            : "0 t"
                    }
                    valueNote={
                        inventory[0]
                            ? inventory[0].weight.toLocaleString() + " kg"
                            : undefined
                    }
                    sub={inventory[0]?.wasteTypeName ?? "—"}
                />
                <StatCard title="Pending QC" value="1" sub="All time" />
            </div>

            {/* Inventory Table */}
            <div className="w-full mx-auto bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Inventory Log</h2>
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

                {error && (
                    <p className="text-red-500 text-sm mb-4">⚠️ {error}</p>
                )}

                {loading ? (
                    <p className="text-gray-400 text-sm py-6 text-center">Loading inventory...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-gray-700 border-b">
                                <tr>
                                    <th className="py-3 font-medium">Collector</th>
                                    <th className="py-3 font-medium">Type</th>
                                    <th className="py-3 font-medium">Weight</th>
                                    <th className="py-3 font-medium">Date</th>
                                    <th className="py-3 font-medium text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-6 text-center text-gray-400">
                                            No inventory records found.
                                        </td>
                                    </tr>
                                ) : (
                                    inventory.map((item, index) => (
                                        <tr key={index} className="border-b last:border-none">
                                            <td className="py-3">{item.collectorName}</td>
                                            <td className="py-3">{item.wasteTypeName}</td>
                                            <td className="py-3">
                                                <span className="font-medium text-gray-800">
                                                    {item.weight.toLocaleString()} kg
                                                </span>
                                                <span className="ml-2 text-xs text-gray-400">
                                                    / {(item.weight / 1000).toFixed(3)} t
                                                </span>
                                            </td>
                                            <td className="py-3">{item.date}</td>
                                            <td className="py-3 text-right">
                                                <span
                                                    className={`px-4 py-1 text-xs font-medium rounded-full ${
                                                        item.status === "Checked"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Charts title="Stock Trend" secondTitle="By Type" />
        </div>
    );
}

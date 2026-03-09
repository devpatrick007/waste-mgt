'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    Menu,
    Bell,
    Search,
    Upload,
    Download,
    ChevronDown,
} from "lucide-react";


import StatCard from "../../components/StatCard";
import Charts from "../../components/Charts";
import BigTable from "../../components/BigTable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Home() {
    const [inventory, setInventory] = useState([]);
    const [totalTonnes, setTotalTonnes] = useState(0);
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

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


    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // if (status === "loading") return <p>Loading...</p>;
    if (status === "loading") {
        return (
            <>
                {/* Shimmer for top section */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-pulse">
                    <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 mb-6">
                        <div className="hidden sm:block w-full h-20 bg-gray-200 rounded-md"></div>

                        <div className="flex gap-3">
                            <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
                            <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>

                {/* Shimmer for stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </>
        );
    }

    return (
        <>
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 mb-6">
                    <div className="hidden sm:block text-sm text-gray-600">
                        <h6 className="font-normal text-[#363636]">
                            Track your inputs, payments and Inventory at a glance. Every
                            action keeps plastics out of landfills and drives Ghana's
                            circular economy forward
                        </h6>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                            <Upload size={16} />
                            Upload Input
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
                    title="Plastics Received"
                    value={totalTonnes.toFixed(2) + " tonnes"}
                    sub="This month"
                />
                <StatCard
                    title="Current Inventory"
                    value={totalTonnes.toFixed(2) + " tonnes"}
                    sub="PET, HDPE"
                />
                <StatCard title="Total Payments" value="GHS 45,000" sub="All time" />
                <StatCard title="Outstanding" value="GHS 2,500" sub="2 pending" />
            </div>

            {/* Tables + Charts */}
            <BigTable className="mb-4" data={inventory} />
            <Charts title={`Inventory Trends`} secondTitle={`Payment Distribution`} />
            <div className="border border-gray-300 rounded-lg p-4 mt-4 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-base font-medium">
                        You have recycled <b className="text-green-600">{totalTonnes.toFixed(2)}</b> of plastic this year
                    </p>

                    <button className="cursor-pointer bg-white border border-gray-300 px-5 py-2 rounded-lg text-sm text-black hover:bg-gray-50 transition-colors whitespace-nowrap">
                        Export Report
                    </button>
                </div>
            </div>
        </>
    );
}

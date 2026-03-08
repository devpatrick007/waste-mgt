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
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setInventory(sortedData);
                // const data = await res.json();
                // setInventory(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();

        // Cleanup if component unmounts
        return () => controller.abort();
    }, []);



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
                    value="3.2 tonnes"
                    sub="This month"
                />
                <StatCard
                    title="Current Inventory"
                    value="5.8 tonnes"
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
                        You have recycled <b className="text-green-600">12.5 tonnes</b> of plastic this year
                    </p>

                    <button className="cursor-pointer bg-white border border-gray-300 px-5 py-2 rounded-lg text-sm text-black hover:bg-gray-50 transition-colors whitespace-nowrap">
                        Export Report
                    </button>
                </div>
            </div>
        </>
    );
}

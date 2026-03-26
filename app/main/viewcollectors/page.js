"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
    const [collectors, setCollectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCollectors = async () => {
            try {
                const res = await fetch(
                    "https://pellakes-backend.prospafin.com/api/collectors"
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch collectors");
                }

                const data = await res.json();
                setCollectors(data);

            } catch (err) {
                console.error(err);
                setError("Error fetching collectors");
            } finally {
                setLoading(false);
            }
        };

        fetchCollectors();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading collectors...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="p-6 overflow-x-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">
                    Collectors List</h2>
                <button className="bg-green-600 text-white p-2 rounded-md">
                    <Link href="/main/collector">Add Collectors
                    </Link>
                </button>
            </div>

            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-sm text-gray-500 border-b">
                            <th className="pb-3 font-medium">Collector</th>
                            <th className="pb-3 font-medium">Gender</th>
                            <th className="pb-3 font-medium">Phone</th>
                            <th className="pb-3 font-medium">Network</th>
                            <th className="pb-3 font-medium">Region</th>
                            <th className="pb-3 font-medium">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {collectors.map((collector) => (
                            <tr
                                key={collector.id}
                                className="border-b last:border-none hover:bg-gray-50 transition"
                            >
                                {/* Collector Name */}
                                <td className="py-4">
                                    {collector.firstName} {collector.middleName} {collector.lastName}
                                </td>

                                {/* Gender */}
                                <td className="py-4">{collector.gender}</td>

                                {/* Phone */}
                                <td className="py-4">{collector.phoneNumber}</td>

                                {/* Network */}
                                <td className="py-4">{collector.mobileMoneyNetwork}</td>

                                {/* Region */}
                                <td className="py-4">{collector.region}</td>

                                {/* Created Date */}
                                <td className="py-4">
                                    {new Date(collector.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Full Name</th>
                        <th className="p-2 border">Gender</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">MoMo Number</th>
                        <th className="p-2 border">Network</th>
                        <th className="p-2 border">Location</th>
                        <th className="p-2 border">Region</th>
                        <th className="p-2 border">Created At</th>
                    </tr>
                </thead>

                <tbody>
                    {collectors.map((collector) => (
                        <tr key={collector.id} className="hover:bg-gray-50">
                            <td className="p-2 border">{collector.id}</td>

                            <td className="p-2 border">
                                {collector.firstName} {collector.middleName}{" "}
                                {collector.lastName}
                            </td>

                            <td className="p-2 border">{collector.gender}</td>

                            <td className="p-2 border">{collector.phoneNumber}</td>

                            <td className="p-2 border">
                                {collector.mobileMoneyNumber}
                            </td>

                            <td className="p-2 border">
                                {collector.mobileMoneyNetwork}
                            </td>

                            <td className="p-2 border">
                                {collector.exactLocationWithLandmark}
                            </td>

                            <td className="p-2 border">{collector.region}</td>

                            <td className="p-2 border">
                                {new Date(collector.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
}
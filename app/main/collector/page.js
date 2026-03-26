"use client";

import Link from "next/link";
import React, { useState, useCallback } from "react";

const INITIAL_FORM = {
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    phoneNumber: "",
    mobileMoneyNumber: "",
    registeredMobileMoneyName: "",
    mobileMoneyNetwork: "",
    exactLocationWithLandmark: "",
    region: "",
    ghanaCardNumber: "",
    ghanaCardFrontPicture: "card front",
    ghanaCardBackPicture: "card back",
};

export default function Home() {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            const response = await fetch(
                "https://pellakes-backend.prospafin.com/api/collectors",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Something went wrong");

            setSuccess(true);
            setFormData(INITIAL_FORM);
            alert("Registration Successful");
        } catch (err) {
            console.error(err);
            alert(err.message || "Error creating record");
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Collector Registration</h1>
                    <Link
                        href="/main/viewcollectors"
                        className="bg-green-600 px-4 py-2 text-white rounded-md"
                    >
                        View Collectors
                    </Link>
                </div>

                {success && (
                    <p className="text-green-600 mb-4">✅ Registration successful</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Info */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            <input
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            <input
                                name="middleName"
                                placeholder="Middle Name"
                                value={formData.middleName}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="">Select Status</option>
                                <option>Single</option>
                                <option>Married</option>
                            </select>
                        </div>
                    </div>

                    {/* Contact & MoMo */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Contact & Mobile Money</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            <input
                                name="mobileMoneyNumber"
                                placeholder="MoMo Number"
                                value={formData.mobileMoneyNumber}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            <input
                                name="registeredMobileMoneyName"
                                placeholder="MoMo Name"
                                value={formData.registeredMobileMoneyName}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            <select
                                name="mobileMoneyNetwork"
                                value={formData.mobileMoneyNetwork}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="">Select Network</option>
                                <option>MTN</option>
                                <option>Vodafone</option>
                                <option>AirtelTigo</option>
                            </select>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Location</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                name="exactLocationWithLandmark"
                                placeholder="Exact Location"
                                value={formData.exactLocationWithLandmark}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            <input
                                name="region"
                                placeholder="Region"
                                value={formData.region}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* ID */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Identification</h2>
                        <input
                            name="ghanaCardNumber"
                            placeholder="Ghana Card Number"
                            value={formData.ghanaCardNumber}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
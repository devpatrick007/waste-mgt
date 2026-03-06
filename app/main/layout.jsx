'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import {
    Menu,
    Bell,
    Search,
    ChevronDown,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import { usePathname } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function MainLayout({ children }) {
    const [open, setOpen] = useState(false); // Sidebar state
    const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile modal state

    const pathname = usePathname();

    const getPageTitle = () => {
        switch (pathname) {
            case "/": return "Dashboard";
            case "/inventory": return "Inventory";
            case "/payments": return "Payments";
            case "/reports": return "Reports";
            case "/settings": return "Settings";
            default: return "Dashboard";
        }
    };

    const title = getPageTitle();

    const { data: session, status } = useSession();
    console.log("Session in MainLayout:", session, "Status:", status); // Debugging log

    return (
        <SessionProvider>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar open={open} setOpen={setOpen} />

                {/* Main Content */}
                <div className="p-4 md:p-8 w-full">

                    {/* Mobile Header */}
                    <div className="flex justify-between items-center mb-6 md:hidden">
                        <button onClick={() => setOpen(true)}>
                            <Menu />
                        </button>

                        <h1 className="font-bold">{title}</h1>

                        <div className="flex items-center space-x-2">
                            <Bell />
                            {/* Mobile Profile Button */}
                            <button
                                onClick={() => setIsProfileOpen(true)}
                                className="w-8 h-8 rounded-full overflow-hidden"
                            >
                                <img
                                    src="https://i.pravatar.cc/40"
                                    alt="User"
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Header */}
                    <div className="hidden md:flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Welcome back, {session?.user?.name || "User"}</h1>

                        <div className="flex items-center space-x-2">
                            <Bell className="cursor-pointer" />

                            {/* Search */}
                            <div className="flex items-center border rounded-lg px-3 py-1">
                                <Search size={16} className="text-gray-500 mr-2" />
                                <input
                                    className="outline-none text-sm bg-transparent"
                                    placeholder="Search"
                                />
                            </div>

                            {/* Profile Section */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(true)}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    <img
                                        src="https://i.pravatar.cc/40"
                                        alt="User"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-sm font-medium">Dean</span>
                                    <ChevronDown size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Page Content */}
                    {children}

                </div>

                {/* Profile Dropdown / Modal */}
                {isProfileOpen && (
                    <ProfileDropdown
                        isPOpen={isProfileOpen}
                        setIsPOpen={setIsProfileOpen}
                        user={session?.user}
                    />
                )}

            </div>
        </SessionProvider>
    );
}

// Profile Dropdown Modal
function ProfileDropdown({ isPOpen, setIsPOpen, user }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsPOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-xl p-6 z-50 animate-fadeIn">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => setIsPOpen(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ×
                    </button>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-semibold text-gray-700">

                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">{user?.name || "N/A"}</h2>
                    <span className="mt-2 px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                        Active Collector
                    </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center mt-6">
                    <div>
                        <p className="text-2xl font-bold text-gray-900">128</p>
                        <p className="text-sm text-gray-500">Total Inputs</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">412 kg</p>
                        <p className="text-sm text-gray-500">Total Weight</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">A</p>
                        <p className="text-sm text-gray-500">Quality Grade</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Contact Information</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        📞 +233 24 987 6543
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        📍 Kwashieman - Zone 4
                    </div>
                </div>

                {/* Recent Inputs */}
                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Inputs</h3>
                    {["12.5 kg - Feb 11, 2025", "12.5 kg - Feb 11, 2025", "12.5 kg - Feb 11, 2025"].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center mb-4 last:mb-0">
                            <div>
                                <p className="text-sm font-medium text-gray-800">PET Plastics</p>
                                <p className="text-xs text-gray-500">{item}</p>
                            </div>
                            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                                Verified
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 border-t pt-4 text-center">
                    <button className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center gap-2 mx-auto">
                        View Full History →
                    </button>
                </div>
            </div>
        </div>
    );
}
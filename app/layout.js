'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import {
  Menu,
  Bell,
  Search,
  Upload,
  Download,
  ChevronDown,
} from "lucide-react";

import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar open={open} setOpen={setOpen} />

          {/* Main */}
          <div className="p-4 md:p-8 w-full">
            {/* Mobile Header */}
            <div className="flex justify-between items-center mb-6 md:hidden">
              <button onClick={() => setOpen(true)}>
                <Menu />
              </button>
              <h1 className="font-bold">Dashboard</h1>
              <Bell />
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Welcome back, Dean</h1>

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
                    onClick={() => setOpen(!open)}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    {/* Avatar */}
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />

                    {/* Name */}
                    <span className="text-sm font-medium">Dean</span>

                    <ChevronDown size={16} />
                  </button>

                  {/* Dropdown */}
                  {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileOpen(true)}>
                        Profile
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Settings
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                        Logout
                      </button>
                    </div>
                  )}


                </div>
              </div>
            </div>

            {children}

          </div>

          {isProfileOpen && (
            <ProfileDropdown isPOpen={true} setIsPOpen={(setIsProfileOpen)} />
          )}

        </div>
      </body>
    </html>
  );
}


function ProfileDropdown({ isPOpen, setIsPOpen }) {
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
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-semibold text-gray-700">
            KM
          </div>

          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Kwame Mensah
          </h2>

          <span className="mt-2 px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
            Active Collector
          </span>
        </div>

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

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Contact Information
          </h3>

          <div className="flex items-center text-sm text-gray-600 mb-2">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 5h2l3.6 7.59a1 1 0 01-.21 1.09l-2.3 2.3a16 16 0 006.36 6.36l2.3-2.3a1 1 0 011.09-.21L19 19v2a1 1 0 01-1 1h-1C8.82 22 2 15.18 2 7V6a1 1 0 011-1z" />
            </svg>
            +233 24 987 6543
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Kwashieman - Zone 4
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Recent Inputs
          </h3>

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium text-gray-800">PET Plastics</p>
              <p className="text-xs text-gray-500">12.5 kg - Feb 11, 2025</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
              Verified
            </span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium text-gray-800">PET Plastics</p>
              <p className="text-xs text-gray-500">12.5 kg - Feb 11, 2025</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
              Verified
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-800">PET Plastics</p>
              <p className="text-xs text-gray-500">12.5 kg - Feb 11, 2025</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
              Verified
            </span>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 text-center">
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center gap-2 mx-auto">
            View Full History
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}



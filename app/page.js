'use client'
import Image from "next/image";
import { useState } from "react";
import {
  Menu,
  Bell,
  Search,
  Upload,
  Download,
  ChevronDown,
} from "lucide-react";


import StatCard from "./components/StatCard";
import Charts from "./components/Charts";
import BigTable from "./components/BigTable";


export default function Home() {
  const [open, setOpen] = useState(false);

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
      <BigTable className="mb-4" />
      <Charts />
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

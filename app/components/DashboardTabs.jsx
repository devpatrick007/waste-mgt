'use client'
import { useState } from "react"
import Balances from "./Balance"
import History from "./History"
import Reports from "./Reports"

function DashboardTabs() {
    const [activeTab, setActiveTab] = useState("balances")

    const data = [
        { name: "Kwame", due: 1200, status: "checked" },
        { name: "Ama", due: 0, status: "pending" },
        { name: "Yaw", due: 300, status: "checked" },
    ]

    return (
        <div className="w-full min-h-screen bg-gray-100 p-4 md:p-8">

            {/* Tabs */}
            <div className="border-b border-gray-300 mb-6">
                <div className="flex gap-8 text-sm font-medium">
                    <button
                        onClick={() => setActiveTab("balances")}
                        className={`pb-3 ${activeTab === "balances"
                            ? "border-b-2 border-black text-black"
                            : "text-gray-500"
                            }`}
                    >
                        Balances
                    </button>

                    <button
                        onClick={() => setActiveTab("history")}
                        className={`pb-3 ${activeTab === "history"
                            ? "border-b-2 border-black text-black"
                            : "text-gray-500"
                            }`}
                    >
                        History
                    </button>

                    <button
                        onClick={() => setActiveTab("reports")}
                        className={`pb-3 ${activeTab === "reports"
                            ? "border-b-2 border-black text-black"
                            : "text-gray-500"
                            }`}
                    >
                        Reports
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === "balances" && <Balances data={data} />}
            {activeTab === "history" && <History data={data} />}
            {activeTab === "reports" && <Reports data={data} />}
        </div>
    )
}

export default DashboardTabs;
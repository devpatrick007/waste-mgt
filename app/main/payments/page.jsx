import StatCard from "../../components/StatCard";
import DashboardTabs from "../../components/DashboardTabs";

import {
    Menu,
    Bell,
    Search,
    Upload,
    Download,
    ChevronDown,
} from "lucide-react";
import BigTable from "../../components/BigTable";

export default function Home() {

    return (
        <div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 mb-6">
                    <div className="hidden sm:block text-sm text-gray-600">
                        <h6 className="font-normal text-[#363636]">
                            Manage balances, record new payments, and review history.
                        </h6>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                            <Upload size={16} />
                            Record Payment
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
            <DashboardTabs />
            {/* <BigTable className="mb-4" /> */}

        </div>
    );
}


// function CollectorBalances() {
//     return (
//         <div className="w-full min-h-screen bg-gray-100 p-4 md:p-8">

//             {/* Tabs */}
//             <div className="w-full border-b border-gray-300 mb-6">
//                 <div className="flex gap-8 text-sm font-medium">
//                     <button className="pb-3 border-b-2 border-black text-black">
//                         Balances
//                     </button>
//                     <button className="pb-3 text-gray-500 hover:text-black">
//                         History
//                     </button>
//                     <button className="pb-3 text-gray-500 hover:text-black">
//                         Reports
//                     </button>
//                 </div>
//             </div>

//             {/* Card */}
//             <div className="w-full bg-white rounded-xl shadow-sm p-4 md:p-6">

//                 <h2 className="text-sm font-semibold text-gray-800 mb-4">
//                     Collector Balances
//                 </h2>

//                 {/* Desktop Table */}
//                 <div className="hidden md:block w-full overflow-x-auto">
//                     <table className="w-full text-sm">
//                         <thead>
//                             <tr className="text-left text-gray-600 border-b">
//                                 <th className="py-3">Collector</th>
//                                 <th>Total Due (GHS)</th>
//                                 <th>Last Payment</th>
//                                 <th>Status</th>
//                                 <th className="text-right">Actions</th>
//                             </tr>
//                         </thead>

//                         <tbody className="text-gray-700">
//                             {[
//                                 { name: "Kwame", due: "GHS 1200", status: "checked" },
//                                 { name: "Ama", due: "-", status: "pending" },
//                                 { name: "Yaw", due: "GHS 300", status: "checked" },
//                                 { name: "Akosua", due: "GHS 500", status: "checked" },
//                                 { name: "Millie", due: "GHS 299", status: "checked" },
//                             ].map((item, index) => (
//                                 <tr key={index} className="border-b last:border-none">
//                                     <td className="py-4">{item.name}</td>
//                                     <td>{item.due}</td>
//                                     <td>2025-09-11</td>
//                                     <td>
//                                         <span
//                                             className={`px-4 py-1 rounded-full text-xs font-medium ${item.status === "checked"
//                                                 ? "bg-green-100 text-green-700"
//                                                 : "bg-yellow-100 text-yellow-700"
//                                                 }`}
//                                         >
//                                             {item.status === "checked" ? "Checked" : "Pending"}
//                                         </span>
//                                     </td>
//                                     <td className="text-right">
//                                         <button className="text-gray-500 hover:text-black">
//                                             ⋮
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Mobile Cards */}
//                 <div className="md:hidden space-y-4">
//                     {[
//                         { name: "Kwame", due: "GHS 1200", status: "checked" },
//                         { name: "Ama", due: "-", status: "pending" },
//                         { name: "Yaw", due: "GHS 300", status: "checked" },
//                         { name: "Akosua", due: "GHS 500", status: "checked" },
//                         { name: "Millie", due: "GHS 299", status: "checked" },
//                     ].map((item, index) => (
//                         <div
//                             key={index}
//                             className="border rounded-lg p-4 bg-gray-50"
//                         >
//                             <div className="flex justify-between items-center mb-2">
//                                 <p className="font-semibold text-gray-800">
//                                     {item.name}
//                                 </p>
//                                 <button className="text-gray-500">⋮</button>
//                             </div>

//                             <p className="text-sm text-gray-600">
//                                 Total Due: <span className="font-medium">{item.due}</span>
//                             </p>
//                             <p className="text-sm text-gray-600">
//                                 Last Payment: 2025-09-11
//                             </p>

//                             <div className="mt-2">
//                                 <span
//                                     className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "checked"
//                                         ? "bg-green-100 text-green-700"
//                                         : "bg-yellow-100 text-yellow-700"
//                                         }`}
//                                 >
//                                     {item.status === "checked" ? "Checked" : "Pending"}
//                                 </span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </div>
//     )
// }


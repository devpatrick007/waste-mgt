"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


import { LayoutDashboard, Package, CreditCard, Settings, X, NotebookPen } from "lucide-react";


export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname();
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky md:top-0 
  h-screen w-64 bg-black text-white p-6 
  transform transition-transform z-50 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="flex justify-between items-center mb-10 md:hidden">
          <h2 className="font-bold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="space-y-4">
          <Link href="/main/dashboard"><NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={pathname === "/main/dashboard"} onClick={() => setOpen(false)}
          /></Link>
          <Link href="/main/inventory"><NavItem icon={<Package size={18} />} label="Inventory" active={pathname === "/main/inventory"} onClick={() => setOpen(false)} /></Link>
          <Link href="/main/payments"><NavItem icon={<CreditCard size={18} />} label="Payments" active={pathname === "/main/payments"} onClick={() => setOpen(false)} /></Link>
          <Link href="/main/reports"><NavItem icon={<NotebookPen size={18} />} label="Reports" active={pathname === "/main/reports"} onClick={() => setOpen(false)} /></Link>
          <Link href="/main/settings"><NavItem icon={<Settings size={18} />} label="Settings" active={pathname === "/main/settings"} onClick={() => setOpen(false)} /></Link>
        </nav>
      </aside>
    </>
  );
}
//todo
function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${active ? "bg-white text-black" : "hover:bg-gray-800"
        }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}
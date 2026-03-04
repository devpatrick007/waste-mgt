import { NotebookPen } from 'lucide-react';

export default function StatCard({ title, value, sub }) {
  return (
    <div className="bg-black p-5 rounded-xl shadow-sm space-y-4">
      {/* <p className="text-gray-500 text-sm mb-2">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
      <p className="text-gray-400 text-xs mt-1">{sub}</p> */}
      <div className="flex items-center space-x-4">
        <div className="bg-[#3D3D3D] p-2 text-white rounded-md">
          <NotebookPen />
        </div>
        <h6 className="text-white font-normal">{title}</h6>
      </div>
      <h4 className="text-white text-2xl font-normal">{value}</h4>
      <p className="text-[#888888]">{sub}</p>
    </div>
  );
}
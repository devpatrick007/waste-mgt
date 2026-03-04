function Reports({ data }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold mb-4">
                Download or Export payment summary
            </h2>

            <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm mb-4">
                Download Monthly Report
            </button>
        </div>
    )
}

export default Reports;
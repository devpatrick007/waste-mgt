function History({ data }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold mb-4">
                Payment History
            </h2>

            {data.map((item, index) => (
                <div key={index} className="border-b py-3 last:border-none">
                    {item.name} made a payment
                </div>
            ))}
        </div>
    )
}

export default History;
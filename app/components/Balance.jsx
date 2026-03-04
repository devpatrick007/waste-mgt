function Balances({ data }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold mb-4">
                Collector Balances
            </h2>

            {data.map((item, index) => (
                <div
                    key={index}
                    className="flex justify-between border-b py-3 last:border-none"
                >
                    <span>{item.name}</span>
                    <span>GHS {item.due}</span>
                </div>
            ))}
        </div>
    )
}

export default Balances;
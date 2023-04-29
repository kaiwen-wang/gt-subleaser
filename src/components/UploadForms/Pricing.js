


export default function Pricing() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label
                    htmlFor="monthly_price"
                    className="mb-2 block text-lg font-medium"
                >
                    Monthly Price
                </label>
                <input
                    type="number"
                    id="monthly_price"
                    name="monthly_price"
                    className="w-full rounded border p-2 border-gray-400"
                    min="0"
                />
            </div>
            <div>
                <label
                    htmlFor="utilities_fee"
                    className="mb-2 block text-lg font-medium"
                >
                    Utilities
                </label>
                <input
                    type="number"
                    id="utilities_fee"
                    name="utilities_fee"
                    min="0"
                    className="w-full rounded border p-2 border-gray-400"
                />
            </div>
            <div>
                <label
                    htmlFor="misc_fees"
                    className="mb-2 block text-lg font-medium"
                >
                    Other Fees
                </label>
                <input
                    type="number"
                    id="misc_fees"
                    name="misc_fees"
                    min="0"
                    className="w-full rounded border p-2 border-gray-400"
                />
            </div>
        </div>

    )
}
export default function Pricing() {
  return (
    <div className="sm:grid-cols-3 grid max-w-3xl grid-cols-1 gap-4 mx-auto">
      <div>
        <label
          htmlFor="monthly_price"
          className="block mb-2 text-lg font-medium"
        >
          Monthly Price
        </label>
        <input
          type="number"
          id="monthly_price"
          name="monthly_price"
          required
          className="w-full p-2 border border-gray-400 rounded"
          min="0"
        />
      </div>
      <div>
        <label
          htmlFor="utilities_fee"
          className="block mb-2 text-lg font-medium"
        >
          Utilities
        </label>
        <input
          type="number"
          id="utilities_fee"
          name="utilities_fee"
          required
          min="0"
          className="w-full p-2 border border-gray-400 rounded"
        />
      </div>
      <div>
        <label htmlFor="misc_fees" className="block mb-2 text-lg font-medium">
          Other Fees
        </label>
        <input
          type="number"
          id="misc_fees"
          name="misc_fees"
          min="0"
          required
          className="w-full p-2 border border-gray-400 rounded"
        />
      </div>
    </div>
  );
}

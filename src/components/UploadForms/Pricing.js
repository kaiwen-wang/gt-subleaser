import { FormContext } from "/src/components/FormState";
import { useContext } from "react";

export default function Pricing({ daReffy }) {
  const { formMonthlyPrice, setFormMonthlyPrice } = useContext(FormContext);
  const { formUtilities, setFormUtilities } = useContext(FormContext);
  const { formFees, setFormFees } = useContext(FormContext);

  return (
    <div className="sm:grid-cols-3 grid grid-cols-1 gap-4">
      <div>
        <label
          htmlFor="monthly_price"
          className="block mb-2 text-lg font-medium"
        >
          Monthly Price
        </label>
        <input
          ref={daReffy}
          type="number"
          id="monthly_price"
          name="monthly_price"
          value={formMonthlyPrice}
          onChange={(e) => {
            setFormMonthlyPrice(e.target.value);
          }}
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
          value={formUtilities}
          onChange={(e) => {
            setFormUtilities(e.target.value);
          }}
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
          value={formFees}
          onChange={(e) => {
            setFormFees(e.target.value);
          }}
          min="0"
          required
          className="w-full p-2 border border-gray-400 rounded"
        />
      </div>
    </div>
  );
}

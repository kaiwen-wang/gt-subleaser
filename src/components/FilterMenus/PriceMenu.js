import { AppContext } from "/src/components/AppState.js";
import { Slider } from "@/components/Slider";
import { useContext } from "react";

export default function PriceMenu() {
  let { maxPrice, setMaxPrice } = useContext(AppContext);
  let { maxTopPrice, setMaxTopPrice } = useContext(AppContext);

  return (
    <div>
      <span className="flex items-center">
        <span className="text-sm font-medium text-gray-900">Price</span>
      </span>
      <span className="block text-sm text-gray-500">
        Maximum price you'll pay per month
      </span>

      <Slider
        className="mt-4"
        defaultValue={[maxPrice]}
        max={[maxTopPrice]}
        step={5}
      />

      {/* input for max price */}
      <input
        type="number"
        className="w-full mt-4 rounded-md outline"
        min="0"
        max={maxTopPrice}
        value={maxPrice}
        step="5"
        onChange={(e) => {
          // Probably because of the slider
          // setMaxPrice(e.target.value)
          // console.log(e.target.value)
        }}
      />
    </div>
  );
}

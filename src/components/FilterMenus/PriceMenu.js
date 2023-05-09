import { AppContext } from "/src/components/AppState.js";
import { Slider } from "@/components/Slider";
import { useContext } from "react";

export default function PriceMenu() {
  let { maxPrice, setMaxPrice } = useContext(AppContext);
  let { maxTopPrice, setMaxTopPrice } = useContext(AppContext);
  let { priceDisplayValue, setPriceDisplayValue } = useContext(AppContext);
  let { minPrice, setMinPrice } = useContext(AppContext);
  return (
    <div>
      <span className="flex items-center">
        <span className="text-sm font-medium text-gray-900">Price</span>
      </span>
      <span className="block text-sm text-gray-500">
        Maximum price you'll pay per month
      </span>

      {/* <Slider
        className="mt-4"
        defaultValue={[maxPrice]}
        max={[maxTopPrice]}
        min={minPrice}
        step={5}
      /> */}

      {/* input for max price */}
      <input
        type="number"
        className="outline w-full mt-4 rounded-md"
        min={0}
        max={maxTopPrice}
        value={maxPrice ? maxPrice : ""}
        step="10"
        onChange={(e) => {
          // Probably because of the slider

          if (e.target.value > maxTopPrice) {
            setMaxPrice(maxTopPrice);
          } else if (e.target.value < 0) {
            setMaxPrice(0);
          } else if (e.target.value === "") {
            setMaxPrice(0);
          } else {
            setMaxPrice(e.target.value);
          }
        }}
      />
    </div>
  );
}

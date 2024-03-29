import React, { useContext, useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { AppContext } from "/src/components/AppState.js";

export function Slider({ ...props }) {
  const { maxPrice, setMaxPrice } = useContext(AppContext);
  const { priceDisplayValue, setPriceDisplayValue } = useContext(AppContext);
  const { minPrice, setMinPrice } = useContext(AppContext);
  const [isActive, setIsActive] = useState(false);

  return (
    <SliderPrimitive.Root
      className={
        "relative flex w-full touch-none select-none items-center mt-3"
      }
      {...props}
    >
      <SliderPrimitive.Track className="grow bg-slate-200 dark:bg-slate-800 relative w-full h-2 overflow-hidden rounded-full">
        <SliderPrimitive.Range className="bg-slate-900 dark:bg-slate-400 absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-100 dark:bg-slate-400 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 block w-5 h-5 transition-colors bg-white border-2 rounded-full" />
    </SliderPrimitive.Root>
  );
}

Slider.displayName = SliderPrimitive.Root.displayName;

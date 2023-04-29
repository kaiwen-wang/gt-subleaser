import React, { useContext } from 'react';
import * as SliderPrimitive from "@radix-ui/react-slider";
import { AppContext } from '/src/components/AppState.js'

export function Slider({ className, ...props }) {
    const { maxPrice, setMaxPrice } = useContext(AppContext);

    function cn(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <SliderPrimitive.Root
            className={cn(
                "relative flex w-full touch-none select-none items-center",
                className
            )}
            {...props}
            onValueChange={(value) => {
                setMaxPrice(value)
            }}
            onValueCommit={(value) => {
                // probably change something and reload it
            }}
        >
            <SliderPrimitive.Track className="relative w-full h-2 overflow-hidden rounded-full grow bg-slate-200 dark:bg-slate-800">
                <SliderPrimitive.Range className="absolute h-full bg-slate-900 dark:bg-slate-400" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block w-5 h-5 bg-white border-2 rounded-full transition-colors border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-100 dark:bg-slate-400 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900" />
        </SliderPrimitive.Root>
    );
}

Slider.displayName = SliderPrimitive.Root.displayName;
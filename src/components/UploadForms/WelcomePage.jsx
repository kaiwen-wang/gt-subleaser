
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function WelcomePage({ idNum, isLoading, sdl, existingFormData }) {
    return (
        <div className="">
            <h1 className="text-4xl font-bold">
                {sdl === null || sdl === true ? <Skeleton /> : idNum ? "Welcome Back" : "Ready to sublease?"}
            </h1>

            <div className="mt-4 mb-4 text-lg text-gray-500">
                {sdl === null || sdl === true ? <Skeleton /> : idNum ? "We saved your last responses." : "We just have a few things you need to fill out."}
            </div>

            <div className=" flex items-center gap-2">
                <button
                    className={`w-60 focus:outline-none focus:ring px-4 py-3  text-sm font-medium text-white transition-all bg-gray-700 rounded-full 
                ${isLoading ? "opacity-50" : ""}
                `}
                    disabled={existingFormData === null}
                    onClick={() => {

                    }
                    }>
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                        </div>
                    ) : "Get Started"}
                </button>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-800">
                        press <b>Enter</b>
                    </div>
                    <ArrowUturnLeftIcon className="-scale-y-100 w-3 h-3 font-semibold" />
                </div>
            </div>

        </div>

    )
}
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

export const DotButton = (props) => {
  const { selected, onClick } = props;

  return (
    <button
      className={`${
        selected ? "bg-white" : "bg-white/50"
      } h-3 w-3 rounded-full`}
      type="button"
      onClick={onClick}
    ></button>
  );
};

export const PrevButton = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className={`${
        enabled ? "" : "opacity-30"
      } absolute inset-y-0 left-0 cursor-pointer z-30 `}
      onClick={onClick}
      disabled={!enabled}
    >
      {/* <div className="h-10 w-10 bg-red-500"></div> */}
      <div className="flex h-full items-center justify-center">
        <div className=" h-10 w-10 -translate-x-2/4 items-center justify-center rounded-full shadow-md flex bg-white">
          <ChevronLeftIcon className=" h-4 w-4 translate-x-2 " />
        </div>
      </div>
    </button>
  );
};

export const NextButton = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className={`${
        enabled ? "" : "opacity-30"
      } absolute inset-y-0 right-0 cursor-pointer z-30 `}
      onClick={onClick}
      disabled={!enabled}
    >
      {/* <div className="h-10 w-10 bg-red-500"></div> */}
      <div className="flex h-full items-center justify-center">
        <div className=" h-10 w-10 translate-x-2/4 items-center justify-center rounded-full shadow-md flex bg-white">
          <ChevronRightIcon className=" h-4 w-4 -translate-x-2 " />
        </div>
      </div>
    </button>
  );
};

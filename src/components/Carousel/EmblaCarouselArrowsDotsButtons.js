import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

export const DotButton = (props) => {
  const { selected, onClick } = props;

  return (
    <button
      className={`${
        selected ? "bg-white " : "bg-white/40"
      } h-2 w-2 rounded-full opacity-0 backdrop-blur group-hover:opacity-100 `}
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
        enabled ? "group-hover:opacity-100  " : "group-hover:opacity-30 "
      } absolute inset-y-0 left-0 cursor-pointer  z-30 hidden group-hover:flex `}
      onClick={onClick}
      disabled={!enabled}
    >
      <div
        className={`flex h-full items-center  pr-8 justify-center
        ${
          enabled
            ? `hover:scale-110 transition-all origin-left`
            : "cursor-default"
        }`}
      >
        <div className="-translate-x-2/4 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md">
          <ChevronLeftIcon className=" w-4 h-4 translate-x-2" />
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
        enabled ? "group-hover:opacity-100" : "group-hover:opacity-30"
      } absolute inset-y-0 right-0 cursor-pointer z-30 hidden group-hover:flex`}
      onClick={onClick}
      disabled={!enabled}
    >
      <div
        className={`flex h-full items-center pl-8 justify-center
        ${
          enabled
            ? `hover:scale-110 transition-all origin-right`
            : "cursor-default"
        }`}
      >
        <div className=" translate-x-2/4 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md">
          <ChevronRightIcon className=" w-4 h-4 -translate-x-2" />
        </div>
      </div>
    </button>
  );
};

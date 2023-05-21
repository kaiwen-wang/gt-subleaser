import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import { useContext } from "react";
import { AppContext } from "/src/components/AppState.js";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function SortMenu() {
  let { sortFormula, setSortFormula } = useContext(AppContext);

  return (
    <div className="w-fit ml-auto text-right">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="bordershadow-scale-600 inline-flex justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium outline outline-0 outline-gray-200 text-gray-700 hover:bg-gray-100">
          <span className="">Sort</span>
          <AdjustmentsHorizontalIcon
            className="w-5 h-5 ml-2"
            aria-hidden="true"
          />
        </Menu.Button>
        <Menu.Items className="ring-1 ring-black ring-opacity-5 focus:outline-none absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
          <div className=" px-1 py-1">
            <Menu.Item>
              <button
                className={`${
                  sortFormula == "increasingPrice"
                    ? "text-white bg-violet-500"
                    : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={() => setSortFormula("increasingPrice")}
              >
                {sortFormula == "increasingPrice" ? (
                  <EditActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                ) : (
                  <EditInactiveIcon
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                )}
                Price Low to High
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className={`${
                  sortFormula == "decreasingPrice"
                    ? "text-white bg-violet-500"
                    : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={() => setSortFormula("decreasingPrice")}
              >
                {sortFormula == "decreasingPrice" ? (
                  <DuplicateActiveIcon
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                ) : (
                  <DuplicateInactiveIcon
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                )}
                Price High to Low
              </button>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <button
                className={`${
                  sortFormula === "newest"
                    ? "text-white bg-violet-500"
                    : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={() => setSortFormula("newest")}
              >
                {sortFormula === "newest" ? (
                  <ArchiveActiveIcon
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                ) : (
                  <ArchiveInactiveIcon
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                )}
                Newest Posts
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className={`${
                  sortFormula === "oldest"
                    ? "text-white bg-violet-500"
                    : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={() => setSortFormula("oldest")}
              >
                {sortFormula === "oldest" ? (
                  <MoveActiveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                ) : (
                  <MoveInactiveIcon
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                )}
                Oldest Posts
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

import HeaderfilterMenu from "./HeaderFilterMenu";
import Toggle from "@/components/PageComponents/Toggle";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

export default function Header({ showFilters, smallContainer = false }) {
  const [isPinned, setIsPinned] = useState(false);

  // This is fine performance wise; I checked react for updates
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY === 0) {
        setIsPinned(false);
      } else {
        setIsPinned(true);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white ${
        isPinned ? "border-b-0 shadow-md" : ""
      } ${showFilters ? "" : "border-b"}`}
    >
      <div
        className={`relative mx-auto ${
          smallContainer
            ? "container"
            : "px-6 sm:px-8 xl:px-12 3xl:max-w-screen-3xl"
        }`}
      >
        <div className="flex items-center justify-between py-2.5 ">
          <h1 className="hidden items-center text-2xl font-semibold text-gray-800 sm:flex">
            <Link href="/">🐝 GT Subleaser</Link>
          </h1>
          <div className="flex w-full items-center gap-2.5 sm:max-w-fit sm:justify-between">
            <Link href="/upload">
              <div className="bordershadow-scale-600 rounded-full px-3.5 py-2.5 text-sm font-medium  hover:bg-gray-100">
                <span>Sublease your place</span>
              </div>
            </Link>
            <div className="ml-auto flex items-center sm:ml-0">
              <Toggle />
            </div>
            {/* <div>
              <UserIcon />
            </div> */}
          </div>
        </div>
      </div>

      {showFilters === true ? <HeaderfilterMenu /> : null}
    </header>
  );
}

import HeaderfilterMenu from "./HeaderFilterMenu";
import Toggle from "@/components/Header/Elements/Toggle";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import UserIcon from "@/components/Header/Elements/UserIcon";
import { ContainerLayout } from "@/components/ContainerLayout";

interface HeaderProps {
  showFilters?: boolean;
  smallContainer?: boolean;
  showMap?: boolean;
}

export default function Header({
  showFilters = false,
  smallContainer = false,
  showMap = false,
}: HeaderProps) {
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
      className={`${
        showMap ? "border-b border-gray-200" : ""
      } sticky top-0 z-20 bg-white  ${isPinned ? "border-b-0 shadow-md" : ""} ${
        showFilters ? "" : "border-b"
      }`}
    >
      <ContainerLayout smallContainer={smallContainer}>
        <div className="flex items-center justify-between py-2.5 ">
          <h1 className="sm:flex items-center hidden text-2xl font-semibold text-gray-800">
            <Link href="/">🐝 GT Subleaser</Link>
          </h1>
          <div className="flex w-full items-center gap-2.5 sm:max-w-fit sm:justify-between">
            <Link href="/listings/upload">
              <div className="bordershadow-scale-600 rounded-full px-3.5 py-2.5 text-sm font-medium  hover:bg-gray-100">
                <span>Sublease your place</span>
              </div>
            </Link>
            <div className="sm:ml-0 flex items-center ml-auto">
              <Toggle />
            </div>
            <div className="flex items-center justify-center">
              <UserIcon />
            </div>
          </div>
        </div>
      </ContainerLayout>

      {showFilters === true ? <HeaderfilterMenu /> : null}
    </header>
  );
}

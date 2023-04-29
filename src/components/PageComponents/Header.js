import React, { useState, useEffect, useRef } from "react";
import SortMenu from "@/components/SortMenu";
import Toggle from "@/components/PageComponents/Toggle";
import PopoverMenu from "src/components/PopoverMenu.js";

import Link from "next/link";

import UserIcon from "@/components/PageComponents/UserIcon";
import PriceMenu from "../FilterMenus/PriceMenu";
import SemesterMenu from "../FilterMenus/SemesterMenu";
import GenderMenu from "../FilterMenus/GenderMenu";
import PressAnimationButton from "../PressAnimationButton";
import MoveInMenu from "../FilterMenus/MoveInMenu";

export default function Header({ showFilters }) {
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

  // useEffect(() => {
  //   const observer = new IntersectionObserver(entries => {
  //     entries.forEach(entry => {
  //       setIsPinned(entry.isIntersecting);
  //     });
  //   });

  //   observer.observe(stickyRef.current);

  //   return () => {
  //     observer.unobserve(stickyRef.current);
  //   };
  // }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white ${isPinned ? "border-b-0 shadow-md" : ""
        } ${showFilters ? "" : "border-b"}`}
    >
      <div className="relative mx-auto px-6  sm:px-8 xl:px-12 3xl:max-w-screen-3xl">
        <div className="flex items-center justify-between py-2.5 ">
          <h1 className="hidden items-center text-2xl font-semibold text-gray-800 sm:flex">
            <Link href="/">🐝 GT Subleaser</Link>
          </h1>
          <div className="flex w-full items-center gap-2.5 sm:max-w-fit sm:justify-between">
            <Link href="/upload">
              <div className="bordershadow-scale-600 rounded-full px-3.5 py-2.5 text-sm font-medium outline outline-0  outline-gray-200 hover:bg-gray-100">
                <span>Sublease your place</span>
              </div>
            </Link>
            <div className="ml-auto flex items-center sm:ml-0">
              <Toggle />
            </div>
            {/* <div>
              <UserIcon />
            </div> */}
            {/* <PressAnimationButton /> */}
          </div>
        </div>
      </div>

      {showFilters === true ? (
        <div className="mx-auto border-t px-6 sm:px-8 xl:px-12 3xl:max-w-screen-3xl">
          <div className="flex items-center gap-4">
            <div className="flex gap-3 overflow-auto whitespace-nowrap bg-gradient-to-l from-gray-500/5 to-white py-3 pl-0.5 pr-2">
              <PopoverMenu name="Semester" props={<SemesterMenu />} />
              <PopoverMenu name="Gender" props={<GenderMenu />} />
              <PopoverMenu name="Price" props={<PriceMenu />} />
              <PopoverMenu name={"Bathroom"} />
              <PopoverMenu name={"Max Roommates"} />
              <PopoverMenu name={"Move In"} props={<MoveInMenu />} />
              <PopoverMenu name={"Move Out"} />
              {/* <PopoverMenu name={"Building Type"} /> */}
              {/* <PopoverMenu name={"Pets"} /> */}
              {/* <PopoverMenu name={"Parking"} /> */}
              {/* <PopoverMenu name={"Appliances"} /> */}
              {/* <PopoverMenu name={"Furniture"} /> */}
            </div>
            <SortMenu />
          </div>
          {/* <div className="grid grid-cols-8 items-center gap-4">
            <div className="relative col-span-6 max-w-fit md:col-span-7">
              <div className="flex gap-3 overflow-auto whitespace-nowrap px-0.5 py-3">
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-l from-white/0 to-white"></div>
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-white/0 to-white"></div>
                <PopoverMenu name="Semester" props={<SemesterMenu />} />
                <PopoverMenu name="Gender" props={<GenderMenu />} />
                <PopoverMenu name="Price" props={<PriceMenu />} />
                <PopoverMenu name={"Bathroom"} />
                <PopoverMenu name={"Max Roommates"} />
                <PopoverMenu name={"Move In"} />
                <PopoverMenu name={"Move Out"} />
                <PopoverMenu name={"Building Type"} />
                <PopoverMenu name={"Pets"} />
                <PopoverMenu name={"Parking"} />
                <PopoverMenu name={"Appliances"} />
                <PopoverMenu name={"Furniture"} />
              </div>
            </div>
            <div className="col-span-2 flex justify-end md:col-span-1">
              <SortMenu className="" />
            </div>
          </div> */}
        </div>
      ) : null}
    </header>
  );
}

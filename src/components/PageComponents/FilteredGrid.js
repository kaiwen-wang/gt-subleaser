import data from "public/data/house-1.json";
import SkellyImage from "@/components/PageComponents/SkellyImage";

import { AppContext } from "/src/components/AppState.js";
import { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function FilteredGrid({ postsData, error }) {
  let { maxPrice, setMaxPrice } = useContext(AppContext);
  let parsedError = error ? JSON.parse(error) : null;

  return (
    <div className="mx-auto mt-2 px-6 pb-12 sm:px-8 xl:px-12 3xl:max-w-screen-3xl">
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3 xl:grid-cols-4 2xl:grid-cols-5  3xl:grid-cols-6">
        {/* if postsData is not undefined */}
        {postsData && postsData.length !== 0 ? (
          postsData.map((item) => {
            let key = item.id;

            if (item.monthly_price <= maxPrice) {
              return (
                <Link key={key} href={`/listings/${key}`}>
                  <div className="group relative overflow-hidden rounded-sm shadow-md">
                    {/* <div className="absolute inset-y-0 left-0 z-20 ">
                      <div className="flex h-full items-center justify-center">
                        <div className="hidden h-10 w-10 -translate-x-2/4 items-center justify-center rounded-full shadow-md group-hover:flex group-hover:bg-white">
                          <ChevronLeftIcon className="hidden h-4 w-4 translate-x-2 group-hover:block" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 z-20 ">
                      <div className="flex h-full items-center justify-center">
                        <div className="hidden h-10 w-10 translate-x-2/4 items-center justify-center rounded-full shadow-md group-hover:flex group-hover:bg-white">
                          <ChevronRightIcon className="hidden h-4 w-4 -translate-x-2 group-hover:block" />
                        </div>
                      </div>
                    </div> */}

                    <div className="relative w-full pt-[95%]">
                      <div className="absolute inset-x-0 top-0 z-30">
                        <div className="flex">
                          {item.semester.map((item, index) => {
                            let color = "bg-gray-300"
                            let emoji = "⌛"
                            if (item.includes("Fall")) {
                              color = "bg-amber-700/40"
                              emoji = "🍂"
                            }
                            if (item.includes("Spring")) {
                              color = "bg-lime-500/40"
                              emoji = "🌱"
                            }
                            if (item.includes("Summer")) {
                              color = "bg-blue-500/40"
                              emoji = "☀️"
                            }

                            return (
                              <div
                                key={index}
                                className={`ml-2 mt-2 max-w-fit whitespace-nowrap rounded-full ${color} px-2 py-1 text-xs font-semibold backdrop-blur-md text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]`}>
                                <span className="mr-0.5">{emoji}</span>{" "}
                                {item}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 z-30">
                        <div className="flex justify-end px-2 pb-2">
                          {item.roommate_demographics.map((person, i) => {
                            return (
                              <Image
                                src={`/people/${person === "F" ? "woman" : ""}${person === "M" ? "man" : ""}${person === "O" && item.gender_preference === "female" ? "missing-woman" : ""}${person === "O" && item.gender_preference === "male" ? "missing-man" : ""}${person === "O" && item.gender_preference === "not-important" ? "missing-neutral" : ""}.gif`
                                }
                                key={i}
                                alt="stfu"
                                width="12"
                                height="12"
                              />
                            )
                          })}
                        </div>
                      </div>
                      <SkellyImage url={item.id} name={key} />
                    </div>
                  </div>
                  <div className="mt-0.5 flex justify-between">
                    <p className="font-medium tracking-wide">
                      {item.neighborhood}
                    </p>
                    <p>
                      <span className="text-sm font-medium">${item.monthly_price}</span>
                      <span> / </span>
                      <span className="text-gray-600">month</span>
                    </p>
                  </div>
                  <div className="-mt-0.5 mb-0.5 flex justify-between text-sm text-gray-500">
                    <span>{item.free_rooms} Bed {item.private_bathroom ? "1" : "Shared"} Bath in a {item.total_bedrooms}B/{item.total_bathrooms}B</span>
                  </div>
                </Link >
              );
            } else {
              return null;
            }
          })
        ) : (
          <p className="text-gray-500">
            {
              parsedError ? "Error: " + parsedError.info.error + " Code " + parsedError.status :
                postsData && postsData.length === 0 ?
                  "No results found"
                  :
                  "Loading..."

            }
          </p>
        )}
      </div >
    </div >
  );
}

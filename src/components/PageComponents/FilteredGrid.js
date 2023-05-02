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

  function timeAgo(timestamp) {
    const currentTime = new Date();
    const inputTime = new Date(timestamp);
    const timeDifference = currentTime - inputTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    } else {
      return "a few seconds ago";
    }
  }

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

                    <SkellyImage url={item.id} name={key} item={item} />
                  </div>
                  <div className="mt-0.5 flex justify-between">
                    <p className="font-medium tracking-wide">
                      {item.neighborhood}
                    </p>
                    <div>
                      <span className="text-sm font-medium">
                        ${item.monthly_price}
                      </span>
                      <span> / </span>
                      <span className="text-gray-600">month</span>
                    </div>
                  </div>
                  <div className="-mt-0.5 flex justify-between text-sm text-gray-500">
                    <span>
                      {item.free_rooms} Bed{" "}
                      {item.private_bathroom ? "1" : "Shared"} Bath in a{" "}
                      {item.total_bedrooms}B/{item.total_bathrooms}B
                    </span>
                  </div>
                  <span className="block text-sm">
                    {"Posted " + timeAgo(item.created_at)}
                  </span>
                </Link>
              );
            } else {
              return null;
            }
          })
        ) : (
          <p className="text-gray-500">
            {parsedError
              ? "Error: " +
                parsedError.info.error +
                " Code " +
                parsedError.status
              : postsData && postsData.length === 0
              ? "No results found"
              : "Loading..."}
          </p>
        )}
      </div>
    </div>
  );
}

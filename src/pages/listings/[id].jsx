import { AppContext } from "@/components/AppState";
import EmblaCarousel from "@/components/PageComponents/Carousel/Carousel";
import HeadElement from "@/components/Header/HeadElement";
import Header from "@/components/Header/Header";
import { convertDate } from "@/utils/convertDate";
import { fetcher } from "@/utils/fetcher";
import { supabase } from "@/utils/supabase";
import { timeAgo } from "@/utils/timeAgo";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useState } from "react";
import useSWR from "swr";

// Get data for a specific id
export async function getServerSideProps({ params }) {
  let { data, error } = await supabase
    .from("subleases")
    .select()
    .eq("id", params.id);

  if (error || !data || data.length === 0) {
    // show a 404 page
    return {
      notFound: true,
    };
  }

  data = data[0];

  return {
    props: {
      data,
    },
  };
}

export default function Listing({ data }) {
  const [leaseTime, setLeaseTime] = useState(false);

  const { error } = useSWR(
    `/api/UpdateTotalViewsApi?id=${data.id}&currentViews=${data.total_views}`,
    fetcher
  );

  const { data: data2, error: error2 } = useSWR(
    `/api/DownloadPostImagesApi?url=${data.id}`,
    fetcher
  );

  const OPTIONS = {};

  return (
    <>
      <HeadElement title={"GT Subleaser"} />

      <Header smallContainer={true} showFilters={false} />

      <main className="container pt-8 mx-auto">
        <div className="flex justify-between">
          <p className="flex gap-4 text-sm text-gray-500">
            {`Listing ID: ${data.id}`} <span>·</span> Total Views:{" "}
            {data.total_views}
          </p>
          <p className="text-sm text-gray-500">{`Published ${timeAgo(
            data.created_at
          )}`}</p>
        </div>
        {/* <button
          onClick={() => {
            let copyText = data.contact_email;
            navigator.clipboard.writeText(copyText).then(() => {
              alert(`${copyText} copied to clipboard.`);
            });
          }}
          className="hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 block px-4 py-2 mx-auto mb-6 text-sm font-medium text-white bg-gray-400 rounded-md shadow-sm"
        >
          Contact
        </button> */}
        <div className="h-68 flex items-center justify-center w-full gap-2 p-2 mt-2 overflow-auto border border-black rounded-md">
          {data2 &&
            data2.map((image) => (
              <div className="shrink-0 relative w-64 h-64">
                <img
                  src={image}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
        </div>
        <div className="flex pt-5">
          <div className="w-1/2">
            <div className="flex items-end justify-between">
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <span>Hello</span>
            </div>
            <div className="border-b"></div>
            <div className="flex items-end justify-between">
              <div>
                A{" "}
                {data.semester.length > 1 ? (
                  data.semester.map((semester) => (
                    <span className="text-sm text-gray-500">{semester} </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">
                    {data.semester}{" "}
                  </span>
                )}{" "}
                sublease in {data.neighborhood}
              </div>
              <span>
                {data.free_rooms} Bed{" "}
                {data.private_bathroom
                  ? `${Math.min(data.total_bathrooms, 1 * data.free_rooms)}`
                  : `Shared`}{" "}
                Bath in a {data.total_bedrooms}B/{data.total_bathrooms}B
              </span>
            </div>
            <div className="mt-8">{data.description}</div>

            <div className="pt-8 text-xl font-medium">Amenities</div>
            <div className="grid grid-cols-4">
              <div className="p-2 border">Parking</div>
              <div className="p-2 border">Furnished</div>
              <div className="p-2 border">Balcony</div>
              <div className="p-2 border">Connected Bathroom</div>
            </div>

            <div className="pt-8 text-xl font-medium">Allowed</div>
            <div className="grid grid-cols-4">
              <div className="p-2 border">Pets</div>
              <div className="p-2 border">Drinking</div>
              <div className="p-2 border">Smoking</div>
              <div className="p-2 border">Parties</div>
            </div>

            <div className="pt-8 text-xl font-medium">Appliances</div>
            <div className="grid grid-cols-4">
              <div className="p-2 border">Washing Machine</div>
              <div className="p-2 border">Clothes Dryer</div>
              <div className="p-2 border">Fridge</div>
              <div className="p-2 border">Freezer</div>
              <div className="p-2 border">Air Conditioner</div>
              <div className="p-2 border">Heating</div>
              <div className="p-2 border">Stove</div>
              <div className="p-2 border">Stove Hood</div>
              <div className="p-2 border">Microwave</div>
              <div className="p-2 border">Dishwasher</div>
              <div className="p-2 border">Drain Disposal</div>
              <div className="p-2 border">Television</div>
            </div>
          </div>
          <div className="w-1/2 p-8">
            <div className="flex flex-col p-4 border rounded-lg">
              <div className="">
                <span className="text-xl font-medium">Total Price:</span>{" "}
                {data.monthly_price}
              </div>

              <div className="mt-4 mb-8 border-b"></div>
              <div className="">Monthly Price: {data.monthly_price}</div>
              <div className="">Utilities: {data.utilities_fee}</div>
              <div className="">Other Fees: {data.misc_fees}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

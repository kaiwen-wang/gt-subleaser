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
import { calculateTotalCost } from "@/utils/calculateTotalCost";
import { createAnds } from "@/utils/createAnds";
import { GenderedPeople } from "@/components/PageComponents/SkellyImage";

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
  data.semester = createAnds(data.semester);

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

  // useEffect(() => {
  //   console.log(data.semester);
  //   console.log(createAnds(data.semester));
  // }, [data]);

  return (
    <>
      <HeadElement title={"GT Subleaser"} />

      <Header smallContainer={true} showFilters={false} />

      <main className=" container pb-16 mx-auto">
        <div className="flex justify-between mt-6">
          <p className="flex gap-2 text-sm text-gray-500">
            {`Listing ID: ${data.id}`} <span>·</span> Total Views:{" "}
            {data.total_views}
          </p>
          <p className="text-sm text-gray-500">{`Published ${timeAgo(
            data.created_at
          )}`}</p>
        </div>

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
        <div className="lg:flex-row flex flex-col gap-16 mt-8">
          <div className="lg:w-8/12 w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{data.title}</h1>
              <div className="flex flex-row gap-1.5">
                {data.gender_preference === "female" ? (
                  <div className="rounded-full px-1.5 py-0.5 text-xs  font-medium bg-rose-500 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] whitespace-nowrap">
                    Women Only
                  </div>
                ) : null}
                {data.gender_preference === "male" ? (
                  <div className="rounded-full px-1.5 py-0.5 text-xs font-medium bg-blue-500 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%) whitespace-nowrap">
                    Men Only
                  </div>
                ) : null}
                {data.gender_preference === "not-important" ? (
                  <div className="rounded-full px-1.5 py-0.5 text-xs font-medium bg-gray-500 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%) whitespace-nowrap">
                    Any Gender
                  </div>
                ) : null}
                <GenderedPeople item={data} />
              </div>
            </div>
            <div className="border-b"></div>
            <div className="flex items-end justify-between">
              <div className="text-sm text-gray-500">
                {data.semester} in {data.neighborhood}
              </div>

              <span className="text-sm text-gray-500">
                {data.free_rooms} Bed{" "}
                {data.private_bathroom
                  ? `${Math.min(data.total_bathrooms, 1 * data.free_rooms)}`
                  : `Shared`}{" "}
                Bath in a {data.total_bedrooms}B/{data.total_bathrooms}B
              </span>
            </div>
            <div className=" mt-8 font-mono text-sm">
              See what they have to say:
            </div>
            <div className="rounded-xl p-8 mt-1 text-sm bg-gray-100">
              {data.description}
            </div>

            <div className=" flex items-baseline justify-between gap-2 mt-8">
              <div className="text-lg font-medium">Amenities</div>
              <span className=" text-sm text-gray-500">
                {data.amenities_list.length > 0
                  ? `${data.amenities_list.length} available`
                  : null}
              </span>
            </div>
            <div className=" grid grid-cols-4 gap-1 text-sm font-medium">
              <div
                className={`${
                  data.amenities_list && data.amenities_list.includes("Parking")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                Parking
              </div>
              <div
                className={`${
                  data.amenities_list &&
                  data.amenities_list.includes("Furnished")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                {" "}
                Furnished
              </div>
              <div
                className={`${
                  data.amenities_list && data.amenities_list.includes("Balcony")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                {" "}
                Balcony
              </div>
              <div
                className={`${
                  data.amenities_list &&
                  data.amenities_list.includes("Connected Bathroom")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border rounded-lg flex items-center justify-center`}
              >
                Connected Bathroom
              </div>
            </div>

            <div className="pt-8 text-lg font-medium">Allowed</div>
            <div className=" grid grid-cols-4 gap-1 text-sm font-medium">
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Pets")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                Pets
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Smoking")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Smoking
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Drinking")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Drinking
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Parties")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Parties
              </div>
            </div>

            <div className="pt-8 text-lg font-medium">Appliances</div>
            <div className=" grid grid-cols-4 gap-1 text-sm font-medium">
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Pets")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                Washing Machine
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Smoking")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                Clothes Dryer
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Drinking")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Fridge
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Parties")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Freezer
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Parties")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Air Conditioner
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Parties")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Heating
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Parties")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Stove
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Parties")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Stove Hood
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Parties")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Microwave
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Parties")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Dishwasher
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Parties")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Drain Disposal
              </div>
              <div
                className={`${
                  data.allowed_list && data.allowed_list.includes("Parties")
                    ? "border-black"
                    : "border-gray-200 text-gray-200"
                } px-2 py-3 border  rounded-lg`}
              >
                {" "}
                Television
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col p-4 border rounded-lg">
              <div className="">
                <span className=" font-medium">Estimated Total Price:</span> $
                {calculateTotalCost(
                  data.monthly_price,
                  data.utilities_fee,
                  data.misc_fees,
                  data.move_in,
                  data.move_out
                )}
              </div>
              <button
                onClick={() => {
                  let copyText = data.contact_email;
                  navigator.clipboard.writeText(copyText).then(() => {
                    alert(`${copyText} copied to clipboard.`);
                  });
                }}
                className="hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 block px-4 py-2 mx-auto mb-6 text-sm font-medium text-white bg-gray-400 rounded-md shadow-sm"
              >
                Contact
              </button>

              {/* {data.move_in}
              {data.move_out} */}

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

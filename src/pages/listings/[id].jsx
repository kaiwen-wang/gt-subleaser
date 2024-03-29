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
import dateDiff from "@/utils/dateDiff";
import FeedbackModal from "@/components/PageComponents/FeedbackModal";
import { UserCircleIcon } from "@heroicons/react/24/outline";

// Get data for a specific id
export async function getServerSideProps({ params }) {
  let { data, error } = await supabase
    .from("subleases_active")
    .select(
      `
      *,
      profiles(*),
      subleases_draft(*)
    `
    )
    // .eq("active_post", true)
    .eq("id", params.id);

  if (error || !data || data.length === 0) {
    return {
      notFound: true,
    };
  }

  data = data[0];

  let flattenedData = {}
  for (const [key, value] of Object.entries(data)) {
    if (key === "profiles") {
      for (const [key2, value2] of Object.entries(value)) {
        flattenedData[key2] = value2
      }
    } else if (key === "subleases_draft") {
      for (const [key2, value2] of Object.entries(value)) {
        flattenedData[key2] = value2
      }
    } else {
      flattenedData[key] = value
    }
  }

  flattenedData.semester = createAnds(flattenedData.semester);

  return {
    props: {
      data: flattenedData,
    },
  };
}

export default function Listing({ data }) {
  const [leaseTime, setLeaseTime] = useState(false);

  useEffect(() => {
    console.log("hereis d", data)
  }, [data])


  const { error } = useSWR(
    `/api/UpdateTotalViewsApi?id=${data.id}&currentViews=${data.unique_views}`,
    fetcher
  );

  const { data: data2, error: error2 } = useSWR(
    `/api/DownloadPostImagesApi?url=${data.id}`,
    fetcher
  );

  const OPTIONS = {};


  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (data.avatar_url) downloadImage(data.avatar_url);
  }, [data.avatar_url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);

      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }


  const nameConst = data.first_name || data.email.split("@")[0]


  return (
    <>
      <HeadElement title={"GT Subleaser"} />
      <Header smallContainer={true} showFilters={false} />

      <main className="md:max-w-4xl lg:max-w-5xl xl:max-w-6xl lg:pb-12 px-4 pb-6 mx-auto">
        <div className="flex justify-between mt-6">
          <p className="flex gap-2 text-sm text-gray-500">
            {`Listing ID: ${data.id}`}
            {/* <span>·</span> Total Views:{" "}
            {data.unique_views} */}
          </p>
          <p className="text-sm text-gray-500">{`Published ${timeAgo(
            data.date_submitted
          )}`}</p>
        </div>

        <div className="flex items-center w-full h-64 gap-2 mt-2 overflow-x-auto overflow-y-hidden border border-black rounded-md">
          {data2 &&
            data2.map((image) => (
              <div className="shrink-0 relative w-64 h-64"
                key={image}
              >
                <img
                  src={image}
                  alt="Image of the lease"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
        </div>

        <div id="content" className="lg:flex-row flex flex-col gap-8 mt-8">
          <div className="lg:w-9/12 w-full">
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
                {data.free_bedrooms} Bed{" "}
                {data.free_bathrooms} {" "}
                {/* {data.private_bathroom
                  ? `${Math.min(data.total_bathrooms, 1 * data.free_bedrooms)}`
                  : `Shared`}{" "} */}
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
              <span
                className={`${data.amenities_list.length > 0
                  ? "text-gray-500"
                  : "text-gray-200"
                  } text-sm `}
              >
                {data.amenities_list.length} available
              </span>
            </div>
            <div className=" grid grid-cols-4 gap-1 text-sm font-medium">
              <div
                className={`${data.amenities_list && data.amenities_list.includes("Parking")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                Parking
              </div>
              <div
                className={`${data.amenities_list &&
                  data.amenities_list.includes("Furnished")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                {" "}
                Furnished
              </div>
              <div
                className={`${data.amenities_list && data.amenities_list.includes("Balcony")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                {" "}
                Balcony
              </div>
              <div
                className={`${data.amenities_list &&
                  data.amenities_list.includes("Connected Bathroom")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border rounded-lg flex items-center justify-center text-center`}
              >
                Connected Bathroom
              </div>
            </div>
            <div className=" flex items-baseline justify-between gap-2 mt-8">
              <div className="text-lg font-medium">Allowed</div>
              <span
                className={`${data.allowed_list.length > 0
                  ? "text-gray-500"
                  : "text-gray-200"
                  } text-sm `}
              >
                {data.allowed_list.length} available
              </span>
            </div>{" "}
            <div className=" grid grid-cols-4 gap-1 text-sm font-medium">
              <div
                className={`${data.allowed_list && data.allowed_list.includes("Pets")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                Pets
              </div>
              <div
                className={`${data.allowed_list && data.allowed_list.includes("Smoking")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                {" "}
                Smoking
              </div>
              <div
                className={`${data.allowed_list && data.allowed_list.includes("Drinking")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                {" "}
                Drinking
              </div>
              <div
                className={`${data.allowed_list && data.allowed_list.includes("Parties")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                {" "}
                Parties
              </div>
            </div>
            <div className=" flex items-baseline justify-between gap-2 mt-8">
              <div className="text-lg font-medium">Appliances</div>
              <span
                className={`${data.appliances_list.length > 0
                  ? "text-gray-500"
                  : "text-gray-200"
                  } text-sm `}
              >
                {data.appliances_list.length} available
              </span>
            </div>{" "}
            <div className=" grid grid-cols-4 gap-1 text-sm font-medium">
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Washing Machine")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Washing Machine
              </div>
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Clothes Dryer")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center`}
              >
                Clothes Dryer
              </div>
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Fridge")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Fridge
              </div>
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Freezer")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Freezer
              </div>
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Air Conditioner")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Air Conditioner
              </div>
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Heating")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Heating
              </div>
              <div
                className={`${data.appliances_list && data.appliances_list.includes("Stove")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Stove
              </div>
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Stove Hood")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Stove Hood
              </div>
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Microwave")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Microwave
              </div>
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Dishwasher")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Dishwasher
              </div>
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Drain Disposal")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Drain Disposal
              </div>
              <div
                className={`${data.appliances_list &&
                  data.appliances_list.includes("Television")
                  ? "border-black"
                  : "border-gray-200 text-gray-200"
                  } px-2 py-3 border  rounded-lg flex items-center justify-center text-center`}
              >
                Television
              </div>
            </div>
          </div>
          <div className="lg:w-5/12 w-full">
            <div className="flex flex-col p-4 mb-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <div
                  className={`relative w-11 shadow-md h-11 bg-gray-500 rounded-full `}
                >
                  {data.avatar_url ? (
                    <img
                      className={`${avatarUrl ? "" : "hidden"
                        } object-cover h-full w-full rounded-full`}
                      src={avatarUrl}
                      alt="Profile"
                    />
                  ) : (
                    <UserCircleIcon className=" text-white/90 p-0.5" />
                  )}
                </div>
                <p className="font-medium text-gray-800">
                  Post created by {nameConst}
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    // variable that stores current URL
                    let url = window.location.href;

                    let subject = encodeURIComponent("[GT Subleaser] Contact Request");
                    let body = encodeURIComponent("Hi " + nameConst + ",\n\nI am interested in your listing on GT Subleaser.");
                    let mailtoLink = `mailto:${data.email}?subject=${subject}&body=${body}`;

                    window.open(mailtoLink, '_blank');
                  }}
                  className="hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 block px-3 py-1.5 ml-auto text-sm font-medium text-white bg-gray-400 rounded-md shadow-sm"
                >
                  Contact
                </button>
              </div>
              <div className="mt-3 font-mono text-xs">
                Here's their self-introduction:
              </div>
              <div className="rounded-xl p-4 mt-1 text-sm bg-gray-100">
                {data.self_introduction}
              </div>

            </div>


            <div className="flex flex-col p-4 border rounded-lg">
              <div className="flex">
                <div className="">
                  {/* <span className=" font-medium">Estimated Price:</span> $
                  {calculateTotalCost(
                    data.monthly_price,
                    data.utilities_fee,
                    data.misc_fees,
                    data.move_in,
                    data.move_out
                  )}
                  <div className="text-sm">
                    For a total of {dateDiff(data.move_in, data.move_out)}
                  </div> */}
                </div>

              </div>
              {/* {data.move_in}
              {data.move_out} */}
              <div className="text-sm">
                <span className="font-medium">{convertDate(data.move_in)}</span> to  <span className="font-medium">{convertDate(data.move_out)}</span>
              </div>

              <div className="mt-4 mb-4 border-b"></div>

              <div className="text-sm">
                Monthly Price: ${data.monthly_price}
              </div>
              <div className="text-sm">Utilities: ${data.utilities_fee}</div>
              <div className="text-sm">Other Fees: ${data.misc_fees}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

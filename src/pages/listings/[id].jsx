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

  const OPTIONS = {};

  return (
    <>
      <HeadElement title={"GT Subleaser"} />

      <Header smallContainer={true} showFilters={false} />

      <main className="container pt-8 mx-auto">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">{`Listing ID: ${data.id}`}</p>
          <p className="text-sm text-gray-500">{`Published ${timeAgo(
            data.created_at
          )}`}</p>
        </div>
        <h1 className="pt-16 text-2xl font-medium text-center">{data.title}</h1>
        <div
          className="mt-2 mb-4 text-sm prose text-center text-gray-500 cursor-pointer"
          onClick={() => {
            setLeaseTime(!leaseTime);
          }}
        >
          {leaseTime
            ? `(${data.semester.join(", ")})`
            : `${convertDate(data.move_in)} to ${convertDate(data.move_out)}`}
          {leaseTime}
        </div>
        <button
          onClick={() => {
            let copyText = data.contact_email;
            navigator.clipboard.writeText(copyText).then(() => {
              alert(`${copyText} copied to clipboard.`);
            });
          }}
          className="hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 block px-4 py-2 mx-auto mb-16 text-sm font-medium text-white bg-gray-400 rounded-md shadow-sm"
        >
          Contact
        </button>

        <div className="max-w-2xl mx-auto mt-16 mb-16 prose">
          <p className="mt-2 text-gray-500">{data.description}</p>
        </div>

        <div className="max-w-2xl mx-auto mt-16 mb-16">
          Fees
          <br></br>
          Monthly Price: {data.monthly_price}
          <br></br>
          Utility Cost: {data.utilities_fee}
          <br></br>
          Other Fees: {data.misc_fees}
        </div>
        {"Total views: " + data.total_views}
      </main>
    </>
  );
}

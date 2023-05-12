import { AppContext } from "@/components/AppState";
import EmblaCarousel from "@/components/Carousel/Carousel";
import HeadElement from "@/components/Header/HeadElement";
import Header from "@/components/Header/Header";
import { convertDate } from "@/utils/convertDate";
import { supabase } from "@/utils/supabase";
import { timeAgo } from "@/utils/timeAgo";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useState } from "react";

export async function getServerSideProps({ params }) {
  let { data, error } = await supabase
    .from("subleases")
    .select()
    .eq("id", params.id);

  // check error

  data = data[0];

  return {
    props: {
      data,
    },
  };
}

export default function Listing(props) {
  const router = useRouter();
  let url = router.query.id;
  const [supabaseURL, setSupabaseURL] = useState([]);

  const { data } = props;

  useEffect(() => {
    downloadFilesInFolder();
  }, [url]);

  async function downloadFilesInFolder() {
    // List all files in the folder
    const { data, error } = await supabase.storage
      .from("sublease-images")
      .list(`${url}/`);

    if (error) {
      throw error;
    }

    // loop through data and download list file names
    const tempSupabaseURL = [];
    for (const file of data) {
      let path = `${url}/${file.name}`;

      const { data: fileContent, error: downloadError } = await supabase.storage
        .from("sublease-images")
        .download(path);

      if (downloadError) {
        throw downloadError;
      }

      // Create a Blob with the file content and create a local URL
      const fileBlob = new Blob([fileContent], { type: "image/*" });
      const fileUrl = URL.createObjectURL(fileBlob);
      tempSupabaseURL.push(fileUrl);
    }

    // console.log(tempSupabaseURL[0]);
    setSupabaseURL(tempSupabaseURL);
  }

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setRefreshKey(refreshKey + 1);
  }, [supabaseURL]);

  const [leaseTime, setLeaseTime] = useState(false);
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
        {/* <div className="grid grid-cols-2 gap-3 text-sm font-medium [&>*]:rounded-md [&>*]:px-3 [&>*]:pb-2 [&>*]:pt-3 [&>*]:outline [&>*]:outline-gray-200">
          <div className="">
            <Image
              src="/washing-machine.png"
              alt="Dryer"
              width="24"
              height="24"
            />
            <p>Washing Machine</p>
          </div>
          <div>
            <Image src="/dryer.png" alt="Dryer" width="24" height="24" />
            <p>Dryer</p>
          </div>
          <div>
            <Image src="/sink.png" alt="Dryer" width="24" height="24" />
            <p>Sink</p>
          </div>
          <div>
            <Image src="/disposal.png" alt="Dryer" width="24" height="24" />
            <p>Drain Disposal</p>
          </div>
          <div>
            <Image src="/fridge.png" alt="Dryer" width="24" height="24" />
            <p>Fridge</p>
          </div>
          <div>
            <Image src="/freezer.png" alt="Dryer" width="24" height="24" />
            <p>Freezer</p>
          </div>
          <div>
            <Image
              src="/microwave.png"
              alt="Dryer"
              width="24"
              height="24"
              className="pt-1"
            />
            <p>Microwave</p>
          </div>
          <div>
            <Image src="/oven.png" alt="Dryer" width="24" height="24" />
            <p>Stove</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 text-sm font-medium [&>*]:rounded-md [&>*]:px-3 [&>*]:pb-2 [&>*]:pt-3 [&>*]:outline [&>*]:outline-gray-200">
          <div className="">
            <Image
              src="/washing-machine.png"
              alt="Dryer"
              width="24"
              height="24"
            />
            <p>Pets</p>
          </div>
          <div>
            <Image src="/dryer.png" alt="Dryer" width="24" height="24" />
            <p>Drinking</p>
          </div>
          <div>
            <Image src="/sink.png" alt="Dryer" width="24" height="24" />
            <p>Smoking</p>
          </div>
          <div>
            <Image src="/oven.png" alt="Dryer" width="24" height="24" />
            <p>Parties</p>
          </div>
        </div> */}
      </main>
    </>
  );
}

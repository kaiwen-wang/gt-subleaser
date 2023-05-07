import { AppContext } from "/src/components/AppState.js";
import EmblaCarousel from "@/components/Carousel/Carousel";
import HeadElement from "@/components/PageComponents/HeadElement";
import Header from "@/components/PageComponents/Header";
import { convertDate } from "@/utils/convertDate";
import { supabase } from "@/utils/supabase";
import { timeAgo } from "@/utils/timeAgo";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
// export async function getStaticProps({ params }) {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   );
//   let { data, error } = await supabase
//     .from("subleases")
//     .select()
//     .eq("id", params.id);
//   // I think it's wrapped around an object or array thing so getting first element is needed. It's not getting the first element of anything.
//   data = data[0];
//   return {
//     props: {
//       data,
//     },
//   };
// }
// export async function getStaticPaths() {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   );
//   let { data, error } = await supabase.from("subleases").select("id");
//   let paths = data.map((sublease) => {
//     return {
//       params: {
//         id: sublease.id.toString(), // Changed this line to provide the id property
//       },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// }
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
      <HeadElement />

      <Header smallContainer={true} />

      <main className="container mx-auto pt-8">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">{`Listing ID: ${data.id}`}</p>
          <p className="text-sm text-gray-500">{`Published ${timeAgo(
            data.created_at
          )}`}</p>
        </div>
        <h1 className="pt-16 text-2xl font-medium text-center">{data.title}</h1>
        <div
          className="prose text-center mt-2 text-sm text-gray-500 mb-4 cursor-pointer"
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
          className="block mx-auto mb-16 px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Contact
        </button>
        <div className="flex rounded-md border border-black max-w-fit overflow-hidden">
          <EmblaCarousel options={OPTIONS} supabaseURL={supabaseURL} />
        </div>

        <div className="mt-16 prose mx-auto max-w-2xl mb-16">
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

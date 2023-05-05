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

    setSupabaseURL(tempSupabaseURL);
  }

  const [leaseTime, setLeaseTime] = useState(false);

  return (
    <>
      <HeadElement />

      <Header smallContainer={true} />
      <main className="container mx-auto pt-4">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">{`Listing ID: ${data.id}`}</p>
          <p className="text-sm text-gray-500">{`Published ${timeAgo(
            data.created_at
          )}`}</p>
        </div>
      </main>

      <main className="flex flex-1 justify-center px-10 pt-32 pb-20 sm:pb-32 sm:pt-48 xl:px-36">
        <div className="flex w-full max-w-screen-xl flex-col items-center">
          <h1 className="pt-16 text-2xl font-medium text-center">
            {data.title}
          </h1>
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
          <div className="border relative h-64 w-[60%] mx-auto sm:aspect-[2/1] rounded-3xl overflow-hidden sm:h-full ">
            {supabaseURL.map((url) => (
              <div key={url} className="relative w-full h-full bg-gray-500">
                <Image
                  src={url}
                  alt="example"
                  // width={200}
                  // height={200}
                  fill="true"
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute bottom-0 left-0">Hi</div>
              </div>
            ))}
          </div>
          <div className="mt-16 prose mx-auto max-w-2xl mb-16">
            <p className="mt-2 text-gray-500">{data.description}</p>
          </div>
        </div>
      </main>
    </>
  );
}

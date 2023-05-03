import { AppContext } from "/src/components/AppState.js";
import EmblaCarousel from "@/components/Carousel/Carousel";
import HeadElement from "@/components/PageComponents/HeadElement";
import Header from "@/components/PageComponents/Header";
import { supabase } from "@/utils/supabase";
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
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

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

  return (
    <>
      <HeadElement />

      <Header />
      <main className="">
        <div className="container mx-auto pb-8 pt-4">
          <div className="grid grid-cols-2">
            <div className="sticky top-20 grid max-h-64 grid-cols-2 grid-rows-2 gap-2 pr-4">
              <div className="grid grid-cols-2 gap-4">
                {supabaseURL.map((url) => (
                  <div key={url} className="w-full h-full">
                    <Image
                      src={url}
                      alt="example"
                      width={500}
                      height={500}
                      layout="responsive"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white">
              <div className="rounded-md px-4 py-4 outline outline-1 outline-gray-700">
                <h1 className="mb-4 text-2xl font-semibold">{data.title}</h1>
                <div className="prose mt-2">{data.description}</div>
              </div>

              <h2 className="mb-2 mt-2 text-center text-xl font-semibold">
                Dates
              </h2>
              <div className="rounded-lg p-4 outline outline-gray-200">
                <div className="h-50">Availability:</div>
                {data.semester}
                {data.move_in}
                MOve out:
                {data.move_out}
              </div>

              <h2 className="mb-2 mt-2 text-center text-xl font-semibold">
                Pricing
              </h2>
              <div className="rounded-lg p-4 outline outline-gray-200">
                <div className="h-50">Pricing per month:</div>
                <ul className="max-w-[50%]">
                  <li className="flex justify-between">
                    <p>Sublease</p>
                    <p>{data.monthly_price}</p>
                  </li>

                  <li className="flex justify-between">
                    <p>Utilities</p>
                    <p>{data.utilities_fee}</p>
                  </li>

                  <li className="flex justify-between">
                    <p>Fees</p>
                    <p>{data.misc_fees}</p>
                  </li>
                </ul>
              </div>

              <h2 className="mb-2 mt-2 text-center text-xl font-semibold">
                Appliances
              </h2>
              <div className="grid grid-cols-2 gap-3 text-sm font-medium [&>*]:rounded-md [&>*]:px-3 [&>*]:pb-2 [&>*]:pt-3 [&>*]:outline [&>*]:outline-gray-200">
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
                  <Image
                    src="/disposal.png"
                    alt="Dryer"
                    width="24"
                    height="24"
                  />
                  <p>Drain Disposal</p>
                </div>
                <div>
                  <Image src="/fridge.png" alt="Dryer" width="24" height="24" />
                  <p>Fridge</p>
                </div>
                <div>
                  <Image
                    src="/freezer.png"
                    alt="Dryer"
                    width="24"
                    height="24"
                  />
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
              <h2 className="mb-2 mt-4 text-center text-xl font-semibold">
                Allowed
              </h2>
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

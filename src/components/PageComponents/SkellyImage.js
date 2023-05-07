import EmblaCarousel from "../Carousel/Carousel";
import { convertDate } from "@/utils/convertDate";
import { supabase } from "@/utils/supabase";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkellyImage({ freudID, url, item }) {
  const [supabaseURL, setSupabaseURL] = useState(null);

  useEffect(() => {
    // downloadFirstFileInFolder();
    downloadFilesInFolder();
  }, [url]);

  // async function downloadFirstFileInFolder() {
  //   try {
  //     // List all files in the folder
  //     const { data, error } = await supabase.storage
  //       .from("sublease-images")
  //       .list(`${url}/`);

  //     if (error) {
  //       throw error;
  //     }

  //     // Get the first file in the folder
  //     const firstFile = data[0];

  //     if (!firstFile) {
  //       console.log("No files found in the folder.");
  //       return;
  //     } else {
  //       console.log("First file:", firstFile.name);
  //     }

  //     let path = `${url}/${firstFile.name}`;

  //     // Download the first file
  //     const { data: fileContent, error: downloadError } = await supabase.storage
  //       .from("sublease-images")
  //       .download(path);

  //     if (downloadError) {
  //       throw downloadError;
  //     }

  //     // Create a Blob with the file content and create a local URL
  //     const fileBlob = new Blob([fileContent], { type: "image/*" });
  //     const fileUrl = URL.createObjectURL(fileBlob);
  //     setSupabaseURL(fileUrl);
  //   } catch (error) {
  //     console.error("Error downloading the first file:", error.message);
  //   }
  // }

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

  return (
    <div className="relative w-full pt-[95%] group">
      {/* {!isLoaded ? (
        // Grey bg when not loaded
        <div className="absolute inset-x-0 top-0 z-[10] h-full w-full bg-gray-100"></div>
      ) : null} */}
      <div className="absolute pl-2 inset-x-0 top-0 z-30 group-hover:opacity-0">
        <div className=" mt-2 flex max-w-fit whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold backdrop-blur-sm text-white bg-zinc-500/50 [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]">
          {convertDate(item.move_in) + " to " + convertDate(item.move_out)}
        </div>
        <div className="flex  mt-[0.35rem] gap-1 max-w-fit ">
          {item.semester.map((item, index) => {
            let color = "bg-stone-500";
            let emoji = "⌛";
            if (item.includes("Fall")) {
              color = "bg-amber-600";
              emoji = "🍂";
            }
            if (item.includes("Spring")) {
              color = "bg-lime-500";
              emoji = "🌱";
            }
            if (item.includes("Summer")) {
              color = "bg-sky-500";
              emoji = "☀️";
            }

            return (
              <div
                key={index}
                className={`whitespace-nowrap rounded-full ${color} px-2 py-1 text-xs font-semibold backdrop-blur-sm text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]`}
              >
                {/* <span className="mr-0.5">{emoji}</span> */}
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end group-hover:opacity-0">
        <div className="flex justify-start px-2 pb-2 h-7">
          {item.roommate_demographics.map((person, i) => {
            return (
              <Image
                src={`/people/${person === "F" ? "woman" : ""}${
                  person === "M" ? "man" : ""
                }${
                  person === "O" && item.gender_preference === "female"
                    ? "missing-woman"
                    : ""
                }${
                  person === "O" && item.gender_preference === "male"
                    ? "missing-man"
                    : ""
                }${
                  person === "O" && item.gender_preference === "not-important"
                    ? "missing-neutral"
                    : ""
                }.gif`}
                key={i}
                alt={"Roommates"}
                width={12}
                height={12}
                style={{ width: "auto", height: "auto" }}
              />
            );
          })}
        </div>
        {item.gender_preference === "female" ? (
          <div className="mb-2 rounded-full px-1.5 py-0.5 text-xs font-medium bg-rose-500 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] ">
            Women Only
          </div>
        ) : null}
        {item.gender_preference === "male" ? (
          <div className="mb-2 rounded-full px-1.5 py-0.5 text-xs font-medium bg-blue-500 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]">
            Men Only
          </div>
        ) : null}
      </div>
      {supabaseURL ? (
        <div className="flex absolute top-0 w-full h-full bg-gray-500  items-center justify-center">
          <EmblaCarousel
            supabaseURL={supabaseURL}
            url={url}
            freudID={freudID}
            // className={`${isLoaded ? "" : "hidden"} relative`}
          />
        </div>
      ) : null}
    </div>
  );
}

/* <Image
            // src={"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} // Use the "url" property of the item
            src={supabaseURL}
            // src=""
            key={name}
            alt="An image of a room"
            fill="true"
            sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
            style={{ objectFit: "cover" }}
            className="relative"
            // className={`${isLoaded ? '' : 'invisible'}`}

            // This is useless because onLoadingComplete only is an external URL; now that images are becoming saved locally this serves no purpose.
          /> */

import { convertDate } from "@/utils/convertDate";
import { fetcher } from "@/utils/fetcher";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import useSWR from "swr";
import EmblaCarousel from "./Carousel/Carousel";

// TODO: what the hell is freudId?
export default function SkellyImage({ freudID, url, item, profile }) {
  const { data, error, isLoading } = useSWR(
    `/api/DownloadPostImagesApi?url=${url}`,
    fetcher
  );

  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (profile.avatar_url) downloadImage(profile.avatar_url);
  }, [profile.avatar_url]);

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
      setAvatarUrl(null);
    }
  }

  return (
    <div className="relative w-full pt-[95%] group overflow-hidden">
      {/* {isLoading ? (
        <div className="animate-pulse absolute top-0 left-0 w-full h-full bg-gray-600"></div>
      ) : null} */}
      <div className="group-hover:opacity-0 absolute inset-x-0 top-0 z-30 pl-2">
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
                className={`whitespace-nowrap rounded-full ${color} px-2 py-1 text-xs font-semibold  text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]`}
              >
                {/* <span className="mr-0.5">{emoji}</span> */}
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="group-hover:opacity-0 absolute inset-x-0 bottom-0 z-30 flex items-end gap-1.5 mb-2 ml-2">
        <GenderedPeople item={item} />
        {item.gender_preference === "female" ? (
          <div className="rounded-full px-1.5 py-0.5 text-xs  font-medium bg-rose-500 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] whitespace-nowrap">
            Women Only
          </div>
        ) : null}
        {item.gender_preference === "male" ? (
          <div className="rounded-full px-1.5 py-0.5 text-xs font-medium bg-blue-500 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%) whitespace-nowrap">
            Men Only
          </div>
        ) : null}
      </div>
      <div className="group-hover:opacity-0 absolute bottom-0 right-0 z-30 m-1.5">
        <div className=" flex flex-row items-center gap-1">
          <div className="px-2 py-0.5 bg-slate-600/60  backdrop-blur text-xs text-white font-medium rounded-full">
            {profile.first_name || profile.email.split("@")[0]}
          </div>
          <div
            className={`relative w-11 shadow-md h-11 bg-gray-500 rounded-full `}
          >
            {profile.avatar_url && avatarUrl ? (
              <img
                className={`${
                  avatarUrl ? "" : "hidden"
                } object-cover h-full w-full rounded-full`}
                src={avatarUrl}
                alt="Profile"
              />
            ) : (
              <UserCircleIcon className=" text-white/90 p-0.5" />
            )}
          </div>
        </div>
      </div>
      {data ? (
        <div className="absolute top-0 z-0 flex items-center justify-center w-full h-full">
          <EmblaCarousel supabaseURL={data} url={url} freudID={freudID} />
        </div>
      ) : null}
    </div>
  );
}

export function GenderedPeople({ item }) {
  return (
    <div className=" flex items-center justify-start">
      {item.roommate_demographics.map((person, i) => {
        let roommatePathName = "";

        if (person === "F") {
          roommatePathName = "woman";
        } else if (person === "M") {
          roommatePathName = "man";
        } else {
          if (person === "O" && item.gender_preference === "female") {
            roommatePathName = "missing-woman";
          } else if (person === "O" && item.gender_preference === "male") {
            roommatePathName = "missing-man";
          } else if (
            person === "O" &&
            item.gender_preference === "not-important"
          ) {
            roommatePathName = "missing-neutral";
          }
        }

        return (
          <img
            src={`/images/people/${roommatePathName}.gif`}
            key={i}
            alt={`${roommatePathName}`}
            width={11}
            // height={16}
            // style={{ width: "auto", height: "55%" }}
          />
        );
      })}
    </div>
  );
}

import { TrashIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function CoverImage({ id, index, img, deleteImage, loading }) {
  async function deleteImageFromServer(imgName) {
    try {
      let res = await fetch(
        `/api/DeleteImagesApi?idNum=${id}&imgName=${imgName}`
      );

      console.log("CoverImage.js deleteImageFromServer() res: ", res);
    } catch (error) {
      console.error("CoverImage.js deleteImageFromServer() ", error);
    }
  }

  console.log("here is img", img);

  return (
    <div className="shrink-0 h-60 w-60 outline outline-black relative rounded-md">
      <Image
        src={typeof img === "string" ? img : URL.createObjectURL(img)}
        alt="Image you're uploading"
        width={64} // Added required width property
        height={64} // Added required height property
        className={`${loading ? "opacity-50" : ""} h-full w-full`} // Added w-full and h-full
        style={{ objectFit: "cover" }}
      />
      <div className=" absolute top-0 right-0 mt-2 mr-2 cursor-pointer">
        <TrashIcon
          className="backdrop-blur outline drop-shadow w-8 h-8 p-1 text-red-600 bg-white rounded-full"
          onClick={() => {
            console.log(
              "HERE IMG NAME",
              img,
              img.split("/")[img.split("/").length - 1]
            );
            if (typeof img === "string") {
              deleteImageFromServer(img.split("/")[img.split("/").length - 1]);
            } else {
              deleteImageFromServer(img.name);
            }
            deleteImage(index);
          }}
        />
      </div>
      {loading && (
        <div className="animate-pulse absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
          <CloudArrowUpIcon className=" w-12 h-12 text-black" />
          <span className="pl-2 font-medium">Uploading...</span>
        </div>
      )}
    </div>
  );
}

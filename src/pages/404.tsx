import HeadElement from "@/components/PageComponents/HeadElement";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="md:h-screen flex flex-col justify-between bg-gray-800">
      <HeadElement title={"GT Subleaser | Page Not Found"} />

      <div className="flex flex-col items-center justify-center w-screen h-screen text-gray-200">
        <p className="text-6xl">🍅</p>
        <p className="text-4xl">
          404, nOt FoUnD. this page doesn't exist. spoooky.
        </p>
        <Link
          href="/"
          className="bg-black-500 hover:bg-white hover:text-black px-4 py-2 mt-8 font-semibold rounded-md cursor-pointer"
        >
          Go to main page
        </Link>
      </div>
    </div>
  );
}

import HeadElement from "@/components/PageComponents/HeadElement";
import Header from "@/components/PageComponents/Header";
import Link from "next/link";

export default function UploadSuccess() {
  return (
    <>
      <HeadElement />
      <Header />
      <div className="  mx-auto max-w-lg text-center">
        <p className="mt-16">
          Congratulations! Your post has been successfully uploaded. It will be
          checked for content and hopefully released shortly. This app is a
          prototype and we hope to implement email notifications in the future.
        </p>
        <br></br>
        <Link href="/">
          <button className="rounded-full p-2 outline hover:bg-gray-300">
            Back to main page
          </button>
        </Link>
      </div>
    </>
  );
}

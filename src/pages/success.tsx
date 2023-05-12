import HeadElement from "@/components/PageComponents/HeadElement";
import Header from "@/components/PageComponents/Header";
import Link from "next/link";

export default function UploadSuccess() {
  return (
    <>
      <HeadElement title={"Success!"} />
      <Header showFilters={false} />
      <div className=" max-w-lg mx-auto text-center">
        <p className="mt-16">
          Congratulations! Your post has been successfully uploaded. It will be
          checked for content and hopefully released shortly. This app is a
          prototype and we hope to implement email notifications in the future.
        </p>
        <br></br>
        <Link href="/">
          <button className="outline hover:bg-gray-300 p-2 rounded-full">
            Back to main page
          </button>
        </Link>
      </div>
    </>
  );
}

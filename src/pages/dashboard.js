import Header from "@/components/PageComponents/Header";
import HeadElement from "@/components/PageComponents/HeadElement";

export default function Dashboard() {
  return (
    <>
      <HeadElement />

      <Header />

      <div className="container mx-auto">
        <div className="flex h-screen items-center justify-center">
          <div className="max-w-sm rounded-md p-8 shadow-md outline">
            <h1 className="text-base">Active Subleases</h1>
            <p className="mt-2 text-sm text-gray-500">
              It looks like you don't have any subleases at the moment.
            </p>
            <button className="mt-3 rounded-md px-2 py-1 text-xs outline outline-1 outline-yellow-400 text-white bg-yellow-600 hover:bg-yellow-500">
              Create a sublease
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

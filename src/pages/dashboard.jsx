import Header from "@/components/Header/Header";

export default function Dashboard() {
    return (
        <>
            <Header smallContainer={true} />

            <main className="md:max-w-4xl lg:max-w-5xl xl:max-w-6xl px-4 mx-auto">

                <div className="mt-8">
                    <span className="decoration-gray-500 font-medium text-gray-800 underline">
                        My Subleases
                    </span>
                    <span className="text-gray-500"> / </span>
                    <span className="font-medium text-gray-400">
                        0 active
                    </span>
                    <span className="text-gray-500"> · </span>
                    <span className="font-medium text-gray-400">
                        0 total
                    </span>

                </div>

                <div className="mt-4">


                    <div className=" h-12 border border-gray-500 rounded-md">
                        Title
                        Posted On
                        Approved
                        Delete
                    </div>
                </div>
            </main>
        </>
    )
}
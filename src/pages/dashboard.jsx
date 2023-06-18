import Header from "@/components/Header/Header";
import { PhoneArrowDownLeftIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline"
import LoginPage from "../components/LoginPage";
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { timeAgo } from "@/utils/timeAgo";
import Link from "next/link";
import { ContainerLayout } from "@/components/ContainerLayout";

export default function Dashboard() {
    const [session, setSession] = useState(null);
    const supabase = useSupabaseClient();

    // const {data, error}= useSWR()

    const { data, error, isLoading } = useSWR(
        `/api/DownloadPersonalSubleases?user=${session ? session.user.id : ""}`,
        fetcher
    );

    const [subleases, setSubleases] = useState([]);

    useEffect(() => {
        if (data) {
            setSubleases(data["data"]);
        }
    }, [data]);

    async function disableActiveListing(id) {
        try {
            const { data, error } = await supabase
                .from("subleases_active")
                .delete()
                .eq("id", id);

            console.log("here is the id", id)

            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        }

        // remove the element with the id from the dom
        console.error("here data", data)
        const newSubleases = subleases.filter((sublease) => sublease.id !== id);
        setSubleases(newSubleases);
    }


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {

            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);



    if (session) {
        return (
            <>
                <Header smallContainer={true} />

                <ContainerLayout smallContainer={true}>

                    {/* <div className="md:grid-cols-3 grid gap-3 mt-8">
                        <div className="rounded-xl h-16 p-4 border border-gray-600 shadow-sm">
                            <div className="shrink-0 flex items-center justify-between">
                                <div className=" flex items-center gap-3">

                                    <EyeIcon className="w-6 h-6 p-1 text-gray-600 bg-gray-200 border rounded-md shadow-sm" />
                                    <span className=" font-gray-800 text-lg">Unique Views</span>


                                </div>
                                <div className=" mr-1 font-mono">
                                    20
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl h-16 p-4 border border-gray-600 shadow-sm">
                            <div className="shrink-0 flex items-center justify-between">
                                <div className=" flex items-center gap-3">

                                    <PhoneArrowDownLeftIcon className="w-6 h-6 p-1 text-gray-600 bg-gray-200 border rounded-md shadow-sm" />
                                    <span className=" font-gray-800 text-lg">Contact Clicks</span>


                                </div>
                                <div className=" mr-1 font-mono">
                                    20
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl h-16 p-4 border border-gray-600 shadow-sm">
                            <div className="shrink-0 flex items-center justify-between">
                                <div className=" flex items-center gap-3">

                                    <EyeIcon className="w-6 h-6 p-1 text-gray-600 bg-gray-200 border rounded-md shadow-sm" />
                                    <span className=" font-gray-800 text-lg">Favorites</span>


                                </div>
                                <div className=" mr-1 font-mono">
                                    5
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="mt-8">
                        <span className="decoration-gray-500 font-medium text-gray-800 underline">
                            My Subleases
                        </span>
                        <span className="text-gray-500"> / </span>
                        <span className="font-medium text-gray-400">
                            {subleases ? subleases.length : ""} posted
                        </span>
                        {/* <span className="text-gray-500"> · </span> */}
                        {/* <span className="font-medium text-gray-400">
                            {data ? data.data.length : ""} total
                        </span> */}

                    </div>

                    <div className="flex flex-col gap-1 mt-4">

                        {/* map data */}
                        {subleases && subleases.map((sublease) => {
                            console.log("MY SEASEesessE", sublease)

                            return (
                                <Link href={`/listings/${sublease.id}`} target="_blank" key={sublease.id}>
                                    <div
                                        className="hover:bg-gray-100 flex items-center justify-between h-12 p-4 border border-gray-500 rounded-md"
                                    >
                                        <div className=" font-medium">
                                            {`${sublease.subleases_draft.title}`}
                                            <span className="font-mono font-normal text-gray-600">
                                                {` · ID: ${sublease.id}`}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className=" bg-zinc-400 flex items-center px-2 py-1 text-xs font-medium text-white rounded-full">
                                                {"Posted " + timeAgo(sublease.subleases_draft.date_submitted)}
                                            </div>
                                            <div className="hover:scale-105 transform-all duration-100">
                                                <TrashIcon className="w-7 h-7 p-1 text-white bg-red-500 border rounded-md"
                                                    onClick={
                                                        async (e) => {
                                                            e.preventDefault();

                                                            confirm("Are you sure you want to disable this sublease?")
                                                            disableActiveListing(sublease.id);
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}

                    </div>
                </ContainerLayout>
            </>
        )
    } else {
        return (
            <LoginPage />
        )
    }
}